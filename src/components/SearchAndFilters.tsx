import React from 'react';
import { DocType, DocStatus, ViewMode } from '../types/document';
import {
  Search,
  X,
  LayoutGrid,
  List,
  Star,
  SlidersHorizontal,
  RotateCcw,
} from 'lucide-react';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeDocType: 'ALL' | DocType;
  onDocTypeChange: (type: 'ALL' | DocType) => void;
  activeStatus: 'ALL' | DocStatus;
  onStatusChange: (status: 'ALL' | DocStatus) => void;
  sortBy: 'latest' | 'popular' | 'code' | 'title' | 'reviewDue';
  onSortChange: (sort: 'latest' | 'popular' | 'code' | 'title' | 'reviewDue') => void;
  favoriteOnly: boolean;
  onToggleFavoriteOnly: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalFiltered: number;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

const QUICK_TAGS = [
  'ISO 9001',
  'K3LL',
  'Keamanan Siber',
  'UU PDP',
  'Rekrutmen',
  'Petty Cash',
  'APAR',
  'CNC Milling',
];

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  activeDocType,
  onDocTypeChange,
  activeStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  favoriteOnly,
  onToggleFavoriteOnly,
  viewMode,
  onViewModeChange,
  totalFiltered,
  onResetFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-3.5">
        {/* Top Row: Search Input + Action Toggles */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          {/* Main Instant Search Bar */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari cepat nomor dokumen (mis: SOP-HR-002), judul, tag, atau isi langkah kerja..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                title="Hapus pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Controls: Sort, Status, Favorite & View Mode */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <select
              value={activeStatus}
              onChange={(e) => onStatusChange(e.target.value as 'ALL' | DocStatus)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100/70 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
            >
              <option value="ALL">Semua Status</option>
              <option value="AKTIF">Status: Aktif</option>
              <option value="REVIEW_DUE">Status: Butuh Review</option>
              <option value="DALAM_REVISI">Status: Dalam Revisi</option>
              <option value="USANG">Status: Usang / Archived</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100/70 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
            >
              <option value="latest">Urutkan: Paling Baru</option>
              <option value="popular">Urutkan: Paling Populer</option>
              <option value="code">Urutkan: Kode Dokumen (A-Z)</option>
              <option value="title">Urutkan: Judul (A-Z)</option>
              <option value="reviewDue">Urutkan: Jatuh Tempo Tinjauan</option>
            </select>

            {/* Favorite Filter Button */}
            <button
              onClick={onToggleFavoriteOnly}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                favoriteOnly
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70'
              }`}
              title="Tampilkan hanya dokumen favorit"
            >
              <Star
                className={`w-3.5 h-3.5 ${
                  favoriteOnly ? 'fill-amber-400 text-amber-500' : 'text-slate-400'
                }`}
              />
              <span className="hidden sm:inline">Favorit</span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white shadow-xs text-blue-600 font-semibold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Tampilan Kartu (Grid)"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('table')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white shadow-xs text-blue-600 font-semibold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Tampilan Tabel Master"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Second Row: Doc Type Segmented Tabs + Quick Tag Chips + Counter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1 border-t border-slate-100">
          {/* Document Type Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <span className="text-xs font-semibold text-slate-500 mr-1.5 hidden sm:inline">
              Jenis:
            </span>
            {(
              [
                { id: 'ALL', label: 'Semua Jenis' },
                { id: 'REGULASI', label: 'Regulasi' },
                { id: 'SOP', label: 'SOP' },
                { id: 'IK', label: 'Instruksi Kerja (IK)' },
              ] as const
            ).map((item) => {
              const active = activeDocType === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onDocTypeChange(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Quick Tags / Keywords */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-400 font-medium hidden md:inline">
              Kata Kunci:
            </span>
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  if (searchQuery === tag) {
                    onSearchChange('');
                  } else {
                    onSearchChange(tag);
                  }
                }}
                className={`text-[11px] px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                  searchQuery.toLowerCase().includes(tag.toLowerCase())
                    ? 'bg-blue-50 border-blue-300 text-blue-700 font-medium'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                #{tag}
              </button>
            ))}

            {/* Reset Filters button if any filter is active */}
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1 text-[11px] text-rose-600 hover:text-rose-700 font-medium px-2 py-0.5 rounded hover:bg-rose-50 transition-colors ml-1 cursor-pointer"
                title="Reset semua filter"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Summary Results */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <div>
            Menampilkan <span className="font-bold text-slate-900">{totalFiltered}</span> dokumen
            yang sesuai
          </div>
          {searchQuery && (
            <div className="text-slate-500">
              Hasil untuk pencarian: <span className="font-semibold text-blue-600">"{searchQuery}"</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
