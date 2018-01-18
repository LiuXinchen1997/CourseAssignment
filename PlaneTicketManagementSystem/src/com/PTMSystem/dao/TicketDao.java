package com.PTMSystem.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.PTMSystem.bean.Ticket;
import com.PTMSystem.util.DBUtil;
import com.PTMSystem.util.LogUtil;

public class TicketDao {
	private static String TABLE = "ticket";
	
	public List<Ticket> getTicketsByFid(String fid) {
		List<Ticket> list = new ArrayList<>();
		
		Connection conn = DBUtil.getConnection();
		String sql = "select * from " + TABLE + " where fid = " + fid;
		LogUtil.writeLog(sql);
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			
			while (rs.next()) {
				Ticket t = new Ticket();
				t.setTid(rs.getString(1));
				t.setFid(rs.getString(2));
				t.setType(rs.getInt(3));
				t.setFullReturnTime(rs.getDate(4));
				t.setReturnTime(rs.getDate(5));
				t.setReturnProMoneyPercent(rs.getFloat(6));
				t.setReturnLateMoneyPercent(rs.getFloat(7));
				t.setChangeTime(rs.getDate(8));
				t.setChangeProMoneyPercent(rs.getFloat(9));
				t.setPrice(rs.getInt(10));
				t.setFullSeat(rs.getInt(11));
				t.setRemainSeat(rs.getInt(12));
				t.setLuggageLimit(rs.getInt(13));
				t.setExceedmoney(rs.getInt(14));
				list.add(t);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	public Ticket getTicket(String fid, int type) {
		List<Ticket> list = getTicketsByFid(fid);
		for (Ticket ticket : list) {
			if (ticket.getType() == type)
				return ticket;
		}
		
		return null;
	}
	
	public Ticket getTicket(String tid) {
		Connection conn = DBUtil.getConnection();
		String sql = "select * from ticket where tid = ?";
		LogUtil.writeLog(sql);
		
		Ticket t = null;
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, tid);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				t = new Ticket();
				t.setTid(rs.getString(1));
				t.setFid(rs.getString(2));
				t.setType(rs.getInt(3));
				t.setFullReturnTime(rs.getDate(4));
				t.setReturnTime(rs.getDate(5));
				t.setReturnProMoneyPercent(rs.getFloat(6));
				t.setReturnLateMoneyPercent(rs.getFloat(7));
				t.setChangeTime(rs.getDate(8));
				t.setChangeProMoneyPercent(rs.getFloat(9));
				t.setPrice(rs.getInt(10));
				t.setFullSeat(rs.getInt(11));
				t.setRemainSeat(rs.getInt(12));
				t.setLuggageLimit(rs.getInt(13));
				t.setExceedmoney(rs.getInt(14));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return t;
	}
	
	public void decreaseTickets(String tid) {
		Connection conn = DBUtil.getConnection();
		String sql = "update Ticket set remainSeat = remainSeat - 1 where tid = ?";
		LogUtil.writeLog(sql);
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, tid);
			ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void increaseTickets(String tid) {
		Connection conn = DBUtil.getConnection();
		String sql = "update Ticket set remainSeat = remainSeat + 1 where tid = ?";
		LogUtil.writeLog(sql);
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, tid);
			ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public String convertType(int type) {
		if (1 == type) {
			return "经济舱";
		} else if (2 == type) {
			return "公务舱";
		} else if (3 == type) {
			return "头等舱";
		} else {
			return null;
		}
	}
	
	public float changeTicketMoney(String tid) {
		Ticket t = getTicket(tid);
		Date now = new Date();
		Date changeTime = t.getChangeTime();
		if (now.before(changeTime)) {
			return t.getPrice() * t.getChangeProMoneyPercent();
		} else {
			return -1;
		}
	}
	
	public String getChangeInfo(String tid) {
		float money = changeTicketMoney(tid);
		String info;
		if (money == -1) {
			info = "超过改签期限";
		} else {
			info = "改签所需手续费用： " + money + "元";
		}
		
		return info;
	}
	
	public float returnTicketMoney(String tid) {
		Ticket t = getTicket(tid);
		Date now = new Date();
		Date fullReturnTime = t.getFullReturnTime();
		Date returnTime = t.getReturnTime();
		float money = 0;
		
		if (now.before(fullReturnTime)) {
			money += t.getPrice() * t.getReturnProMoneyPercent();
		} else if (now.before(returnTime)) {
			money += t.getPrice() * t.getReturnProMoneyPercent();
			money += t.getPrice() * t.getReturnLateMoneyPercent();
		} else {
			return -1;
		}
		
		return money;
	}
	
	public String getReturnInfo(String tid) {
		float money = returnTicketMoney(tid);
		String info;
		if (money == -1) {
			info = "超过退票期限";
		} else {
			info = "退票所需手续费用： " + money + "元";
		}
		
		return info;
	}
	
	public List<Ticket> getAll() {
		List<Ticket> list = new ArrayList<Ticket>();
		
		String sql = "select * from " + TABLE;
		Connection conn = DBUtil.getConnection();
		
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			while (rs.next()) {
				Ticket t = new Ticket();
				t.setTid(rs.getString(1));
				t.setFid(rs.getString(2));
				t.setType(rs.getInt(3));
				t.setFullReturnTime(rs.getDate(4));
				t.setReturnTime(rs.getDate(5));
				t.setReturnProMoneyPercent(rs.getFloat(6));
				t.setReturnLateMoneyPercent(rs.getFloat(7));
				t.setChangeTime(rs.getDate(8));
				t.setChangeProMoneyPercent(rs.getFloat(9));
				t.setPrice(rs.getInt(10));
				t.setFullSeat(rs.getInt(11));
				t.setRemainSeat(rs.getInt(12));
				t.setLuggageLimit(rs.getInt(13));
				t.setExceedmoney(rs.getInt(14));
				list.add(t);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	public void deleteTicket(String tid) throws SQLException {
		new SeatDao().deleteSeat(tid);
		
		Connection conn = DBUtil.getConnection();
		String sql = "delete from " + TABLE + " where tid = ?";
		
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, tid);
		
		ps.executeUpdate();
	}
	
	public void insertTicket(Ticket t) throws SQLException {
		Connection conn = DBUtil.getConnection();
		String sql = "insert into " + TABLE + " values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, t.getTid());
		ps.setString(2, t.getFid());
		ps.setInt(3, t.getType());
		ps.setDate(4, t.getFullReturnTime());
		ps.setDate(5, t.getReturnTime());
		ps.setFloat(6, t.getReturnProMoneyPercent());
		ps.setFloat(7, t.getReturnLateMoneyPercent());
		ps.setDate(8, t.getChangeTime());
		ps.setFloat(9, t.getChangeProMoneyPercent());
		ps.setInt(10, t.getPrice());
		ps.setInt(11, t.getFullSeat());
		ps.setInt(12, t.getRemainSeat());
		ps.setInt(13, t.getLuggageLimit());
		ps.setInt(14, t.getExceedmoney());
		
		ps.executeUpdate();
		
		new SeatDao().insertSeat(t.getTid());
	}
	
	public void updateTicket(Ticket t) throws SQLException {
		Connection conn = DBUtil.getConnection();
		String sql = "update " + TABLE + " set fid = ?, type = ?, "
				+ " fullReturnTime = ?, returnTime = ?, returnProMoneyPercent = ?, "
				+ " returnLateMoneyPercent = ?, changeTime = ?, changeProMoneyPercent = ?, "
				+ " price = ?, fullSeat = ?, remainSeat = ?, luggageLimit = ?, "
				+ " exceedmoney = ? where tid = ?";
		PreparedStatement ps = conn.prepareStatement(sql);
		
		ps.setString(1, t.getFid());
		ps.setInt(2, t.getType());
		ps.setDate(3, t.getFullReturnTime());
		ps.setDate(4, t.getReturnTime());
		ps.setFloat(5, t.getReturnProMoneyPercent());
		ps.setFloat(6, t.getReturnLateMoneyPercent());
		ps.setDate(7, t.getChangeTime());
		ps.setFloat(8, t.getChangeProMoneyPercent());
		ps.setInt(9, t.getPrice());
		ps.setInt(10, t.getFullSeat());
		ps.setInt(11, t.getRemainSeat());
		ps.setInt(12, t.getLuggageLimit());
		ps.setInt(13, t.getExceedmoney());
		ps.setString(14, t.getTid());
		ps.executeUpdate();
	}
	
	public static void main(String[] args) {
	}
}
