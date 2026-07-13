'use client';

import { Settings, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuth } from '@/providers/auth-provider';
import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@edumanager/ui';

export function UserMenu() {
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const initials =
    currentUser?.fullName
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'EM';

  const shortName = currentUser?.firstName ?? 'Compte';

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      router.replace('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-muted-foreground hover:bg-surface-hover hover:text-foreground h-10 shrink-0 items-center gap-2 rounded-md px-2"
          aria-label="Menu utilisateur"
        >
          <Avatar className="h-7 w-7 shrink-0">
            <AvatarFallback className="bg-primary text-[11px] font-medium leading-none text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden max-w-[72px] truncate text-sm font-medium leading-none md:inline">
            {shortName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>
          <div className="min-w-0 space-y-1">
            <p className="truncate text-sm font-medium leading-snug">
              {currentUser?.fullName ?? 'Compte utilisateur'}
            </p>
            <p className="text-muted-foreground truncate text-xs leading-snug">
              {currentUser?.email ?? 'session@edumanager.pro'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className="gap-2">
          <User className="h-4 w-4 shrink-0" />
          Profil
        </DropdownMenuItem>
        <DropdownMenuItem disabled className="gap-2">
          <Settings className="h-4 w-4 shrink-0" />
          Paramètres
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-danger" onClick={handleLogout}>
          {isLoggingOut ? 'Déconnexion...' : 'Déconnexion'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
