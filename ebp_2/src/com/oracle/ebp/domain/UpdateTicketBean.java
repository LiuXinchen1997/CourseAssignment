package com.oracle.ebp.domain;

import java.sql.Timestamp;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.Range;

public class UpdateTicketBean {
	// @Range(min = 0,message = "描述不能为空")
	private int tid;
	@NotBlank(message = "描述不能为空")
	private String descs;
	
	private Timestamp startTime;
	
	@NotNull(message = "总票数不能为空")
	@Range(min = 0, message = "总票数要为大于零的整数")
	private Integer amount;
	
	@NotNull(message = "剩余票数不能为空")
	@Range(min = 0, message = "剩余票数要为大于零的整数")
	private Integer balance;
	
	@NotNull(message = "单价不能为空")
	@Range(min = 0, message = "单价要为大于零的数")
	private Double price;
	
	private Integer status;

	
	public int getTid() {
		return tid;
	}

	public void setTid(int tid) {
		this.tid = tid;
	}

	public String getDescs() {
		return descs;
	}

	public void setDescs(String descs) {
		this.descs = descs;
	}

	public Timestamp getStartTime() {
		return startTime;
	}

	public void setStartTime(Timestamp startTime) {
		this.startTime = startTime;
	}

	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	public Integer getBalance() {
		return balance;
	}

	public void setBalance(Integer balance) {
		this.balance = balance;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "UpdateTicketBean [tid=" + tid + ", descs=" + descs + ", startTime=" + startTime + ", amount=" + amount
				+ ", balance=" + balance + ", price=" + price + ", status=" + status + "]";
	}

	public UpdateTicketBean(int tid, String descs, Timestamp startTime, Integer amount, Integer balance, Double price,
			Integer status) {
		super();
		this.tid = tid;
		this.descs = descs;
		this.startTime = startTime;
		this.amount = amount;
		this.balance = balance;
		this.price = price;
		this.status = status;
	}

	public UpdateTicketBean() {
		super();
		// TODO Auto-generated constructor stub
	}
}
