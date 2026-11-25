import React, { useState } from 'react';
import { DocumentItem } from '../types/document';
import {
  X,
  Download,
  Printer,
  History,
  Share2,
  FileText,
  BookOpen,
  Wrench,
  Building2,
  Calendar,
  Clock,
  CheckCircle,
  Copy,
  Check,
  Star,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  FileCheck,
  ShieldCheck,
  CheckSquare,
  Square,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { printDocument, downloadMockPdf } from '../utils/pdfGenerator';

interface DocumentReaderModalProps {
  document: DocumentItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenRevision: (doc: DocumentItem) => void;
  onToggleFavorite: (id: string) => void;
}

export const DocumentReaderModal: React.FC<DocumentReaderModalProps> = ({
  document,
  isOpen,
  onClose,
  onOpenRevision,
  onToggleFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<'pdf' | 'content' | 'history' | 'distribution'>('pdf');
  const [zoomScale, setZoomScale] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  if (!isOpen || !document) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`${document.code} - ${document.title}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleStep = (stepKey: string) => {
    setCheckedSteps((prev) => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  const getTypeBadge = () => {
    switch (document.type) {
      case 'REGULASI':
        return {
          bg: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: BookOpen,
          label: 'Regulasi',
        };
      case 'SOP':
        return {
          bg: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: FileText,
          label: 'Standar Operasional (SOP)',
        };
      case 'IK':
        return {
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          icon: Wrench,
          label: 'Instruksi Kerja (IK)',
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-800 border-slate-200',
          icon: FileText,
          label: document.type,
        };
    }
  };

  const typeConfig = getTypeBadge();
  const TypeIcon = typeConfig.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div
        className={`bg-white rounded-3xl shadow-2xl border border-slate-200 w-full transition-all flex flex-col overflow-hidden ${
          isFullscreen ? 'h-full max-h-screen rounded-none' : 'max-w-5xl max-h-[94vh]'
        }`}
      >
        {/* Top Header Bar */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-600/90 flex items-center justify-center shrink-0 text-white shadow-inner">
              <TypeIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                  {document.code}
                </span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {document.version}
                </span>
                <span className="text-xs text-slate-400">• {document.department}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white truncate max-w-xl mt-0.5">
                {document.title}
              </h2>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Favorite */}
            <button
              onClick={() => onToggleFavorite(document.id)}
              className="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Favorit"
            >
              <Star
                className={`w-4 h-4 ${
                  document.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-400'
                }`}
              />
            </button>

            {/* Print */}
            <button
              onClick={() => printDocument(document)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Cetak Lembar Resmi / Cetak PDF"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Download */}
            <button
              onClick={() => downloadMockPdf(document)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Unduh Berkas PDF"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Revision */}
            <button
              onClick={() => onOpenRevision(document)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              title="Ajukan Pembaruan Revisi"
            >
              <History className="w-3.5 h-3.5" />
              <span>Revisi</span>
            </button>

            {/* Fullscreen */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer hidden md:block"
              title={isFullscreen ? 'Keluar Fullscreen' : 'Layar Penuh'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub Header Navigation Tabs */}
        <div className="px-6 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('pdf')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'pdf'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              Pratinjau PDF Terkendali
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'content'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              Prosedur &amp; Langkah Operasional
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              <span>Riwayat Revisi</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === 'history'
                    ? 'bg-blue-700 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {document.versionHistory.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('distribution')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'distribution'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              Distribusi Departemen
            </button>
          </div>

          {/* Zoom controls (visible in PDF tab) */}
          {activeTab === 'pdf' && (
            <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setZoomScale((z) => Math.max(70, z - 10))}
                className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
                title="Perkecil"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] text-slate-700 w-10 text-center font-medium">
                {zoomScale}%
              </span>
              <button
                onClick={() => setZoomScale((z) => Math.min(140, z + 10))}
                className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
                title="Perbesar"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto bg-slate-200/70 p-4 sm:p-6">
          {/* TAB 1: PDF Viewer */}
          {activeTab === 'pdf' && (
            <div className="flex justify-center">
              {document.file?.url && !document.file.isSamplePdf ? (
                // Real uploaded PDF via Data URL / Object URL
                <div className="w-full bg-white rounded-2xl shadow-lg border border-slate-300 overflow-hidden">
                  <div className="bg-slate-800 text-white text-xs px-4 py-2 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-400" />
                      <span>Menampilkan Berkas PDF Terunggah: {document.file.name}</span>
                    </span>
                    <a
                      href={document.file.url}
                      download={document.file.name}
                      className="text-blue-300 hover:underline flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Unduh Asli
                    </a>
                  </div>
                  <iframe
                    src={document.file.url}
                    className="w-full h-[700px] border-none"
                    title={document.title}
                  />
                </div>
              ) : (
                // Standard High-Fidelity Enterprise Controlled Document Sheet
                <div
                  style={{ transform: `scale(${zoomScale / 100})`, transformOrigin: 'top center' }}
                  className="bg-white rounded-xl shadow-xl border border-slate-300 w-full max-w-3xl p-8 sm:p-12 relative text-slate-900 transition-transform"
                >
                  {/* Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.06] rotate-[-30deg]">
                    <span className="text-7xl sm:text-8xl font-black text-rose-800 tracking-widest uppercase">
                      DOKUMEN TERKENDALI
                    </span>
                  </div>

                  {/* KOP FORMAL SISTEM MANAJEMEN */}
                  <table className="w-full border-2 border-slate-900 text-xs mb-6">
                    <tbody>
                      <tr className="border-b border-slate-900">
                        <td className="w-1/4 p-3 border-r border-slate-900 text-center font-bold bg-slate-50">
                          <div className="text-xl font-extrabold text-blue-900 tracking-wider">
                            POWER-UP
                          </div>
                          <div className="text-[8px] text-slate-500 font-medium uppercase tracking-wider mt-0.5">
                            Procedures &amp; Operations Hub
                          </div>
                          <div className="text-[8px] text-slate-400 font-normal">
                            ISO 9001:2015 Terakreditasi
                          </div>
                        </td>
                        <td className="w-1/2 p-3 border-r border-slate-900 text-center">
                          <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-800 mb-1">
                            {document.type}
                          </span>
                          <div className="font-bold text-sm text-slate-900 uppercase">
                            {document.title}
                          </div>
                        </td>
                        <td className="w-1/4 p-2 text-[11px] space-y-1 bg-slate-50">
                          <div>
                            <span className="text-slate-500 text-[10px]">No. Dok:</span>
                            <div className="font-mono font-bold text-slate-900">{document.code}</div>
                          </div>
                          <div className="pt-1 border-t border-slate-300">
                            <span className="text-slate-500 text-[10px]">Edisi / Revisi:</span>
                            <div className="font-mono font-bold text-slate-900">
                              {document.version}
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border-r border-slate-900 text-[11px] text-slate-600">
                          <span className="text-[10px] text-slate-500 block">Departemen:</span>
                          <strong>{document.department}</strong>
                        </td>
                        <td className="p-2 border-r border-slate-900 text-[11px] text-slate-600">
                          <div className="flex justify-between">
                            <span>
                              Tgl. Efektif: <strong>{document.effectiveDate}</strong>
                            </span>
                            <span>
                              Review Berikutnya: <strong>{document.reviewDueDate}</strong>
                            </span>
                          </div>
                        </td>
                        <td className="p-2 text-[10px] text-slate-500 bg-slate-50">
                          Status: <strong className="text-emerald-700">{document.status}</strong>
                          <br />
                          Klasifikasi: <strong>Internal</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* 1. Ringkasan & Ruang Lingkup */}
                  <div className="mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                      1. Ringkasan Eksekutif &amp; Ruang Lingkup
                    </h3>
                    <p className="text-xs text-slate-700 leading-relaxed text-justify">
                      {document.summary}
                    </p>
                  </div>

                  {/* Sections */}
                  {document.sections.map((sec, idx) => (
                    <div key={idx} className="mb-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                        {idx + 2}. {sec.title}
                      </h3>
                      <p className="text-xs text-slate-700 leading-relaxed text-justify mb-2">
                        {sec.content}
                      </p>
                      {sec.steps && sec.steps.length > 0 && (
                        <div className="space-y-1.5 pl-2 mt-2">
                          {sec.steps.map((step, sIdx) => {
                            const stepKey = `${document.id}-${idx}-${sIdx}`;
                            const isChecked = !!checkedSteps[stepKey];
                            return (
                              <div
                                key={sIdx}
                                onClick={() => toggleStep(stepKey)}
                                className="flex items-start gap-2.5 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer text-xs"
                              >
                                {isChecked ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                )}
                                <span
                                  className={`${
                                    isChecked
                                      ? 'text-slate-400 line-through'
                                      : 'text-slate-800'
                                  }`}
                                >
                                  <strong>{sIdx + 1}.</strong> {step}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Lembar Pengesahan Resmi */}
                  <div className="mt-10 pt-4 border-t-2 border-slate-900">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 text-center">
                      Lembar Pengesahan Dokumen Terkendali
                    </h3>
                    <table className="w-full border border-slate-900 text-center text-xs">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-900 font-bold">
                          <th className="p-2 border-r border-slate-900 w-1/3">Disiapkan Oleh</th>
                          <th className="p-2 border-r border-slate-900 w-1/3">Diperiksa Oleh</th>
                          <th className="p-2 w-1/3">Disahkan Oleh</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-3 border-r border-slate-900 h-20 align-bottom">
                            <div className="text-[10px] text-slate-400 mb-2 italic">
                              [Tanda Tangan Digital Diverifikasi]
                            </div>
                            <div className="font-bold text-slate-900">{document.pic}</div>
                            <div className="text-[10px] text-slate-500">Document Owner</div>
                          </td>
                          <td className="p-3 border-r border-slate-900 h-20 align-bottom">
                            <div className="text-[10px] text-slate-400 mb-2 italic">
                              [Tanda Tangan Digital Diverifikasi]
                            </div>
                            <div className="font-bold text-slate-900">
                              Kepala Departemen {document.department}
                            </div>
                            <div className="text-[10px] text-slate-500">Department Head</div>
                          </td>
                          <td className="p-3 h-20 align-bottom">
                            <div className="text-[10px] text-slate-400 mb-2 italic">
                              [Cap Resmi Sistem Terverifikasi]
                            </div>
                            <div className="font-bold text-slate-900">{document.approvedBy}</div>
                            <div className="text-[10px] text-slate-500">Management Representative</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 text-[10px] text-slate-400 text-center border-t border-slate-200 pt-2">
                    Dokumen ini sah dikeluarkan melalui POWER-Up (Procedures, Operations, and Workplace Efficiency Regulation Hub) • Salinan
                    Terkendali Elektronik
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Clean Procedures / Checklists */}
          {activeTab === 'content' && (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Tujuan Dokumen</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{document.summary}</p>
              </div>

              {document.sections.map((sec, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    {idx + 1}. {sec.title}
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed mb-3">{sec.content}</p>

                  {sec.steps && sec.steps.length > 0 && (
                    <div className="space-y-2 mt-3 pt-3 border-t border-slate-200">
                      <div className="text-xs font-semibold text-slate-600 mb-1">
                        Daftar Checklist Langkah Kerja:
                      </div>
                      {sec.steps.map((st, sIdx) => {
                        const stepKey = `chk-${idx}-${sIdx}`;
                        const isChecked = !!checkedSteps[stepKey];
                        return (
                          <div
                            key={sIdx}
                            onClick={() => toggleStep(stepKey)}
                            className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer text-xs"
                          >
                            {isChecked ? (
                              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                            )}
                            <span
                              className={`flex-1 ${
                                isChecked ? 'text-slate-400 line-through' : 'text-slate-800'
                              }`}
                            >
                              <strong>Langkah {sIdx + 1}:</strong> {st}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Version History (Audit Trail) */}
          {activeTab === 'history' && (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Riwayat Revisi &amp; Jejak Audit (Audit Trail)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Histori lengkap seluruh versi penerbitan dokumen sesuai klausul ISO 9001
                  </p>
                </div>
                <button
                  onClick={() => onOpenRevision(document)}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Buat Revisi Baru</span>
                </button>
              </div>

              <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {document.versionHistory.map((item, idx) => (
                  <div key={idx} className="relative">
                    {/* Timeline dot */}
                    <div
                      className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-white shadow-xs ${
                        idx === 0 ? 'bg-blue-600 ring-2 ring-blue-100' : 'bg-slate-400'
                      }`}
                    />

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                            {item.version}
                          </span>
                          {idx === 0 && (
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                              Versi Aktif Terkini
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {item.releaseDate}
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        "{item.changeSummary}"
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/80">
                        <span>
                          Penyusun: <strong>{item.author}</strong>
                        </span>
                        <span>
                          Disetujui: <strong>{item.approvedBy}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Distribution Matrix */}
          {activeTab === 'distribution' && (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Matriks Distribusi &amp; Sosialisasi Dokumen
              </h3>
              <p className="text-xs text-slate-500">
                Departemen dan unit kerja yang telah menerima dan tersosialisasi salinan terkendali
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {document.distributionDepartments.map((dept, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{dept}</div>
                        <div className="text-[10px] text-slate-500">Salinan Terkendali Aktif</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Tersosialisasi
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
