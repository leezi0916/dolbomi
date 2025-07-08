package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.dto.UserDto;

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

    UserDto.Response getUserInfoByEmail(String email);
}
