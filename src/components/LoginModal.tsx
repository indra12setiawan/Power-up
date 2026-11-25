import React, { useState, useEffect } from 'react';
import { UserRole, AuthUser, PRESET_USERS, ADMIN_DEFAULT_PASSWORD } from '../types/auth';
import {
  ShieldAlert,
  User as UserIcon,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  X,
  AlertCircle,
  KeyRound,
  LogIn,
  Info,
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser;
  onLogin: (user: AuthUser) => void;
  initialRole?: UserRole;
  requiredForAction?: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  initialRole = 'ADMIN',
  requiredForAction,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedRole(initialRole);
      setPassword('');
      setErrorMessage(null);
    }
  }, [isOpen, initialRole]);

  if (!isOpen) return null;

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password === ADMIN_DEFAULT_PASSWORD) {
      onLogin(PRESET_USERS.ADMIN);
      onClose();
    } else {
      setErrorMessage(
        `Password Administrator salah. Gunakan password default: ${ADMIN_DEFAULT_PASSWORD}`
      );
    }
  };

  const handleUserLogin = () => {
    onLogin(PRESET_USERS.USER);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Masuk &amp; Ganti Peran Pengguna</h2>
              <p className="text-xs text-slate-500">Pilih akses sebagai Administrator atau User</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Requirement Alert (if triggered by protected action) */}
        {requiredForAction && (
          <div className="mx-6 mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Otorisasi Diperlukan:</strong> Tindakan{' '}
              <span className="font-semibold underline">"{requiredForAction}"</span> memerlukan hak
              akses Administrator. Silakan masukkan password admin di bawah ini.
            </div>
          </div>
        )}

        <div className="p-6 space-y-5">
          {/* Role Selection Tabs */}
          <div className="grid grid-cols-2 gap-3">
            {/* User Tab */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole('USER');
                setErrorMessage(null);
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                selectedRole === 'USER'
                  ? 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                <UserIcon className="w-4 h-4" />
              </div>
              <div className="text-sm font-bold text-slate-900">User / Karyawan</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Akses baca &amp; unduh</div>
              <div className="mt-2 text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Tanpa Password
              </div>
              {currentUser.role === 'USER' && (
                <span className="absolute top-3 right-3 text-[10px] font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                  Aktif
                </span>
              )}
            </button>

            {/* Administrator Tab */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole('ADMIN');
                setErrorMessage(null);
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                selectedRole === 'ADMIN'
                  ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div className="text-sm font-bold text-slate-900">Administrator</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Kelola, upload &amp; revisi</div>
              <div className="mt-2 text-[10px] text-blue-700 font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3" /> Wajib Password
              </div>
              {currentUser.role === 'ADMIN' && (
                <span className="absolute top-3 right-3 text-[10px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded">
                  Aktif
                </span>
              )}
            </button>
          </div>

          {/* Conditional Role Panel */}
          {selectedRole === 'USER' ? (
            <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div className="font-bold text-slate-900 text-sm">
                    {PRESET_USERS.USER.name}
                  </div>
                  <div className="text-[11px] text-slate-500">{PRESET_USERS.USER.title}</div>
                  <p className="pt-1 text-slate-600 leading-relaxed">
                    Sebagai <strong>User</strong>, Anda dapat mencari, membaca seluruh Regulasi, SOP &amp; IK, mencetak lembar resmi, serta mengunduh berkas PDF dokumen.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleUserLogin}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk sebagai User / Karyawan (Tanpa Password)</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleAdminLogin} className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-600 space-y-1 flex-1">
                  <div className="font-bold text-slate-900 text-sm">
                    {PRESET_USERS.ADMIN.name}
                  </div>
                  <div className="text-[11px] text-slate-500">{PRESET_USERS.ADMIN.title}</div>
                  <p className="pt-1 text-slate-600 leading-relaxed">
                    Akses kontrol penuh: Menambah dokumen PDF, merevisi SOP/IK, mengelola riwayat revisi, serta menyiarkan notifikasi otomatis.
                  </p>
                </div>
              </div>

              {/* Password Input Field */}
              <div className="space-y-1.5 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">
                    Password Administrator *
                  </label>
                  <span className="text-[11px] text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Default: <code className="font-mono font-bold">{ADMIN_DEFAULT_PASSWORD}</code>
                  </span>
                </div>

                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoFocus
                    placeholder="Masukkan password admin..."
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMessage(null);
                    }}
                    className="w-full pl-9 pr-10 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                    title={showPassword ? 'Sembunyikan password' : 'Lihat password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {errorMessage && (
                  <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200 mt-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              {/* Quick Fill Button */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span className="text-[11px]">Memerlukan kata sandi terverifikasi</span>
                <button
                  type="button"
                  onClick={() => setPassword(ADMIN_DEFAULT_PASSWORD)}
                  className="text-[11px] text-blue-600 hover:underline font-semibold cursor-pointer"
                >
                  Isi Otomatis '{ADMIN_DEFAULT_PASSWORD}'
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk sebagai Administrator</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
