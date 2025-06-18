import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 부드러운 스크롤
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
