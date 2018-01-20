package com.bookstore.domain;

public class Shopkeeper {
	private int id;
	private int uid;
	private String email;
	private String phone;
	private int income;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public int getIncome() {
		return income;
	}
	public void setIncome(int income) {
		this.income = income;
	}
	public Shopkeeper(int id, int uid, String email, String phone, int income) {
		super();
		this.id = id;
		this.uid = uid;
		this.email = email;
		this.phone = phone;
		this.income = income;
	}
	public Shopkeeper() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "Shopkeeper [id=" + id + ", uid=" + uid + ", email=" + email + ", phone=" + phone + ", income=" + income
				+ "]";
	}
}
