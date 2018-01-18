package com.oracle.ebp.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.oracle.ebp.domain.OrderList;

public class UtilService {
	public List<OrderList> getOrderListByOid(int oid) {
		String sql = "select * from orderlist where oid = ?";
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException e1) {
			e1.printStackTrace();
		}  
		List list = new LinkedList<OrderList>();
		String url="jdbc:mysql://localhost:3306/ebp";  
		String user="root";  
		String password="0604";  
		Connection conn;
		PreparedStatement ps;
		try {
			conn = DriverManager.getConnection(url, user, password);
			ps = conn.prepareStatement(sql);
			ps.setInt(1, oid);
			ResultSet rs = ps.executeQuery();
			
			while (rs.next()) {
				OrderList ol = new OrderList();
				ol.setAmount(rs.getInt("amount"));
				ol.setDescs(rs.getString("descs"));
				ol.setLid(rs.getInt("lid"));
				ol.setOid(rs.getInt("oid"));
				ol.setPrice(rs.getDouble("price"));
				ol.setQuantity(rs.getInt("quantity"));
				list.add(ol);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
}
