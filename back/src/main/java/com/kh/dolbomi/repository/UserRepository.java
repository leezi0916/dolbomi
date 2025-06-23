package com.kh.dolbomi.repository;

import com.kh.dolbomi.entity.User;

import java.util.List;

public interface UserRepository {
    void save(User User);
    List<User> findByUserId(String userId);

}
