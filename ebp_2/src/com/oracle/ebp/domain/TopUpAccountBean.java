package com.oracle.ebp.domain;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.Range;

public class TopUpAccountBean {
	
	@NotBlank(message="请选择付款类型~")
	private String type;
	
	@NotNull(message="请输入充值金额~")
	@Range(min=0, max=200000, message="单次充值金额范围应在{min}-{max}之间")
	private Double money;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Double getMoney() {
		return money;
	}

	public void setMoney(Double money) {
		this.money = money;
	}

	public TopUpAccountBean(String type, Double money) {
		super();
		this.type = type;
		this.money = money;
	}

	public TopUpAccountBean() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "TopUpAccountBean [type=" + type + ", money=" + money + "]";
	}
}
