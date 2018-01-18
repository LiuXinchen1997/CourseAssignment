package com.PTMSystem.util;

import java.util.ArrayList;
import java.util.List;

public class DateUtil {
	private static final String[] ms = {
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
	};
	
	public static List<String> getMonthList() {
		List<String> months = new ArrayList<String>();
		for (String s : ms) {
			months.add(s);
		}
		
		return months;
	}
	
	public static String convertMonthNameToNum(String monthName) {
		List<String> ms = getMonthList();
		if (ms.contains(monthName)) {
			int num = ms.indexOf(monthName) + 1;
			
			String month = null;
			if (num >= 10) {
				month = num + "";
			} else {
				month = "0" + num;
			}
			
			return month;
		}
		
		return null;
	}
}
