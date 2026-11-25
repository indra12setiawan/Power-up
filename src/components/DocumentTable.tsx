import React, { useState } from 'react';
import { DocumentItem } from '../types/document';
import {
  FileText,
  BookOpen,
  Wrench,
  Download,
  Star,
  Copy,
  Check,
  ExternalLink,
  History,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

interface DocumentTableProps {
  documents: DocumentItem[];
  searchQuery?: string;
  onOpenReader: (doc: DocumentItem) => void;
  onOpenRevision: (doc: DocumentItem) => void;
  onToggleFavorite: (id: string) => void;
  onDownload: (doc: DocumentItem) => void;
}

export const DocumentTable: React.FC<DocumentTableProps> = ({
  documents,
  searchQuery = '',
  onOpenReader,
  onOpenRevision,
  onToggleFavorite,
  onDownload,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, doc: DocumentItem) => {
    e.stopPropagation();
    navigator.clipboard.writeText(doc.code);
    setCopiedId(doc.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getTypeBadge = (type: DocumentItem['type']) => {
    switch (type) {
      case 'REGULASI':
        return {
          bg: 'bg-purple-100 text-purple-800 border-purple-200',
          label: 'Regulasi',
          icon: BookOpen,
        };
      case 'SOP':
        return {
          bg: 'bg-blue-100 text-blue-800 border-blue-200',
          label: 'SOP',
          icon: FileText,
        };
      case 'IK':
        return {
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          label: 'Instruksi Kerja',
          icon: Wrench,
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-800 border-slate-200',
          label: type,
          icon: FileText,
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 pl-4 pr-2 w-10 text-center">Fav</th>
                <th className="py-3.5 px-3">No. Dokumen</th>
                <th className="py-3.5 px-3">Judul Dokumen</th>
                <th className="py-3.5 px-3">Jenis</th>
                <th className="py-3.5 px-3">Departemen</th>
                <th className="py-3.5 px-3">Versi</th>
                <th className="py-3.5 px-3">Tgl. Efektif</th>
                <th className="py-3.5 px-3">Tinjauan Ulang</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 pr-4 pl-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documents.map((doc) => {
                const typeConfig = getTypeBadge(doc.type);
                const TypeIcon = typeConfig.icon;

                return (
                  <tr
                    key={doc.id}
                    onClick={() => onOpenReader(doc)}
                    className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                  >
                    {/* Star favorite */}
                    <td
                      className="py-3.5 pl-4 pr-2 text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(doc.id);
                      }}
                    >
                      <button
                        type="button"
                        className="p-1 rounded text-slate-300 hover:text-amber-500 cursor-pointer"
                        title={doc.isFavorite ? 'Hapus favorit' : 'Bintang favorit'}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            doc.isFavorite ? 'fill-amber-400 text-amber-500' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    </td>

                    {/* Code */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {doc.code}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleCopy(e, doc)}
                          className="text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                          title="Salin No. Dokumen"
                        >
                          {copiedId === doc.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Title */}
                    <td className="py-3.5 px-3 min-w-[240px]">
                      <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {doc.title}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {doc.summary}
                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${typeConfig.bg}`}
                      >
                        <TypeIcon className="w-3 h-3" />
                        <span>{typeConfig.label}</span>
                      </span>
                    </td>

                    {/* Department */}
                    <td className="py-3.5 px-3 whitespace-nowrap text-xs text-slate-700 font-medium">
                      {doc.department}
                    </td>

                    {/* Version */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                        {doc.version}
                      </span>
                    </td>

                    {/* Effective Date */}
                    <td className="py-3.5 px-3 whitespace-nowrap text-xs text-slate-600 font-mono">
                      {doc.effectiveDate}
                    </td>

                    {/* Review Due Date */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`text-xs font-mono font-medium ${
                          doc.status === 'REVIEW_DUE' ? 'text-amber-700 font-bold' : 'text-slate-600'
                        }`}
                      >
                        {doc.reviewDueDate}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      {doc.status === 'AKTIF' && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Aktif
                        </span>
                      )}
                      {doc.status === 'REVIEW_DUE' && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-300 animate-pulse">
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          Perlu Review
                        </span>
                      )}
                      {doc.status === 'DALAM_REVISI' && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          Revisi
                        </span>
                      )}
                      {doc.status === 'USANG' && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                          Arsip
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td
                      className="py-3.5 pr-4 pl-3 text-right whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onOpenRevision(doc)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Ajukan Revisi Versi Baru"
                        >
                          <History className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDownload(doc)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Unduh / Cetak Dokumen"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenReader(doc)}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer ml-1"
                        >
                          <span>Buka</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
