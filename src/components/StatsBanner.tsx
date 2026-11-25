import React from 'react';
import { DocType } from '../types/document';
import { FileText, BookOpen, Wrench, AlertTriangle, ShieldCheck } from 'lucide-react';

interface StatsBannerProps {
  totalDocs: number;
  regulasiCount: number;
  sopCount: number;
  ikCount: number;
  reviewDueCount: number;
  activeType: 'ALL' | DocType;
  onFilterByType: (type: 'ALL' | DocType) => void;
  onFilterReviewDue: () => void;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({
  totalDocs,
  regulasiCount,
  sopCount,
  ikCount,
  reviewDueCount,
  activeType,
  onFilterByType,
  onFilterReviewDue,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-2">
      {/* Total Dokumen */}
      <button
        onClick={() => onFilterByType('ALL')}
        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
          activeType === 'ALL'
            ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20'
            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between text-slate-500 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Total Dokumen
          </span>
          <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-slate-900">{totalDocs}</div>
        <div className="text-[11px] text-slate-500 mt-0.5">Semua jenis dokumen</div>
      </button>

      {/* Regulasi */}
      <button
        onClick={() => onFilterByType('REGULASI')}
        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
          activeType === 'REGULASI'
            ? 'bg-purple-50/70 border-purple-300 ring-2 ring-purple-500/20'
            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between text-slate-500 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-700">
            Regulasi
          </span>
          <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-slate-900">{regulasiCount}</div>
        <div className="text-[11px] text-slate-500 mt-0.5">Kebijakan & Norma Hukum</div>
      </button>

      {/* SOP */}
      <button
        onClick={() => onFilterByType('SOP')}
        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
          activeType === 'SOP'
            ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20'
            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between text-slate-500 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">SOP</span>
          <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-slate-900">{sopCount}</div>
        <div className="text-[11px] text-slate-500 mt-0.5">Standar Operasional</div>
      </button>

      {/* Instruksi Kerja (IK) */}
      <button
        onClick={() => onFilterByType('IK')}
        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
          activeType === 'IK'
            ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/20'
            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between text-slate-500 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Instruksi Kerja (IK)
          </span>
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Wrench className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-slate-900">{ikCount}</div>
        <div className="text-[11px] text-slate-500 mt-0.5">Langkah Teknis Kerja</div>
      </button>

      {/* Butuh Review / Expiry Alert */}
      <button
        onClick={onFilterReviewDue}
        className="col-span-2 md:col-span-1 text-left p-3.5 rounded-xl border bg-amber-50/60 border-amber-200 hover:border-amber-300 hover:bg-amber-50 transition-all cursor-pointer"
      >
        <div className="flex items-center justify-between text-amber-700 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider">Perlu Tinjauan</span>
          <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold text-amber-900 flex items-center gap-2">
          <span>{reviewDueCount}</span>
          {reviewDueCount > 0 && (
            <span className="text-xs font-medium bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full">
              Jatuh Tempo
            </span>
          )}
        </div>
        <div className="text-[11px] text-amber-700/90 mt-0.5">Evaluasi siklus tahunan</div>
      </button>
    </div>
  );
};
