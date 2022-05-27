import { useEffect, useLayoutEffect, useMemo } from 'react';
import useIsClient from './useIsClient';
import useLocalStorage from './useLocalStorage';
import useMediaQuery from './useMediaQuery';
import useUpdateEffect from './useUpdateEffect';

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

interface UseDarkModeOutput {
  isDarkMode: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
}

const getDefaultOnChange =
  (
    element: HTMLElement,
    classNameDark: string = 'dark-mode',
    classNameLight: string = 'light-mode'
  ) =>
  (val: boolean) => {
    element.classList.add(val ? classNameDark : classNameLight);
    element.classList.remove(val ? classNameLight : classNameDark);
  };

function useDarkMode(defaultValue?: boolean): UseDarkModeOutput {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    'dark-mode',
    defaultValue ?? isDarkOS ?? false
  );

  // Update darkMode if os prefers changes
  useUpdateEffect(() => {
    setDarkMode(isDarkOS);
  }, [isDarkOS]);

  useLayoutEffect(() => {
    getDefaultOnChange(window.document.body)(isDarkMode);
  }, [isDarkMode]);

  return {
    isDarkMode,
    toggle: () => setDarkMode(prev => !prev),
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false),
  };
}

export default useDarkMode;
