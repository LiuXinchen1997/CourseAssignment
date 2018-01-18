package com.oracle.ebp.dao;

import java.sql.Timestamp;
import java.util.List;

import com.oracle.ebp.domain.ModifyPasswordBean;
import com.oracle.ebp.domain.UpdateUserBean;
import com.oracle.ebp.domain.User;

public interface UserMapper {

	/**
	 * @param money
	 * @param username
	 * @return 通过用户名给某个用户充值
	 */
	public int topUpMoney(double money, String username);

	/**
	 * @param username	
	 * @return 按照用户名获得User对象，如果不存在则返回空值
	 */
	public User getUserByUsername(String username);

	// 管理员查询日期获取信息
	public List<User> AdminGetUserBySday_Eday(Timestamp starttime, Timestamp endtime, Integer FirstRecord,
			Integer MaxShowNumber);

	// 管理员用来计算查询日期最大页数的所有记录数
	public Integer AdminGetUserBySday_Eday_recordCount(Timestamp starttime, Timestamp endtime);

	// 管理员查询用户信息获取信息
	public List<User> AdminGetUserBynuit(String name, String idCard, String telno, Integer FirstRecord,
			Integer MaxShowNumber);

	// 管理员用来计算查询用户信息获取信息最大页数的所有记录数
	public Integer AdminGetUserBynuit_recordCount(String name, String idCard, String telno);

	// 管理员禁用和启用更新
	public void AdminChangeUserStatus(int uid, int status);

	// 管理员查看禁用和启用更新是否成功
	public int AdminQueryChangeUserStatus(int uid);
	
	public int saveUser(User user);
	
	public int updateUser(UpdateUserBean updateUserBean);	
	
	public int decreaseMoney(double money, String username);
	
	public int modifyPassword(String newPassword, int uid);
	
	public User getUserByUid(int uid);
}
