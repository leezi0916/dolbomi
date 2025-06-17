import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SITE_CONFIG } from '../config/site';
import { media } from '../styles/MediaQueries';
import { GiHamburgerMenu } from 'react-icons/gi';
import useUserStore from '../store/userStore';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const { user, isAuthenticated, userStatus, setUserStatus } = useUserStore();

  const [isHovering, setIsHovering] = useState(false);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Zustand에서 사용자 상태 초기화
    localStorage.removeItem('user-storage'); // persist 저장소 삭제
    alert('로그아웃 되었습니다.');
    navigate('/'); // 홈으로 이동
  };
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo to="/">
          <img src="/src/assets/mainImg/logo.png" />
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
        <div></div>
        <DesktopUserMenu>
          <img src="/src/assets/icons/icon_알림.png" alt="" />
          <img src="/src/assets/icons/icon_채팅알림.png" alt="" />
          <ToggleWrap >
            <ToggleItem userStatus ={!userStatus} onClick={() => setUserStatus(userStatus)}>간병인</ToggleItem>
            <ToggleItem userStatus={userStatus} onClick={() => setUserStatus(!userStatus)}>보호자</ToggleItem>
          </ToggleWrap>

          {isAuthenticated ? (
            <NavItem onMouseEnter={() => setIsHovering(true)} style={{ cursor: 'pointer' }}>
              {user?.user_name}님
            </NavItem>
          ) : (
            <>
              <NavItem to="/login">로그인</NavItem>
              <NavItem to="/signup">회원가입</NavItem>
            </>
          )}

          {isHovering && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                bottom: '16px',
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Wrap>
                <NavItem to="/MyProfile">
                  <Icon src="/src/assets/icons/icon_개인정보홈.png" alt="" /> 개인정보홈
                </NavItem>

                {userStatus ? (
                  <NavItem to="/patient">
                    <Icon src="/src/assets/icons/icon_돌봄대상자관리.png" alt="" />
                    돌봄대상자 관리
                  </NavItem>
                ) : (
                  <NavItem to="/">
                    <Icon src="/src/assets/icons/icon_이력서등록.png" alt="" />
                    이력서 등록
                  </NavItem>
                )}

                {userStatus ? (
                  <NavItem to="/hireRegistration">
                    <Icon src="/src/assets/icons/icon_이력서등록.png" alt="" />
                    돌봄대상자 신청
                  </NavItem>
                ) : (
                  <NavItem to="/">
                    <Icon src="/src/assets/icons/icon_간병사신청.png" alt="" />
                    간병사 신청
                  </NavItem>
                )}

                <NavItem to="/">
                  <Icon src="/src/assets/icons/icon_내역관리.png" alt="" />
                  내역관리
                </NavItem>
                <NavItem to="/">
                  <Icon src="/src/assets/icons/icon_리뷰페이지.png" alt="" />
                  리뷰페이지
                </NavItem>

                <NavItem to="/">
                  <Icon src="/src/assets/icons/icon_매칭관리.png" alt="" />
                  매칭관리
                </NavItem>

                <NavItem to="/" onClick={handleLogout}>
                  <Icon src="/src/assets/icons/icon_로그아웃.png" alt="" />
                  로그아웃
                </NavItem>
              </Wrap>
            </div>
          )}
        </DesktopUserMenu>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

// toggle 간병 <-> 도우미
const ToggleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.gray[5]};
  border-radius: ${({ theme }) => theme.borderRadius.base};
`;
const ToggleItem = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: 5px ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  color: ${({ userStatus, theme }) => (userStatus ? theme.colors.white : theme.colors.gray[3])};
  background: ${({ userStatus, theme }) => (userStatus ? theme.colors.primary : 'transparent')};
  cursor: pointer;

  ${media.lg`
    font-size:${({ theme }) => theme.fontSizes.base};
  `}
`;

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
  //최소크기
  display: grid;
  margin: 0 auto;
  max-width: 1245px;
  height: 80px;
  position: relative;
  grid-template-columns: 1fr 1fr 0.1fr 2fr;

  ${media.md`
    grid-template-columns: 1fr 1fr 1fr 2fr;
  `}
  ${media.lg`
    grid-template-columns: 1fr 1fr 1.5fr 2fr;
  `}
`;

const Logo = styled(Link)`
display: flex;
justify-content: center;
align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};


  img {
    width: 60px;
    height: 60px;
    margin-right: 20px;
  }

  ${media.md`
    font-size: ${({ theme }) => theme.fontSizes.xl};;
  `}


`;

const DesktopNav = styled.nav`
  display: none;
  ${media.md`
    display: flex;
 align-items: center;
  gap: 10px;
  `}
`;

const DesktopUserMenu = styled.nav`
  display: none;

  ${media.md`
    display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  `}
`;

const NavItem = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  ${media.lg`
   font-size: ${({ theme }) => theme.fontSizes.base}; 
  `}
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

//menuNav dropdown
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 5px;
  width: 180px;
  padding: ${({ theme }) => theme.spacing[2]} 0;

  float: right;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.base} 0;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin: 0px ${({ theme }) => theme.spacing[4]} 0;
`;
export default Header;
