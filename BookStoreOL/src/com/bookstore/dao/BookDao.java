package com.bookstore.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import com.bookstore.domain.Book;
import com.bookstore.util.DBUtil;
import com.bookstore.util.LogUtil;

public class BookDao {
	private static final String TABLE = "book";
	
	public Book getBookById(int id) {
		Connection conn = DBUtil.getConnection();
		Book book = null;
		
		String sql = "select * from " + TABLE + " where id = ?";
		LogUtil.writeLog(sql);
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				book = new Book();
				book.setId(rs.getInt(1));
				book.setName(rs.getString(2));
				book.setAuthor(rs.getString(3));
				book.setPublishing(rs.getString(4));
				book.setWord_number(rs.getInt(5));
				book.setVersion(rs.getString(6));
				book.setTotal_page(rs.getInt(7));
				book.setPrint_num(rs.getShort(8));
				book.setAuthor_summary(rs.getString(9));
				book.setSummary(rs.getString(10));
				book.setImage(rs.getString(11));
				book.setPrice(rs.getInt(12));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return book;
	}
	
	public ArrayList<Book> getAllBooks() {
		Connection conn = DBUtil.getConnection();
		ArrayList<Book> books = new ArrayList<Book>();
		
		String sql = "select * from " + TABLE;
		LogUtil.writeLog(sql);
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				Book book = new Book();
				book.setId(rs.getInt(1));
				book.setName(rs.getString(2));
				book.setAuthor(rs.getString(3));
				book.setPublishing(rs.getString(4));
				book.setWord_number(rs.getInt(5));
				book.setVersion(rs.getString(6));
				book.setTotal_page(rs.getInt(7));
				book.setPrint_num(rs.getShort(8));
				book.setAuthor_summary(rs.getString(9));
				book.setSummary(rs.getString(10));
				book.setImage(rs.getString(11));
				book.setPrice(rs.getInt(12));
				
				books.add(book);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return books;
	}
	
	public boolean buyABook(int id) {
		Connection conn = DBUtil.getConnection();
		String sql = "update "+ TABLE + " set print_number = print_number - 1 where id = ?";
		LogUtil.writeLog(sql);
		
		try {
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, id);
			
			ps.executeUpdate();
			ps.close();
			LogUtil.writeLog(sql);
			
			return true;
		} catch(Exception e) {
			e.printStackTrace();
			return false;
		} finally {
			DBUtil.closeConnection(conn);
		}
	}
}
