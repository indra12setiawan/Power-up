import {
  FileText,
  UploadCloud,
  Bell,
  FileSpreadsheet,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  User as UserIcon,
  Lock,
} from 'lucide-react';
import { AuthUser, UserRole } from '../types/auth';

interface NavbarProps {
  unreadNotifCount: number;
  currentUser: AuthUser;
  onOpenLoginModal: (role?: UserRole, requiredForAction?: string) => void;
  onOpenPdfLoader: () => void;
  onOpenNotificationCenter: () => void;
  onOpenMasterList: () => void;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  unreadNotifCount,
  currentUser,
  onOpenLoginModal,
  onOpenPdfLoader,
  onOpenNotificationCenter,
  onOpenMasterList,
  onResetData,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Logo & Description */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-blue-700 text-lg tracking-tight">POWER-Up</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                  <ShieldCheck className="w-3 h-3 text-blue-600" />
                  Sistem Dokumen Terkendali
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Procedures, Operations, and Workplace Efficiency Regulation Hub
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* User Role Switcher Button */}
            <button
              onClick={() => onOpenLoginModal(currentUser.role === 'ADMIN' ? 'USER' : 'ADMIN')}
              className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                currentUser.role === 'ADMIN'
                  ? 'bg-blue-50 border-blue-200 text-blue-900 hover:bg-blue-100/70'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100/70'
              }`}
              title="Klik untuk beralih profil (Administrator memerlukan Password)"
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-white shrink-0 ${
                  currentUser.role === 'ADMIN' ? 'bg-blue-600' : 'bg-emerald-600'
                }`}
              >
                {currentUser.role === 'ADMIN' ? (
                  <ShieldAlert className="w-3.5 h-3.5" />
                ) : (
                  <UserIcon className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-[11px] font-bold leading-tight flex items-center gap-1">
                  <span>{currentUser.role === 'ADMIN' ? 'Administrator' : 'User (Viewer)'}</span>
                  {currentUser.role === 'ADMIN' && (
                    <span title="Terproteksi Password">
                      <Lock className="w-2.5 h-2.5 text-blue-600" />
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 leading-tight truncate max-w-[120px]">
                  {currentUser.role === 'ADMIN' ? 'Akses Penuh' : 'Akses Baca & Unduh'}
                </div>
              </div>
              <span className="text-[10px] font-semibold text-blue-600 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs hidden lg:inline">
                Ganti Peran
              </span>
            </button>

            {/* Master List Button */}
            <button
              onClick={onOpenMasterList}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 transition-colors cursor-pointer"
              title="Buka Daftar Induk Dokumen Terkendali"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Daftar Induk</span>
            </button>

            {/* Notification Bell Button */}
            <button
              onClick={onOpenNotificationCenter}
              className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors cursor-pointer"
              title="Pusat Notifikasi Pembaruan Dokumen"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-rose-600 text-white text-[10px] font-bold items-center justify-center">
                    {unreadNotifCount > 9 ? '9+' : unreadNotifCount}
                  </span>
                </span>
              )}
            </button>

            {/* Reset Preset Button (Admin only or protected) */}
            <button
              onClick={onResetData}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer hidden sm:block"
              title="Reset ke Contoh Dokumen Default"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Primary Action: Input PDF Baru */}
            <button
              onClick={() => {
                if (currentUser.role === 'ADMIN') {
                  onOpenPdfLoader();
                } else {
                  onOpenLoginModal('ADMIN', 'Unggah Dokumen PDF');
                }
              }}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer ${
                currentUser.role === 'ADMIN'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                  : 'bg-slate-800 hover:bg-slate-900 text-slate-200 shadow-slate-900/10'
              }`}
              title={
                currentUser.role === 'ADMIN'
                  ? 'Unggah berkas PDF baru'
                  : 'Memerlukan login Administrator'
              }
            >
              {currentUser.role === 'ADMIN' ? (
                <UploadCloud className="w-4 h-4" />
              ) : (
                <Lock className="w-4 h-4 text-amber-400" />
              )}
              <span>Unggah Dokumen PDF</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
