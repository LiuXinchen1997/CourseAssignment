package com.oracle.ebp.service;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.oracle.ebp.dao.ShoppingCartMapper;
import com.oracle.ebp.domain.UserShopping;

@Service
@Scope("singleton")
public class ShoppingCartService {
	@Resource
	ShoppingCartMapper shoppingCartMapper;
	
	public UserShopping findUserShopping(int uid){
		UserShopping userShopping = shoppingCartMapper.findUserShopping(uid);
		return userShopping;
	}
	
	public void updateUserShopping(UserShopping userShopping) {
		shoppingCartMapper.updateUserShopping(userShopping);
	}
	
	public void createUserShopping(UserShopping userShopping) {
		shoppingCartMapper.createUserShopping(userShopping);
	}
	
}