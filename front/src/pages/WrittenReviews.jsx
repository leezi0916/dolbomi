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

const ITEMS_PER_PAGE = 6;

const WrittenReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewService.getReviews();
        setReviews(data);
      } catch (error) {
        console.error('리뷰 로딩 실패:', error);
      }
    };
    fetchReviews();
  }, []);

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const totalPage = Math.ceil(reviews.length / ITEMS_PER_PAGE);

  const maskName = (name) => {
    if (name.length === 2) return name[0] + '○';
    if (name.length >= 3) return name[0] + '○' + name.slice(2);
    return name;
  };

  const averageScore = (reviews.reduce((acc, cur) => acc + cur.score, 0) / reviews.length || 0).toFixed(1);

  const chagneCurrentPage = (value) => {
    setCurrentPage(value);
  };

  return (
    <ReviewWrapper>
      <TopSection>
        <LeftTitle>내가 쓴 리뷰</LeftTitle>
      </TopSection>

      <RecivedReviewsGridContainer>
        {reviews.slice(offset, offset + ITEMS_PER_PAGE).map((review) => (
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
                  평점 <strong>{review.score.toFixed(1)}</strong>
                </ReviewScore>
                <ReviewDate>작성일 {review.createDate}</ReviewDate>
              </ReviewFooter>
            </CardMidBottomContent>
          </Card>
        ))}
      </RecivedReviewsGridContainer>

      <Paging currentPage={currentPage} totalPage={totalPage} chagneCurrentPage={chagneCurrentPage} />
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
