package com.oracle.ebp.domain;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.Range;

public class UpdateUserBean {
	
	private Integer uid;
	
	@NotBlank(message="用户名不能为空！")
	private String username;
	
	@NotBlank(message="密码不能为空！")
	private String password;
	
	@NotBlank(message="确认密码不能为空！")
	private String repassword;
	
	@NotBlank(message="真实姓名不能为空！")
	private String name;
	private Integer gender;
	
	@NotNull(message="年龄不能为空！")
	@Range(min=0, max=120, message="年龄要在{min}-{max}之间!")
	private Integer age;
	
	@NotBlank(message="身份证号不能为空！")
	@Pattern(regexp="(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)", message="身份证格式不正确！")
	private String idCard;
	
	@NotBlank(message="地址信息不能为空！")
	private String address;
	
	@NotBlank(message="电话号码不能为空！")
	@Pattern(regexp="^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$", message="手机号码格式不正确！")
	private String telno;
	
	public Integer getUid() {
		return uid;
	}
	public void setUid(Integer uid) {
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
	public Integer getGender() {
		return gender;
	}
	public void setGender(Integer gender) {
		this.gender = gender;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
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
	@Override
	public String toString() {
		return "UpdateUserBean [uid=" + uid + ", username=" + username + ", password=" + password + ", repassword="
				+ repassword + ", name=" + name + ", gender=" + gender + ", age=" + age + ", idCard=" + idCard
				+ ", address=" + address + ", telno=" + telno + "]";
	}
	public UpdateUserBean(Integer uid, String username, String password, String repassword, String name, Integer gender,
			Integer age, String idCard, String address, String telno) {
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
	}
	public UpdateUserBean() {
		super();
		// TODO Auto-generated constructor stub
	}
}
