package com.PTMSystem.util;

public class testMD5 {
	public static void main(String[] args) {
		String password = "123{admin}";
		String passwordAfterMD5 = MD5Utils.md5Password(password);
		System.out.println(passwordAfterMD5);
	}
}
