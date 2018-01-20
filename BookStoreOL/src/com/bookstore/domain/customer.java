package com.bookstore.domain;

public class customer {
	private int id;
	private int uid;
	private String nickname;
	private String email;
	private String phone;
	private String bank_card;
	private String gender;
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
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
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
	public String getBank_card() {
		return bank_card;
	}
	public void setBank_card(String bank_card) {
		this.bank_card = bank_card;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public customer(int id, int uid, String nickname, String email, String phone, String bank_card, String gender) {
		super();
		this.id = id;
		this.uid = uid;
		this.nickname = nickname;
		this.email = email;
		this.phone = phone;
		this.bank_card = bank_card;
		this.gender = gender;
	}
	public customer() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "customer [id=" + id + ", uid=" + uid + ", nickname=" + nickname + ", email=" + email + ", phone="
				+ phone + ", bank_card=" + bank_card + ", gender=" + gender + "]";
	}
}
