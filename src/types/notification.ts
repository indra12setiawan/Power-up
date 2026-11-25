export type NotificationType =
  | 'DOC_NEW' // Dokumen Baru Diterbitkan
  | 'DOC_REVISED' // Pembaruan Revisi Dokumen
  | 'REVIEW_DUE' // Peringatan Jatuh Tempo Review
  | 'STATUS_CHANGED' // Perubahan Status Dokumen
  | 'BROADCAST'; // Pengumuman Kebijakan

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  docId?: string;
  docCode?: string;
  docTitle?: string;
  version?: string;
  department: string;
  createdAt: string; // ISO string
  isRead: boolean;
  priority: 'info' | 'warning' | 'urgent';
  actionUrl?: string;
}

export interface NotificationSettings {
  soundEnabled: boolean;
  autoReviewAlertDays: number; // e.g., 30 days before reviewDueDate
  departmentFilter: string; // 'ALL' or specific dept
  emailSimulation: boolean;
}
