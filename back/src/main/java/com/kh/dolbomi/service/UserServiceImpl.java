package com.kh.dolbomi.service;


import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.dto.UserDto;
import com.kh.dolbomi.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    // PasswordEncoder 주입
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public Long createUser(UserDto.Create createDto) {
        User user = createDto.toEntity();

        String encodedPwd = passwordEncoder.encode(createDto.getUser_pwd());
        //비밀번호 암호화 추가
        user.changePassword(encodedPwd);
        userRepository.save(user);
        return user.getUserNo();  // PK 반환 (id 필드 존재 시)
    }

    @Override
    public boolean isUserIdAvailable(String userId) {
        return userRepository.findByUserId(userId).isEmpty();
    }

    @Override
    public UserDto.Response loginUser(String userId, String userPwd) {
        List<User> users = userRepository.findByUserId(userId);

        if (users.isEmpty()) {
            throw new EntityNotFoundException("해당 아이디를 찾을 수 없습니다.");
        }

        User user = users.get(0);

        if (!passwordEncoder.matches(userPwd, user.getUserPwd())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return UserDto.Response.toDto(user);
    }


}
