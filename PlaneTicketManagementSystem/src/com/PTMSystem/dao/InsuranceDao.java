package com.PTMSystem.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.PTMSystem.bean.Insurance;
import com.PTMSystem.util.DBUtil;
import com.PTMSystem.util.LogUtil;
import com.mysql.jdbc.log.Log;

public class InsuranceDao {
	private static final String TABLE = "insurance";
	
	public Insurance getById(int inid) {
		Insurance insurance = null;
		
		Connection conn = DBUtil.getConnection();
		String sql = "select * from " + TABLE + " where inid = " + inid;
		LogUtil.writeLog(sql);
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			if (rs.next()) {
				insurance = new Insurance();
				insurance.setInid(rs.getInt(1));
				insurance.setInname(rs.getString(2));
				insurance.setInmoney(rs.getInt(3));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return insurance;
	}
	
	public List<Insurance> getAll() {
		List<Insurance> list = new ArrayList<Insurance>();
		Connection conn = DBUtil.getConnection();
		String sql = "select * from " + TABLE;
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			while (rs.next()) {
				Insurance insurance = new Insurance();
				insurance.setInid(rs.getInt(1));
				insurance.setInname(rs.getString(2));
				insurance.setInmoney(rs.getInt(3));
				list.add(insurance);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	public void deleteInsurance(int inid) throws SQLException {
		Connection conn = DBUtil.getConnection();
		String sql = "delete from " + TABLE + " where inid = ?";
		PreparedStatement ps = conn.prepareStatement(sql);
		
		ps.setInt(1, inid);
		ps.executeUpdate();
		LogUtil.writeLog(sql);
	}
	
	public void insertInsurance(Insurance insurance) throws SQLException {
		Connection conn = DBUtil.getConnection();
		String sql = "insert into " + TABLE + " (inname, inmoney) values(?,?)";
		
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, insurance.getInname());
		ps.setInt(2, insurance.getInmoney());
		ps.executeUpdate();
		LogUtil.writeLog(sql);
	}
	
	public void updateInsurance(Insurance insurance) throws SQLException {
		Connection conn = DBUtil.getConnection();
		String sql = "update " + TABLE + " set inname = ?, inmoney = ? "
				+ " where inid = ?";
		
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, insurance.getInname());
		ps.setInt(2, insurance.getInmoney());
		ps.setInt(3, insurance.getInid());
		ps.executeUpdate();
		LogUtil.writeLog(sql);
	}
	
	public static void main(String[] args) {
	}
}
