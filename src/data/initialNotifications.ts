import { NotificationItem } from '../types/notification';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-001',
    type: 'REVIEW_DUE',
    title: 'Peringatan Jatuh Tempo Tinjauan SOP',
    message:
      'Dokumen SOP-IT-011 (Penanganan & Eskalasi Insiden Keamanan Siber) mendekati batas waktu peninjauan tahunan.',
    docId: 'doc-sop-002',
    docCode: 'SOP-IT-011',
    docTitle: 'Standar Operasional Penanganan & Eskalasi Insiden Keamanan Siber (CSIRP)',
    version: 'v3.0',
    department: 'IT & Sistem Informasi',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    isRead: false,
    priority: 'urgent',
  },
  {
    id: 'notif-002',
    type: 'DOC_REVISED',
    title: 'Pembaruan Dokumen: IK-PROD-014 v2.1 Diterbitkan',
    message:
      'Instruksi Kerja Pengoperasian dan Kalibrasi Mesin CNC Milling telah diperbarui ke versi v2.1 oleh Rudi Hartono (Machining Leader).',
    docId: 'doc-ik-001',
    docCode: 'IK-PROD-014',
    docTitle: 'Instruksi Kerja Pengoperasian dan Kalibrasi Mesin CNC Milling 5-Axis',
    version: 'v2.1',
    department: 'Operasional & Produksi',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    isRead: false,
    priority: 'info',
  },
  {
    id: 'notif-003',
    type: 'DOC_NEW',
    title: 'Dokumen Regulasi Baru: REG-LEG-2024-004',
    message:
      'Kebijakan Kepatuhan Perlindungan Data Pribadi (UU PDP & GDPR Compliance) telah disahkan oleh Direksi dan berlaku efektif per 01 Mei 2024.',
    docId: 'doc-reg-002',
    docCode: 'REG-LEG-2024-004',
    docTitle: 'Kebijakan Kepatuhan Perlindungan Data Pribadi (UU PDP & GDPR Compliance)',
    version: 'v1.1',
    department: 'Legal & Kepatuhan',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    isRead: true,
    priority: 'info',
  },
  {
    id: 'notif-004',
    type: 'REVIEW_DUE',
    title: 'Jadwal Review Tahunan: SOP-LOG-003',
    message:
      'Dokumen SOP-LOG-003 (Penerimaan Barang Masuk & Verifikasi Surat Jalan) jatuh tempo untuk evaluasi berkala.',
    docId: 'doc-sop-005',
    docCode: 'SOP-LOG-003',
    docTitle: 'Standar Operasional Penerimaan Barang Masuk & Verifikasi Surat Jalan',
    version: 'v1.0',
    department: 'Supply Chain & Logistik',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    isRead: true,
    priority: 'warning',
  },
];
