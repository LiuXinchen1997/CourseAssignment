package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;

import domain.ASSet;
import utils.DBUtil;

public class ASSetDao {
private static final String TABLE = "as_set";
	
	public boolean addASSet(ASSet ass) {
		Connection conn = DBUtil.getConnection();
		String sql = "insert into "+ TABLE + "(as_set_name,members,mbrs_by_ref) values(?,?,?)";
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, ass.getAs_set_name());
			ps.setString(2, ass.getMembers());
			ps.setString(3, ass.getMbrs_by_ref());
			
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
	
	public static void main(String[] args) {
		ASSet ass = new ASSet("sa", "asa", "asa");
		new ASSetDao().addASSet(ass);
	}
}
