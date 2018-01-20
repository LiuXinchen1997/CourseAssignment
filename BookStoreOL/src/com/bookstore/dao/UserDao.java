package com.bookstore.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.bookstore.domain.User;
import com.bookstore.util.DBUtil;
import com.bookstore.util.LogUtil;
import com.bookstore.util.MD5Utils;

public class UserDao {
	private static final String TABLE = "user";
	
	public User customerLogin(String username, String password) {
		User user = null;
		Connection conn = DBUtil.getConnection();
		password = MD5Utils.md5Password(password+"{"+username+"}");
		String sql = "select * from " + TABLE + " where username = ? and password = ? and role = 1";
		LogUtil.writeLog(sql);
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, username);
			ps.setString(2, password);
			
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				user = new User();
				user.setId(rs.getInt("id"));
				user.setUsername(rs.getString("username"));
				user.setPassword(rs.getString("password"));
				user.setRole(rs.getInt("role"));
			}
			
			rs.close();
			ps.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBUtil.closeConnection(conn);
		}
		
		return user;
	}
	
	public static void main(String[] args) {
		String str = MD5Utils.md5Password("123456{aaa}");
		System.out.println(str);
	}
}
