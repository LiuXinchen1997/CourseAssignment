package com.oracle.ebp.domain;

public class OrderList {
	private int lid;
	private String descs;
	private double price;
	private int quantity;
	private double amount;
	private int oid;
	private Order order;
	public OrderList() {
		super();
		// TODO Auto-generated constructor stub
	}
	public OrderList(int lid, String descs, double price, int quantity, double amount, int oid) {
		super();
		this.lid = lid;
		this.descs = descs;
		this.price = price;
		this.quantity = quantity;
		this.amount = amount;
		this.oid = oid;
	}
	public OrderList(String str) {
		String[] attributes = str.split(",");
		try{
			for (String attribute:attributes) {
				
				String[] values = attribute.split("=");
				switch(values[0]) {
				case "lid":
					lid = Integer.parseInt(values[1]);
					break;
				case "descs":
					descs = values[1];
					break;
				case "price":
					price = Double.parseDouble(values[1]);
					break;
				case "quantity":
					quantity = Integer.parseInt(values[1]);
					break;
				case "amount":
					amount = Double.parseDouble(values[1]);
					break;
				}
			}
		} catch(Exception e) {
			
		}
	}
	public int getLid() {
		return lid;
	}
	public void setLid(int lid) {
		this.lid = lid;
	}
	public String getDescs() {
		return descs;
	}
	public void setDescs(String descs) {
		this.descs = descs;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public int getOid() {
		return oid;
	}
	public void setOid(int oid) {
		this.oid = oid;
	}
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
	}
	@Override
	public String toString() {
		return "lid=" + lid + ", descs=" + descs + ", price=" + price + ", quantity=" + quantity
				+ ", amount=" + amount + ", oid=" + oid + ", order=" + order;
	}
}
