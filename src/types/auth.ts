export type UserRole = 'ADMIN' | 'USER';

export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  department: string;
  title: string;
}

export const PRESET_USERS: Record<UserRole, AuthUser> = {
  ADMIN: {
    id: 'user-admin-01',
    name: 'Bambang Triyono, ST, MT',
    role: 'ADMIN',
    email: 'admin.doccontrol@powerup.internal',
    department: 'Quality Assurance & Document Control',
    title: 'Lead Administrator & Document Controller',
  },
  USER: {
    id: 'user-staff-01',
    name: 'Karyawan / Staf Operasional',
    role: 'USER',
    email: 'staff.operasional@powerup.internal',
    department: 'Operasional & Produksi',
    title: 'Staff Viewer & Pelaksana Lapangan',
  },
};

// Default password for administrator access
export const ADMIN_DEFAULT_PASSWORD = 'admin123';
