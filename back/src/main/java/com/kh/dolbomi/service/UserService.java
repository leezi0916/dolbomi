package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.dto.UserCountsDto;
import com.kh.dolbomi.dto.UserDto;
import com.kh.dolbomi.dto.UserDto.ResetPwdDto;

public interface UserService {
    //회원가입
    Long createUser(UserDto.Create createDto);

    boolean isUserIdAvailable(String userId);

    User loginUser(UserDto.Login loginDto);

    UserDto.Response getUserInfoByUserId(String userId);


    UserDto.ProfileDto getUserProfile(Long userNo);


    UserDto.Response updateUser(Long userNo, UserDto.Update updateDto);

    // 회원 탈퇴 (논리 삭제)
    void deleteUser(Long userNo);

//    UserDto.Response getUserInfoByEmail(String email);

    //간병사, 보호자 카운트
    UserCountsDto getUserCounts();


    // 비밀번호 찾기 - 비밀번호 재설정
    void resetPassWord(ResetPwdDto resetPwdDto);

    void changePassword(Long userNo, String currentPassword, String newPassword);
}
