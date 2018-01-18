package com.oracle.ebp.domain;

public class ShoppingCartDetail {
	private int scdid;
	private int scid;
	private int tId;
	private int quantity;
	public int getScdid() {
		return scdid;
	}
	public void setScdid(int scdid) {
		this.scdid = scdid;
	}
	public int getScid() {
		return scid;
	}
	public void setScid(int scid) {
		this.scid = scid;
	}
	public int gettId() {
		return tId;
	}
	public void settId(int tId) {
		this.tId = tId;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	@Override
	public String toString() {
		return "ShoppingCartDetail [scdid=" + scdid + ", scid=" + scid + ", tId=" + tId + ", quantity=" + quantity
				+ "]";
	}
	public ShoppingCartDetail(int scdid, int scid, int tId, int quantity) {
		super();
		this.scdid = scdid;
		this.scid = scid;
		this.tId = tId;
		this.quantity = quantity;
	}
	public ShoppingCartDetail() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
