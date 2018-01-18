package com.PTMSystem.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.sql.Types;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.logging.log4j.core.config.Order;

import com.PTMSystem.bean.Bill;
import com.PTMSystem.bean.Insurance;
import com.PTMSystem.bean.Meal;
import com.PTMSystem.bean.Movie;
import com.PTMSystem.bean.OrderList;
import com.PTMSystem.bean.Ticket;
import com.PTMSystem.util.DBUtil;
import com.PTMSystem.util.LogUtil;

public class OrderListDao {
	private static final String TABLE = "orderlist";

	public void insertARecord(OrderList ol) throws SQLException {
		Connection conn = DBUtil.getConnection();
		String sql = "insert into " + TABLE + " (uid,tid,seatno,inid,mid,mealid,time) values(?,?,?,?,?,?,?)";
		LogUtil.writeLog(sql);

		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setInt(1, ol.getUid());
		ps.setString(2, ol.getTid());
		ps.setInt(3, ol.getSeatno());

		if (ol.getInid() == 0) {
			ps.setNull(4, Types.INTEGER);
		} else {
			ps.setInt(4, ol.getInid());
		}

		if (ol.getMid() == 0) {
			ps.setNull(5, Types.INTEGER);
		} else {
			ps.setInt(5, ol.getMid());
		}

		if (ol.getMealid() == 0) {
			ps.setNull(6, Types.INTEGER);
		} else {
			ps.setInt(6, ol.getMealid());
		}

		Date da = new Date();// 取当前时间
		SimpleDateFormat sf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String formatDa = sf.format(da);
		ps.setTimestamp(7, Timestamp.valueOf(formatDa));
		// ps.setTimestamp(7, s);

		ps.executeUpdate();
	}

	public void deleteARecord(String tid, int uid) {
		Connection conn = DBUtil.getConnection();
		String sql = "delete from " + TABLE + " where tid = " + tid + " and uid = " + uid;
		LogUtil.writeLog(sql);

		try {
			Statement stmt = conn.createStatement();
			stmt.executeUpdate(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public OrderList getARecord(String tid, int uid) {
		OrderList ol = null;

		Connection conn = DBUtil.getConnection();
		String sql = "select * from " + TABLE + " where tid = ? and uid = ?";
		LogUtil.writeLog(sql);

		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, tid);
			ps.setInt(2, uid);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				ol = new OrderList();
				ol.setUid(rs.getInt(1));
				ol.setTid(rs.getString(2));
				ol.setSeatno(rs.getInt(3));
				ol.setInid(rs.getInt(4));
				ol.setMid(rs.getInt(5));
				ol.setMealid(rs.getInt(6));
				ol.setTime(rs.getTimestamp(7));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return ol;
	}

	public List<OrderList> getAllByUid(int uid) {
		List<OrderList> list = new ArrayList<>();

		Connection conn = DBUtil.getConnection();
		String sql = "select * from " + TABLE + " where uid = ?";
		LogUtil.writeLog(sql);

		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, uid);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				OrderList ol = new OrderList();
				ol.setUid(rs.getInt(1));
				ol.setTid(rs.getString(2));
				ol.setSeatno(rs.getInt(3));
				ol.setInid(rs.getInt(4));
				ol.setMid(rs.getInt(5));
				ol.setMealid(rs.getInt(6));
				ol.setTime(rs.getTimestamp(7));
				list.add(ol);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return list;
	}

	public Bill getSingleBillByOL(OrderList ol) {
		if (ol == null) {
			return null;
		}

		Bill bill = new Bill();
		bill.setTime(ol.getTime());

		Ticket ticket = new TicketDao().getTicket(ol.getTid());

		bill.setFid(ticket.getFid());
		bill.setType(new TicketDao().convertType(ticket.getType()));
		bill.setTicketCost(ticket.getPrice());
		bill.setSeatno(ol.getSeatno());

		Insurance insurance = new InsuranceDao().getById(ol.getInid());
		if (insurance != null) {
			bill.setInsuranceName(insurance.getInname());
			bill.setInsuranceCost(insurance.getInmoney());
		} else {
			bill.setInsuranceCost(0);
		}

		Movie movie = new MovieDao().getById(ol.getMid());
		if (movie != null) {
			bill.setMovieName(movie.getMname());
			bill.setMovieCost(movie.getMmoney());
		} else {
			bill.setMovieCost(0);
		}

		Meal meal = new MealDao().getById(ol.getMealid());
		if (meal != null) {
			bill.setMealName(meal.getMealname());
			bill.setMealCost(meal.getMealmoney());
		} else {
			bill.setMealCost(0);
		}

		bill.setSumCost(bill.getTicketCost() + bill.getInsuranceCost() + bill.getMovieCost() + bill.getMealCost());

		return bill;
	}

	public static void main(String[] args) {
		// OrderList ol = new OrderList();
		// ol.setInid(1);
		// ol.setMealid(1);
		// ol.setMid(1);
		// ol.setTid("00001");
		// ol.setSeatno(4);
		// ol.setUid(3);
		// ol.setTime(new Timestamp(new Date().getTime()));
		// new OrderListDao().insertARecord(ol);
	}
}
