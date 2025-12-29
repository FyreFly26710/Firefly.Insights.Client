import { useThemeStore } from '@/stores/useThemeStore';

export const useThemeMode = () => {
  const { mode, toggleMode } = useThemeStore();

  return {
    mode,
    toggleMode,
    isDark: mode === 'dark'
  };
};