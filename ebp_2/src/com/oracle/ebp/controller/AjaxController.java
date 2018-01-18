package com.oracle.ebp.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.oracle.ebp.domain.ModifyPasswordBean;
import com.oracle.ebp.domain.UpdateUserBean;
import com.oracle.ebp.domain.User;
import com.oracle.ebp.service.UserService;
import com.oracle.ebp.util.constant.Constant;

@Controller
public class AjaxController {

	@Resource
	UserService userService;
	
	@RequestMapping(value="/user/ajax_updateUser", method=RequestMethod.POST)
	public ModelAndView updateUser(@RequestBody UpdateUserBean updateUserBean, HttpSession session) {

		ModelAndView mav = new ModelAndView();
		userService.updateUser(updateUserBean);
		User user = (User) session.getAttribute(Constant.SESSION_USER);
		user.updateUser(updateUserBean);
		session.setAttribute(Constant.SESSION_USER, user);
		mav.addObject("successful", true);
		return mav;
	}
	
	@RequestMapping(value="/user/ajax_updatePass", method=RequestMethod.POST)
	public ModelAndView updatePass(@RequestBody ModifyPasswordBean modifyPasswordBean, HttpSession session) {
		ModelAndView mav = new ModelAndView();
		User user = (User) session.getAttribute(Constant.SESSION_USER);
		String oldPassword = modifyPasswordBean.getOldPassword();
		System.out.println(oldPassword);
		String newPassword = modifyPasswordBean.getNewPassword();
		String reNewPassword = modifyPasswordBean.getReNewPassword();
		if (!oldPassword.equals(user.getPassword())) {
			mav.addObject("error", "原密码错误");
			return mav;
		}
		if (!newPassword.equals(reNewPassword)) {
			mav.addObject("error", "前后密码输入不一致");
			return mav;
		}
		System.out.println(newPassword);
		userService.modifyPassword(modifyPasswordBean);
		user.setPassword(newPassword);
		session.setAttribute(Constant.SESSION_USER, user);
		mav.addObject("successful", true);
		return mav;
	}
}
