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

public class MovieDao {
	private static final String TABLE = "movie";
	
	public Movie getById(int mid) {
		Movie movie = null;
		
		Connection conn = DBUtil.getConnection();
		String sql = "select * from " + TABLE + " where mid = " + mid;
		LogUtil.writeLog(sql);
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			if (rs.next()) {
				movie = new Movie();
				movie.setMid(rs.getInt(1));
				movie.setMname(rs.getString(2));
				movie.setMmoney(rs.getShort(3));
				movie.setMlong(rs.getInt(4));
				movie.setMhot(rs.getInt(5));
				movie.setMpoint(rs.getInt(6));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return movie;
	}
	
	public List<Movie> getAll() {
		List<Movie> list = new ArrayList<Movie>();
		Connection conn = DBUtil.getConnection();
		String sql = "select * from " + TABLE;
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			while (rs.next()) {
				Movie movie = new Movie();
				movie.setMid(rs.getInt(1));
				movie.setMname(rs.getString(2));
				movie.setMmoney(rs.getShort(3));
				movie.setMlong(rs.getInt(4));
				movie.setMhot(rs.getInt(5));
				movie.setMpoint(rs.getInt(6));
				list.add(movie);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	public void deleteMovie(int mid) throws SQLException {
		Connection conn = DBUtil.getConnection();
		String sql = "delete from " + TABLE + " where mid = ?";
		PreparedStatement ps = conn.prepareStatement(sql);
		
		ps.setInt(1, mid);
		ps.executeUpdate();
		LogUtil.writeLog(sql);
	}
	
	public void insertMovie(Movie movie) throws SQLException {
		Connection conn = DBUtil.getConnection();
		String sql = "insert into " + TABLE + " (mname, mmoney, mlong, mhot, mpoint) values(?,?,?,?,?)";
		
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, movie.getMname());
		ps.setInt(2, movie.getMmoney());
		ps.setInt(3, movie.getMlong());
		ps.setInt(4, movie.getMhot());
		ps.setInt(5, movie.getMpoint());
		
		ps.executeUpdate();
		LogUtil.writeLog(sql);
	}
	
	public void updateMovie(Movie m) throws SQLException {
		Connection conn = DBUtil.getConnection();
		String sql = "update " + TABLE + " set mname = ?, mmoney = ?, mlong = ?, mhot = ?, mpoint = ? "
				+ " where mid = ?";
		
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, m.getMname());
		ps.setInt(2, m.getMmoney());
		ps.setInt(3, m.getMlong());
		ps.setInt(4, m.getMhot());
		ps.setInt(5, m.getMpoint());
		ps.setInt(6, m.getMid());
		ps.executeUpdate();
		LogUtil.writeLog(sql);
	}
	
	public static void main(String[] args) {
	}
}
