package com.oracle.ebp.dao;

import com.oracle.ebp.domain.Admin;

public interface AdminMapper {
	// 增删改查
	// 查
//	public Admin getAdminByAid(int aid);
//
//	// 增
//	public int saveAdmin(Admin admin);
//
//	// 改
//	public int modifyAdmin(Admin admin);

	public Admin getAdminByAdminname(String adminname);
}
