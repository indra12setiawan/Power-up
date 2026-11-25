export type DocType = 'REGULASI' | 'SOP' | 'IK' | 'FORMULIR';

export type DocStatus = 'AKTIF' | 'DALAM_REVISI' | 'USANG' | 'REVIEW_DUE';

export type Department =
  | 'Semua Departemen'
  | 'HR & General Affairs'
  | 'Keuangan & Akuntansi'
  | 'IT & Sistem Informasi'
  | 'Operasional & Produksi'
  | 'K3 & Lingkungan (HSE)'
  | 'Quality Assurance & QC'
  | 'Supply Chain & Logistik'
  | 'Legal & Kepatuhan';

export interface DocSection {
  title: string;
  content: string;
  steps?: string[];
}

export interface VersionHistoryItem {
  version: string;
  releaseDate: string;
  author: string;
  approvedBy: string;
  changeSummary: string;
  fileSize?: string;
  fileName?: string;
}

export interface DocumentItem {
  id: string;
  code: string; // e.g. SOP-HR-001, REG-HSE-003, IK-PROD-012
  title: string;
  type: DocType;
  department: Department;
  version: string;
  effectiveDate: string; // YYYY-MM-DD
  reviewDueDate: string; // YYYY-MM-DD
  status: DocStatus;
  pic: string; // Penanggung Jawab
  approvedBy: string; // Pejabat yang mengesahkan (misal Direktur Operasional)
  summary: string;
  tags: string[];
  sections: DocSection[];
  versionHistory: VersionHistoryItem[];
  distributionDepartments: Department[];
  file?: {
    name: string;
    sizeFormatted: string;
    sizeBytes: number;
    url?: string; // Data URL or object URL
    isSamplePdf?: boolean;
    mimeType: string;
    uploadedAt: string;
  };
  isFavorite?: boolean;
  viewCount: number;
  downloadCount: number;
  lastUpdated: string;
}

export type ViewMode = 'grid' | 'table';

export interface FilterState {
  searchQuery: string;
  docType: 'ALL' | DocType;
  department: Department;
  status: 'ALL' | DocStatus;
  sortBy: 'latest' | 'popular' | 'code' | 'title' | 'reviewDue';
  favoriteOnly: boolean;
}
