package com.codewithsameer.blog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codewithsameer.blog.entities.Role;

public interface RoleRepo  extends JpaRepository<Role, Integer>{

}
