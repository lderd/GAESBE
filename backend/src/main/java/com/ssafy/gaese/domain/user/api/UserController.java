package com.ssafy.gaese.domain.user.api;

import com.ssafy.gaese.domain.user.dto.UserDto;
import com.ssafy.gaese.domain.user.application.UserService;
import com.ssafy.gaese.domain.user.repository.UserRepository;
import com.ssafy.gaese.security.model.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal CustomUserDetails user) {
        UserDto userDto = userRepository.findById(user.getId()).orElseThrow(() -> new IllegalStateException("not found user")).toDto();
        return ResponseEntity.ok().body(userDto);
    }

    @PostMapping("/modify")
    public ResponseEntity<UserDto> modify(
            @RequestBody UserDto userDto,
            @AuthenticationPrincipal CustomUserDetails user) {
        UserDto modifyUser = userService.modify(userDto, user.getId());
        return ResponseEntity.ok().body(modifyUser);
    }


    @DeleteMapping
    public ResponseEntity<Boolean> delete(
            @AuthenticationPrincipal CustomUserDetails user) {
        boolean isDeleted = userService.delete(user.getId());

        return ResponseEntity.ok().body(isDeleted);
    }

    @GetMapping("/modify/check/{nickname}")
    public ResponseEntity<Boolean> checkDuplicated(
            @PathVariable String nickname) {
        boolean isDuplicated = userService.isDuplicated(nickname);

        return ResponseEntity.ok().body(isDuplicated);
    }
}
