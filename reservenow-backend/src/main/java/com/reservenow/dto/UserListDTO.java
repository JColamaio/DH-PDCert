package com.reservenow.dto;

import com.reservenow.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserListDTO {
    private Long id;
    private String name;
    private String email;
    private Role role;
}
