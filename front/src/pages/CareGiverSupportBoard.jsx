import React from 'react';
import { useState, useEffect } from 'react';
import useUserStore from '../store/userStore.js';
import { GridContainer } from '../styles/common/Container.js';
import {
  CardText,
  CardButton,
  HiringCard,
  HiringCardTopContent,
  HiringCardImage,
  HiringCardTextGroup,
  HiringCardTitle,
  HiringCardBottomContent,
  JobSeekingCardSection,
  HiringCardText,
  CardBottomTextSection,
  CardRegionText,
  CardWrap,
  NewCantainer,
  NewTitle,
} from '../styles/Card.styles.js';

import { proposerSevice } from '../api/propose.js';

const SupportBoard = () => {
  const { user } = useUserStore();
  const [proposerList, setproposerList] = useState([]);

  {
    /* 
    돌봄대상자 버전 : 간병인의 지원목록이 나올것! 
    
    >>> 맵을 돌려서 나와야함 
        돌봄대상자ver 구인서(돌봄대상자)에 대한 구직서 목록 가져올것 
           => 신청테이블(patproposer) resum_no로 조인해서 구직서데이터  가져온것
    */
  }

  useEffect(() => {
    //돌봄대상자ver() : 내 구인서에 대한 간병인지원현황
    // 매개변수값 : 구인서의 pk를 넘기자
    const fetchList = async () => {
      const getList = await proposerSevice.getcareGiverLists(1);
      setproposerList(getList);
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
      {/* 보호자ver => 간병사 지원목록 */}
      <>
        <NewCantainer>
          <NewTitle>간병사 지원목록</NewTitle>
          <CardWrap>
            <JobSeekingCardSection>
              <GridContainer>
                {proposerList.map((resume) => (
                  <HiringCard key={resume.propposerNo}>
                    <HiringCardTopContent>
                      <HiringCardImage src={resume.profileImage} />
                      <HiringCardTextGroup>
                        <HiringCardTitle>
                          {maskName(resume.userName)} <span>간병사 </span>
                        </HiringCardTitle>
                        <HiringCardText>
                          나이: {resume.age}세({resume.gender == 'M' ? '남' : '여'})
                        </HiringCardText>
                        <CardText>시급: {resume.account}원</CardText>
                      </HiringCardTextGroup>
                    </HiringCardTopContent>
                    <HiringCardBottomContent>
                      <CardBottomTextSection>
                        <CardRegionText>
                          <span>자격증</span> {resume.license === true ? 'O' : 'X'}
                        </CardRegionText>
                        <CardRegionText>
                          <span>지역</span> {resume.address}
                        </CardRegionText>
                      </CardBottomTextSection>
                      <CardButton>상세보기</CardButton>
                    </HiringCardBottomContent>
                  </HiringCard>
                ))}
              </GridContainer>
            </JobSeekingCardSection>
          </CardWrap>
        </NewCantainer>
      </>
    </>
  );
};

export default SupportBoard;
