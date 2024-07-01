import StudRow from "../panelForms/studs/StudRow";
import { useRef } from "react";
import { nullishTab } from "@/lib/global/declarations/types";

export default function StudList({
  userClass = "estudante",
}: {
  userClass: string;
}): JSX.Element {
  const tabRef = useRef<nullishTab>(null);
  return (
    <table
      className="table table-striped table-responsive table-hover tabProfs"
      id="avStudsTab"
      ref={tabRef}
    >
      <caption className="caption-t">
        <strong>
          <small role="textbox" className="noInvert">
            <em className="noInvert">
              Lista Recuperada da Ficha de Estudantes registrados. Acesse
              <samp>
                <a> ROTA_PLACEHOLDER </a>
              </samp>{" "}
              para cadastrar
            </em>
          </small>
        </strong>
      </caption>
      <colgroup>
        {userClass === "coordenador" && <col></col>}
        {userClass === "coordenador" && <col></col>}
        <col></col>
        <col></col>
        <col></col>
        <col></col>
        <col></col>
        <col></col>
        <col></col>
      </colgroup>
      <thead className="thead-dark">
        <tr id="avStuds-row1">
          {userClass === "coordenador" && <th scope="col">CPF</th>}
          {userClass === "coordenador" && <th scope="col">DRE</th>}
          <th scope="col">Nome</th>
          <th scope="col">E-mail</th>
          <th scope="col">Telefone</th>
          <th scope="col">Curso</th>
          <th scope="col">Dia De Atividade</th>
          <th scope="col">Período de Participação</th>
          <th className="alocCel" scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <StudRow
          count={2}
          tabRef={tabRef}
          userClass={userClass}
          inDlg={true}
          studInfo={{
            name: "Maria Eduarda Augusta",
            email: "mariaeduarda2001@gmail.com",
            tel: "+55 11 99887-2233",
            area: " Odontologia",
            day: "Sexta-feira",
            interv: "25/07/2023 – Presente",
            dre: "123456789",
            cpf: "123.456.789-12",
          }}
        />
        <StudRow
          count={3}
          tabRef={tabRef}
          userClass={userClass}
          inDlg={true}
          studInfo={{
            name: "Josefina Guedes Pereira",
            email: "josefinaguedes@gmail.com",
            tel: "+55 22 99777-1111",
            area: "Odontologia",
            day: "Quarta-feira",
            interv: "25/07/2023 – Presente",
            dre: "987654321",
            cpf: "123.789.456-22",
          }}
        />
        <StudRow
          count={4}
          tabRef={tabRef}
          userClass={userClass}
          inDlg={true}
          studInfo={{
            name: "Augusto Duarte Fonseca",
            email: "",
            tel: "+55 21 922334-2233",
            area: "Educação Física",
            day: "Quarta-feira",
            interv: "25/07/2023 – Presente",
            dre: "111222333",
            cpf: "789.123.456-78",
          }}
        />
      </tbody>
    </table>
  );
}
