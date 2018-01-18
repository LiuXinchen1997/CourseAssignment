package com.oracle.ebp.service;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.oracle.ebp.dao.AdminMapper;

import com.oracle.ebp.domain.Admin;

import com.oracle.ebp.exception.LoginException;
@Service
@Scope
public class AdminService {
	@Resource
	AdminMapper adminMapper;
	public Admin login(String adminname) throws LoginException{
		Admin admin=null;
		try {
			admin=adminMapper.getAdminByAdminname(adminname);
		} catch (Exception e) {
			e.printStackTrace();
			throw new LoginException(e);
		}
		return admin;
	}

}
