import React from 'react';
import { styled } from 'styled-components';
import Header from './Header';
import Footer from './Footer';

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
  min-height: calc(100vh - 81px);
  max-width: 1280px;
  margin: 0 auto;
`;

export default Layout;
