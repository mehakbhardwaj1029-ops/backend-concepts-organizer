package com.mehak.backendconcepts.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity(name = "topic")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopicEntity {

    @Id
    @JdbcTypeCode(SqlTypes.CHAR)  // db table as datatype char(36) but hibernate is translating to binary(16) so we have to explicitly tell hibernate to consider CHAR(36) format
    @Column(name="id",nullable = false,unique = true,length=36)
    private UUID id;

    @Column(name="name",unique = true,length = 200)
    private String name;

    @Lob
    @Column(name="code",columnDefinition = "LONGTEXT")
    private String code;

    @Lob
    @Column(name="docs",columnDefinition = "LONGTEXT")
    private String docs;

    @Column(name="created_at",insertable = false,updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name="updated_at",insertable = false,updatable = false)
    private LocalDateTime updatedAt;

    public void prePersist(UUID id){
        this.id = UUID.randomUUID();
    }

}

//DB is the boss. Hibernate is just a translator.

