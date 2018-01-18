package com.PTMSystem.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Date;

import com.PTMSystem.bean.Ticket;
import com.PTMSystem.util.DBUtil;
import com.PTMSystem.util.LogUtil;

public class SeatDao {
	private static final String TABLE = "seat";
	
	public void setFlag(String tid, int seatnum) {
		Connection conn = DBUtil.getConnection();
		
		String sql = "update " + TABLE + " set flag = 1 where tid = ? and seatnum = ?";
		LogUtil.writeLog(sql);
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, tid);
			ps.setInt(2, seatnum);
			ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public void clearFlag(String tid, int seatnum) {
		Connection conn = DBUtil.getConnection();
		
		String sql = "update " + TABLE + " set flag = 0 where tid = ? and seatnum = ?";
		LogUtil.writeLog(sql);
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, tid);
			ps.setInt(2, seatnum);
			ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public int getSeatNum(String tid) {
		Connection conn = DBUtil.getConnection();
		
		String sql = "select * from " + TABLE + " where tid = ?";
		LogUtil.writeLog(sql);
		int seatnum = 0;
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, tid);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				if (rs.getInt("flag") != 1) {
					seatnum = rs.getInt("seatnum");
					setFlag(tid, seatnum);
					
					new TicketDao().decreaseTickets(tid);
					break;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return seatnum;
	}
	
	public boolean isFree(String tid) {
		Connection conn = DBUtil.getConnection();
		String sql = "select flag from " + TABLE + " where tid = ?";
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, tid);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				int b = rs.getInt(1);
				if (1 == b) {
					return false;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return true;
	}
	
	public void deleteSeat(String tid) throws SQLException {
		if (!isFree(tid)) {
			throw new SQLException();
		}
		
		Connection conn = DBUtil.getConnection();
		String sql = "delete from " + TABLE + " where tid = ?";
		PreparedStatement ps = conn.prepareStatement(sql);
		ps.setString(1, tid);
		
		ps.executeUpdate();
	}
	
	public void insertSeat(String tid) throws SQLException {
		Connection conn = DBUtil.getConnection();
		Ticket t = new TicketDao().getTicket(tid);
		
		String sql = "insert into " + TABLE + " (tid, seatnum, flag) values (?,?,0)";
		for (int i = 1; i <= t.getFullSeat(); i++ ) {
				PreparedStatement ps = conn.prepareStatement(sql);
				ps.setString(1, t.getTid());
				ps.setInt(2, i);
				ps.executeUpdate();
				ps.close();
		}
	}
	
	public static void main(String[] args) {
//		try {
//			new SeatDao().insertSeat("00001");
//		} catch (SQLException e) {
//			e.printStackTrace();
//		}
	}
}
