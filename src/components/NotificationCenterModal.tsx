import React, { useState } from 'react';
import { NotificationItem } from '../types/notification';
import {
  Bell,
  X,
  CheckCheck,
  AlertTriangle,
  FileCheck,
  Sparkles,
  ExternalLink,
  Trash2,
  Clock,
  Filter,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearNotification: (id: string) => void;
  onSelectDocument: (docId: string) => void;
  onTriggerSimulatedUpdate: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearNotification,
  onSelectDocument,
  onTriggerSimulatedUpdate,
}) => {
  const [filterType, setFilterType] = useState<'ALL' | 'UNREAD' | 'UPDATES' | 'REVIEW'>('ALL');

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifs = notifications.filter((n) => {
    if (filterType === 'UNREAD') return !n.isRead;
    if (filterType === 'UPDATES') return n.type === 'DOC_NEW' || n.type === 'DOC_REVISED';
    if (filterType === 'REVIEW') return n.type === 'REVIEW_DUE';
    return true;
  });

  // Relative time formatter
  const formatTimeAgo = (isoDate: string) => {
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMin < 1) return 'Baru saja';
    if (diffMin < 60) return `${diffMin} menit yang lalu`;
    if (diffHours < 24) return `${diffHours} jam yang lalu`;
    if (diffDays === 1) return 'Kemarin';
    return `${diffDays} hari yang lalu`;
  };

  const getPriorityStyle = (priority: NotificationItem['priority'], type: NotificationItem['type']) => {
    if (type === 'REVIEW_DUE') {
      return {
        icon: AlertTriangle,
        bg: 'bg-amber-100 text-amber-700 border-amber-200',
        badge: 'Jatuh Tempo Tinjauan',
      };
    }
    if (type === 'DOC_REVISED') {
      return {
        icon: RefreshCw,
        bg: 'bg-blue-100 text-blue-700 border-blue-200',
        badge: 'Pembaruan Revisi',
      };
    }
    return {
      icon: FileCheck,
      bg: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      badge: 'Dokumen Baru',
    };
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">
                  Pusat Notifikasi Pembaruan Dokumen
                </h2>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white">
                    {unreadCount} Baru
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Pemberitahuan otomatis rilis baru, revisi SOP/IK, dan peringatan review berkala
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

        {/* Filter and Quick Actions Bar */}
        <div className="px-6 py-2.5 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between gap-2 overflow-x-auto">
          {/* Filter tabs */}
          <div className="flex items-center gap-1">
            {(
              [
                { id: 'ALL' as const, label: 'Semua', count: notifications.length },
                { id: 'UNREAD' as const, label: 'Belum Dibaca', count: unreadCount },
                { id: 'UPDATES' as const, label: 'Rilis & Revisi', count: undefined },
                { id: 'REVIEW' as const, label: 'Peringatan Tinjauan', count: undefined },
              ]
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  filterType === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full ${
                      filterType === tab.id
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Quick Trigger / Mark all read */}
          <div className="flex items-center gap-1.5 shrink-0">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tandai Semua Dibaca</span>
              </button>
            )}

            <button
              onClick={onTriggerSimulatedUpdate}
              className="flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-2 py-1 rounded-lg transition-colors cursor-pointer"
              title="Simulasikan notifikasi rilis dokumen baru otomatis"
            >
              <Sparkles className="w-3 h-3 text-purple-600" />
              <span>Simulasi Broadcast</span>
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredNotifs.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <div className="text-sm font-semibold text-slate-700">Tidak ada notifikasi</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                Semua dokumen terkendali telah tersosialisasikan dan tidak ada tugas tinjauan
                mendesak saat ini.
              </p>
            </div>
          ) : (
            filteredNotifs.map((notif) => {
              const priority = getPriorityStyle(notif.priority, notif.type);
              const NotifIcon = priority.icon;

              return (
                <div
                  key={notif.id}
                  onClick={() => {
                    onMarkAsRead(notif.id);
                    if (notif.docId) {
                      onSelectDocument(notif.docId);
                      onClose();
                    }
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                    notif.isRead
                      ? 'bg-white border-slate-200 hover:border-slate-300'
                      : 'bg-blue-50/50 border-blue-200 ring-1 ring-blue-500/10 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${priority.bg}`}
                    >
                      <NotifIcon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            {priority.badge}
                          </span>
                          {notif.department && (
                            <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                              {notif.department}
                            </span>
                          )}
                          {!notif.isRead && (
                            <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 whitespace-nowrap">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(notif.createdAt)}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 mt-1">{notif.title}</h4>

                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>

                      {notif.docCode && (
                        <div className="mt-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                              {notif.docCode}
                            </span>
                            {notif.version && (
                              <span className="font-mono text-xs text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                                {notif.version}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            Buka Dokumen <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onClearNotification(notif.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 rounded transition-opacity"
                      title="Hapus notifikasi"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Notifikasi dipicu secara real-time saat upload atau revisi dokumen</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
