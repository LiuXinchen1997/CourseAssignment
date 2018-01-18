package com.PTMSystem.util;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class OperateDB {
	public static void main(String[] args) {
		Connection conn = DBUtil.getConnection();
		
		String sql = "insert into seat (tid, seatnum, flag) values (?,?,0)";
		for (int i = 1; i <= 30; i++ ) {
			try {
				PreparedStatement ps = conn.prepareStatement(sql);
				ps.setString(1, "00002");
				ps.setInt(2, i);
				ps.executeUpdate();
				ps.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
	}
}
