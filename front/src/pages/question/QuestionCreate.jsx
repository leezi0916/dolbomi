import React, { useState } from 'react';
import { Btn, Input, Page } from '../../styles/common/Board';
import { BoardMenu, MenuDiv, MenuLink, PageInfo, PageTitle, PageTop, Textarea } from './style/Question.styles';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { commuService } from '../../api/community';
import useUserStore from '../../store/userStore';

const QuestionCreate = () => {
  //   const userId = useUserStore((state) => state.user?.userId);
  const userNo = useUserStore((state) => state.user?.userNo);

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [files, setFiles] = useState([]);

  const onSubmit = async (data) => {
    if (!data.boardTitle.trim() || !data.boardContent.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      const questionData = {
        board_title: data.boardTitle,
        board_content: data.boardContent,
        user_no: userNo,
        role: 'Q',
        question_status: 'N',
        question_category: data.category,
      };

      const response = await commuService.createQuestion(questionData);
      console.log(response);

      // 파일 업로드
      // if (files.length > 0) {
      //   const formData = new FormData();
      //   files.forEach((file) => {
      //     formData.append('files', file);
      //   });

      //   await commuService.uploadFiles(response.board_no, formData);
      // }
      toast.success('등록되었습니다');
      navigate('/question/history');
    } catch (error) {
      console.error(error);
      const errorMessage = '등록에 실패했습니다. 다시 시도해주세요.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
      reset();
      setFiles([]);
    }
  };

  if (error) {
    return null;
  }
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // FileList → 배열
    setFiles(selectedFiles);
  };

  return (
    <Page>
      <PageInfo>
        <PageTop>
          <PageTitle> 1:1 문의사항 </PageTitle>
          <BoardMenu>
            <MenuLink to="/question/full">전체</MenuLink>
            <MenuLink to="/question/history">문의내역</MenuLink>
            <MenuDiv>문의하기</MenuDiv>
          </BoardMenu>
        </PageTop>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PageBody>
            <div>
              <div>유형</div>
              <select {...register('category')}>
                <option value="T">기술적 문제</option>
                <option value="S">서비스 관련</option>
                <option value="E">기타</option>
              </select>
            </div>

            <div>
              <div>제목</div>
              <Input type="text" placeholder="제목을 입력하세요" {...register('boardTitle')} disabled={isSubmitting} />
            </div>
            <div>
              <div>내용</div>
              <Textarea as="textarea" {...register('boardContent')} disabled={isSubmitting} />
            </div>
            <div>
              <div>파일 첨부</div>
              <input type="file" multiple onChange={handleFileChange} />
            </div>
            <div>
              <div></div>
              <ul style={{ display: 'flex', flexDirection: 'column' }}>
                {files.map((file, index) => (
                  <li key={index} style={{ marginRight: 'auto' }}>
                    {file.name}
                  </li> // 파일 이름 출력
                ))}
              </ul>
            </div>
            <div>
              <div></div>
              <Button type="button">취소</Button>
              <Button type="submit" onClick={handleSubmit}>
                등록
              </Button>
            </div>
          </PageBody>
        </form>
      </PageInfo>
    </Page>
  );
};

const PageBody = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.gray[3]};
  padding: 20px 20px 0 20px;
  > div {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    > div {
      min-width: 80px;
      padding-right: 10px;
    }
  }
`;

const Button = styled(Btn)`
  margin-right: 10px;
  padding: 10px 20px;
`;
export default QuestionCreate;
