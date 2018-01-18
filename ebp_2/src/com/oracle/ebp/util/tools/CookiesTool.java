package com.oracle.ebp.util.tools;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

public class CookiesTool {
	public static Cookie getShopCart(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		Cookie cookie = null;
		for (Cookie cookieTemp : cookies) {
			if ("shopCart".equals(cookieTemp.getName())) {
				cookie = cookieTemp;
				break;
			}
		}
		return cookie;
	}
	
	public static Cookie getCookie(String cookieName, HttpServletRequest req) {
		if (cookieName == null) {
			return null;
		}
		
		Cookie[] cookies = req.getCookies();
		Cookie cookie = null;
		
		for (Cookie c : cookies) {
			if (cookieName.equals(c.getName())) {
				cookie = c;
				break;
			}
		}
		
		return cookie;
	}
}
