import React, { useState, useRef } from 'react';
import { DocumentItem } from '../types/document';
import {
  History,
  UploadCloud,
  FileCheck,
  X,
  Bell,
  CheckCircle2,
  Calendar,
  AlertCircle,
} from 'lucide-react';

interface RevisionModalProps {
  document: DocumentItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitRevision: (
    docId: string,
    newVersion: string,
    changeSummary: string,
    author: string,
    approvedBy: string,
    effectiveDate: string,
    newFile?: File,
    sendNotification?: boolean
  ) => void;
}

export const RevisionModal: React.FC<RevisionModalProps> = ({
  document,
  isOpen,
  onClose,
  onSubmitRevision,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !document) return null;

  // Auto-increment version suggestion
  const getNextVersion = (ver: string) => {
    const match = ver.match(/^v?(\d+)(\.(\d+))?$/i);
    if (match) {
      const major = parseInt(match[1], 10);
      const minor = match[3] !== undefined ? parseInt(match[3], 10) : 0;
      return `v${major}.${minor + 1}`;
    }
    return `${ver}-rev1`;
  };

  const [newVersion, setNewVersion] = useState(getNextVersion(document.version));
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split('T')[0]);
  const [author, setAuthor] = useState(document.pic);
  const [approvedBy, setApprovedBy] = useState(document.approvedBy);
  const [changeSummary, setChangeSummary] = useState('');
  const [newFile, setNewFile] = useState<File | null>(null);
  const [sendNotification, setSendNotification] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      if (f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')) {
        setNewFile(f);
      } else {
        alert('Format file harus berupa PDF (.pdf)');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!changeSummary.trim()) {
      alert('Mohon isi uraian perubahan (Change Log) agar jejak audit tercatat.');
      return;
    }

    onSubmitRevision(
      document.id,
      newVersion.trim(),
      changeSummary.trim(),
      author.trim(),
      approvedBy.trim(),
      effectiveDate,
      newFile || undefined,
      sendNotification
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Pembaruan / Revisi Dokumen Terkendali
              </h2>
              <p className="text-xs text-slate-500">
                Menerbitkan versi terbaru untuk {document.code}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Target Document Summary Box */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              Dokumen Yang Direvisi
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                {document.code}
              </span>
              <span className="font-bold text-slate-900 text-sm">{document.title}</span>
            </div>
            <div className="mt-1 text-slate-600">
              Versi Saat Ini: <span className="font-mono font-bold">{document.version}</span> •
              Departemen: <span className="font-medium">{document.department}</span>
            </div>
          </div>

          {/* New Version & Effective Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Versi Baru *
              </label>
              <input
                type="text"
                required
                value={newVersion}
                onChange={(e) => setNewVersion(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tanggal Efektif Revisi *
              </label>
              <input
                type="date"
                required
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Authors */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Penyusun Revisi (Author)
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Disetujui Oleh (Approver)
              </label>
              <input
                type="text"
                value={approvedBy}
                onChange={(e) => setApprovedBy(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Change Summary / Log */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Uraian Perubahan (Change Log) *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Jelaskan pasal atau langkah operasional apa yang diubah, ditambahkan, atau disesuaikan pada edisi revisi ini..."
              value={changeSummary}
              onChange={(e) => setChangeSummary(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Upload New PDF Revision File */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Berkas PDF Baru (Opsional - Jika ada berkas PDF revisi)
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition-all"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-blue-600" />
                <span className="text-xs text-slate-700">
                  {newFile ? (
                    <strong className="text-emerald-700">{newFile.name}</strong>
                  ) : (
                    'Klik untuk memilih berkas PDF edisi revisi'
                  )}
                </span>
              </div>
              {newFile && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setNewFile(null);
                  }}
                  className="text-xs text-rose-600 hover:underline p-1"
                >
                  Hapus
                </button>
              )}
            </div>
          </div>

          {/* Automated Notification Trigger */}
          <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 flex items-start gap-3">
            <Bell className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-blue-900">
                  Kirim Notifikasi Otomatis ke Departemen Terkait
                </span>
                <input
                  type="checkbox"
                  checked={sendNotification}
                  onChange={(e) => setSendNotification(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
              </label>
              <p className="text-[11px] text-blue-700 mt-0.5">
                Pemberitahuan perubahan dokumen dan catatan revisi akan otomatis disiarkan ke pusat
                notifikasi departemen {document.department}.
              </p>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan &amp; Terbitkan Revisi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
