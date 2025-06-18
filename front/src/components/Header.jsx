import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SITE_CONFIG } from '../config/site';
import { media } from '../styles/MediaQueries';
import { GiHamburgerMenu } from 'react-icons/gi';
import useUserStore from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import useUserStatusStore from '../store/userStatusStore';
const Header = () => {
  const { user, isAuthenticated } = useUserStore();
  console.log('ㄹㅇㄴㅁㄹ:', user);
  const { userStatus, setUserStatus } = useUserStatusStore();

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

        <MenuButton />

        <MobileMenu>
          {isAuthenticated ? (
            <UserProfile>
              <UserName> {user?.userName}님</UserName>
            </UserProfile>
          ) : (
            <>
              <UserMenu>
                <NavItem to="/login">로그인</NavItem>
                <NavItem to="/signup">회원가입</NavItem>
              </UserMenu>
            </>
          )}

          <Nav>
            <NavItem to="/products">돌봄대상자 모집</NavItem>
            <NavItem to="/question">소통</NavItem>
          </Nav>
        </MobileMenu>

        {/* pc환경에서의 nav */}
        <DesktopNav>
          {userStatus ? (
            <NavItem to="/caregiver/hirelist">간병사 모집</NavItem>
          ) : (
            <NavItem to="guardian/caregiverlist">돌봄대상자 모집</NavItem>
          )}

          <NavItem to="/community/free">소통</NavItem>
        </DesktopNav>
        <GridEmptyDiv></GridEmptyDiv>
        <DesktopUserMenu>
          <img src="/src/assets/icons/icon_알림.png" alt="" />
          <img src="/src/assets/icons/icon_채팅알림.png" alt="" />
          <ToggleWrap>
            {/* 간병인은 true / 보호자는 false */}
            <ToggleItem
              $userStatus={!userStatus}
              onClick={() => {
                setUserStatus(false); // 상태 설정
                navigate('/caregiver'); // 페이지 이동
              }}
            >
              간병인
            </ToggleItem>
            <ToggleItem
              $userStatus={userStatus}
              onClick={() => {
                setUserStatus(true); // 상태 설정
                navigate('/guardian'); // 페이지 이동
              }}
            >
              보호자
            </ToggleItem>
          </ToggleWrap>

          {isAuthenticated ? (
            <NavItem onMouseEnter={() => setIsHovering(true)} style={{ cursor: 'pointer', padding: '5px' }}>
              {user?.userName} 님
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
                <NavItem to="/myprofile">
                  <Icon src="/src/assets/icons/icon_개인정보홈.png" alt="" /> 개인정보홈
                </NavItem>

                {userStatus ? (
                  <NavItem to="/guardian/patient">
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
                  <NavItem to="/hireDetail/hiringNo">
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
  display: flex;
  justify-content: space-between;
  max-width: 1250px;
  height: 80px;
  position: relative;

  ${media.md`
    display: grid;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr 1fr 2fr;
  `}
  ${media.lg`
    grid-template-columns: 1fr 1fr 1.5fr 2fr;
  `}
`;

const GridEmptyDiv = styled.div`
  display: none;
  ${media.md`
    display: block;
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
    margin: 5px;

    ${media.md`
      margin-right: 20px;
  `}
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
  justify-content: space-around;
  position: relative;
  align-items: center;
  `}
`;

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
  color: ${({ $userStatus, theme }) => ($userStatus ? theme.colors.white : theme.colors.gray[3])};
  background: ${({ $userStatus, theme }) => ($userStatus ? theme.colors.primary : 'transparent')};
  cursor: pointer;

  ${media.lg`
    font-size:${({ theme }) => theme.fontSizes.base};
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
  border-radius: ${({ theme }) => theme.borderRadius.base};
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin: 0px ${({ theme }) => theme.spacing[4]} 0;
`;

// 모바일
const MenuButton = styled(GiHamburgerMenu)`
  width: 30px;
  height: 30px;
  margin: auto 5px;
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

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]};
`;

const UserName = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray[800]};
`;

export default Header;
