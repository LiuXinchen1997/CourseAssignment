package com.oracle.ebp.domain;

import java.sql.Timestamp;

public class Admin {
	private int aid;
	private String password;
	private String username;
	public int getAid() {
		return aid;
	}
	public void setAid(int aid) {
		this.aid = aid;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Admin(int aid, String password, String username) {
		super();
		this.aid = aid;
		this.password = password;
		this.username = username;
	}
	public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "Admin [aid=" + aid + ", password=" + password + ", username=" + username + "]";
	}
	
	
}
