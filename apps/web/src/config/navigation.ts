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

import type { MessageKey } from '@/i18n';

export interface NavItem {
  titleKey: MessageKey;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavGroup {
  labelKey: MessageKey;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    labelKey: 'nav.academic',
    items: [
      { titleKey: 'nav.dashboard', href: '/dashboard', icon: LayoutDashboard },
      { titleKey: 'nav.students', href: '/students', icon: GraduationCap },
      { titleKey: 'nav.teachers', href: '/teachers', icon: Users },
      { titleKey: 'nav.classes', href: '/classes', icon: School },
      { titleKey: 'nav.grades', href: '/grades', icon: BookOpen },
    ],
  },
  {
    labelKey: 'nav.management',
    items: [
      { titleKey: 'nav.finance', href: '/finance', icon: CreditCard },
      { titleKey: 'nav.reports', href: '/reports', icon: BarChart3 },
    ],
  },
  {
    labelKey: 'nav.system',
    items: [{ titleKey: 'nav.settings', href: '/settings', icon: Settings }],
  },
];

export const allNavItems = navGroups.flatMap((g) => g.items);

export const demoSchools = [
  { id: '1', name: 'Académie Greenwood', planKey: 'landing.planEnterprise' as MessageKey },
  { id: '2', name: 'Préparatoire Riverside', planKey: 'landing.planPro' as MessageKey },
  { id: '3', name: 'International Oak Hill', planKey: 'landing.planStarter' as MessageKey },
];
