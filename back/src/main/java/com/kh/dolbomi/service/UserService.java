package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.UserDto;

import java.util.List;

public interface UserService {
    Long createUser(UserDto.Create createDto);
    boolean isUserIdAvailable(String userId);
    UserDto.Response loginUser(String userId, String userPwd);
}
