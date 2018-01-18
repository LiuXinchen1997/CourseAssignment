package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import domain.AutNum;
import utils.DBUtil;

public class ASDao {
	private static final String TABLE = "aut_num";
	
	public boolean addAS(AutNum an) {
		Connection conn = DBUtil.getConnection();
		String sql = "insert into "+ TABLE + "(as_num,as_name,mnt_by,descr,country,member_of) values(?,?,?,?,?,?)";
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, an.getAs_num());
			ps.setString(2, an.getAs_name());
			ps.setString(3, an.getMnt_by());
			ps.setString(4, an.getDescr());
			ps.setString(5, an.getCountry());
			ps.setString(6, an.getMemeber_of());
			
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
	
	public boolean modifyAS(AutNum an) {
		Connection conn = DBUtil.getConnection();
		String sql = "update "+ TABLE + " set as_name = ?, "
				+ "mnt_by = ?, descr = ?, country = ? where as_num = ?";
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, an.getAs_name());
			ps.setString(2, an.getMnt_by());
			ps.setString(3, an.getDescr());
			ps.setString(4, an.getCountry());
			ps.setString(5, an.getAs_num());
			
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
	
	public AutNum queryAS(String as_num) {
		AutNum an = null;
		String sql = "select * from " + TABLE + " where as_num = ?";
		Connection conn = DBUtil.getConnection();
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, as_num);
			
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				an = new AutNum();
				an.setAs_num(rs.getString("as_num"));
				an.setAs_name(rs.getString("as_name"));
				an.setCountry(rs.getString("country"));
				an.setDescr(rs.getString("descr"));
				an.setMemeber_of(rs.getString("member_of"));
				an.setMnt_by(rs.getString("mnt_by"));
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		
		return an;
	}
	
	public static void main(String[] args) {
		/*
		AutNum an = new AutNum("AS9929", "CNCNET-CN", "MAINT-APNIC-AP", "China Netcon Crop,New Telecommunication Carrier,Base on IP Backbone", "CN", "");
		new ASDao().modifyAS(an);
		System.out.println("sss");
		*/
		
		String id = "AS9929";
		AutNum an = new ASDao().queryAS(id);
		System.out.println(an);
	}
}
