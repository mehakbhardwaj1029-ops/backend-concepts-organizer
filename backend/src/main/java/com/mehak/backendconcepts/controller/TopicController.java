package com.mehak.backendconcepts.controller;

import com.mehak.backendconcepts.dto.TopicRequest;
import com.mehak.backendconcepts.dto.TopicResponse;
import com.mehak.backendconcepts.service.TopicServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/v1/topics")
public class TopicController {

    private final TopicServiceImpl topicService;

    public TopicController(TopicServiceImpl topicService) {
        this.topicService = topicService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<TopicResponse> getTopicById(@PathVariable UUID id){
        TopicResponse response = topicService.getById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<TopicResponse>> getAll(){
        List<TopicResponse> topics = topicService.getAllTopics();
        return ResponseEntity.ok(topics);
    }
    @PostMapping("/add")
    public ResponseEntity<TopicResponse> addTopic(){
        TopicResponse response = topicService.addTopic();
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TopicResponse> updateTopic(
            @PathVariable UUID id,
            @RequestBody TopicRequest request){

        TopicResponse response = topicService.updateTopic(id,request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTopic(@PathVariable UUID id){
        topicService.deleteTopic(id);
        return ResponseEntity.noContent().build();
    }
}

//Controller talks to HTTP
//Service talks business
//Repository talks to database
//Entity talks to data