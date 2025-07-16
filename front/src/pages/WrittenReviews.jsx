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
import { toast } from 'react-toastify';
import profileImage from '../assets/profileImg/img_간병인.png';
import { FaTimes } from 'react-icons/fa';

const WrittenReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { user } = useUserStore();

  const fetchReviews = async () => {
    try {
      const data = await reviewService.getMyWrittenReviews(currentPage, user.userNo);
      setReviews(data);
    } catch (error) {
      toast.error('리뷰 로딩에 실패했습니다.');
    }
  };

  useEffect(() => {
    // 로그인하지 않은 경우 이전 페이지로 이동
    if (!user) {
      alert('로그인이 필요한 서비스입니다.');
      navigate(-1);
      return;
    }
    fetchReviews();
  }, [currentPage]);

  const chagneCurrentPage = (value) => {
    setCurrentPage(value);
  };

  const CLOUDFRONT_URL = 'https://d20jnum8mfke0j.cloudfront.net/';
  //이미지 경로 갖고오고 없다면 기본이미지
  const getProfileImageUrl = (path) => {
    if (!path) return profileImage; // 기본 이미지
    const cleanPath = path.replace(/^\//, ''); // 앞에 / 있으면 제거
    return `${CLOUDFRONT_URL}${cleanPath}`;
  };

  const handleDelete = async (reviewNo) => {
    if (confirm('정말 리뷰를 삭제하시겠습니까?')) {
      try {
        const response = await reviewService.deleteReview(reviewNo);
        if (response > 0) {
          toast.success('리뷰가 삭제되었습니다.');
          fetchReviews();
        } else {
          toast.error('삭제에 실패했습니다.');
        }
      } catch (error) {}
    }
  };

  return (
    <ReviewWrapper>
      <TopSection>
        <LeftTitle>내가 쓴 리뷰</LeftTitle>
      </TopSection>

      <WrittenReviewGridContainer>
        {!reviews.myWrittenReview?.content || reviews.myWrittenReview.content.length === 0 ? (
          <EmptyMessage>작성한 리뷰가 없습니다.</EmptyMessage>
        ) : (
          reviews.myWrittenReview.content.map((review) => (
            <Card key={review.reviewNo} style={{ position: 'relative' }}>
              <DeleteButton onClick={() => handleDelete(review.reviewNo)}>
                <FaTimes />
              </DeleteButton>

              <CardTopContent>
                <CardImage src={getProfileImageUrl(review.profileImage)} />
                <CardTextGroup>
                  <CardTitle>{review.userName} 간병사</CardTitle>
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
          ))
        )}
      </WrittenReviewGridContainer>

      <Paging
        currentPage={currentPage}
        totalPage={reviews?.myWrittenReview?.totalPage}
        chagneCurrentPage={chagneCurrentPage}
      />
    </ReviewWrapper>
  );
};

export default WrittenReviews;

const WrittenReviewGridContainer = styled(GridContainer)`
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

// 빈 메세지 추가
const EmptyMessage = styled.div`
  grid-column: 1 / -1;
  height: 300px; // 높이 넉넉하게 설정
  display: flex;
  align-items: center; // 수직 가운데
  justify-content: center; // 수평 가운데
  padding: ${({ theme }) => theme.spacing[8]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.gray[3]};
  text-align: center;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing[2]}; // 8px
  right: ${({ theme }) => theme.spacing[2]}; // 8px
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.xl}; // 24px로 키움
  z-index: ${({ theme }) => theme.zIndices.base};

  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;
