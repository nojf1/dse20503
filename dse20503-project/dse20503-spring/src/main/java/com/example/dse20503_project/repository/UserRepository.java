package com.example.dse20503_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.dse20503_project.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
        

    User findByUsername(String username);

    User findByEmail(String email);
}
