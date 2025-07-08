import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../styles/Auth.styles';

const PostcodeSearch = ({ onAddressSelected }) => {
  const layerRef = useRef(null);

  // 다음 주소 api 스크립트가 없으면 추가 (필요 시)
  useEffect(() => {
    if (!window.daum) {
      const script = document.createElement('script');
      script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;
      document.body.appendChild(script);
      return () => document.body.removeChild(script);
    }
  }, []);

  // 우편번호 검색창 열기
  const openPostcode = () => {
    const currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = '';
        let extraAddr = '';

        if (data.userSelectedType === 'R') {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === 'R') {
          if (data.bname && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName && data.apartment === 'Y') {
            extraAddr += extraAddr ? `, ${data.buildingName}` : data.buildingName;
          }
          if (extraAddr) {
            extraAddr = ` (${extraAddr})`;
          }
        }

        onAddressSelected({
          zonecode: data.zonecode,
          address: addr,
          extraAddress: extraAddr,
        });

        if (layerRef.current) {
          layerRef.current.style.display = 'none';
        }
        document.body.scrollTop = currentScroll;
        document.documentElement.scrollTop = currentScroll;
      },
      //여기서 속성추가 가능
      width: '100%',
      height: '100%',
      maxSuggestItems: 5,
      shorthand: false,
    }).embed(layerRef.current);

    if (layerRef.current) {
      layerRef.current.style.display = 'block';
      centerLayer();
    }
  };

  // 레이어 가운데 정렬 함수
  const centerLayer = () => {
    if (!layerRef.current) return;

    const width = 500;
    const height = 600;
    const borderWidth = 5;

    layerRef.current.style.width = `${width}px`;
    layerRef.current.style.height = `${height}px`;
    layerRef.current.style.border = `${borderWidth}px solid #000`;
    layerRef.current.style.position = 'fixed';
    layerRef.current.style.zIndex = 1000;

    const left = ((window.innerWidth || document.documentElement.clientWidth) - width) / 2 - borderWidth;
    const top = ((window.innerHeight || document.documentElement.clientHeight) - height) / 2 - borderWidth;

    layerRef.current.style.left = `${left}px`;
    layerRef.current.style.top = `${top}px`;
  };

  // 닫기 버튼 핸들러
  const closeLayer = () => {
    if (layerRef.current) {
      layerRef.current.style.display = 'none';
    }
  };

  // 윈도우 리사이즈 시 레이어 위치 다시 계산
  useEffect(() => {
    const handleResize = () => {
      centerLayer();
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <>
      <CheckDuplicateButton type="button" onClick={openPostcode}>
        주소찾기
      </CheckDuplicateButton>

      <Layer ref={layerRef} style={{ display: 'none' }}>
        <CloseButton onClick={closeLayer} src="//t1.daumcdn.net/postcode/resource/images/close.png" alt="닫기" />
      </Layer>
    </>
  );
};

// styled-components
const CheckDuplicateButton = styled(Button)`
  width: auto;
  min-width: 100px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  white-space: nowrap;
`;

const Layer = styled.div`
  background-color: white;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.img`
  cursor: pointer;
  position: absolute;
  right: -3px;
  top: -3px;
  width: 20px;
  height: 20px;
  z-index: 10;
`;

export default PostcodeSearch;
