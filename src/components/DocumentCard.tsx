import React, { useState } from 'react';
import { DocumentItem } from '../types/document';
import {
  FileText,
  BookOpen,
  Wrench,
  Download,
  Calendar,
  Clock,
  Star,
  Copy,
  Check,
  Building2,
  FileSpreadsheet,
  FileCheck,
  AlertCircle,
  ExternalLink,
  History,
} from 'lucide-react';

interface DocumentCardProps {
  document: DocumentItem;
  searchQuery?: string;
  onOpenReader: (doc: DocumentItem) => void;
  onOpenRevision: (doc: DocumentItem) => void;
  onToggleFavorite: (id: string) => void;
  onDownload: (doc: DocumentItem) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  searchQuery = '',
  onOpenReader,
  onOpenRevision,
  onToggleFavorite,
  onDownload,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(document.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Type styling
  const getTypeBadge = () => {
    switch (document.type) {
      case 'REGULASI':
        return {
          bg: 'bg-purple-100/90 text-purple-800 border-purple-200',
          icon: BookOpen,
          label: 'Regulasi',
        };
      case 'SOP':
        return {
          bg: 'bg-blue-100/90 text-blue-800 border-blue-200',
          icon: FileText,
          label: 'SOP',
        };
      case 'IK':
        return {
          bg: 'bg-emerald-100/90 text-emerald-800 border-emerald-200',
          icon: Wrench,
          label: 'Instruksi Kerja',
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-800 border-slate-200',
          icon: FileSpreadsheet,
          label: document.type,
        };
    }
  };

  const typeConfig = getTypeBadge();
  const TypeIcon = typeConfig.icon;

  // Status indicator
  const getStatusBadge = () => {
    switch (document.status) {
      case 'AKTIF':
        return {
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
          text: 'Aktif Berlaku',
        };
      case 'REVIEW_DUE':
        return {
          badge: 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse',
          dot: 'bg-amber-500',
          text: 'Butuh Tinjauan',
        };
      case 'DALAM_REVISI':
        return {
          badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          dot: 'bg-indigo-500',
          text: 'Dalam Proses Revisi',
        };
      default:
        return {
          badge: 'bg-slate-100 text-slate-600 border-slate-200',
          dot: 'bg-slate-400',
          text: 'Usang / Arsip',
        };
    }
  };

  const statusConfig = getStatusBadge();

  // Highlight matching search query
  const highlightMatch = (text: string) => {
    if (!searchQuery.trim()) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 text-slate-900 rounded-xs px-0.5 font-medium">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div
      onClick={() => onOpenReader(document)}
      className="group relative bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Top Accent Strip */}
      <div
        className={`h-1.5 w-full ${
          document.type === 'REGULASI'
            ? 'bg-purple-600'
            : document.type === 'SOP'
            ? 'bg-blue-600'
            : 'bg-emerald-600'
        }`}
      />

      <div className="p-5 flex-1 flex flex-col">
        {/* Row 1: Badges & Favorite */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Type Badge */}
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${typeConfig.bg}`}
            >
              <TypeIcon className="w-3 h-3" />
              <span>{typeConfig.label}</span>
            </span>

            {/* Version */}
            <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
              {document.version}
            </span>

            {/* Status */}
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border ${statusConfig.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
              <span>{statusConfig.text}</span>
            </span>
          </div>

          {/* Favorite Star Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(document.id);
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-100 transition-colors cursor-pointer"
            title={document.isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          >
            <Star
              className={`w-4 h-4 ${
                document.isFavorite ? 'fill-amber-400 text-amber-500' : 'text-slate-400'
              }`}
            />
          </button>
        </div>

        {/* Row 2: Document Code + Copy */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50/80 px-2 py-0.5 rounded border border-blue-200">
            {highlightMatch(document.code)}
          </span>
          <button
            type="button"
            onClick={handleCopyCode}
            className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer"
            title="Salin No. Dokumen"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          {copied && <span className="text-[10px] text-emerald-600 font-medium">Tersalin!</span>}
        </div>

        {/* Row 3: Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
          {highlightMatch(document.title)}
        </h3>

        {/* Row 4: Summary */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 flex-1">
          {highlightMatch(document.summary)}
        </p>

        {/* Metadata info: Department & Dates */}
        <div className="space-y-1.5 py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 mb-3.5">
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium text-slate-700 truncate">{document.department}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
            <div className="flex items-center gap-1" title="Tanggal Berlaku">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>Efektif: {document.effectiveDate}</span>
            </div>
            <div
              className={`flex items-center gap-1 font-medium ${
                document.status === 'REVIEW_DUE' ? 'text-amber-700' : 'text-slate-500'
              }`}
              title="Jadwal Tinjauan Berikutnya"
            >
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Review: {document.reviewDueDate}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {document.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap mb-4">
            {document.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
            {document.tags.length > 3 && (
              <span className="text-[10px] text-slate-400">+{document.tags.length - 3} lainnya</span>
            )}
          </div>
        )}
      </div>

      {/* Footer Card Actions */}
      <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
        {/* PDF File Info */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate">
          <FileCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="truncate max-w-[120px] font-medium text-slate-700 text-[11px]">
            {document.file?.name || `${document.code}.pdf`}
          </span>
          <span className="text-[10px] text-slate-400">({document.file?.sizeFormatted || '1.5 MB'})</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenRevision(document);
            }}
            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all cursor-pointer"
            title="Ajukan Pembaruan Revisi Dokumen"
          >
            <History className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDownload(document);
            }}
            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all cursor-pointer"
            title="Unduh / Cetak Dokumen"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenReader(document);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <span>Buka PDF</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
