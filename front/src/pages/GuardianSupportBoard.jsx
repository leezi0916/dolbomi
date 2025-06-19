import React from 'react';
import { useState, useEffect } from 'react';
import useUserStore from '../store/userStore.js';
import { GridContainer } from '../styles/common/Container.js';
import {
  HiringCardSection,
  Card,
  CardTopContent,
  CardImage,
  CardTextGroup,
  CardTitle,
  CardText,
  CardBottomContent,
  CardButton,
  CardWrap,
  NewCantainer,
  NewTitle,
} from '../styles/Card.styles.js';

import { proposerSevice } from '../api/propose.js';
import { CardRegion } from './CareGiverMainPage.jsx';

const GuardianSupportBoard = () => {
  const { user } = useUserStore();
  const [proposerList, setproposerList] = useState([]);

  {
    /* 
     간병인 버전 : 돌봄대상자의 지원목록이 나올것! 
     
     >>> 맵을 돌려서 나와야함 
        간병인ver 구직서(이력서)에 대한 구인서(돌봄대상자)목록 가져올것 
          => 신청테이블(caregiverproposer) caregiver_no로 조인해서 구인서데이터 가져온것
    */
  }

  useEffect(() => {
    // 간병인ver : 내 구직서(이력서)에 대한 돌봄대상자지원현황
    // 매개변수값 : 구직서의 pk를 넘기자
    const fetchList = async () => {
      const getList = await proposerSevice.getguardianLists(1);
      setproposerList(getList);
      console.log(getList);
    };

    fetchList();
  }, []);
  // 이름 첫글자 O 처리하기
  const maskName = (name) => {
    console.log(name);
    if (name.length === 2) {
      return name[0] + '○';
    } else if (name.length >= 3) {
      return name[0] + '○' + name.slice(2);
    }
    return name;
  };

  return (
    <>
      {/* 간병사ver => 돌봄지원자 지원목록  */}
      <>
        <NewCantainer>
          <NewTitle>돌봄지원자 지원목록</NewTitle>
          <CardWrap>
            <HiringCardSection>
              <GridContainer>
                {proposerList.map((user) => (
                  <Card key={user.propposerNo}>
                    <CardTopContent>
                      <CardImage src={user.profileImage} />
                      <CardTextGroup>
                        <CardTitle>{maskName(user.patName)} 님</CardTitle>
                        <CardText>
                          나이: {user.patAge}세({user.patGender == 'M' ? '남' : '여'})
                        </CardText>
                        <CardText>시급: {user.account}원</CardText>
                      </CardTextGroup>
                    </CardTopContent>
                    <CardBottomContent>
                      <CardRegion>
                        <span>지역</span> {user.patAddress}
                      </CardRegion>
                      <CardButton>상세보기</CardButton>
                    </CardBottomContent>
                  </Card>
                ))}
              </GridContainer>
            </HiringCardSection>
          </CardWrap>
        </NewCantainer>
      </>
    </>
  );
};

export default GuardianSupportBoard;
