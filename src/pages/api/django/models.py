import re
import uuid
from django.db import models
from handlers import clean_email, normalize_name, null_falsish, zero_falsish, undefine_falsish, false_falsish
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
  first_name = models.CharField(max_length=255, default="undefined", editable=True, unique=False, blank=False, null=False)
  additional_name = models.CharField(max_length=255, default="undefined", editable=True, unique=False, blank=True, null=True)
  family_name = models.CharField(max_length=255, default="undefined", editable=True, unique=False, blank=False, null=False)
  full_name = models.CharField(max_length=255, default="undefined", editable=True, unique=False, blank=False, null=False)
  social_name = models.CharField(max_length=255, default="undefined", editable=True, unique=False, blank=True, null=True)
  confirm = models.BooleanField(default=False, editable=False, unique=False, blank=False, null=False)
  confirm_loc = models.CharField(max_length=255, default="undefined", editable=True, unique=False, blank=False, null=False)
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
  street = models.CharField(max_length=255, default="undefined", editable=True, unique=False, blank=True, null=True)
  neighbourhood = models.CharField(max_length=255, default="undefined", editable=True, unique=False, blank=True, null=True)
  street_num = models.CharField(max_length=255, default="undefined", editable=True, unique=False, blank=True, null=True)
  loc_complement = models.CharField(max_length=255, default="undefined", editable=True, unique=False, blank=True, null=True)
  birth = models.DateField(default=date.today(), editable=True, unique=False, blank=False, null=False)
  issue = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  history = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  febr_r = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  hep = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  hep_a = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  hep_b = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  hep_c = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  hep_d = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  hep_e = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  hep_indirect = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  hep_imun = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  hep_onc = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  hep_alc = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  hep_tox = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  diab_1 = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_2 = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_gest = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_ins = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_lada = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_mody = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  hiv = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  hiv_copies = models.CharField(max_length=255, default="0 copies/ml", editable=True, unique=False, blank=True, null=True)
  hiv_diagnosis = models.DateField(default=date.today(), editable=True, unique=False, blank=True, null=True)
  hiv_last_exam = models.DateField(default=date.today(), editable=True, unique=False, blank=True, null=True)
  t_sang = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  pr_alta = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  has_stg = models.CharField(max_length=255, default="null", editable=True, unique=False, blank=True, null=True, choices=[
    ('null', 'Ausente')
    ('pre', 'Pré-hipertensão'),
    ("1", "Hipertensão Estágio 1"),
    ('2', "Hipertensão Estágio 2"),
    ("3", "Hipertensão Estágio 3 | Em Crise"),
    ("prim", "Primária | Essencial"),
    ("sec", "Secundária")
  ])
  has_res = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  has_sist = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  has_mal = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  fumo = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  fumo_lvl = models.CharField(max_length=255, default="null", editable=True, unique=False, blank=True, null=True, choices=[
    ('null', 'Ausente')
    ('leve', 'Leve'),
    ("moderado", "Moderado"),
    ('Alto', "Alto")
  ])
  fumo_tab = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  fumo_can = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  fumo_other = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  fumo_months = models.CharField(max_length=4, default="0", editable=True, unique=False, blank=True, null=True)
  pb_card = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  notes_pb_card = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  pb_ren = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  notes_pb_ren = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  pb_gast = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  notes_pb_gast = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  pb_resp = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  notes_pb_resp = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  pb_alerg = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  notes_pb_alerg = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  pb_art_reum = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  notes_pb_art_reum = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  pb_sist = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  notes_pb_sist = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  pb_alc = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  notes_pb_alc = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  pb_drg = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  notes_pb_drg = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  grv = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  notes_grv = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  ant_c = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  notes_ant_c = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  op = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  notes_op = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  pb_cic = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  notes_pb_cic = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  pb_anst = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  notes_pb_anst = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  pb_hem = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  notes_pb_hem = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  pb_intrn = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  notes_pb_intrn = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  pb_med = models.BooleanField(default=False, editable=True, unique=False, blank=False, null=False)
  notes_pb_med = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  cand = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  gon = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  herp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  herp_z = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  pneumonia = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  sif = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  toxop = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  tuberc = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  other_d = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  fam_diab = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_mae = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_pai = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_avof_m = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_avof_p = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_avom_m = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_avom_p = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_bisf_mm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_bisf_mp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_bisf_pm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_bisf_pp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_bism_mm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_bism_mp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_bism_pm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_bism_pp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  diab_tris = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  fam_dislip = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  dislip_mae = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  dislip_pai = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  dislip_avof_m = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  dislip_avof_p = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  dislip_avom_m = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  dislip_avom_p = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  dislip_bisf_mm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  dislip_bisf_mp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  dislip_bisf_pm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  dislip_bisf_pp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  dislip_bism_mm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  dislip_bism_mp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  dislip_bism_pm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  dislip_bism_pp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  dislip_tris = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  fam_card = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  card_mae = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  card_pai = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  card_avof_m = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  card_avof_p = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  card_avom_m = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  card_avom_p = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  card_bisf_mm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  card_bisf_mp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  card_bisf_pm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  card_bisf_pp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  card_bism_mm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  card_bism_mp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  card_bism_pm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  card_bism_pp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  card_tris = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  fam_pulm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  pulm_mae = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  pulm_pai = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  pulm_avof_m = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  pulm_avof_p = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  pulm_avom_m = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  pulm_avom_p = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  pulm_bisf_mm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  pulm_bisf_mp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  pulm_bisf_pm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  pulm_bisf_pp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  pulm_bism_mm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  pulm_bism_mp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  pulm_bism_pm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  pulm_bism_pp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  pulm_tris = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  fam_onc = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  onc_mae = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  onc_pai = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  onc_avof_m = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  onc_avof_p = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  onc_avom_m = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  onc_avom_p = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  onc_bisf_mm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  onc_bisf_mp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  onc_bisf_pm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  onc_bisf_pp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  onc_bism_mm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  onc_bism_mp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  onc_bism_pm = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  onc_bism_pp = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  onc_tris = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  escov_n_day = models.CharField(max_length=2, editable=True, unique=False, blank=True, null=True)
  fio_n_day = models.CharField(max_length=2, editable=True, unique=False, blank=True, null=True)
  exg_n_day = models.CharField(max_length=2, editable=True, unique=False, blank=True, null=True)
  cor_doces = models.BooleanField(default=False, editable=True, unique=False, blank=True, null=True)
  notes_cor_doces = models.CharField(max_length=65535, default="null", editable=True, unique=False, blank=True, null=True)
  def clean(self):
    super().clean()
    self.cpf = re.sub(r"[^\d]", "", self.cpf)
    self.current_status = self.current_status if self.current_status in ['avaliacao', 'tratamento', 'emergência', 'emergencia', 
                                                                         'altaOdontologia', 'altaEducacaoFisica', 'altaNutricao', 
                                                                         'altaOdontologiaEducaoFisica', 'altaOdontologiaNutricao', 
                                                                         'altaEducaoFisicaNutricao', 'altaOdontologiaEducacaoFisicaNutricao'] else 'avaliacao'
    self.ddd = re.sub(r"[^0-9]", "", self.ddd)
    if not self.ddd or len(self.ddd) < 2:
      self.ddd = "00"
    self.ddd_sec = re.sub(r"[^0-9]", "", self.ddd_sec)
    if not self.ddd_sec or len(self.ddd_sec) < 2:
      self.ddd_sec = "00"
    self.tel = re.sub(r"[^0-9]", "", self.tel)
    if not self.tel.startswith('9'):
      self.tel = self.tel[:7]
    if not self.tel or len(self.tel) < 8:
      self.telephone = "00000000"
    self.tel_sec = re.sub(r"[^0-9]", "", self.tel_sec)
    if not self.tel_sec.startswith('9'):
      self.tel_sec = self.tel_sec[:7]
    if not self.tel_sec or len(self.tel_sec) < 8:
      self.telephone_sec = "00000000"
    self.country_code = re.sub(r"[^0-9]", "", self.country_code)
    if not self.country_code or len(self.country_code) < 4:
      self.country_code = "55"
    self.country_code_sec = re.sub(r"[^0-9]", "", self.country_code_sec)
    if not self.country_code_sec or len(self.country_code_sec) < 4:
      self.country_code_sec = "55"
    self.telephone = f"{self.country_code} {self.ddd} {self.tel}"
    self.telephone_sec = f"{self.country_code_sec} {self.ddd_sec} {self.tel_sec}"
    self.email = clean_email(self.email)
    self.email_sec = clean_email(self.email_sec)
    self.country = normalize_name(self.country)
    if not self.country or self.country == '':
      self.country = 'Brasil'
    self.cep = re.sub(r"[^0-9]", "", self.cep)
    if not self.cep or len(self.cep) < 8:
      self.cep = '00000000'
    else:
      self.cep = f"{self.cep[:5]}-{self.cep[5:8]}"
    self.state = self.state if self.state in ['GO', 'MT', 'MS', 'AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE', 'AC', 'AP', 'AM', 'RO', 'RR', 'TO', 'ES', 'MG', 'RJ', 'SP', 'PR', 'RS', 'SC'] else 'RJ'
    if not self.city or self.city == '':
      self.city = 'Rio de Janeiro'
    if not self.naturality or self.naturality == '':
      self.naturality = f'{self.state}, ${self.city}'
    self.street = undefine_falsish(self.street)
    self.neighbourhood = undefine_falsish(self.neighbourhood)
    self.street_num = undefine_falsish(re.sub(r"[^0-9]", "", self.street_num))
    self.loc_complement = undefine_falsish(re.sub(r"[^a-zA-Z0-9\\/-\s]"))
    self.birth = self.birth if self.birth and self.birth <= date.today() else date.today()
    self.issue = null_falsish(self.issue)
    self.history = null_falsish(self.history)
    self.febr_r = false_falsish(self.febr_r)
    self.hep = false_falsish(self.hep)
    self.hep_a = false_falsish(self.hep_a)
    self.hep_b = false_falsish(self.hep_b)
    self.hep_c = false_falsish(self.hep_c)
    self.hep_d = false_falsish(self.hep_d)
    self.hep_e = false_falsish(self.hep_e)
    self.hep_indirect = false_falsish(self.hep_indirect)
    self.hep_imun = false_falsish(self.hep_imun)
    self.hep_onc = false_falsish(self.hep_onc)
    self.hep_alc = false_falsish(self.hep_alc)
    self.hep_tox = false_falsish(self.hep_tox)
    self.diab = false_falsish(self.diab)
    self.diab_1 = false_falsish(self.diab_1)
    self.diab_2 = false_falsish(self.diab_2)
    self.diab_gest = false_falsish(self.diab_gest)
    self.diab_ins = false_falsish(self.diab_ins)
    self.diab_lada = false_falsish(self.diab_lada)
    self.diab_mody = false_falsish(self.diab_mody)
    self.hiv = false_falsish(self.hiv)
    self.hiv_copies = re.sub(r"[^0-9]", "", self.hiv_copies)
    if not self.hiv_copies or self.hiv_copies == '':
      self.hiv_copies = '0'
    self.hiv_copies = f"{self.hiv_copies} copies/ml"
    self.hiv_diagnosis = self.hiv_diagnosis if self.hiv_diagnosis and self.hiv_diagnosis <= date.today() else date.today()
    self.hiv_last_exam = self.hiv_last_exam if self.hiv_last_exam and self.hiv_last_exam <= date.today() else date.today()
    self.t_sang = false_falsish(self.t_sang)
    self.pr_alta = false_falsish(self.pr_alta)
    self.has_stg = self.has_stg if self.has_stg and self.has_stg in ['pre', '1', '2', '3', 'prim', 'sec'] else 'null'
    self.has_res = false_falsish(self.has_res)
    self.has_sis = false_falsish(self.has_sis)
    self.has_mal = false_falsish(self.has_mal)
    self.fumo = false_falsish(self.fumo)
    self.fumo_lvl = self.fumo_lvl if self.fumo_lvl and self.fumo_lvl in ['leve', 'moderado', 'alto'] else 'null'
    self.fumo_tab = false_falsish(self.fumo_tab)
    self.fumo_can = false_falsish(self.fumo_can)
    self.fumo_other = false_falsish(self.fumo_other)
    self.fumo_months = re.sub(r"[^0-9]", "", self.fumo_months)
    if not self.fumo_months or self.fumo_months == '':
      self.fumo_months = '0'
    self.pb_card = false_falsish(self.pb_card)
    self.pb_ren = false_falsish(self.pb_ren)
    self.pb_gast = false_falsish(self.pb_gast)
    self.pb_resp = false_falsish(self.pb_resp)
    self.pb_alerg = false_falsish(self.pb_alerg)
    self.pb_art_reum = false_falsish(self.pb_art_reum)
    self.pb_sist = false_falsish(self.pb_sist)
    self.pb_alc = false_falsish(self.pb_alc)
    self.pb_drg = false_falsish(self.pb_drg)
    self.pb_cic = false_falsish(self.pb_cic)
    self.pb_anst = false_falsish(self.pb_anst)
    self.pb_cic = false_falsish(self.pb_cic)
    self.pb_hem = false_falsish(self.pb_hem)
    self.pb_intrn = false_falsish(self.pb_intrn)
    self.pb_med = false_falsish(self.pb_med)
    self.grv = false_falsish(self.grv)
    self.ant_c = false_falsish(self.ant_c)
    self.op = false_falsish(self.op)
    self.escov_n_day = re.sub(r"[^0-9]", "", self.escov_n_day)[:2]
    if not self.escov_n_day or self.escov_n_day == '':
      self.escov_n_day = '0'
    self.fio_n_day = re.sub(r"[^0-9]", "", self.fio_n_day)[:2]
    if not self.fio_n_day or self.fio_n_day == '':
      self.fio_n_day = '0'
    self.exg_n_day = re.sub(r"[^0-9]", "", self.exg_n_day)[:2]
    if not self.exg_n_day or self.exg_n_day == '':
      self.exg_n_day = '0'
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
  ta_plan = models.CharField(max_length=65535, default="null", editable=True, unique=False)
  
  