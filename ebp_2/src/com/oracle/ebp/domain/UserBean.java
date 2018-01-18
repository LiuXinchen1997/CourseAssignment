package com.oracle.ebp.domain;

import java.sql.Timestamp;

public class UserBean {
	private int uid;
	private String username;
	private String password;
	private String repassword;
	private String name;
	private String gender;
	private int age;
	private String idCard;
	private String address;
	private String telno;
	public UserBean() {
		super();
	}
	@Override
	public String toString() {
		return "UserBean [uid=" + uid + ", username=" + username + ", password=" + password + ", repassword="
				+ repassword + ", name=" + name + ", gender=" + gender + ", age=" + age + ", idCard=" + idCard
				+ ", address=" + address + ", telno=" + telno + ", regTime=" + regTime + ", balance=" + balance
				+ ", status=" + status + "]";
	}
	public UserBean(int uid, String username, String password, String repassword, String name, String gender, int age,
			String idCard, String address, String telno, Timestamp regTime, double balance, int status) {
		super();
		this.uid = uid;
		this.username = username;
		this.password = password;
		this.repassword = repassword;
		this.name = name;
		this.gender = gender;
		this.age = age;
		this.idCard = idCard;
		this.address = address;
		this.telno = telno;
		this.regTime = regTime;
		this.balance = balance;
		this.status = status;
	}
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRepassword() {
		return repassword;
	}
	public void setRepassword(String repassword) {
		this.repassword = repassword;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getIdCard() {
		return idCard;
	}
	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getTelno() {
		return telno;
	}
	public void setTelno(String telno) {
		this.telno = telno;
	}
	public Timestamp getRegTime() {
		return regTime;
	}
	public void setRegTime(Timestamp regTime) {
		this.regTime = regTime;
	}
	public double getBalance() {
		return balance;
	}
	public void setBalance(double balance) {
		this.balance = balance;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	private Timestamp regTime;
	private double balance;
	private int status;
	
}
