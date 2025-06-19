import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Pagination, Stack } from '@mui/material';
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
} from '../pages/GuardianMainPage';
import { reviewService } from '../api/reviews';

const ITEMS_PER_PAGE = 4;

const MyWrittenReview = () => {
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

  return (
    <ReviewWrapper>
      <TopSection>
        <LeftTitle>리뷰 페이지</LeftTitle>
        <RightSummary>
          <strong>홍길동 님</strong>
          <ScoreText>
            평점 <AverageScore>{averageScore}</AverageScore> <span>({reviews.length})</span>
          </ScoreText>
        </RightSummary>
      </TopSection>

      <GridContainer>
        {reviews.slice(offset, offset + ITEMS_PER_PAGE).map((review) => (
          <Card key={review.review_no}>
            <CardTopContent>
              <CardImage src={review.profileImage} />
              <CardTextGroup>
                <CardTitle>{maskName(review.userName)} 님</CardTitle>
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
      </GridContainer>

      <PaginationWrapper>
        <Stack spacing={2}>
          <Pagination
            count={totalPage}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
            shape="rounded"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#FFA101',
                borderColor: '#FFA101',
              },
              '& .Mui-selected': {
                backgroundColor: '#FFA101 !important',
                color: '#fff',
              },
              '& .MuiPaginationItem-icon': {
                color: '#FFA101',
              },
            }}
          />
        </Stack>
      </PaginationWrapper>
    </ReviewWrapper>
  );
};

export default MyWrittenReview;

const ReviewWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing[10]};
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const LeftTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const RightSummary = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ScoreText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.gray[3]};
`;

const AverageScore = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  color: ${({ theme }) => theme.colors.gray[1]};
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing[5]};
`;
