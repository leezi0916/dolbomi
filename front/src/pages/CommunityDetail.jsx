import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { commuService } from '../api/community';
import { ClipLoader } from 'react-spinners';

const CommunityDetail = () => {
  const [error, setError] = useState(null);
  const [communityDetail, setCommunityDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  const { no } = useParams();

  useEffect(() => {
    const loadCommunity = async () => {
      try {
        const community = await commuService.getCommunityDetail(no);
        console.log(community);
        setCommunityDetail(community);
      } catch (error) {
        console.error(error);
        const errorMessage = '목록을 불러오는데 실패했습니다.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadCommunity();
  }, [no]);

  if (loading) {
    return (
      <div>
        <ClipLoader size={50} aria-label="Loading Spinner" />
      </div>
    );
  }

  if (error) {
    return null;
  }

  if (!communityDetail) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      {communityDetail.map((info) => (
        <div key={info.no}>
          <div>{info.no}</div>
          <div>{info.title}</div>
          <div>{info.name}</div>
          <div>{info.createDate}</div>
          <div>{info.count}</div>
        </div>
      ))}
    </div>
  );
};

export default CommunityDetail;
