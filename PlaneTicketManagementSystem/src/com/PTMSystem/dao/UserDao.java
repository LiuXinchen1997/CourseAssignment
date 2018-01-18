package com.PTMSystem.dao;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.PTMSystem.bean.User;
import com.PTMSystem.util.DBUtil;
import com.PTMSystem.util.LogUtil;
import com.PTMSystem.util.MD5Utils;

public class UserDao {
	private static final String USERTABLE = "usertbl";
	
	/**
	 * @param username
	 * @return 用户名存在返回真，否则返回假
	 */
	public boolean userExists(String username) {
		Connection conn = DBUtil.getConnection();
		String sql = "select * from " + USERTABLE + " where username = ?";
		
		PreparedStatement ps = null;
		try {
			ps = conn.prepareStatement(sql);
			ps.setString(1, username);
			
			ResultSet rs = ps.executeQuery();
			LogUtil.writeLog(sql);
			
			if (rs.next()) {
				return true;
			}
			
			rs.close();
			ps.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBUtil.closeConnection(conn);
		}
		return false;
	}
	
	/**
	 * @param u
	 * @return 保存注册信息，成功返回真，否则返回假
	 */
	public boolean saveUser(User u) {
		Connection conn = DBUtil.getConnection();
		String sql = "insert into "+ USERTABLE + "(username,password,sex,email,tel,idnum,point) values(?,?,?,?,?,?,?)";
		String password = u.getPassword() + "{" + u.getUsername() + "}";
		password = MD5Utils.md5Password(password);
		
		LogUtil.writeLog(sql);
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, u.getUsername());
			ps.setString(2, password);
			ps.setString(3, u.getSex());
			ps.setString(4, u.getEmail());
			ps.setString(5, u.getTel());
			ps.setString(6, u.getIdnum());
			ps.setInt(7, 0);
			
			ps.executeUpdate();
			ps.close();
			
			return true;
		} catch(Exception e) {
			e.printStackTrace();
			return false;
		} finally {
			DBUtil.closeConnection(conn);
		}
	}
	
	/**
	 * @param username
	 * @param password
	 * @return 登录成功返回user对象，否则返回null
	 */
	public User login(String username, String password) {
		User user = null;
		Connection conn = DBUtil.getConnection();
		password = MD5Utils.md5Password(password+"{"+username+"}");
		String sql = "select * from " + USERTABLE + " where username = ? and password = ? and privilege = 1";
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
				user.setEmail(rs.getString("email"));
				user.setTel(rs.getString("tel"));
				user.setSex(rs.getString("sex"));
				user.setIdnum(rs.getString("idnum"));
				user.setPoint(rs.getInt("point"));
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
	
	/**
	 * @param wheres
	 * @return 通过wheres条件获取一个User的List
	 */
	public List<User> getByWheres(String wheres) {
		List<User> users = new ArrayList<User>();
		
		Connection conn = DBUtil.getConnection();
		String sql = "select * from " + USERTABLE + " where " + wheres;
		LogUtil.writeLog(sql);
		
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			
			while (rs.next()) {
				User user = new User();
				user.setId(rs.getInt("id"));
				user.setUsername(rs.getString("username"));
				user.setPassword(rs.getString("password"));
				user.setEmail(rs.getString("email"));
				user.setTel(rs.getString("tel"));
				user.setSex(rs.getString("sex"));
				user.setIdnum(rs.getString("idnum"));
				user.setPoint(rs.getInt("point"));
				users.add(user);
			}
			
			rs.close();
			stmt.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBUtil.closeConnection(conn);
		}
		
		return users;
	}
	
	/**
	 * @param username
	 * @param oldPassword 原密码（未使用md5进行加密）
	 * @param newPassword 新密码（未使用md5进行加密）
	 * @return 修改密码成功返回true，否则返回false
	 */
	public boolean modifyPassword(String username, String oldPassword, String newPassword) {
		Connection conn = DBUtil.getConnection();
		oldPassword = MD5Utils.md5Password(oldPassword+"{"+username+"}");
		newPassword = MD5Utils.md5Password(newPassword+"{"+username+"}");
		String sql = "select password from " + USERTABLE + " where username = '" + username + "'";
		String updateSql = "update " + USERTABLE + " set password = '" + newPassword + "' where username = '" + username + "'";
		LogUtil.writeLog(sql);
		LogUtil.writeLog(updateSql);
		
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			
			if (rs.next()) {
				String password = rs.getString("password");
				if (password.equals(oldPassword)) {
					stmt.executeUpdate(updateSql);
					return true;
				}
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		
		return false;
	}
	
	public void modifyPersonalInfo(User user) {
		String sql = "update " + USERTABLE + " set sex = ?, email = ?, " + 
				"tel = ?, idnum = ? where username = ?";
		Connection conn = DBUtil.getConnection();
		LogUtil.writeLog(sql);
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, user.getSex());
			ps.setString(2, user.getEmail());
			ps.setString(3, user.getTel());
			ps.setString(4, user.getIdnum());
			ps.setString(5, user.getUsername());
			ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public User getByUsername(String username) {
		User u = null;
		String sql = "select * from " + USERTABLE + " where username = ?";
		Connection conn = DBUtil.getConnection();
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, username);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				u = new User();
				u.setId(rs.getInt(1));
				u.setUsername(rs.getString(2));
				u.setPassword(rs.getString(3));
				u.setSex(rs.getString(4));
				u.setEmail(rs.getString(5));
				u.setTel(rs.getString(6));
				u.setIdnum(rs.getString(7));
				u.setPoint(rs.getInt(8));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return u;
	}
	
	public static void main(String[] args) {
	}
}
