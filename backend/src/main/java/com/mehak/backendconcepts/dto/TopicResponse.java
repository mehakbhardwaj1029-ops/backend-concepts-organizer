package com.mehak.backendconcepts.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopicResponse {

    private UUID id;

    private String name;

    private String code;

    private String docs;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
