package com.oracle.ebp.domain;

public class ShoppingCart {
	int tid;
	int number;
	public ShoppingCart() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ShoppingCart(int tid, int number) {
		super();
		this.tid = tid;
		this.number = number;
	}
	public ShoppingCart(String str) {
		String[] attributes = str.split(",");
		try{
			for (String attribute:attributes) {
				
				String[] values = attribute.split("=");
				switch(values[0]) {
				case "tid":
					tid = Integer.parseInt(values[1]);
					break;
				case "number":
					number = Integer.parseInt(values[1]);
					break;
				}
			}
		} catch(Exception e) {
			
		}
	}
	public int getTid() {
		return tid;
	}
	public void setTid(int tid) {
		this.tid = tid;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}
	@Override
	public String toString() {
		return "tid=" + tid + ",number=" + number;
	}
	
}
