package com.oracle.ebp.controller;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.oracle.ebp.domain.Admin;

import com.oracle.ebp.exception.LoginException;
import com.oracle.ebp.service.AdminService;
import com.oracle.ebp.util.constant.Constant;

@Controller
public class AdminController {
	@Resource
	private AdminService adminSvc;
	
	@RequestMapping("/admin/logout")
	public String logout(HttpSession session) {
		session.removeAttribute(Constant.SESSION_ADMIN);
		session.removeAttribute(Constant.ATTR_NEXTURL);
		
		return "redirect:/adminlogin.jsp";
	}
	
	@RequestMapping(value="/admin/login", method=RequestMethod.POST)
	public ModelAndView login(@RequestBody Admin admin, HttpSession session) {
		Admin adminNow = new Admin();
		try {
			adminNow = adminSvc.login(admin.getUsername());
			if (adminNow == null) {
				ModelAndView mav = new ModelAndView();
				mav.addObject("error", "用户名不存在");
				return mav;
			}
			
			if(!adminNow.getPassword().equals(admin.getPassword())){
				ModelAndView mav = new ModelAndView();
				mav.addObject("error", "用户名密码错误");
				return mav;
			}
		} catch (LoginException e) {
			// TODO Auto-generated catch blockt
			e.printStackTrace();
		}
		session.setAttribute(Constant.SESSION_ADMIN, adminNow);
        ModelAndView mav = new ModelAndView();	        
        return mav;
	}	


}
