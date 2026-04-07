import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function downloadCatalog(element: HTMLElement, filename: string): Promise<void> {
  const pages = element.querySelectorAll<HTMLElement>(".catalog-page");
  if (pages.length === 0) throw new Error("No catalog pages found");

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  for (let i = 0; i < pages.length; i++) {
    const canvas = await html2canvas(pages[i], {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#f8f5ee",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.92);
    if (i > 0) pdf.addPage();
    // A4: 210mm × 297mm
    pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
  }

  pdf.save(filename);
}
