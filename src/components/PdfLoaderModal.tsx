import React, { useState, useRef } from 'react';
import { DocType, Department, DocumentItem, DocSection } from '../types/document';
import {
  UploadCloud,
  FileCheck,
  X,
  AlertCircle,
  Plus,
  Trash2,
  Bell,
  Sparkles,
  CheckCircle2,
  Building2,
  Calendar,
  Layers,
  FileText,
} from 'lucide-react';

interface PdfLoaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDocument: (doc: DocumentItem, notify: boolean, broadcastNote?: string) => void;
}

const ALL_DEPARTMENTS: Department[] = [
  'Operasional & Produksi',
  'K3 & Lingkungan (HSE)',
  'IT & Sistem Informasi',
  'HR & General Affairs',
  'Keuangan & Akuntansi',
  'Quality Assurance & QC',
  'Supply Chain & Logistik',
  'Legal & Kepatuhan',
];

export const PdfLoaderModal: React.FC<PdfLoaderModalProps> = ({
  isOpen,
  onClose,
  onAddDocument,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File state
  const [file, setFile] = useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Form state
  const [docType, setDocType] = useState<DocType>('SOP');
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState<Department>('Operasional & Produksi');
  const [distributionDepts, setDistributionDepts] = useState<Department[]>([
    'Operasional & Produksi',
  ]);
  const [version, setVersion] = useState('v1.0');
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split('T')[0]);
  const [reviewCycleMonths, setReviewCycleMonths] = useState<number>(12);
  const [pic, setPic] = useState('');
  const [approvedBy, setApprovedBy] = useState('');
  const [summary, setSummary] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  // Sections
  const [sections, setSections] = useState<DocSection[]>([
    {
      title: 'Tujuan & Ruang Lingkup',
      content: 'Menetapkan standar pelaksanaan dan batasan operasional yang konsisten.',
    },
    {
      title: 'Langkah Kerja & Prosedur',
      content: 'Tata cara dan instruksi terperinci yang wajib ditaati pelaksana tugas.',
      steps: [
        'Memeriksa kelengkapan administrasi dan perlengkapan kerja sebelum mulai.',
        'Melaksanakan tahapan operasional sesuai spesifikasi teknis baku.',
        'Mencatat dan memverifikasi hasil pada lembar kendali mutu.',
      ],
    },
  ]);

  // Automated notification toggle
  const [sendAutoNotification, setSendAutoNotification] = useState(true);
  const [broadcastNote, setBroadcastNote] = useState('');

  if (!isOpen) return null;

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Smart filename auto-parser
  const autoParseFilename = (filename: string) => {
    const cleanName = filename.replace(/\.pdf$/i, '');

    // Guess document type & code
    let detectedType: DocType = 'SOP';
    let detectedDept: Department = 'Operasional & Produksi';

    if (/^REG/i.test(cleanName) || /regulasi/i.test(cleanName) || /kebijakan/i.test(cleanName)) {
      detectedType = 'REGULASI';
    } else if (/^IK/i.test(cleanName) || /instruksi/i.test(cleanName) || /wi/i.test(cleanName)) {
      detectedType = 'IK';
    } else {
      detectedType = 'SOP';
    }

    // Detect Department from code token
    if (/HSE|K3/i.test(cleanName)) detectedDept = 'K3 & Lingkungan (HSE)';
    else if (/HR|SDM|PERSON/i.test(cleanName)) detectedDept = 'HR & General Affairs';
    else if (/FIN|KEU|ACC/i.test(cleanName)) detectedDept = 'Keuangan & Akuntansi';
    else if (/IT|SYS|CYBER/i.test(cleanName)) detectedDept = 'IT & Sistem Informasi';
    else if (/QA|QC|MUTU/i.test(cleanName)) detectedDept = 'Quality Assurance & QC';
    else if (/LOG|SUPPLY|GUDANG/i.test(cleanName)) detectedDept = 'Supply Chain & Logistik';
    else if (/LEG|HUKUM|COMP/i.test(cleanName)) detectedDept = 'Legal & Kepatuhan';

    // Try extracting code pattern (e.g. SOP-HR-005 or REG-2024-001)
    const codeMatch = cleanName.match(/([A-Z]{2,4}-[A-Z0-9]{2,5}-\d{2,4})/i);
    if (codeMatch) {
      setCode(codeMatch[1].toUpperCase());
    } else {
      const prefix = detectedType === 'REGULASI' ? 'REG' : detectedType === 'IK' ? 'IK' : 'SOP';
      const deptCode =
        detectedDept === 'K3 & Lingkungan (HSE)'
          ? 'HSE'
          : detectedDept === 'HR & General Affairs'
          ? 'HR'
          : detectedDept === 'IT & Sistem Informasi'
          ? 'IT'
          : detectedDept === 'Keuangan & Akuntansi'
          ? 'FIN'
          : detectedDept === 'Quality Assurance & QC'
          ? 'QA'
          : detectedDept === 'Supply Chain & Logistik'
          ? 'LOG'
          : detectedDept === 'Legal & Kepatuhan'
          ? 'LEG'
          : 'PROD';
      setCode(`${prefix}-${deptCode}-${Math.floor(100 + Math.random() * 900)}`);
    }

    // Try extracting version (e.g. v1.0, v2.1)
    const versionMatch = cleanName.match(/(v\d+(\.\d+)?)/i);
    if (versionMatch) {
      setVersion(versionMatch[1].toLowerCase());
    }

    // Clean title from code and version
    let cleanedTitle = cleanName
      .replace(/([A-Z]{2,4}-[A-Z0-9]{2,5}-\d{2,4})/gi, '')
      .replace(/(v\d+(\.\d+)?)/gi, '')
      .replace(/[_-]+/g, ' ')
      .trim();

    if (cleanedTitle.length > 3) {
      // Capitalize words
      cleanedTitle = cleanedTitle
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      setTitle(cleanedTitle);
    } else {
      setTitle(cleanName.replace(/[_-]+/g, ' '));
    }

    setDocType(detectedType);
    setDepartment(detectedDept);
    setDistributionDepts([detectedDept]);
  };

  const processFile = (selectedFile: File) => {
    setFileError(null);
    if (!selectedFile.name.toLowerCase().endsWith('.pdf') && selectedFile.type !== 'application/pdf') {
      setFileError('Format file harus berupa dokumen PDF (.pdf). Silakan pilih file PDF yang valid.');
      return;
    }

    if (selectedFile.size > 25 * 1024 * 1024) {
      setFileError('Ukuran file PDF terlalu besar (maksimal 25 MB).');
      return;
    }

    setFile(selectedFile);
    autoParseFilename(selectedFile.name);

    // Read as Data URL for inline rendering
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileDataUrl(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Section handling
  const handleAddSection = () => {
    setSections([...sections, { title: 'Pasal / Bagian Tambahan', content: '', steps: [] }]);
  };

  const handleRemoveSection = (idx: number) => {
    setSections(sections.filter((_, i) => i !== idx));
  };

  const handleSectionChange = (idx: number, field: keyof DocSection, value: any) => {
    const updated = [...sections];
    updated[idx] = { ...updated[idx], [field]: value };
    setSections(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Mohon isi Judul Dokumen.');
      return;
    }
    if (!code.trim()) {
      alert('Mohon isi Nomor/Kode Dokumen.');
      return;
    }

    // Calculate review due date
    const effDate = new Date(effectiveDate);
    const dueDate = new Date(effDate);
    dueDate.setMonth(dueDate.getMonth() + Number(reviewCycleMonths));
    const reviewDueDateStr = dueDate.toISOString().split('T')[0];

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      code: code.trim().toUpperCase(),
      title: title.trim(),
      type: docType,
      department: department,
      version: version.trim() || 'v1.0',
      effectiveDate: effectiveDate,
      reviewDueDate: reviewDueDateStr,
      status: 'AKTIF',
      pic: pic.trim() || 'Tim Document Control',
      approvedBy: approvedBy.trim() || 'Direktur Terkait',
      summary:
        summary.trim() ||
        `Dokumen resmi ${docType} untuk departemen ${department} yang mengatur prosedur operasional baku.`,
      tags: tags.length > 0 ? tags : [docType, department, 'Sistem Manajemen Mutu'],
      sections: sections.filter((s) => s.title.trim().length > 0),
      versionHistory: [
        {
          version: version.trim() || 'v1.0',
          releaseDate: effectiveDate,
          author: pic.trim() || 'Document Controller',
          approvedBy: approvedBy.trim() || 'Direktur Terkait',
          changeSummary:
            broadcastNote.trim() || 'Penerbitan dokumen baru melalui Data Loader POWER-Up.',
          fileName: file?.name || `${code.trim().toUpperCase()}_${version.trim() || 'v1.0'}.pdf`,
          fileSize: file ? formatFileSize(file.size) : '1.5 MB',
        },
      ],
      distributionDepartments: distributionDepts,
      file: {
        name: file?.name || `${code.trim().toUpperCase()}.pdf`,
        sizeFormatted: file ? formatFileSize(file.size) : '1.5 MB',
        sizeBytes: file ? file.size : 1572864,
        url: fileDataUrl || undefined,
        isSamplePdf: !file,
        mimeType: 'application/pdf',
        uploadedAt: new Date().toISOString(),
      },
      isFavorite: false,
      viewCount: 1,
      downloadCount: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    onAddDocument(newDoc, sendAutoNotification, broadcastNote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Data Loader &amp; Input Dokumen PDF
              </h2>
              <p className="text-xs text-slate-500">
                Unggah berkas PDF Regulasi, SOP, atau Instruksi Kerja dengan integrasi notifikasi otomatis
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

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* File Upload Drop Area */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              1. Pilih / Seret Berkas PDF
            </label>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/70 scale-[0.99]'
                  : file
                  ? 'border-emerald-400 bg-emerald-50/40'
                  : 'border-slate-300 hover:border-blue-400 bg-slate-50/60 hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />

              {file ? (
                <div className="flex items-center justify-between max-w-lg mx-auto bg-white p-3 rounded-xl border border-emerald-200 shadow-xs">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 truncate max-w-xs sm:max-w-md">
                        {file.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {formatFileSize(file.size)} • PDF Valid
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      setFileDataUrl(null);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-semibold text-slate-800">
                    Klik untuk memilih berkas PDF atau seret file ke area ini
                  </div>
                  <p className="text-xs text-slate-500">
                    Mendukung berkas format .PDF resmi (hingga 25 MB). Sistem akan membaca nama file
                    dan mengisikan nomor dokumen serta judul secara otomatis.
                  </p>
                </div>
              )}
            </div>

            {fileError && (
              <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{fileError}</span>
              </div>
            )}
          </div>

          {/* Form Fields: Category, Code, Title */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Metadata Dokumen &amp; Klasifikasi
              </label>
              {file && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  <Sparkles className="w-3 h-3" />
                  Diisi otomatis dari nama file
                </span>
              )}
            </div>

            {/* Type selector */}
            <div className="grid grid-cols-3 gap-2.5">
              {(
                [
                  { id: 'REGULASI', label: 'Regulasi / Kebijakan', desc: 'UU, Kepdir, Standar Kepatuhan' },
                  { id: 'SOP', label: 'Standar Operasional (SOP)', desc: 'Alur kerja multi-langkah' },
                  { id: 'IK', label: 'Instruksi Kerja (IK)', desc: 'Petunjuk teknis per mesin/alat' },
                ] as const
              ).map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setDocType(t.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    docType === t.id
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/60'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900">{t.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{t.desc}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Document Code */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor / Kode Dokumen *
                </label>
                <input
                  type="text"
                  required
                  placeholder="mis: SOP-HR-008"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Version */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Versi Edisi / Revisi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="v1.0"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Departemen Pemilik Dokumen *
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value as Department)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                >
                  {ALL_DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Document Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Judul Lengkap Dokumen *
              </label>
              <input
                type="text"
                required
                placeholder="mis: Standar Operasional Prosedur Pengelolaan Limbah B3 Padat"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Dates & Approval */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tanggal Efektif
                </label>
                <input
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Siklus Tinjauan
                </label>
                <select
                  value={reviewCycleMonths}
                  onChange={(e) => setReviewCycleMonths(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                >
                  <option value={6}>6 Bulan Sekali</option>
                  <option value={12}>1 Tahun (Tahunan)</option>
                  <option value={24}>2 Tahun</option>
                  <option value={36}>3 Tahun</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Penyusun (PIC)
                </label>
                <input
                  type="text"
                  placeholder="mis: Budi Santoso, ST"
                  value={pic}
                  onChange={(e) => setPic(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Disahkan Oleh
                </label>
                <input
                  type="text"
                  placeholder="mis: Direktur Operasional"
                  value={approvedBy}
                  onChange={(e) => setApprovedBy(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ringkasan Eksekutif &amp; Ruang Lingkup Dokumen
              </label>
              <textarea
                rows={2}
                placeholder="Jelaskan secara ringkas maksud, tujuan, dan pihak-pihak yang terdampak oleh dokumen ini..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kata Kunci / Tag (pisahkan dengan koma)
              </label>
              <input
                type="text"
                placeholder="mis: ISO 9001, Kalibrasi, APAR, Pengadaan"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Section details builder */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                3. Bagian &amp; Langkah Kerja Prosedur
              </label>
              <button
                type="button"
                onClick={handleAddSection}
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Bagian</span>
              </button>
            </div>

            {sections.map((sec, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 relative"
              >
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={sec.title}
                    onChange={(e) => handleSectionChange(idx, 'title', e.target.value)}
                    placeholder="Judul Bagian / Pasal"
                    className="font-bold text-xs text-slate-800 bg-white border border-slate-200 rounded-lg px-2.5 py-1 flex-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSection(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <textarea
                  rows={2}
                  value={sec.content}
                  onChange={(e) => handleSectionChange(idx, 'content', e.target.value)}
                  placeholder="Uraian isi pasal / instruksi..."
                  className="w-full text-xs text-slate-700 bg-white border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          {/* Automated Notification Integration Box */}
          <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-200/80 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                    Sistem Notifikasi Pembaruan Dokumen Otomatis
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sendAutoNotification}
                      onChange={(e) => setSendAutoNotification(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-xs text-blue-800 mt-1">
                  Saat diaktifkan, sistem akan otomatis mengirimkan notifikasi ke pusat pemberitahuan
                  POWER-Up dan menyiarkan rilis dokumen ini kepada seluruh personil di departemen{' '}
                  <strong className="underline">{department}</strong>.
                </p>
              </div>
            </div>

            {sendAutoNotification && (
              <div className="pl-11">
                <label className="block text-[11px] font-semibold text-blue-900 mb-1">
                  Catatan Rilis / Pengumuman Sosialisasi (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="mis: Dokumen ini telah disetujui untuk implementasi segera di seluruh lini kerja."
                  value={broadcastNote}
                  onChange={(e) => setBroadcastNote(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* Modal Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan &amp; Terbitkan Dokumen</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
