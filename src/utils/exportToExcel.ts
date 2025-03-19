import { InviteeData } from "@/api/invitee";
import * as XLSX from "xlsx";

interface InviteeExportData {
  name: string;
  phone: string;
  email: string;
  additionalInvitees: number;
  observation: string;
  status: string;
}

const exportToExcel = (data: InviteeData[], fileName: string) => {
  const dataToExport = data.map((invitee: InviteeExportData) => ({
    Nome: invitee.name,
    Telefone: invitee.phone,
    Email: invitee.email,
    "Convidados Adicionais": invitee.additionalInvitees,
    Observação: invitee.observation,
    Status: invitee.status === "ACCEPTED" ? "Aceito" : "Recusado",
  }));

  const acceptedData = dataToExport.filter((_, index) => data[index].status === "ACCEPTED");
  const rejectedData = dataToExport.filter((_, index) => data[index].status === "REJECTED");

  const allWorksheet = XLSX.utils.json_to_sheet(dataToExport);
  const acceptedWorksheet = XLSX.utils.json_to_sheet(acceptedData);
  const rejectedWorksheet = XLSX.utils.json_to_sheet(rejectedData);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, allWorksheet, "Todos");
  XLSX.utils.book_append_sheet(workbook, acceptedWorksheet, "Aceitos");
  XLSX.utils.book_append_sheet(workbook, rejectedWorksheet, "Recusados");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.xlsx`;
  link.click();

  URL.revokeObjectURL(url);
};

export default exportToExcel;
