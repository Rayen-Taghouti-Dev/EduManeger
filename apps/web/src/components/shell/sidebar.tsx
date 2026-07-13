'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, GraduationCap } from 'lucide-react';

import { navGroups } from '@/config/navigation';
import { useShellStore } from '@/stores/shell-store';
import {
  Badge,
  Button,
  cn,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@edumanager/ui';

interface SidebarProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

export function Sidebar({ mobile = false, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebarCollapsed } = useShellStore();
  const collapsed = !mobile && sidebarCollapsed;

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'bg-surface border-border flex h-full flex-col border-r transition-all duration-200',
          mobile ? 'w-full' : collapsed ? 'w-[var(--sidebar-collapsed-width)]' : 'w-[var(--sidebar-width)]',
        )}
      >
        {/* Brand */}
        <div className="border-border flex h-[var(--navbar-height)] shrink-0 items-center border-b px-4">
          <Link
            href="/dashboard"
            onClick={onNavigate}
            className={cn(
              'flex min-w-0 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
              collapsed && 'justify-center',
            )}
          >
            <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-sm">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-foreground truncate text-sm font-semibold leading-none tracking-tight">
                  EduManager
                </p>
                <p className="text-muted-foreground mt-1 truncate text-xs leading-none">Pro</p>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-4" aria-label="Navigation principale">
          {navGroups.map((group, groupIndex) => (
            <div key={group.label} className={cn(groupIndex > 0 && 'mt-6')}>
              {!collapsed && (
                <p className="text-muted-foreground mb-2 px-2 text-[11px] font-semibold tracking-widest uppercase">
                  {group.label}
                </p>
              )}
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;

                  const link = (
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        'nav-item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
                        isActive ? 'nav-item-active' : 'nav-item-inactive',
                        collapsed && 'justify-center px-0',
                        !collapsed && 'px-2',
                      )}
                    >
                      <Icon className={cn('h-4 w-4 shrink-0', isActive && 'text-primary')} />
                      {!collapsed && (
                        <>
                          <span className="min-w-0 flex-1 truncate">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" size="sm" className="shrink-0">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </Link>
                  );

                  if (collapsed) {
                    return (
                      <li key={item.href}>
                        <Tooltip>
                          <TooltipTrigger asChild>{link}</TooltipTrigger>
                          <TooltipContent side="right" className="text-xs font-medium">
                            {item.title}
                          </TooltipContent>
                        </Tooltip>
                      </li>
                    );
                  }

                  return <li key={item.href}>{link}</li>;
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        {!mobile && (
          <div className="border-border shrink-0 border-t p-2">
            <Button
              variant="ghost"
              size={collapsed ? 'icon' : 'default'}
              onClick={toggleSidebarCollapsed}
              className={cn(
                'text-muted hover:text-foreground h-10 w-full shrink-0 transition-colors',
                !collapsed && 'justify-start gap-2 px-2',
              )}
              aria-label={collapsed ? 'Développer la barre latérale' : 'Réduire la barre latérale'}
            >
              <ChevronLeft
                className={cn('h-4 w-4 shrink-0 transition-transform duration-200', collapsed && 'rotate-180')}
              />
              {!collapsed && <span className="truncate text-xs">Réduire</span>}
            </Button>
          </div>
        )}
      </aside>
    </TooltipProvider>
  );
}
