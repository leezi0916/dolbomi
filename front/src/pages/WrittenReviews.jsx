import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GridContainer } from '../styles/common/Container';
import {
  Card,
  CardTopContent,
  CardImage,
  CardTextGroup,
  CardTitle,
  CardText,
  CardMidBottomContent,
  ReviewTextBox,
  ReviewFooter,
  ReviewScore,
  ReviewDate,
} from './GuardianMainPage';
import { reviewService } from '../api/reviews';
import Paging from '../components/Paging';
import { media } from '../styles/MediaQueries';
import useUserStore from '../store/userStore';

const WrittenReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { user } = useUserStore();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewService.getMyWrittenReviews(currentPage, user.userNo);
        console.log(data);
        setReviews(data);
      } catch (error) {
        console.error('리뷰 로딩 실패:', error);
      }
    };
    fetchReviews();
  }, [currentPage]);

  const maskName = (name) => {
    if (name.length === 2) return name[0] + '○';
    if (name.length >= 3) return name[0] + '○' + name.slice(2);
    return name;
  };

  const chagneCurrentPage = (value) => {
    setCurrentPage(value);
  };

  console.log(currentPage);
  return (
    <ReviewWrapper>
      <TopSection>
        <LeftTitle>내가 쓴 리뷰</LeftTitle>
      </TopSection>

      <RecivedReviewsGridContainer>
        {reviews.content?.map((review) => (
          <Card key={review.reviewNo}>
            <CardTopContent>
              <CardImage src={review.profileImage} />
              <CardTextGroup>
                <CardTitle>{maskName(review.userName)} 간병사</CardTitle>
                <CardText>
                  나이 {review.age}세({review.gender === 'male' ? '남' : '여'})
                </CardText>
              </CardTextGroup>
            </CardTopContent>
            <CardMidBottomContent>
              <ReviewTextBox>{review.reviewContent}</ReviewTextBox>
              <ReviewFooter>
                <ReviewScore>
                  평점 <strong>{review.reviewScore.toFixed(1)}</strong>
                </ReviewScore>
                <ReviewDate>작성일 {review.reviewUpdateDate.slice(0, 10)}</ReviewDate>
              </ReviewFooter>
            </CardMidBottomContent>
          </Card>
        ))}
      </RecivedReviewsGridContainer>

      <Paging currentPage={currentPage} totalPage={reviews.totalPage} chagneCurrentPage={chagneCurrentPage} />
    </ReviewWrapper>
  );
};

export default WrittenReviews;

const RecivedReviewsGridContainer = styled(GridContainer)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing[5]};

  ${media.md`
    grid-template-columns: repeat(2, 1fr);
  `}

  ${media.lg`
    grid-template-columns: repeat(3, 1fr);
  `}
`;

const ReviewWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing[10]};
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  flex-direction: column;

  ${media.md`
    flex-direction: row;
  `}
`;

const LeftTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  ${media.sm`
    font-size: ${({ theme }) => theme.fontSizes.xl};
  `}
  ${media.lg`
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  `}
`;
