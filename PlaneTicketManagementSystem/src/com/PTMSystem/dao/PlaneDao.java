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
import com.PTMSystem.bean.Plane;
import com.PTMSystem.util.DBUtil;
import com.PTMSystem.util.LogUtil;

public class PlaneDao {
	private static final String INSURANCEPLANETABLE = "insuranceplane";
	private static final String MEALPLANETABLE = "mealplane";
	private static final String MOVIEPLANETABLE = "movieplane";
	private static final String INSURANCETABLE = "insurance";
	private static final String MEALTABLE = "meal";
	private static final String MOVIETABLE = "movie";
	private static final String PLANETABLE = "plane";
	
	public List<Integer> getInsuranceIds(String pid) {
		List<Integer> list = new ArrayList<>();
		
		String sql = "select * from " + INSURANCEPLANETABLE + " where pid = " + pid;
		LogUtil.writeLog(sql);
		Connection conn = DBUtil.getConnection();
		
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			while (rs.next()) {
				list.add(rs.getInt("inid"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	public List<Integer> getMealIds(String pid) {
		List<Integer> list = new ArrayList<>();
		
		String sql = "select * from " + MEALPLANETABLE + " where pid = " + pid;
		LogUtil.writeLog(sql);
		Connection conn = DBUtil.getConnection();
		
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			while (rs.next()) {
				list.add(rs.getInt("mealid"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	public List<Integer> getMovieIds(String pid) {
		List<Integer> list = new ArrayList<>();
		
		String sql = "select * from " + MOVIEPLANETABLE + " where pid = " + pid;
		LogUtil.writeLog(sql);
		Connection conn = DBUtil.getConnection();
		
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			while (rs.next()) {
				list.add(rs.getInt("mid"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	public List<Insurance> getInsurances(String pid) {
		List<Insurance> insurances = new ArrayList<>();
		List<Integer> ids = getInsuranceIds(pid);
		
		Connection conn = DBUtil.getConnection();
		for (int id : ids) {
			String sql = "select * from " + INSURANCETABLE + " where inid = " + id;
			LogUtil.writeLog(sql);
			try {
				Statement stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery(sql);
				if (rs.next()) {
					Insurance insurance = new Insurance();
					insurance.setInid(rs.getInt(1));
					insurance.setInname(rs.getString(2));
					insurance.setInmoney(rs.getInt(3));
					insurances.add(insurance);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		return insurances;
	}
	
	public List<Movie> getMovies(String pid) {
		List<Movie> movies = new ArrayList<>();
		List<Integer> ids = getMovieIds(pid);
		
		Connection conn = DBUtil.getConnection();
		for (int id : ids) {
			String sql = "select * from " + MOVIETABLE + " where mid = " + id;
			LogUtil.writeLog(sql);
			try {
				Statement stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery(sql);
				if (rs.next()) {
					Movie movie = new Movie();
					movie.setMid(rs.getInt(1));
					movie.setMname(rs.getString(2));
					movie.setMmoney(rs.getShort(3));
					movie.setMlong(rs.getInt(4));
					movie.setMhot(rs.getInt(5));
					movie.setMpoint(rs.getInt(6));
					movies.add(movie);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		return movies;
	}
	
	public List<Meal> getMeals(String pid) {
		List<Meal> meals = new ArrayList<>();
		List<Integer> ids = getMealIds(pid);
		
		Connection conn = DBUtil.getConnection();
		for (int id : ids) {
			String sql = "select * from " + MEALTABLE + " where mealid = " + id;
			LogUtil.writeLog(sql);
			try {
				Statement stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery(sql);
				if (rs.next()) {
					Meal meal = new Meal();
					meal.setMealid(rs.getInt(1));
					meal.setMealname(rs.getString(2));
					meal.setMealmoney(rs.getShort(3));
					meal.setMealtext(rs.getString(4));
					meal.setMealhot(rs.getInt(5));
					meal.setMealpoint(rs.getInt(6));
					meals.add(meal);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		return meals;
	}
	
	public Plane getPlaneByPid(String pid) {
		Plane plane = null;
		Connection conn = DBUtil.getConnection();
		String sql = "select * from " + PLANETABLE + " where pid = " + pid;
		LogUtil.writeLog(sql);
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			if (rs.next()) {
				plane = new Plane();
				plane.setPid(rs.getString("pid"));
				plane.setCompany(rs.getString("company"));
				plane.setScore(rs.getInt("score"));
				plane.setPnum(rs.getInt("pnum"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return plane;
	}
	
	public List<Plane> getAll() {
		List<Plane> list = new ArrayList<Plane>();
		Connection conn = DBUtil.getConnection();
		String sql = "select * from " + PLANETABLE;
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			while (rs.next()) {
				Plane plane = new Plane();
				plane.setPid(rs.getString("pid"));
				plane.setCompany(rs.getString("company"));
				plane.setScore(rs.getInt("score"));
				plane.setPnum(rs.getInt("pnum"));
				list.add(plane);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		
		return list;
	}
	
	public void insertInsurancePlane(String pid, int inid) {
		Connection conn = DBUtil.getConnection();
		String sql = "insert into " + INSURANCEPLANETABLE + " values(?,?)";
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, pid);
			ps.setInt(2, inid);
			ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void insertMoviePlane(String pid, int mid) {
		Connection conn = DBUtil.getConnection();
		String sql = "insert into " + MOVIEPLANETABLE + " values(?,?)";
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, pid);
			ps.setInt(2, mid);
			ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void insertMEALPlane(String pid, int mealid) {
		Connection conn = DBUtil.getConnection();
		String sql = "insert into " + MEALPLANETABLE + " values(?,?)";
		LogUtil.writeLog(sql);
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, pid);
			ps.setInt(2, mealid);
			ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void insertPlane(Plane plane, int[] inids, int[] mids, int[] mealids) {
		Connection conn = DBUtil.getConnection();
		String sql = "insert into " + PLANETABLE + " (pid, company) values(?,?)";
		LogUtil.writeLog(sql);
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, plane.getPid());
			ps.setString(2, plane.getCompany());
			ps.executeUpdate();
			
			String pid = plane.getPid();
			
			if (inids != null) {
				for (int inid : inids) {
					insertInsurancePlane(pid, inid);
				}
			}
			
			if (mids != null) {
				for (int mid : mids) {
					insertMoviePlane(pid, mid);
				}
			}
			
			if (mealids != null) {
				for (int mealid : mealids) {
					insertMEALPlane(pid, mealid);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void deletePlane(String pid) throws SQLException {
		Connection conn = DBUtil.getConnection();
		
		String sql = "delete from " + PLANETABLE + " where pid = ?";
		LogUtil.writeLog(sql);

		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, pid);
		
		ps.executeUpdate();
	}
	
	public void updatePlane(String pid, String company) throws SQLException {
		Connection conn = DBUtil.getConnection();
		
		String sql = "update " + PLANETABLE + " set company = ? where pid = ?";
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, company);
		ps.setString(2, pid);
		ps.executeUpdate();
	}
	
	public static void main(String[] args) {
	}
}
