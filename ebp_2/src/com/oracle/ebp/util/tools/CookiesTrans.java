package com.oracle.ebp.util.tools;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.oracle.ebp.domain.ShoppingCart;
import com.oracle.ebp.domain.Ticket;

public class CookiesTrans {
	public static List<ShoppingCart> getList(String str) {
		List<ShoppingCart> cartLists =  new ArrayList<ShoppingCart>();
		String[] tempStr = str.split("&");
		for (String temp:tempStr) {
			ShoppingCart cart = new ShoppingCart(temp);
			cartLists.add(cart);
		}
		return cartLists;
	}
	
	public static String listToString(List<ShoppingCart> cartLists) {
		String str = "";
		for (ShoppingCart cart:cartLists) {
			if (str.equals("")) {
				str = cart.toString();
			} else {
				str = str + "&" + cart.toString();
			}
		}
		return str;
	}
	
	public static String ticketConvertToCookieString(Ticket t) {
		String str = "";
		
		str += t.getTid();
		str += "&" + t.getDescs();
		str += "&" + t.getStartTime();
		str += "&" + t.getAmount();
		str += "&" + t.getBalance();
		str += "&" + t.getPrice();
		str += "&" + t.getStatus();
		
		return str;
	}
	
	public static Ticket loadTicketFromString(String ticketInfo) {
		Ticket t = new Ticket();
		
		String[] infos = ticketInfo.split("&");
		
//		if (!(infos[0].equals("null"))) {			
//			t.setTid(Integer.parseInt(infos[0]));
//		}
		t.setDescs(infos[1]);
		t.setStartTime(Timestamp.valueOf(infos[2]));
		t.setAmount(Integer.parseInt(infos[3]));
		t.setBalance(Integer.parseInt(infos[4]));
		t.setPrice(Double.parseDouble(infos[5]));
		t.setStatus(Integer.parseInt(infos[6]));
		
		return t;
	}
}
