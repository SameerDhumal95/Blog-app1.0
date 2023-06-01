package com.codewithsameer.blog.payloads;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserDto {

	
	private int id;
	
	@NotEmpty(message = "Username must be min of 3 charactor ")
	@Size(min = 3,message = "Username must be min of 3 charactor !!")
	private String name;
   
	@Email(message = "Email address is not valid!!")
	@NotEmpty(message = "Email is required")
	private String email;
	
   @NotEmpty
   @Size(min = 3, max = 10 , message = "Password must be min of 3 charactor !!")
   private String password;
	
   @NotEmpty
	private String about;
	
   @JsonIgnore
   public String getPassword()
   {
	   return this.password;
   }
   
   @JsonProperty
   public void setPassword(String password)
   {
	   this.password=password;
   }
   
}
