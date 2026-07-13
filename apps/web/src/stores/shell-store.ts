import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ShellStore {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
  toggleMobileSidebar: () => void;
}

export const useShellStore = create<ShellStore>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      sidebarCollapsed: false,
      mobileSidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
      toggleSidebarCollapsed: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      toggleMobileSidebar: () =>
        set((state) => ({ mobileSidebarOpen: !state.mobileSidebarOpen })),
    }),
    { name: 'edumanager-shell', partialize: (s) => ({ sidebarCollapsed: s.sidebarCollapsed }) },
  ),
);
