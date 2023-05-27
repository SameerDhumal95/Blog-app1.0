package com.codewithsameer.blog.services;

import com.codewithsameer.blog.payloads.CommentDto;

public interface CommentService {

	CommentDto createComment(CommentDto commentDto,Integer postId);

    void deleteComment(Integer commentId);
    
   
}
