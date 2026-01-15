package com.mehak.backendconcepts.service;

import com.mehak.backendconcepts.dto.TopicRequest;
import com.mehak.backendconcepts.dto.TopicResponse;

import java.util.List;
import java.util.UUID;

public interface TopicService {

      TopicResponse addTopic();

      TopicResponse updateTopic(UUID id, TopicRequest request);

      void deleteTopic(UUID id);

      List<TopicResponse> getAllTopics();

      TopicResponse getById(UUID id);
}
