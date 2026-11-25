import React from 'react';
import { Department } from '../types/document';
import {
  Layers,
  Users,
  Wallet,
  Cpu,
  Factory,
  ShieldAlert,
  CheckCircle2,
  Truck,
  Scale,
} from 'lucide-react';

interface DepartmentFilterProps {
  selectedDept: Department;
  onSelectDept: (dept: Department) => void;
  deptCounts: Record<Department, number>;
}

const DEPARTMENTS: { name: Department; icon: React.ElementType }[] = [
  { name: 'Semua Departemen', icon: Layers },
  { name: 'Operasional & Produksi', icon: Factory },
  { name: 'K3 & Lingkungan (HSE)', icon: ShieldAlert },
  { name: 'IT & Sistem Informasi', icon: Cpu },
  { name: 'HR & General Affairs', icon: Users },
  { name: 'Keuangan & Akuntansi', icon: Wallet },
  { name: 'Quality Assurance & QC', icon: CheckCircle2 },
  { name: 'Supply Chain & Logistik', icon: Truck },
  { name: 'Legal & Kepatuhan', icon: Scale },
];

export const DepartmentFilter: React.FC<DepartmentFilterProps> = ({
  selectedDept,
  onSelectDept,
  deptCounts,
}) => {
  return (
    <div className="w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <span>Kategori Berbasis Departemen</span>
            <span className="text-slate-400 font-normal">({DEPARTMENTS.length - 1} Unit Kerja)</span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Klik departemen untuk memfilter dokumen terkait
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-200 no-scrollbar">
          {DEPARTMENTS.map((dept) => {
            const Icon = dept.icon;
            const isSelected = selectedDept === dept.name;
            const count = deptCounts[dept.name] || 0;

            return (
              <button
                key={dept.name}
                onClick={() => onSelectDept(dept.name)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/20'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                <span>{dept.name}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isSelected ? 'bg-blue-700/80 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
