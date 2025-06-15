import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SITE_CONFIG } from '../config/site';
import { media } from '../styles/MediaQueries';
import { GiHamburgerMenu } from 'react-icons/gi';
import Menubar from './menubar';
import useUserStore from '../store/userStore';

const Header = () => {
  const { user, isAuthenticated, userStatus, setUserStatus } = useUserStore();
  // userStatus => true :간병인 false : 돌봄대상자(보호자)
  // const [status, setStatus] = useState(false);

  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      <div
        style={{
          position: 'relative', // 기준이 되는 부모
          zIndex: 10,
        }}
      >
        <HeaderContainer>
          <HeaderWrapper>
            <Logo to="/">
              <img src="/public/logo.png" />
              {SITE_CONFIG.name}
            </Logo>

            {/* 모바일환경에서의 nav */}
            {/* <MenuButton />

        <MobileMenu>
          <UserProfile>
            <UserName>님</UserName>
          </UserProfile>

          <Nav>
            <NavItem to="/products">돌봄대상자 모집</NavItem>
            <NavItem to="/question">소통</NavItem>
          </Nav>

          <UserMenu>
            <NavItem to="/login">로그인</NavItem>
            <NavItem to="/signup">회원가입</NavItem>
          </UserMenu>
        </MobileMenu> */}

            {/* pc환경에서의 nav */}
            <DesktopNav>
              {userStatus ? (
                <NavItem to="/hirelist">돌봄대상자 모집</NavItem>
              ) : (
                <NavItem to="/caregiverlist">간병사 모집</NavItem>
              )}

              <NavItem to="/CommunityBoard">소통</NavItem>
            </DesktopNav>

            <DesktopUserMenu>
              {isAuthenticated ? (
                <DesktopUserMenuWrap>
                  <img src="/public/icons/icon_알림.png" alt="" />
                  <img src="/public/icons/icon_채팅알림.png" alt="" />
                  <ToggleWrap onClick={() => setUserStatus(!userStatus)}>
                    <ToggleItem userStatus={!userStatus}>간병인</ToggleItem>
                    <ToggleItem userStatus={userStatus}>보호자</ToggleItem>
                  </ToggleWrap>

                  <NavItem to="/profile" onMouseEnter={() => setIsHovering(true)} style={{ cursor: 'pointer' }}>
                    {user?.username}님
                  </NavItem>
                </DesktopUserMenuWrap>
              ) : (
                <>
                  <NavItem to="/login">로그인</NavItem>
                  <NavItem to="/signup">회원가입</NavItem>
                </>
              )}
            </DesktopUserMenu>
          </HeaderWrapper>
        </HeaderContainer>
        {isHovering && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Menubar />
          </div>
        )}
      </div>
    </>
  );
};

// 간병 <-> 도우미
const ToggleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.gray[5]};
  border-radius: ${({ theme }) => theme.borderRadius.base};
`;
const ToggleItem = styled.div`
  padding: 5px ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  color: ${({ userStatus, theme }) => (userStatus ? theme.colors.white : theme.colors.gray[3])};
  background: ${({ userStatus, theme }) => (userStatus ? theme.colors.primary : 'transparent')};
  cursor: pointer;
`;
const NavIt = styled.img``;
//
const UserProfile = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]};
`;

const UserName = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[5]};
  box-shadow: ${({ theme }) => theme.shadows.base};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndices.sticky};
`;

const HeaderWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
  height: 80px;
`;

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};

  img {
    margin-right: ${({ theme }) => theme.spacing[8]};
  }

  ${media.md`
   font-size: ${({ theme }) => theme.fontSizes['2xl']}; 
  `}
`;

const DesktopNav = styled.nav`
  display: none;

  gap: ${({ theme }) => theme.spacing[8]};

  ${media.md`
        display: flex;
    `}
`;

const DesktopUserMenu = styled.nav`
  display: none;
  gap: ${({ theme }) => theme.spacing[8]};

  ${media.md`
        display: flex;
    `}
`;

// 수정
const DesktopUserMenuWrap = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[10]};

  align-items: center;
`;

const NavItem = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.gray[700]};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MenuButton = styled(GiHamburgerMenu)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 10;

  ${media.md`
        display: none;
    `}
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.white};
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
  padding: ${({ theme }) => theme.spacing[4]};
  padding-top: ${({ theme }) => theme.spacing[16]};
  z-index: 5;
  overflow-y: auto;

  ${media.md`
        display: none;
    `}
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const UserMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  padding-top: ${({ theme }) => theme.spacing[8]};
`;
export default Header;
