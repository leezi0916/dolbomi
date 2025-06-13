import React from 'react';
import { styled } from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { Container } from '../styles/common/Container';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
};

const Content = styled.main`
  min-height: calc(100vh - 68px); // 저희 프로젝트 상단바 크기에 맞게 빼는걸로 변경해야합니다.
  max-width: 1280px;
  margin: 0 auto;
`;
export default Layout;
