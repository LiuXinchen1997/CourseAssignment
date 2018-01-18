package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;

import domain.PolicyInfo;
import utils.DBUtil;

public class PolicyDao {
	private static final String TABLE = "policy_info";
	
	public boolean addPolicyInfo(PolicyInfo pi) {
		Connection conn = DBUtil.getConnection();
		String sql = "insert into "+ TABLE + "(as_num,as_num_d,is_import,permit,asregexp,comm,pref,med) values(?,?,?,?,?,?,?,?)";
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, pi.getAs_num());
			ps.setString(2, pi.getAs_num_d());
			ps.setInt(3, pi.getIs_import());
			ps.setInt(4, pi.getPermit());
			ps.setString(5, pi.getAsregexp());
			ps.setInt(6, pi.getComm());
			ps.setInt(7, pi.getPref());
			ps.setInt(8, pi.getMed());
			
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
	}
}