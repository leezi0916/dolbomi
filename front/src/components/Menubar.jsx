import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useUserStore from '../store/userStore';

export default function Menubar() {
  const { userStatus } = useUserStore();

  return (
    <>
      <Wrap>
        <NavItem to="/MyProfile">
          <Icon src="/src/assets/icons/icon_개인정보홈.png" alt="" /> 개인정보홈
        </NavItem>
        {userStatus ? (
          <NavItem to="/">
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
          <NavItem to="/">
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
        <NavItem to="/">
          <Icon src="/src/assets/icons/icon_로그아웃.png" alt="" />
          로그아웃
        </NavItem>
      </Wrap>
    </>
  );
}

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

const NavItem = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.gray[700]};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin: 0px ${({ theme }) => theme.spacing[4]} 0;
`;
