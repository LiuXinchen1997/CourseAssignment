package com.PTMSystem.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.PTMSystem.bean.Insurance;
import com.PTMSystem.bean.Meal;
import com.PTMSystem.bean.Movie;
import com.PTMSystem.util.DBUtil;
import com.PTMSystem.util.LogUtil;

public class MealDao {
	private static final String TABLE = "meal";
	
	public Meal getById(int mealid) {
		Meal meal = null;
		
		Connection conn = DBUtil.getConnection();
		String sql = "select * from " + TABLE + " where mealid = " + mealid;
		LogUtil.writeLog(sql);
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			if (rs.next()) {
				meal = new Meal();
				meal.setMealid(rs.getInt(1));
				meal.setMealname(rs.getString(2));
				meal.setMealmoney(rs.getShort(3));
				meal.setMealtext(rs.getString(4));
				meal.setMealhot(rs.getInt(5));
				meal.setMealpoint(rs.getInt(6));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return meal;
	}
	
	public List<Meal> getAll() {
		List<Meal> list = new ArrayList<Meal>();
		Connection conn = DBUtil.getConnection();
		String sql = "select * from " + TABLE;
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			while (rs.next()) {
				Meal meal = new Meal();
				meal.setMealid(rs.getInt(1));
				meal.setMealname(rs.getString(2));
				meal.setMealmoney(rs.getShort(3));
				meal.setMealtext(rs.getString(4));
				meal.setMealhot(rs.getInt(5));
				meal.setMealpoint(rs.getInt(6));
				list.add(meal);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	public void deleteMeal(int mealid) throws SQLException {
		Connection conn = DBUtil.getConnection();
		String sql = "delete from " + TABLE + " where mealid = ?";
		PreparedStatement ps = conn.prepareStatement(sql);
		
		ps.setInt(1, mealid);
		ps.executeUpdate();
		LogUtil.writeLog(sql);
	}
	
	public void insertMeal(Meal meal) throws SQLException {
		Connection conn = DBUtil.getConnection();
		String sql = "insert into " + TABLE + " (mealname, mealmoney, mealtext, mealhot, mealpoint) values(?,?,?,?,?)";
		
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, meal.getMealname());
		ps.setInt(2, meal.getMealmoney());
		ps.setString(3, meal.getMealtext());
		ps.setInt(4, meal.getMealhot());
		ps.setInt(5, meal.getMealpoint());
		ps.executeUpdate();
		
		LogUtil.writeLog(sql);
	}
	
	public void updateMeal(Meal m) throws SQLException {
		Connection conn = DBUtil.getConnection();
		String sql = "update " + TABLE + " set mealname = ?, mealmoney = ?, mealtext = ?, mealhot = ?, mealpoint = ? "
				+ " where mealid = ?";
		
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, m.getMealname());
		ps.setInt(2, m.getMealmoney());
		ps.setString(3, m.getMealtext());
		ps.setInt(4, m.getMealhot());
		ps.setInt(5, m.getMealpoint());
		ps.setInt(6, m.getMealid());
		ps.executeUpdate();
		LogUtil.writeLog(sql);
	}
	
	public static void main(String[] args) throws Exception {
	}
}
