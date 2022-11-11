package com.ssafy.gaese.domain.user.entity;

import com.ssafy.gaese.domain.algorithm.dto.AlgoUserDto;
import com.ssafy.gaese.domain.cs.entity.CsRecord;
import com.ssafy.gaese.domain.cs.entity.CsRecordProblem;
import com.ssafy.gaese.domain.friends.dto.FriendDto;
import com.ssafy.gaese.domain.friends.entity.FriendRequest;
import com.ssafy.gaese.domain.friends.entity.Friends;
import com.ssafy.gaese.domain.user.dto.UserDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "User")
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @Column(unique = true, nullable = false)
    private String socialId;


    @Column(nullable = true, unique = true)
    private String nickname;


    private String img;

    private String bjId;

    @Column(nullable = false)
    private UserRole userRole;

    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;

    private String refreshToken;

    @OneToOne(mappedBy = "user"
            , cascade = {
            CascadeType.PERSIST
            ,CascadeType.MERGE
            , CascadeType.REMOVE // 사용자 삭제시 FCM Key 함께 삭제
    }
    )
    private Ability ability;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<CsRecord> csRecordList = new ArrayList<>();


    @ColumnDefault("0")
    private int profileChar;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Attendance> attendanceList;

    @OneToMany(mappedBy = "firstUser", cascade = CascadeType.REMOVE)
    private Set<Friends> firstUser;

    @OneToMany(mappedBy = "secondUser", cascade = CascadeType.REMOVE)
    private Set<Friends> secondUser;

    @OneToMany(mappedBy = "requestUser", cascade = CascadeType.REMOVE)
    private Set<FriendRequest> requestUser;

    @OneToMany(mappedBy = "targetUser", cascade = CascadeType.REMOVE)
    private Set<FriendRequest> targetUser;



    public User update(String nickname, int profileChar) {
        this.nickname = nickname;
        this.profileChar = profileChar;
        return this;
    }

    public UserDto toDto() {
        return UserDto.builder()
                .nickname(this.nickname)
                .id(this.id)
                .profileChar(this.profileChar)
                .bjId(this.bjId)
                .build();
    }

    public FriendDto toFriendDto() {
        return FriendDto.builder()
                .nickname(this.nickname)
                .id(this.id)
                .profileChar(this.profileChar)
                .build();
    }
    public AlgoUserDto toAlgoDto(){
        return AlgoUserDto.builder()
                .id(this.id)
                .bjId(this.bjId)
                .nickname(this.nickname)
                .profileChar(this.profileChar)
                .build();
    }

}
