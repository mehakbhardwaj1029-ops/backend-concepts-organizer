package com.mehak.backendconcepts.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TopicRequest {


    private String name;

    private String code;

    private String docs;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}


//DTO's answer what endpoint this request excpect.