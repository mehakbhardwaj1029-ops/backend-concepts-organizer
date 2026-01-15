package com.mehak.backendconcepts.service;

import com.mehak.backendconcepts.repository.TopicRepository;
import com.mehak.backendconcepts.configs.TopicNotFoundException;
import com.mehak.backendconcepts.dto.TopicRequest;
import com.mehak.backendconcepts.dto.TopicResponse;
import com.mehak.backendconcepts.entity.TopicEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service //annotate where the behaviour exists not where it is declared
public class TopicServiceImpl implements TopicService {

    private final TopicRepository topicRepository;

    public TopicServiceImpl(TopicRepository topicRepository){
        this.topicRepository = topicRepository;
    }

    @Override
    public TopicResponse addTopic() {

        //create new topic
        TopicEntity newTopic = new TopicEntity();
        newTopic.setId(UUID.randomUUID());

        //save to db
        TopicEntity savedTopic = topicRepository.save(newTopic);

        //return saved new entity's response object
        return convertToResponse(savedTopic);

    }

    @Override
    public TopicResponse updateTopic(UUID id, TopicRequest request) {
        TopicEntity topic = topicRepository.findById(id).orElseThrow(()->new TopicNotFoundException("Not available"));
        if(request.getName()!=null){
            topic.setName(request.getName());
        }
        if(request.getCode()!=null){
            topic.setCode(request.getCode());
        }
        if(request.getDocs()!=null){
            topic.setDocs(request.getDocs());
        }

        //save the updates
        topicRepository.save(topic);

        return convertToResponse(topic);
    }

    @Override
    public void deleteTopic(UUID id) {
        TopicEntity topic = topicRepository.findById(id).orElseThrow(()->new TopicNotFoundException("Not available"));
        topicRepository.deleteById(id);
    }

    @Override
    public List<TopicResponse> getAllTopics() {
        List<TopicEntity> topics = topicRepository.findAll();
        return topics.stream().map(this::convertToResponse).toList();
    }

    @Override
    public TopicResponse getById(UUID id) {
        TopicEntity entity = topicRepository.findById(id).orElseThrow(()->new TopicNotFoundException("Not available"));
        return convertToResponse(entity);
    }

    public TopicResponse convertToResponse(TopicEntity entity){

        return TopicResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .code(entity.getCode())
                .docs(entity.getDocs())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();

    }
}

//spring inject beans not static fields , never add static while injecting dependency.