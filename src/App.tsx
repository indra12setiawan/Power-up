/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  DocumentItem,
  Department,
  DocType,
  DocStatus,
  ViewMode,
} from './types/document';
import { NotificationItem } from './types/notification';
import {
  getStoredDocuments,
  saveStoredDocuments,
  getStoredNotifications,
  saveStoredNotifications,
  resetToDefaultData,
} from './utils/storage';
import { downloadMockPdf, printDocument } from './utils/pdfGenerator';

import { Navbar } from './components/Navbar';
import { StatsBanner } from './components/StatsBanner';
import { DepartmentFilter } from './components/DepartmentFilter';
import { SearchAndFilters } from './components/SearchAndFilters';
import { DocumentCard } from './components/DocumentCard';
import { DocumentTable } from './components/DocumentTable';
import { PdfLoaderModal } from './components/PdfLoaderModal';
import { DocumentReaderModal } from './components/DocumentReaderModal';
import { RevisionModal } from './components/RevisionModal';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { MasterListModal } from './components/MasterListModal';
import { LoginModal } from './components/LoginModal';
import { AuthUser, UserRole, PRESET_USERS } from './types/auth';

import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Bell,
  Search,
  Sparkles,
  Info,
} from 'lucide-react';

export default function App() {
  // Main data states
  const [documents, setDocuments] = useState<DocumentItem[]>(() => getStoredDocuments());
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    getStoredNotifications()
  );

  // Active filters
  const [selectedDept, setSelectedDept] = useState<Department>('Semua Departemen');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDocType, setActiveDocType] = useState<'ALL' | DocType>('ALL');
  const [activeStatus, setActiveStatus] = useState<'ALL' | DocStatus>('ALL');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'code' | 'title' | 'reviewDue'>('latest');
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // User Authentication State (Default as USER to showcase the Administrator password login)
  const [currentUser, setCurrentUser] = useState<AuthUser>(() => {
    try {
      const saved = localStorage.getItem('powerup_auth_user_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return PRESET_USERS.USER;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginInitialRole, setLoginInitialRole] = useState<UserRole>('ADMIN');
  const [loginRequiredAction, setLoginRequiredAction] = useState<string | undefined>(undefined);

  // Sync auth user to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('powerup_auth_user_v1', JSON.stringify(currentUser));
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const handleOpenLoginModal = (role: UserRole = 'ADMIN', requiredForAction?: string) => {
    setLoginInitialRole(role);
    setLoginRequiredAction(requiredForAction);
    setIsLoginModalOpen(true);
  };

  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
    showToast(
      `Masuk sebagai ${user.role === 'ADMIN' ? 'Administrator' : 'User (Viewer)'}`,
      user.role === 'ADMIN'
        ? 'Hak akses Administrator terverifikasi. Anda dapat mengunggah dan merevisi dokumen.'
        : 'Masuk sebagai User (Staf). Akses membaca dan mengunduh seluruh dokumen aktif.'
    );
  };

  const handleTriggerRevision = (doc: DocumentItem) => {
    if (currentUser.role === 'ADMIN') {
      setRevisionDoc(doc);
    } else {
      handleOpenLoginModal('ADMIN', `Revisi Dokumen ${doc.code}`);
    }
  };

  // Modal states
  const [isPdfLoaderOpen, setIsPdfLoaderOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [isMasterListOpen, setIsMasterListOpen] = useState(false);
  const [readerDoc, setReaderDoc] = useState<DocumentItem | null>(null);
  const [revisionDoc, setRevisionDoc] = useState<DocumentItem | null>(null);
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    description: string;
    type?: 'success' | 'info';
  } | null>(null);

  const showToast = (title: string, description: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ title, description, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Sync to localStorage
  useEffect(() => {
    saveStoredDocuments(documents);
  }, [documents]);

  useEffect(() => {
    saveStoredNotifications(notifications);
  }, [notifications]);

  // Unread notification count
  const unreadNotifCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  // Department counts
  const deptCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'Semua Departemen': documents.length,
    };
    documents.forEach((d) => {
      counts[d.department] = (counts[d.department] || 0) + 1;
    });
    return counts as Record<Department, number>;
  }, [documents]);

  // Filtered and Sorted Documents
  const filteredDocuments = useMemo(() => {
    return documents
      .filter((doc) => {
        // Department filter
        if (selectedDept !== 'Semua Departemen' && doc.department !== selectedDept) {
          return false;
        }

        // Type filter
        if (activeDocType !== 'ALL' && doc.type !== activeDocType) {
          return false;
        }

        // Status filter
        if (activeStatus !== 'ALL' && doc.status !== activeStatus) {
          return false;
        }

        // Favorite filter
        if (favoriteOnly && !doc.isFavorite) {
          return false;
        }

        // Search query across code, title, summary, tags, pic, section content
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchCode = doc.code.toLowerCase().includes(q);
          const matchTitle = doc.title.toLowerCase().includes(q);
          const matchSummary = doc.summary.toLowerCase().includes(q);
          const matchPic = doc.pic.toLowerCase().includes(q);
          const matchTags = doc.tags.some((t) => t.toLowerCase().includes(q));
          const matchSections = doc.sections.some(
            (s) =>
              s.title.toLowerCase().includes(q) ||
              s.content.toLowerCase().includes(q) ||
              s.steps?.some((step) => step.toLowerCase().includes(q))
          );

          if (!matchCode && !matchTitle && !matchSummary && !matchPic && !matchTags && !matchSections) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'latest') {
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        }
        if (sortBy === 'popular') {
          return b.viewCount - a.viewCount;
        }
        if (sortBy === 'code') {
          return a.code.localeCompare(b.code);
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'reviewDue') {
          return new Date(a.reviewDueDate).getTime() - new Date(b.reviewDueDate).getTime();
        }
        return 0;
      });
  }, [documents, selectedDept, activeDocType, activeStatus, favoriteOnly, searchQuery, sortBy]);

  // Statistics counts
  const stats = useMemo(() => {
    return {
      total: documents.length,
      regulasi: documents.filter((d) => d.type === 'REGULASI').length,
      sop: documents.filter((d) => d.type === 'SOP').length,
      ik: documents.filter((d) => d.type === 'IK').length,
      reviewDue: documents.filter((d) => d.status === 'REVIEW_DUE').length,
    };
  }, [documents]);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedDept !== 'Semua Departemen' ||
    activeDocType !== 'ALL' ||
    activeStatus !== 'ALL' ||
    favoriteOnly;

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDept('Semua Departemen');
    setActiveDocType('ALL');
    setActiveStatus('ALL');
    setFavoriteOnly(false);
  };

  // Toggle favorite
  const handleToggleFavorite = (docId: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, isFavorite: !d.isFavorite } : d))
    );
  };

  // Add new document via PDF Loader
  const handleAddDocument = (
    newDoc: DocumentItem,
    notify: boolean,
    broadcastNote?: string
  ) => {
    setDocuments((prev) => [newDoc, ...prev]);

    // Automated Notification Integration
    if (notify) {
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        type: 'DOC_NEW',
        title: `Dokumen Baru Diterbitkan: ${newDoc.code}`,
        message:
          broadcastNote ||
          `${newDoc.title} (${newDoc.version}) telah diterbitkan untuk departemen ${newDoc.department}.`,
        docId: newDoc.id,
        docCode: newDoc.code,
        docTitle: newDoc.title,
        version: newDoc.version,
        department: newDoc.department,
        createdAt: new Date().toISOString(),
        isRead: false,
        priority: 'info',
      };
      setNotifications((prev) => [newNotif, ...prev]);

      showToast(
        'Notifikasi Otomatis Terkirim!',
        `Pemberitahuan penerbitan ${newDoc.code} telah disiarkan ke departemen ${newDoc.department}.`
      );
    } else {
      showToast('Dokumen Berhasil Diterbitkan', `${newDoc.code} tersimpan dalam sistem.`);
    }
  };

  // Submit revision
  const handleSubmitRevision = (
    docId: string,
    newVersion: string,
    changeSummary: string,
    author: string,
    approvedBy: string,
    effectiveDate: string,
    newFile?: File,
    sendNotification: boolean = true
  ) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id !== docId) return doc;

        const newHistoryItem = {
          version: newVersion,
          releaseDate: effectiveDate,
          author: author || doc.pic,
          approvedBy: approvedBy || doc.approvedBy,
          changeSummary: changeSummary,
          fileName: newFile?.name || `${doc.code}_${newVersion}.pdf`,
          fileSize: newFile ? `${(newFile.size / 1024 / 1024).toFixed(1)} MB` : doc.file?.sizeFormatted,
        };

        return {
          ...doc,
          version: newVersion,
          effectiveDate: effectiveDate,
          pic: author || doc.pic,
          approvedBy: approvedBy || doc.approvedBy,
          status: 'AKTIF',
          lastUpdated: effectiveDate,
          versionHistory: [newHistoryItem, ...doc.versionHistory],
          file: newFile
            ? {
                name: newFile.name,
                sizeFormatted: `${(newFile.size / 1024 / 1024).toFixed(1)} MB`,
                sizeBytes: newFile.size,
                url: URL.createObjectURL(newFile),
                isSamplePdf: false,
                mimeType: 'application/pdf',
                uploadedAt: new Date().toISOString(),
              }
            : doc.file,
        };
      })
    );

    const targetDoc = documents.find((d) => d.id === docId);

    // Automated Notification for Revision
    if (sendNotification && targetDoc) {
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        type: 'DOC_REVISED',
        title: `Pembaruan Revisi: ${targetDoc.code} (${newVersion})`,
        message: `${targetDoc.title} telah diperbarui ke edisi ${newVersion}. Ringkasan: "${changeSummary}"`,
        docId: targetDoc.id,
        docCode: targetDoc.code,
        docTitle: targetDoc.title,
        version: newVersion,
        department: targetDoc.department,
        createdAt: new Date().toISOString(),
        isRead: false,
        priority: 'info',
      };
      setNotifications((prev) => [newNotif, ...prev]);

      showToast(
        'Revisi Berhasil Diterbitkan!',
        `Notifikasi pembaruan ${targetDoc.code} (${newVersion}) disiarkan ke departemen terkait.`
      );
    }
  };

  // Open Document Reader and increment view counter
  const handleOpenReader = (doc: DocumentItem) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === doc.id ? { ...d, viewCount: d.viewCount + 1 } : d))
    );
    setReaderDoc(doc);
  };

  // Download document and increment download counter
  const handleDownload = (doc: DocumentItem) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === doc.id ? { ...d, downloadCount: d.downloadCount + 1 } : d))
    );
    downloadMockPdf(doc);
  };

  // Notification actions
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleClearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleSelectDocumentFromNotif = (docId: string) => {
    const doc = documents.find((d) => d.id === docId);
    if (doc) {
      handleOpenReader(doc);
    }
  };

  // Test simulation helper
  const handleTriggerSimulatedUpdate = () => {
    const randomDoc = documents[Math.floor(Math.random() * documents.length)];
    const simNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'DOC_REVISED',
      title: `[Otomatis] Pembaruan Dokumen: ${randomDoc.code}`,
      message: `Tinjauan berkala sistem mendeteksi rilis pembaruan klausul keselamatan kerja untuk ${randomDoc.title}.`,
      docId: randomDoc.id,
      docCode: randomDoc.code,
      docTitle: randomDoc.title,
      version: randomDoc.version,
      department: randomDoc.department,
      createdAt: new Date().toISOString(),
      isRead: false,
      priority: 'urgent',
    };
    setNotifications((prev) => [simNotif, ...prev]);
    showToast(
      'Simulasi Notifikasi Terkirim!',
      `Pemberitahuan pembaruan ${randomDoc.code} masuk ke pusat notifikasi.`
    );
  };

  const handleResetData = () => {
    if (currentUser.role !== 'ADMIN') {
      handleOpenLoginModal('ADMIN', 'Reset Data Default Sistem');
      return;
    }
    if (confirm('Kembalikan seluruh data dokumen dan notifikasi ke setelan awal pabrik?')) {
      const reset = resetToDefaultData();
      setDocuments(reset.docs);
      setNotifications(reset.notifs);
      showToast('Data Direset', 'Semua dokumen telah dikembalikan ke contoh default.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-start gap-3 p-4 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 animate-in slide-in-from-top-3 duration-200 max-w-sm">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold">{toastMessage.title}</div>
            <div className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
              {toastMessage.description}
            </div>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white text-xs p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        unreadNotifCount={unreadNotifCount}
        currentUser={currentUser}
        onOpenLoginModal={handleOpenLoginModal}
        onOpenPdfLoader={() => {
          if (currentUser.role === 'ADMIN') {
            setIsPdfLoaderOpen(true);
          } else {
            handleOpenLoginModal('ADMIN', 'Unggah Dokumen PDF');
          }
        }}
        onOpenNotificationCenter={() => setIsNotificationCenterOpen(true)}
        onOpenMasterList={() => setIsMasterListOpen(true)}
        onResetData={handleResetData}
      />

      {/* Role Alert Banner (Shows when in User mode to highlight Administrator password feature) */}
      {currentUser.role === 'USER' && (
        <div className="bg-amber-500/10 border-b border-amber-200/90 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <span className="font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                Mode User (Karyawan)
              </span>
              <span>
                Saat ini Anda masuk sebagai <strong>User</strong> (akses baca &amp; unduh dokumen).
                Untuk mengunggah berkas PDF atau merevisi dokumen, masuk sebagai <strong>Administrator</strong> (wajib password).
              </span>
            </div>
            <button
              onClick={() => handleOpenLoginModal('ADMIN')}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs shadow-2xs transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <span>Masuk Administrator</span>
            </button>
          </div>
        </div>
      )}

      {/* Department Horizontal Filter */}
      <DepartmentFilter
        selectedDept={selectedDept}
        onSelectDept={setSelectedDept}
        deptCounts={deptCounts}
      />

      {/* Statistics Counter Cards */}
      <StatsBanner
        totalDocs={stats.total}
        regulasiCount={stats.regulasi}
        sopCount={stats.sop}
        ikCount={stats.ik}
        reviewDueCount={stats.reviewDue}
        activeType={activeDocType}
        onFilterByType={(t) => setActiveDocType(t)}
        onFilterReviewDue={() => {
          setActiveStatus('REVIEW_DUE');
          showToast(
            'Filter Jatuh Tempo Aktif',
            'Menampilkan dokumen yang memerlukan tinjauan berkala.'
          );
        }}
      />

      {/* Fast Search & Filters Bar */}
      <SearchAndFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeDocType={activeDocType}
        onDocTypeChange={setActiveDocType}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        sortBy={sortBy}
        onSortChange={setSortBy}
        favoriteOnly={favoriteOnly}
        onToggleFavoriteOnly={() => setFavoriteOnly(!favoriteOnly)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalFiltered={filteredDocuments.length}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Main Content: Documents List or Table */}
      <main className="flex-1 pb-16">
        {filteredDocuments.length === 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="w-16 h-16 rounded-3xl bg-slate-200/80 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Tidak ada dokumen yang ditemukan</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-5">
              Tidak ada Regulasi, SOP, atau Instruksi Kerja yang sesuai dengan kriteria filter atau
              pencarian "{searchQuery}".
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Reset Semua Filter
              </button>
              <button
                onClick={() => setIsPdfLoaderOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Unggah Dokumen PDF Baru</span>
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredDocuments.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  searchQuery={searchQuery}
                  onOpenReader={handleOpenReader}
                  onOpenRevision={handleTriggerRevision}
                  onToggleFavorite={handleToggleFavorite}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          </div>
        ) : (
          <DocumentTable
            documents={filteredDocuments}
            searchQuery={searchQuery}
            onOpenReader={handleOpenReader}
            onOpenRevision={handleTriggerRevision}
            onToggleFavorite={handleToggleFavorite}
            onDownload={handleDownload}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-blue-700">POWER-Up</span>
            <span>• Procedures, Operations, and Workplace Efficiency Regulation Hub</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>ISO 9001:2015</span>
            <span>ISO 14001:2015</span>
            <span>ISO 45001:2018</span>
            <span>UU PDP No. 27/2022</span>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. PDF Loader Modal */}
      <PdfLoaderModal
        isOpen={isPdfLoaderOpen}
        onClose={() => setIsPdfLoaderOpen(false)}
        onAddDocument={handleAddDocument}
      />

      {/* 2. Document Reader & PDF Viewer Modal */}
      <DocumentReaderModal
        document={readerDoc}
        isOpen={!!readerDoc}
        onClose={() => setReaderDoc(null)}
        onOpenRevision={(doc) => {
          setReaderDoc(null);
          handleTriggerRevision(doc);
        }}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* 3. Revision Modal */}
      <RevisionModal
        document={revisionDoc}
        isOpen={!!revisionDoc}
        onClose={() => setRevisionDoc(null)}
        onSubmitRevision={handleSubmitRevision}
      />

      {/* 4. Automated Notification Center Modal */}
      <NotificationCenterModal
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearNotification={handleClearNotification}
        onSelectDocument={handleSelectDocumentFromNotif}
        onTriggerSimulatedUpdate={handleTriggerSimulatedUpdate}
      />

      {/* 5. Master Document Register Modal */}
      <MasterListModal
        isOpen={isMasterListOpen}
        onClose={() => setIsMasterListOpen(false)}
        documents={documents}
      />

      {/* 6. User & Administrator Authentication Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        initialRole={loginInitialRole}
        requiredForAction={loginRequiredAction}
      />
    </div>
  );
}
