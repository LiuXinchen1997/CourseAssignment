package com.PTMSystem.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.PTMSystem.bean.Admin;
import com.PTMSystem.util.DBUtil;
import com.PTMSystem.util.LogUtil;
import com.PTMSystem.util.MD5Utils;

public class AdminDao {
	private static final String USERTABLE = "usertbl";
	
	/**
	 * @param username
	 * @param password
	 * @return 登录成功返回user对象，否则返回null
	 */
	public Admin login(String username, String password) {
		Admin admin = null;
		Connection conn = DBUtil.getConnection();
		password = MD5Utils.md5Password(password+"{"+username+"}");
		String sql = "select * from " + USERTABLE + " where privilege <> 1 and username = ? and password = ?";
				
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, username);
			ps.setString(2, password);
			
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				admin = new Admin();
				admin.setId(rs.getInt("id"));
				admin.setPassword(rs.getString("password"));
				admin.setUsername(rs.getString("username"));
				admin.setPrivilege(rs.getInt("privilege"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return admin;
	}
}
