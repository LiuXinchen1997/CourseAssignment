package com.bookstore.util;

import java.io.Reader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class DBUtil {
	private static String dbdriver;
	private static String dburl;
	private static String username;
	private static String password;
		
	static {
		Properties prop = new Properties();
		Reader in;
		try {
			//in = new FileReader("src\\config.properties");
			prop.load(DBUtil.class.getClassLoader().getResourceAsStream("config.properties"));
		} catch (Exception e) {				
			e.printStackTrace();
		}
		
		dbdriver = prop.getProperty("dbdriver");
		dburl = prop.getProperty("dburl");
		username = prop.getProperty("username");
		password = prop.getProperty("password");
		
//		dbdriver = "com.mysql.jdbc.Driver";
//		dburl = "jdbc:mysql://localhost:3306/demo?characterEncoding=utf8&useSSL=false";
//		username = "root";
//		password = "0604";
	}
	
	public static Connection getConnection() {
		try {
			Class.forName(dbdriver).newInstance();
			return DriverManager.getConnection(dburl, username, password);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static void closeConnection(Connection conn) {
		try {
			conn.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
