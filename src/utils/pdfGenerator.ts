/**
 * Utility to generate printable document sheets and mock downloadable PDF blobs
 */
import { DocumentItem } from '../types/document';

export function generatePrintableHtml(doc: DocumentItem): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${doc.code} - ${doc.title}</title>
  <style>
    @page { size: A4; margin: 20mm; }
    body { font-family: 'Times New Roman', Times, serif; color: #111; line-height: 1.6; font-size: 12pt; margin: 0; padding: 20px; }
    .header-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; border: 2px solid #000; }
    .header-table td { border: 1px solid #000; padding: 8px 12px; font-size: 11pt; vertical-align: middle; }
    .logo-cell { width: 22%; text-align: center; font-weight: bold; font-family: Arial, sans-serif; }
    .title-cell { width: 50%; text-align: center; font-weight: bold; }
    .meta-cell { width: 28%; font-size: 9.5pt; }
    .doc-type-badge { display: inline-block; padding: 2px 8px; font-size: 9pt; background: #e2e8f0; font-weight: bold; border-radius: 4px; }
    .watermark { position: fixed; top: 45%; left: 20%; transform: rotate(-35deg); font-size: 60pt; color: rgba(180, 20, 20, 0.08); font-weight: bold; pointer-events: none; text-transform: uppercase; }
    h2 { font-size: 14pt; border-bottom: 1.5px solid #222; padding-bottom: 4px; margin-top: 24px; text-transform: uppercase; }
    h3 { font-size: 12pt; margin-top: 16px; margin-bottom: 6px; }
    p { margin: 8px 0; text-align: justify; }
    ol, ul { margin: 8px 0 16px 24px; padding: 0; }
    li { margin-bottom: 6px; }
    .approval-table { width: 100%; border-collapse: collapse; margin-top: 40px; border: 1.5px solid #000; page-break-inside: avoid; }
    .approval-table th, .approval-table td { border: 1px solid #000; padding: 8px; text-align: center; font-size: 10pt; }
    .sign-space { height: 60px; }
    .revision-table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 10pt; border: 1px solid #777; }
    .revision-table th, .revision-table td { border: 1px solid #999; padding: 6px 10px; text-align: left; }
    .revision-table th { background: #f1f5f9; }
  </style>
</head>
<body>
  <div class="watermark">DOKUMEN TERKENDALI</div>

  <!-- KOP DOKUMEN SISTEM MANAJEMEN MUTU -->
  <table class="header-table">
    <tr>
      <td class="logo-cell" rowspan="4">
        <div style="font-size: 17pt; font-weight: 800; letter-spacing: 1px; color: #1e3a8a;">POWER-UP</div>
        <div style="font-size: 6.5pt; color: #475569; margin-top: 3px; font-weight: bold;">PROCEDURES, OPERATIONS &amp; WORKPLACE EFFICIENCY</div>
        <div style="font-size: 6.5pt; color: #64748b;">ISO 9001 / ISO 14001 / ISO 45001</div>
      </td>
      <td class="title-cell" rowspan="2">
        <div class="doc-type-badge">${doc.type}</div>
        <div style="font-size: 13pt; margin-top: 6px; text-transform: uppercase;">${doc.title}</div>
      </td>
      <td class="meta-cell"><b>No. Dokumen:</b><br>${doc.code}</td>
    </tr>
    <tr>
      <td class="meta-cell"><b>Edisi / Revisi:</b> ${doc.version}</td>
    </tr>
    <tr>
      <td class="title-cell" style="font-size: 10pt; font-weight: normal;">
        <b>Departemen Pemilik:</b> ${doc.department}
      </td>
      <td class="meta-cell"><b>Tgl. Efektif:</b> ${doc.effectiveDate}</td>
    </tr>
    <tr>
      <td class="title-cell" style="font-size: 9pt; font-style: italic; color: #475569;">
        Status: ${doc.status} | Tinjauan Ulang: ${doc.reviewDueDate}
      </td>
      <td class="meta-cell"><b>Klasifikasi:</b> Terbatas (Internal)</td>
    </tr>
  </table>

  <!-- RINGKASAN & RUANG LINGKUP -->
  <div>
    <h2>1. Ringkasan Eksekutif &amp; Tujuan</h2>
    <p>${doc.summary}</p>
  </div>

  ${doc.sections
    .map(
      (sec, idx) => `
    <div>
      <h2>${idx + 2}. ${sec.title}</h2>
      <p>${sec.content}</p>
      ${
        sec.steps && sec.steps.length > 0
          ? `
        <ol>
          ${sec.steps.map((st) => `<li>${st}</li>`).join('')}
        </ol>
      `
          : ''
      }
    </div>
  `
    )
    .join('')}

  <!-- RIWAYAT REVISI -->
  <div style="margin-top: 30px;">
    <h2>${doc.sections.length + 2}. Riwayat Perubahan Dokumen</h2>
    <table class="revision-table">
      <thead>
        <tr>
          <th>Revisi</th>
          <th>Tanggal Berlaku</th>
          <th>Penyusun</th>
          <th>Disetujui Oleh</th>
          <th>Uraian Perubahan</th>
        </tr>
      </thead>
      <tbody>
        ${doc.versionHistory
          .map(
            (vh) => `
          <tr>
            <td><b>${vh.version}</b></td>
            <td>${vh.releaseDate}</td>
            <td>${vh.author}</td>
            <td>${vh.approvedBy}</td>
            <td>${vh.changeSummary}</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>
  </div>

  <!-- LEMBAR PENGESAHAN DOKUMEN -->
  <div style="margin-top: 35px;">
    <h2>${doc.sections.length + 3}. Lembar Pengesahan</h2>
    <table class="approval-table">
      <thead>
        <tr>
          <th style="width: 33%;">Disiapkan Oleh (Penyusun)</th>
          <th style="width: 34%;">Diperiksa Oleh (Head of Dept)</th>
          <th style="width: 33%;">Disahkan Oleh (Management Rep.)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="sign-space">
            <div style="color: #64748b; font-size: 9pt; padding-top: 20px;">[Tanda Tangan Digital Diverifikasi]</div>
          </td>
          <td class="sign-space">
            <div style="color: #64748b; font-size: 9pt; padding-top: 20px;">[Tanda Tangan Digital Diverifikasi]</div>
          </td>
          <td class="sign-space">
            <div style="color: #64748b; font-size: 9pt; padding-top: 20px;">[Cap Resmi Perusahaan Terverifikasi]</div>
          </td>
        </tr>
        <tr>
          <td><b>${doc.pic}</b><br><span style="font-size: 9pt; color: #475569;">Spesialis Dokumen Kontrol</span></td>
          <td><b>Kepala Departemen ${doc.department}</b><br><span style="font-size: 9pt; color: #475569;">Operational Review</span></td>
          <td><b>${doc.approvedBy}</b><br><span style="font-size: 9pt; color: #475569;">Direktur / Management Representative</span></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div style="margin-top: 40px; border-top: 1px dashed #cbd5e1; padding-top: 10px; font-size: 8.5pt; color: #64748b; text-align: center;">
    Dokumen ini merupakan properti intelektual perusahaan. Dilarang menggandakan atau menyebarluaskan tanpa izin tertulis dari Document Control Controller.
  </div>
</body>
</html>
  `;
}

export function printDocument(doc: DocumentItem): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  printWindow.document.write(generatePrintableHtml(doc));
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 350);
}

export function downloadMockPdf(doc: DocumentItem): void {
  // If actual file URL is present and not mock, download that
  if (doc.file?.url && !doc.file.isSamplePdf) {
    const a = document.createElement('a');
    a.href = doc.file.url;
    a.download = doc.file.name || `${doc.code}_${doc.title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return;
  }

  // Create an HTML-based printable blob that can be saved as PDF or viewed
  const htmlContent = generatePrintableHtml(doc);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (win) {
    win.onload = () => {
      setTimeout(() => {
        win.print();
      }, 300);
    };
  }
}
