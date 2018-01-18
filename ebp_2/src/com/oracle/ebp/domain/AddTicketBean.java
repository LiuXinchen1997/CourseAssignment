package com.oracle.ebp.domain;
import java.sql.Timestamp;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.Range;

public class AddTicketBean {
	private Integer tid;
	
	@NotBlank(message="请填写影片名~")
	private String descs;
	
	@NotBlank(message="请填写时间~")
	private String startTime;
	
	@NotNull(message="请填写总票数~")
	@Range(min=0, max=300, message="总票数范围应在{min}-{max}之间")
	private Integer amount;
	
	@NotNull(message="请填写剩余票数~")
	@Range(min=0, max=300, message="剩余票数范围应在{min}-{max}之间")
	private Integer balance;
	
	@NotNull(message="请填写价格~")
	@Range(min=0, max=200, message="价格范围应在{min}-{max}之间")
	private Double price;
	
	private Integer status;

	public Integer getTid() {
		return tid;
	}

	public void setTid(Integer tid) {
		this.tid = tid;
	}

	public String getDescs() {
		return descs;
	}

	public void setDescs(String descs) {
		this.descs = descs;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
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
		return "AddTicketBean [tid=" + tid + ", descs=" + descs + ", startTime=" + startTime + ", amount=" + amount
				+ ", balance=" + balance + ", price=" + price + ", status=" + status + "]";
	}

	public AddTicketBean(Integer tid, String descs, String startTime, Integer amount, Integer balance, Double price,
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

	public AddTicketBean() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public static Ticket convertToTicket(AddTicketBean atb) throws IllegalArgumentException {
		if (atb == null) {
			return null;
		}
		
		Ticket t = new Ticket();
		
		t.setAmount(atb.getAmount());
		t.setBalance(atb.getAmount());
		t.setDescs(atb.getDescs());
		t.setPrice(atb.getPrice());
		t.setStatus(atb.getStatus());
		t.setTid(atb.getTid());
		
		Timestamp ts = Timestamp.valueOf((atb.getStartTime()));
		t.setStartTime(ts);
		
		return t;
	}
	
}
