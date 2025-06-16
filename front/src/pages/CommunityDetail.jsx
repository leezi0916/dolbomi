import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { commuService } from '../api/community';

const CommunityDetail = () => {
  const [error, setError] = useState(null);
  const [communityList, setCommunityList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { no } = useParams();
  const community = communityList.find((item) => item.no === no);

  useEffect(() => {
    const loadCommunity = async () => {
      try {
        const community = await commuService.getCommunity();
        console.log(community);
        setCommunityList(community);
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
  }, []);

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

  if (!community) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }
  return (
    <div>
      <div>
        <div>{community.no}</div>
        <div>{community.title}</div>
        <div>{community.name}</div>
        <div>{community.createDate}</div>
        <div>{community.count}</div>
      </div>
    </div>
  );
};

export default CommunityDetail;
