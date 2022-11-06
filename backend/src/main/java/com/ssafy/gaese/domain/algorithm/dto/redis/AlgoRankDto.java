package com.ssafy.gaese.domain.algorithm.dto.redis;


import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;


@Getter
@Builder
@ToString
@RedisHash(value = "algoRank")
public class AlgoRankDto {

    @Id
    Long userId;
    String roomCode;
    String min;
    String nickName;

}
