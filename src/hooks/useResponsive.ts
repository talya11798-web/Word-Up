import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const isPhone = width < 600;
  const isTablet = width >= 600 && width < 1024;
  const isDesktop = width >= 1024;
  const contentMaxWidth = isDesktop ? 980 : isTablet ? 720 : width;
  const columns = isDesktop ? 3 : isTablet ? 2 : 1;
  const gutter = isPhone ? 16 : 24;

  return {
    width,
    height,
    isPhone,
    isTablet,
    isDesktop,
    contentMaxWidth,
    columns,
    gutter,
  };
}
