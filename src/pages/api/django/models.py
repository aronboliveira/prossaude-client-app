import re
import uuid
from django.db import models
from handlers import clean_email, normalize_name, null_falsish, zero_falsish, undefine_falsish, false_falsish, add_dynamic_fields, extract_count_data
from datetime import date, datetime

class Person(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True, blank=False, null=False)
  cpf = models.CharField(max_length=11, default="null", editable=True, unique=True, blank=False, null=False)
  name = models.CharField(max_length=255, default="undefined", editable=True, unique=True, blank=False, null=False)
  telephone = models.CharField(max_length=15, default="55 00 00000000", editable=True, unique=True, blank=False, null=True)
  email = models.EmailField(max_length=255, default="null", editable=True, unique=True, blank=True, null=True)
  class Meta:
   abstract = True
  def clean(self):
    self.cpf = null_falsish(re.sub(r"[^0-9]", "", self.cpf))
    self.name = normalize_name(self.name)
    self.telephone = re.sub(r"[^0-9]", "", self.telephone)[:13]
    if not self.telephone or len(self.telephone) < 12:
      self.telephone = "000000000000"
    elif len(self.telephone) >= 12:
      if len(self.telephone) == 12:
        self.telephone = f"{self.telephone[len(self.telephone)-12:len(self.telephone-10)]} {self.telephone[:len(self.telephone)-10:len(self.telephone-8)]}  {self.telephone[:len(self.telephone)-8]}"
      elif len(self.telephone) >= 13:
        self.telephone = f"{self.telephone[len(self.telephone)-13:len(self.telephone-11)]} {self.telephone[:len(self.telephone)-11:len(self.telephone-9)]}  {self.telephone[:len(self.telephone)-9]}"
    self.email = clean_email(self.email)
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.clean()
  def save(self, *args, **kwargs):
    self.clean()
    super().save(*args, **kwargs)
class User(Person):
  privilege = models.CharField(max_length=255, editable=True, default="student", blank=False, null=False,
      choices=[
        ('student', 'Student'), ('supervisor', 'Supervisor'), ('coordinator', 'Coordinator')])
  area = models.CharField(max_length=255, editable=True, blank=False, null=False, choices=[
      ('general', 'General'),
      ('medicine', 'Medicine'),
      ('nutrition', 'Nutrition'),
      ('odontology', 'Odontology'),
      ('physical_education', 'Physical Education'),
      ('technology', 'Technology'),
  ], default="general")
  beginning_semester = models.DateFiled(editable=True, unique=False, blank=True, null=True)
  beginning_day = models.DateField(default=date.today(), editable=True, unique=False, blank=True, null=True)
  activity_day = models.CharField(max_length=255, editable=True, blank=False, null=False, choices=[
    ('quarta-feira', 'Quarta-feira'),
    ('sexta-feira', 'Sexta-feira'),
    ('quarta-feira_sexta-feira', 'Quarta-feira e Sexta-feira')
  ])
  authorized = models.BooleanField(editable=True, blank=False, null=False)
  class Meta:
    abstract = True
  def clean(self):
    super().clean()
    self.privilege = self.privilege if self.privilege in ['student', 'supervisor', 'coordinator'] else 'student'
    self.area = self.area if self.area in ['general', 'medicine', 'nutrition', 'odontology', 'physical_education', 'technology'] else 'general'
    today = date.today()
    #precisa implementar lógica para definir relação semestre-ano
    if self.beginning_semester and self.beginning_semester > today:
        self.beginning_semester = today
    if self.beginning_day and self.beginning_day > today:
        self.beginning_day = today
    self.activity_day = self.activity_day if self.activity_day in ['quarta-feira', 'sexta-feira', 'quarta-feira_sexta-feira'] else 'quarta-feira'
    if not self.authorized:
        self.authorized = False  
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.clean()
  def save(self, *args, **kwargs):
      if self.privilege == 'student':
        student = Student.objects.filter(id=self.id).first()
        if not student:
          student = Student(id=self.id)
          student.save()
      elif self.privilege in ['supervisor', 'coordinator']:
        professional = Professional.objects.filter(id=self.id).first()
        if not professional:
          professional = Professional(id=self.id)
          professional.save()
      self.clean()
      super().save(*args, **kwargs)
class Student(User):
  dre = models.CharField(max_length=9, unique=True, blank=False, null=False)
  class Meta:
    verbose_name = 'Student'
    verbose_name_plural = 'Students'
  def clean(self):
    super().clean()
    self.dre = re.sub(r"[^\d]", "", self.dre)
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.clean()
  def save(self, *args, **kwargs):
    self.clean()
    super().save(*args, **kwargs)
class Professional(User):
  external = models.BooleanField(default=True, blank=False, null=False)
  class Meta:
      verbose_name = 'Professional'
      verbose_name_plural = 'Professionals'
  def clean(self):
      super().clean()
      if self.external is None:
          self.external = True
  def __init__(self, *args, **kwargs):
      super().__init__(*args, **kwargs)
      self.clean()
  def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
class Patient(Person):
  next_appointed_day = models.DateField(default=date.today(), editable=True, unique=False, blank=True, null=True)
  treatment_period = models.DateField(default=f'{date.today()} – {date.today()}', editable=True, unique=False, blank=False, null=False)
  current_status = models.CharField(max_length=255, default='avaliacao', editable=True, blank=False, null=False,
    choices=[('avaliacao', 'Em Avaliação Inicial'), ('tratamento', 'Em Tratamento Geral'), ('emergência', 'Em Emergência'), ('emergencia', 'Em Emergência'),
    ('altaOdontologia', 'Alta — Odontologia'), ('altaEducacaoFisica', 'Alta — Educação Física'), ('altaNutricao', 'Alta — Nutrição'),
    ('altaOdontologiaEducaoFisica', 'Alta — Odontologia — Educação Física'), ('altaOdontologiaNutricao', 'Alta — Odontologia — Nutrição'),
    ('altaEducaoFisicaNutricao', 'Alta — Educação Física — Nutrição', ('altaOdontologiaEducacaoFisicaNutricao', 'Alta Geral'))])
  signature = models.FileField(upload_to='signatures/', blank=True, null=True, blank=True, null=True)
  historic = models.ForeignKey('Appointment', on_delete=models.CASCADE, blank=False, null=False)
  class Meta:
    verbose_name = 'Patient'
    verbose_name_plural = 'Patients'
  def clean(self):
    super().clean()
    self.next_appointed_day = self.next_appointed_day if self.next_appointed_day and self.next_appointed_day >= date.today() else date.today()
    curr_date = datetime.now().strftime("%Y-%m-%d")
    end_date = self.treatment_period[self.treatment_period.index('– ') + 2:].strip()
    end_date_int = int(end_date.replace('-', ''))
    if not isinstance(end_date_int, int) or end_date_int > int(curr_date.replace('-', '')):
      end_date = curr_date
      self.treatment_period = f"{self.treatment_period[self.treatment_period.index('– ') + 2:].strip()} - {end_date}"
    self.current_status = self.current_status if self.current_status in ['avaliacao', 'tratamento', 'emergência', 'emergencia', 'altaOdontologia', 'altaEducacaoFisica', 'altaNutricao', 
                                                                         'altaOdontologiaEducaoFisica', 'altaOdontologiaNutricao', 'altaEducaoFisicaNutricao', 'altaOdontologiaEducacaoFisicaNutricao'] else 'avaliacao'
  def __init__ (self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.clean()
  def save(self, *args, **kwargs):
    self.clean()
    super().save(*args, **kwargs)
class Appointment(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True, blank=False, null=False)
  _type = models.CharField(max_length=255, default="anamnese", editable=True, unique=False, blank=False, null=False, choices=[
    ('anamnese', 'Anamnese e Exame Clínico'),
    ('retorno', 'Retorno e Reavaliação'),
    ('exodontia', 'Exodontia'),
    ('profilaxia', 'Profilaxia e Orientação'),
    ('raspagem', 'Raspagem'),
    ('rcarie', 'Remoção de Cárie'),
    ('acompanhamento', 'Acompanhamento Geral'),
    ('analise', 'Análise de Exames Bioquímico'),
    ('diagnostico', 'Diagnóstico Nutricional'),
    ('avaliacao', 'Avaliação Antropométrica'),
    ('recordatorio', 'Recordatório Alimentar'),
    ('suplementacao', 'Suplementação e Plano Alimentar')
  ])
  patient = models.ForeignKey(Patient, on_delete=models.CASCADE, editable=False, unique=False, blank=False, null=False)
  professional = models.ForeignKey(Professional, on_delete=models.CASCADE, editable=True, unique=False, blank=False, null=False)
  student = models.ForeignKey(Student, on_delete=models.CASCADE, editable=True, unique=False, blank=True, null=True)
  notes = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  def clean(self):
    self._type = self._type if self._type in ['anamnese', 'retorno', 'exodontia', 'profilaxia', 'raspagem', 'rcarie', 'acompanhamento', 'analise', 'diagnostico', 'avaliacao', 'recordatorio', 'suplementacao'] else "anamnese"
    if not self.notes or self.notes == '':
      self.notes = 'null'  
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.clean()
  def super(self, *args, **kwargs):
    self.clean()
    super().save(*args, **kwargs)
  class Meta:
    verbose_name = 'Appointment'
    verbose_name_plural = 'Appointments'
class NamedFormData(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True, blank=False, null=False)
  for und255 in ['first_name', 'additional_name', 'family_name', 'full_name', 'social_name', 'confirm_loc']:
    locals()[f'${und255}'] = models.CharField(max_length=255, default="undefined", editable=True, unique=False, blank=False, null=False)
  confirm = models.BooleanField(default=False, editable=False, unique=False, blank=False, null=False)
  signature = models.FileField(upload_to='signatures/', blank=True, null=True, blank=True, null=True)
  def clean(self):
    super().clean()
    self.first_name = normalize_name(self.first_name)
    self.additional_name = normalize_name(self.additional_name)
    self.family_name = normalize_name(self.family_name)
    self.full_name = f'{self.first_name} {self.additional_name} {self.family_name}'
    self.social_name = normalize_name(self.social_name)
    if not self.confirm:
      self.confirm = False    
  def __init__ (self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.clean()
  def save(self, *args, **kwargs):
    self.clean()
    super().save(*args, **kwargs)
class GenderedFormData(NamedFormData):
  age = models.CharField(max_length=255, default="0", editable=True, unique=False, blank=False, null=False)
  gen = models.CharField(max_length=255, default="undefined", editable=True, unique=False, blank=False, null=False, choices=[
    ('masculino', 'Masculino | Homem binário'), ('feminino', 'Feminino | Mulher binária'), ('naoBinario', 'Não-Binário'),
    ('outros', 'Outros'), ('undefined', 'Não desejo declarar')])
  gen_birth_rel = models.CharField(max_length=255, default="undefined", editable=True, unique=False, blank=True, null=True, choices=[
    ('cis', 'Cisgênero | Cissexual'), ('trans', 'Transgênero | Transsexual'),
    ('outros', 'Outros'), ('undefined', 'Não desejo declarar')])
  gen_trans = models.CharField(max_length=255, default="undefined", editable=True, unique=False, blank=True, null=True, choices=[
    ('avancado', 'Avançado'), ('undefined', 'Indefinido'),
    ('no', 'Não está em transição') ('inicial', 'Inicial'), ('intermediario', 'Intermediário')])
  gen_fis_alin = models.CharField(max_length=255, default="masculinizado", editable=True, unique=False, blank=True, null=True, choices=[
    ('masculinizado', 'Masculinizado'), ('feminilizado', 'Feminilizado'),
    ('neutro', 'Indeterminado | Neutro')])
  def clean(self):
    super().clean()
    self.age = zero_falsish(re.sub(r"[^0-9]", "", self.age))
    self.gen = self.gen if self.gen in ['masculino', 'feminino', 'naoBinario', 'outros', 'undefined'] else 'undefined'
    self.gen_birth_rel = self.gen_birth_rel if self.gen_birth_rel in ['cis', 'trans', 'outros', 'undefined'] else 'undefined'
    self.gen_trans = self.gen_trans if self.gen_trans in ['avancado', 'no', 'inicial', 'intermediario', 'undefined'] else 'undefined'
    self.gen_fis_alin = self.gen_fis_alin if self.gen_fis_alin in ['masculinizado', 'feminilizado', 'neutro'] else 'masculinizado'
  def __init__ (self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.clean()
  def save(self, *args, **kwargs):
    self.clean()
    super().save(*args, **kwargs)
class AGData(GenderedFormData):
  cpf = models.CharField(max_length=11, default="null", editable=True, unique=True, blank=False, null=False)
  current_status = models.CharField(max_length=255, default='avaliacao', editable=True, blank=False, null=False,
    choices=[('avaliacao', 'Em Avaliação Inicial'), ('tratamento', 'Em Tratamento Geral'), ('emergência', 'Em Emergência'), ('emergencia', 'Em Emergência'),
    ('altaOdontologia', 'Alta — Odontologia'), ('altaEducacaoFisica', 'Alta — Educação Física'), ('altaNutricao', 'Alta — Nutrição'),
    ('altaOdontologiaEducaoFisica', 'Alta — Odontologia — Educação Física'), ('altaOdontologiaNutricao', 'Alta — Odontologia — Nutrição'),
    ('altaEducaoFisicaNutricao', 'Alta — Educação Física — Nutrição', ('altaOdontologiaEducacaoFisicaNutricao', 'Alta Geral'))])
  ddd = models.CharField(max_length=3, default="00", editable=True, unique=False, blank=False, null=False)
  ddd_sec = models.CharField(max_length=3, default="00", editable=True, unique=False, blank=True, null=True)
  tel = models.CharField(max_length=9, default="00000000", editable=True, unique=True, blank=False, null=False)
  tel_sec = models.CharField(max_length=9, default="00000000", editable=True, unique=True, blank=True, null=True)
  country_code = models.CharField(max_length=4, default="55", editable=True, unique=False, blank=False, null=False)
  country_code_sec = models.CharField(max_length=4, default="55", editable=True, unique=False, blank=True, null=True)
  telephone = models.CharField(max_length=13, default="55 00 00000000", editable=True, unique=False, blank=False, null=False)
  telephone_sec = models.CharField(max_length=13, default="55 00 00000000", editable=True, unique=False, blank=True, null=True)
  email = models.EmailField(max_length=255, default="null", editable=True, unique=True, blank=True, null=False)
  email_sec = models.EmailField(max_length=255, default="null", editable=True, unique=True, blank=True, null=True)
  country = models.CharField(max_length=255, default="Brasil", editable=True, unique=False, blank=False, null=False)
  cep = models.CharField(max_length=11, default="00000000", editable=True, unique=False, blank=False, null=False)
  state = models.CharField(max_length=255, default="RJ", editable=True, unique=False, blank=False, null=False, choices=[
    ("GO", "Goiás"),
    ("MT", "Mato Grosso"),
    ("MS", "Mato Grosso do Sul"),
    ("AL", "Alagoas"),
    ("BA", "Bahia"),
    ("CE", "Ceará"),
    ("MA", "Maranhão"),
    ("PB", "Paraíba"),
    ("PE", "Pernambuco"),
    ("PI", "Piauí"),
    ("RN", "Rio Grande do Norte"),
    ("SE", "Sergipe"),
    ("AC", "Acre"),
    ("AP", "Amapá"),
    ("AM", "Amazonas"),
    ("RO", "Rondônia"),
    ("RR", "Roraima"),
    ("TO", "Tocantins"),
    ("ES", "Espírito Santo"),
    ("MG", "Minas Gerais"),
    ("RJ", "Rio de Janeiro"),
    ("SP", "São Paulo"),
    ("PR", "Paraná"),
    ("RS", "Rio Grande do Sul"),
    ("SC", "Santa Catarina")
])
  city = models.CharField(max_length=255, default="Rio de Janeiro", editable=True, unique=False, blank=False, null=False)
  naturality = models.CharField(max_length=255, default="Rio de Janeiro, Rio de Janeiro", editable=True, unique=False, blank=True, null=True)
  birth = models.DateField(default=date.today(), editable=True, unique=False, blank=False, null=False)
  for und255 in ['street', 'neighbourhood', 'street_num', 'loc_complement']:
    locals()[f'${und255}'] = models.CharField(max_length=255, default="undefined", editable=True, unique=False, blank=True, null=True)
  for d in ['febr_r', 'hep', 'diab', 'hiv', 't_sang', 'pr_alta', 'fumo', 
            'pb_card', 'pb_ren', 'pb_gast', 'pb_resp', 'pb_alerg', 'pb_art_reum', 'pb_sist', 
            'pb_alc', 'pb_drg', 'pb_cic', 'pb_anst', 'pb_hem', 'pb_med',
            'grv', 'ant_c', 'op']:
    locals()[f'{d}'] = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  for n in ['pb_card', 'pb_ren', 'pb_gast', 'pb_resp', 'pb_alerg', 'pb_art_reum', 'pb_sist', 
            'pb_alc', 'pb_drg', 'pb_cic', 'pb_anst', 'pb_hem', 'pb_med',
            'grv', 'ant_c', 'op']:
    locals()[f'notes_{n}'] = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  for h in ['a', 'b', 'c', 'd', 'e', 'indirect', 'imun', 'onc', 'alc', 'tox']:
    locals()[f'hep_${h}'] = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  for db in ['1', '2', 'gest', 'ins', 'lada', 'mody']:
    locals()[f'diab_{db}'] = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  for h in ['res', 'sist', 'mal']:
    locals()[f'has_{h}'] = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  for f in ['can', 'tab', 'other']:
    locals()[f'fumo_${f}'] = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  hiv_copies = models.CharField(max_length=255, default="0 copies/ml", editable=True, unique=False, blank=True, null=True)
  hiv_diagnosis = models.DateField(default=date.today(), editable=True, unique=False, blank=True, null=True)
  hiv_last_exam = models.DateField(default=date.today(), editable=True, unique=False, blank=True, null=True)
  has_stg = models.CharField(max_length=255, default="null", editable=True, unique=False, blank=True, null=True, choices=[
    ('null', 'Ausente')
    ('pre', 'Pré-hipertensão'),
    ("1", "Hipertensão Estágio 1"),
    ('2', "Hipertensão Estágio 2"),
    ("3", "Hipertensão Estágio 3 | Em Crise"),
    ("prim", "Primária | Essencial"),
    ("sec", "Secundária")
  ])
  fumo_lvl = models.CharField(max_length=255, default="null", editable=True, unique=False, blank=True, null=True, choices=[
    ('null', 'Ausente')
    ('leve', 'Leve'),
    ("moderado", "Moderado"),
    ('Alto', "Alto")
  ])
  fumo_months = models.CharField(max_length=4, default="0", editable=True, unique=False, blank=True, null=True)
  for d in ['cand', 'gon', 'herp', 'herp_z', 'pneumonia', 'sif', 'toxop', 'tuberc', 'other_d', 'cor_doces']:
    locals()[f'{d}'] = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  for d in ['diab', 'dislip', 'card', 'pulm', 'onc']:
    locals()[f'fam_{d}'] = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
    for p in ['mae', 'pai', 'avof_m', 'avof_p', 'avom_m', 'avo_m_p', 
      'avo_bisf_mm', 'avo_bisf_mp', 'avo_bisf_pm', 'avo_bisf_pp', 
      'avo_bism_mm', 'avo_bism_mp', 'avo_bism_pm', 'avo_bismp_pp', 'tris']:
      locals()[f'{d}_{p}'] = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  for at in ['escov', 'fio', 'exg']:
    locals()[f'${at}_n_day'] = models.CharField(max_length=2, editable=True, unique=False, blank=True, null=True)
  for note in ['notes_cor_doces', 'issue', 'history']:
    locals()[f'${note}'] = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  def clean(self):
    super().clean()
    self.current_status = self.current_status if self.current_status in ['avaliacao', 'tratamento', 'emergência', 'emergencia', 
                                                                         'altaOdontologia', 'altaEducacaoFisica', 'altaNutricao', 
                                                                         'altaOdontologiaEducaoFisica', 'altaOdontologiaNutricao', 
                                                                         'altaEducaoFisicaNutricao', 'altaOdontologiaEducacaoFisicaNutricao'] else 'avaliacao'
    for field in ['cpf', 'country_code', 'country_code_sec', 'ddd', 'ddd_sec', 'tel', 'tel_sec', 'cep', 'hiv_copies', 'fumo_months']:
      value = re.sub(r"[^0-9]", "", getattr(self, field))
      if field.startswith('cep'):
        value = value[:7]
      elif field.startswith('tel'):
        if value.startswith('9'):
            value = value[:8]
        else:
            value = value[:7]
      elif field.startswith('country') or field.startswith('fumo'):
        value = value[:3]
      elif field.startswith('ddd'):
        value = value[:1]
      setattr(self, field, value)
    if not self.ddd or len(self.ddd) < 2:
      self.ddd = "00"
    if not self.ddd_sec or len(self.ddd_sec) < 2:
      self.ddd_sec = "00"
    if not self.tel or len(self.tel) < 8:
      self.telephone = "00000000"
    if not self.tel_sec or len(self.tel_sec) < 8:
      self.telephone_sec = "00000000"
    if not self.country_code or len(self.country_code) < 4:
      self.country_code = "55"
    if not self.country_code_sec or len(self.country_code_sec) < 4:
      self.country_code_sec = "55"
    self.telephone = f"{self.country_code} {self.ddd} {self.tel}"
    self.telephone_sec = f"{self.country_code_sec} {self.ddd_sec} {self.tel_sec}"
    self.email = clean_email(self.email)
    self.email_sec = clean_email(self.email_sec)
    self.country = normalize_name(self.country)
    if not self.country or self.country == '':
      self.country = 'Brasil'
    if not self.cep or len(self.cep) < 8:
      self.cep = '00000000'
    else:
      self.cep = f"{self.cep[:5]}-{self.cep[5:8]}"
    self.state = self.state if self.state in ['GO', 'MT', 'MS', 'AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE', 'AC', 'AP', 'AM', 'RO', 'RR', 'TO', 'ES', 'MG', 'RJ', 'SP', 'PR', 'RS', 'SC'] else 'RJ'
    if not self.city or self.city == '':
      self.city = 'Rio de Janeiro'
    if not self.naturality or self.naturality == '':
      self.naturality = f'{self.state}, ${self.city}'
    for field in ['street', 'neighbourhood', 'street_num', 'loc_complement']:
      setattr(self, field, undefine_falsish(getattr(self, field)))
    for field in ['febr_r', 'hep', 'diab', 'hiv', 't_sang', 'pr_alta', 'fumo', 
      'pb_card', 'pb_ren', 'pb_gast', 'pb_resp', 'pb_alerg', 'pb_art_reum', 'pb_sist', 
      'pb_alc', 'pb_drg', 'pb_cic', 'pb_anst', 'pb_hem', 'pb_med',
      'grv', 'ant_c', 'op']:
      setattr(self, field, false_falsish(getattr(self, field)))
    for field in ['a', 'b', 'c', 'd', 'e', 'indirect', 'imun', 'onc', 'alc', 'tox']:
      setattr(self, f'hep_{field}', false_falsish(getattr(self, f'hep_{field}')))
    for field in ['1', '2', 'gest', 'ins', 'lada', 'mody']:
      setattr(self, f'diab_{field}', false_falsish(getattr(self, f'diab_{field}')))
    for field in ['res', 'sist', 'mal']:
      setattr(self, f'has_{field}', false_falsish(getattr(self, f'has_{field}')))
    for field in ['can', 'tab', 'other']:
      setattr(self, f'fumo_{field}', false_falsish(getattr(self, f'fumo_{field}')))
    for date_value in ['birth', 'hiv_diagnosis', 'hiv_last_exam']:
      setattr(self, field, date_value if date_value and date_value <= date.today() else date.today())
    if not self.hiv_copies or self.hiv_copies == '':
      self.hiv_copies = '0'
    self.hiv_copies = f"{self.hiv_copies} copies/ml"
    self.has_stg = self.has_stg if self.has_stg and self.has_stg in ['pre', '1', '2', '3', 'prim', 'sec'] else 'null'
    if not self.fumo_months or self.fumo_months == '':
      self.fumo_months = '0'
    for field in ['escov_n_day', 'fio_n_day', 'exg_n_day']:
      setattr(self, field, re.sub(r"[^0-9]", "", getattr(self, field) or '0')[:2])
  def __init__ (self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.clean()
  def save(self, *args, **kwargs):
    self.clean()
    super.save(*args, **kwargs)
class EDData(GenderedFormData):
  atv_lvl = models.CharField(max_length=255, default="undefined", editable=True, unique=False, choices=[
    ('leve', 'Leve'), ('moderado', 'Moderado'), ('intenso', 'Intenso'),
    ('muitoIntenso', 'Muito intenso'), ('sedentario', 'Sedentário')])
class OdData(NamedFormData):
  TEETH_CHOICES = [
    ('higido', 'Hígido'),
    ('careado', 'Careado'),
    ('trincado', 'Trincado'),
    ('ausente', 'Ausente')
  ]
  ta_plan = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=False, null=False)
  for field in ['lab', 'jug', 'vest', 'pltd', 'pltm', 'of', 'lg', 'asb', 'mast', 'peri']:
    locals()[f'insp_{field}'] = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
    locals()[f'desc_insp_${field}'] = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=False, null=False)
  for i in range(11, 49):
    locals()[f'teeth_{i}'] = models.CharField(
        max_length=255,
        default="higido",
        editable=True,
        unique=False,
        blank=False,
        null=False,
        choices=TEETH_CHOICES
    )
  def __new__(cls, *args, **kwargs):
    data = kwargs.get('data', {})
    new_cls = super(OdData, cls).__new__(cls, *args, **kwargs)
    cls.add_trat_fields(cls, data)
    return new_cls
  @classmethod
  def add_trat_fields(cls, data):
    count_trat = extract_count_data(data)
    for _ in range(0, count_trat + 1):
      for prefix in ['trat', 'date', 'sig']:
        add_dynamic_fields(cls, prefix, count_trat, models.CharField, max_length=65535, blank=False, null=False)
  def clean(self):
    super().clean()
    replacements = {
        'a': '[áàäâã]',
        'e': '[éèëê]',
        'i': '[íìïî]',
        'o': '[óòöôõ]',
        'u': '[úùüû]'
    }
    for i in range(11, 49):
      field = getattr(self, f'teeth_{i}')
      for unaccented, accented in replacements.items():
        setattr(self, field, re.sub(accented, unaccented, field))
    for i in range(11, 49):
      field_name = f'teeth_{i}'
      if getattr(self, field_name) not in ['higido', 'careado', 'trincado', 'ausente']:
          setattr(self, field_name, 'higido')
  def __init__(self, *args, **kwargs):
    super(OdData, self).__init__(*args, **kwargs)
    self.clean()
  def save(self, *args, **kwargs):
    self.clean()
    super().save(*args, **kwargs)
  
  