package com.PTMSystem.bean;

import java.sql.Date;

public class Ticket {
	private String tid;
	private String fid;
	private int type;
	private Date fullReturnTime;
	private Date returnTime;
	private float returnProMoneyPercent;
	private float returnLateMoneyPercent;
	private Date changeTime;
	private float changeProMoneyPercent;
	private int price;
	private int fullSeat;
	private int remainSeat;
	private int luggageLimit;
	private int exceedmoney;
	public String getTid() {
		return tid;
	}
	public void setTid(String tid) {
		this.tid = tid;
	}
	public String getFid() {
		return fid;
	}
	public void setFid(String fid) {
		this.fid = fid;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public Date getFullReturnTime() {
		return fullReturnTime;
	}
	public void setFullReturnTime(Date fullReturnTime) {
		this.fullReturnTime = fullReturnTime;
	}
	public Date getReturnTime() {
		return returnTime;
	}
	public void setReturnTime(Date returnTime) {
		this.returnTime = returnTime;
	}
	public float getReturnProMoneyPercent() {
		return returnProMoneyPercent;
	}
	public void setReturnProMoneyPercent(float returnProMoneyPercent) {
		this.returnProMoneyPercent = returnProMoneyPercent;
	}
	public float getReturnLateMoneyPercent() {
		return returnLateMoneyPercent;
	}
	public void setReturnLateMoneyPercent(float returnLateMoneyPercent) {
		this.returnLateMoneyPercent = returnLateMoneyPercent;
	}
	public Date getChangeTime() {
		return changeTime;
	}
	public void setChangeTime(Date changeTime) {
		this.changeTime = changeTime;
	}
	public float getChangeProMoneyPercent() {
		return changeProMoneyPercent;
	}
	public void setChangeProMoneyPercent(float changeProMoneyPercent) {
		this.changeProMoneyPercent = changeProMoneyPercent;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public int getFullSeat() {
		return fullSeat;
	}
	public void setFullSeat(int fullSeat) {
		this.fullSeat = fullSeat;
	}
	public int getRemainSeat() {
		return remainSeat;
	}
	public void setRemainSeat(int remainSeat) {
		this.remainSeat = remainSeat;
	}
	public int getLuggageLimit() {
		return luggageLimit;
	}
	public void setLuggageLimit(int luggageLimit) {
		this.luggageLimit = luggageLimit;
	}
	public int getExceedmoney() {
		return exceedmoney;
	}
	public void setExceedmoney(int exceedmoney) {
		this.exceedmoney = exceedmoney;
	}
	
	
}
