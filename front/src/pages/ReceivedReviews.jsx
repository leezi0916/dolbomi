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

const ReceivedReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { user } = useUserStore();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewService.getReceivedReviews(currentPage, user.userNo);
        console.log(data);
        setReviews(data);
      } catch (error) {
        console.error('리뷰 로딩 실패:', error);
      }
    };
    fetchReviews();
  }, [currentPage]);

  const averageScore = reviews.receivedReview?.content?.length
    ? (
        reviews.receivedReview.content.reduce((acc, cur) => acc + cur.reviewScore, 0) /
        reviews.receivedReview.content.length
      ).toFixed(1)
    : '0.0';
  const chagneCurrentPage = (value) => {
    setCurrentPage(value);
  };

  return (
    <ReviewWrapper>
      <TopSection>
        <LeftTitle>받은 리뷰</LeftTitle>
        <RightSummary>
          <strong>{user.userName}님</strong>
          <ScoreText>
            평점 <AverageScore>{averageScore}</AverageScore>
            <span>({reviews.receivedReview?.content?.length})</span>
          </ScoreText>
        </RightSummary>
      </TopSection>

      <ReceivedReviewsGridContainer>
        {reviews.receivedReview?.content?.map((review) => (
          <Card key={review.reviewNo}>
            <CardTopContent>
              <CardImage src={review.profileImage} />
              <CardTextGroup>
                <CardTitle>{review.userName} 님</CardTitle>
                <CardText>
                  나이 {review.age}세({review.gender === 'M' ? '남' : '여'})
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
      </ReceivedReviewsGridContainer>

      <Paging currentPage={currentPage} totalPage={reviews.totalPage} chagneCurrentPage={chagneCurrentPage} />
    </ReviewWrapper>
  );
};

export default ReceivedReviews;

const ReceivedReviewsGridContainer = styled(GridContainer)`
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

const RightSummary = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[3]};

  ${media.md`
    margin-top: 0;
    font-size: ${({ theme }) => theme.fontSizes.xl};
  `}
`;

const ScoreText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.gray[3]};

  ${media.md`
    font-size: ${({ theme }) => theme.fontSizes.base};
  `}
`;

const AverageScore = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  color: ${({ theme }) => theme.colors.gray[1]};
`;
