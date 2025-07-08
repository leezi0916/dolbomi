package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.Matching;
import com.kh.dolbomi.domain.Notification;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.dto.MatchingDto;
import com.kh.dolbomi.dto.MatchingDto.Response;
import com.kh.dolbomi.enums.StatusEnum.Status;
import com.kh.dolbomi.exception.InvalidMatchingUserException;
import com.kh.dolbomi.exception.MatchingNotFoundException;
import com.kh.dolbomi.repository.MatchingRepository;
import com.kh.dolbomi.repository.MatchingRepositoryV2;
import com.kh.dolbomi.repository.NotificationRepositoryV2;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MatcingServicelmpl implements MatchingService {

    private final MatchingRepository matchingRepository;
    private final MatchingRepositoryV2 matchingRepositoryV2;
    private final NotificationRepositoryV2 notificationRepositoryV2;


    @Override
    @Transactional(readOnly = true)
    public List<MatchingDto.Response> getMatchingCargiverList(Long patNo, Status status) {

        return matchingRepositoryV2.findByPatient_PatNoAndStatusOrderByMatNoDesc(patNo, status).stream()
                .map(MatchingDto.Response::toDto)
                .collect(Collectors.toList());

    }

    @Override
    @Transactional(readOnly = true)
    public Page<MatchingDto.Response> getMatchedListByStatus(Long patNo, Status status, Pageable pageable) {

        return matchingRepositoryV2.findByPatient_PatNoAndStatusOrderByEndDateDesc(patNo, status, pageable)
                .map(MatchingDto.Response::toDto);
    }


    public List<MatchingDto.ResponsePat> getMatchingListCaregiver(Long caregiverNo, Status status) {

        return matchingRepositoryV2.findByCaregiver_UserNoAndStatusOrderByMatNoDesc(caregiverNo, status).stream()
                .map(MatchingDto.ResponsePat::from)
                .collect(Collectors.toList());


    }

    //매칭 상태 변경하여 간병종료 시키기
    @Override
    public Long changeStatus(Long matNo, Status matchingStatus) {
        Matching matching = matchingRepository.findByMetNo(matNo)
                .orElseThrow(() -> new MatchingNotFoundException("매칭이 존재하지 않습니다."));
        matching.updateStatus(matchingStatus);
        Matching saved = matchingRepository.save(matching);

        //매칭 상태가 'N'종료 되었을때 알림 생성
        if (matchingStatus == Status.N) {
            User caregiver = matching.getCaregiver(); //알림 수신자
            User guardian = matching.getPatient().getGuardian(); // 보호자(알림 발신자)

            if (caregiver == null || guardian == null) {
                throw new InvalidMatchingUserException("매칭된 간병인 또는 보호자 정보가 존재하지 않습니다.");
            }

            String notificationMessage = caregiver.getUserName() + " 간병사님과의 매칭이 종료되었습니다.";
            String notificationLinkUrl = "/guardian/matchpage";

            Notification notification = Notification.builder()
                    .recipient(guardian)
                    .sender(caregiver)
                    .notificationMessage(notificationMessage)
                    .notificationLinkUrl(notificationLinkUrl)
                    .build();

            notificationRepositoryV2.save(notification);
        }

        return saved.getMatNo();
    }

    //종료된 매칭 - 간병인 버전
    @Override
    public Page<MatchingDto.ResponsePat> getMatchedPatientsByCaregiver(Long caregiverNo, Status status,
                                                                       Pageable pageable) {
        return matchingRepositoryV2.findByCaregiver_UserNoAndStatusOrderByEndDateDesc(caregiverNo, status, pageable)
                .map(MatchingDto.ResponsePat::from);

    }


    // 종료된 매칭에 회원탈퇴한 유저list
    @Override
    public Page<Response> getMatchedListByCheckStatus(Long patNo, Status status, Status userStatus, Pageable pageable) {

        System.out.println("test :" + patNo + ":" + status + ":" + userStatus + ":" + pageable.getPageSize());
        return matchingRepository.findByCheckList(patNo, status, userStatus, pageable)
                .map(MatchingDto.Response::toDto);
    }

    @Override
    public Page<Response> getMatchedListBySearch(Long patNo, LocalDateTime startDate, LocalDateTime endDate,
                                                 Status status, Pageable pageable) {
        
        return matchingRepository.findBySearchDateList(patNo, startDate, endDate, status, pageable)
                .map(MatchingDto.Response::toDto);
    }


}
