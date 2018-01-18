package com.oracle.ebp.dao;

import com.oracle.ebp.domain.UserShopping;

public interface ShoppingCartMapper {
	public UserShopping findUserShopping(int uid);
	public void updateUserShopping(UserShopping userShopping);
	public int createUserShopping(UserShopping userShopping);
}
