import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  BookOpen,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  School,
  Settings,
  Users,
} from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    label: 'Académique',
    items: [
      { title: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
      { title: 'Élèves', href: '/students', icon: GraduationCap },
      { title: 'Enseignants', href: '/teachers', icon: Users },
      { title: 'Classes', href: '/classes', icon: School },
      { title: 'Notes', href: '/grades', icon: BookOpen },
    ],
  },
  {
    label: 'Gestion',
    items: [
      { title: 'Finance', href: '/finance', icon: CreditCard },
      { title: 'Rapports', href: '/reports', icon: BarChart3 },
    ],
  },
  {
    label: 'Système',
    items: [{ title: 'Paramètres', href: '/settings', icon: Settings }],
  },
];

export const allNavItems = navGroups.flatMap((g) => g.items);

export const demoSchools = [
  { id: '1', name: 'Académie Greenwood', plan: 'Entreprise' },
  { id: '2', name: 'Préparatoire Riverside', plan: 'Professionnel' },
  { id: '3', name: 'International Oak Hill', plan: 'Débutant' },
];
