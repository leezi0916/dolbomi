package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.UserDto;
import com.kh.dolbomi.entity.User;

import java.util.List;

public interface UserService {
    Long createUser(UserDto.Create createDto);
    boolean isUserIdAvailable(String userId);
    UserDto.Response loginUser(String userId, String userPwd);

    User findUserNo(Long userNo);
}
