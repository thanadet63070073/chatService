package com.example.chatService.controllers;

import com.example.chatService.models.UserModel;
import com.example.chatService.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController extends BaseController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<UserModel> getAllUser() {
        return this.userService.getAllUser();
    }

    @GetMapping("/user/{id}")
    public String getUserById(@PathVariable String id) {
        return "user id: " + id;
    }

    @PostMapping("/user")
    public String addUser(@RequestBody UserModel userModel) {
        return "user added: " + userModel;
    }

    @PutMapping("/user")
    public String updateUser(@RequestBody UserModel userModel) {
        return  "user updated: " + userModel;
    }

    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable String id) {
        return "user deleted: " + id;
    }
}
