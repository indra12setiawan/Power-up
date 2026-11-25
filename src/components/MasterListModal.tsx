import React from 'react';
import { DocumentItem } from '../types/document';
import {
  FileSpreadsheet,
  Download,
  Printer,
  X,
  FileCheck,
  CheckCircle2,
} from 'lucide-react';

interface MasterListModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: DocumentItem[];
}

export const MasterListModal: React.FC<MasterListModalProps> = ({
  isOpen,
  onClose,
  documents,
}) => {
  if (!isOpen) return null;

  const exportToCsv = () => {
    const headers = [
      'No. Urut',
      'Kode Dokumen',
      'Judul Dokumen',
      'Jenis Dokumen',
      'Departemen',
      'Versi',
      'Tanggal Efektif',
      'Tanggal Tinjauan Berkala',
      'Status Dokumen',
      'Penyusun (PIC)',
      'Disetujui Oleh',
      'Ukuran Berkas',
    ];

    const rows = documents.map((doc, idx) => [
      idx + 1,
      `"${doc.code}"`,
      `"${doc.title.replace(/"/g, '""')}"`,
      `"${doc.type}"`,
      `"${doc.department}"`,
      `"${doc.version}"`,
      `"${doc.effectiveDate}"`,
      `"${doc.reviewDueDate}"`,
      `"${doc.status}"`,
      `"${doc.pic.replace(/"/g, '""')}"`,
      `"${doc.approvedBy.replace(/"/g, '""')}"`,
      `"${doc.file?.sizeFormatted || '1.5 MB'}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Daftar_Induk_Dokumen_POWER-Up_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Daftar Induk Dokumen Terkendali (Master Document Register)
              </h2>
              <p className="text-xs text-slate-500">
                Rekapitulasi seluruh Regulasi, Standar Operasional Prosedur (SOP), dan Instruksi Kerja
                (IK)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportToCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor ke CSV / Excel</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table Register */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-3 w-8">No</th>
                  <th className="py-3 px-3">Kode Dokumen</th>
                  <th className="py-3 px-3">Judul Dokumen</th>
                  <th className="py-3 px-3">Jenis</th>
                  <th className="py-3 px-3">Departemen</th>
                  <th className="py-3 px-3">Versi</th>
                  <th className="py-3 px-3">Tgl. Efektif</th>
                  <th className="py-3 px-3">Tgl. Review</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">PIC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc, idx) => (
                  <tr key={doc.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono text-slate-400">{idx + 1}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-700">{doc.code}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-900">{doc.title}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {doc.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{doc.department}</td>
                    <td className="py-2.5 px-3 font-mono font-bold">{doc.version}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">{doc.effectiveDate}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">{doc.reviewDueDate}</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          doc.status === 'AKTIF'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-800'
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{doc.pic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>
            Total Dokumen Terdaftar: <strong>{documents.length} dokumen terkendali</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
