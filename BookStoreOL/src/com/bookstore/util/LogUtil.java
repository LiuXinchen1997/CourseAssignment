package com.bookstore.util;

import java.io.*;
import java.util.Date;

public class LogUtil {
	private static final String LOG = "F:\\Code\\Java\\EclipseWorkspace\\BookStoreOL\\log.txt";
	
	public static void writeLog(String sql) {
		File file = new File(LOG);
		try {
			FileWriter fw = new FileWriter(file, true);
			PrintWriter pw = new PrintWriter(fw);
			pw.println(new Date() + "   " + sql);
			pw.flush(); fw.flush();
			pw.close(); fw.close();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
		}
	}
	
	public static void main(String[] args) {
	}
}
