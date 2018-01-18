package com.oracle.ebp.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.oracle.ebp.domain.ModifyPasswordBean;
import com.oracle.ebp.domain.Order;
import com.oracle.ebp.domain.OrderList;
import com.oracle.ebp.domain.TopUpAccountBean;
import com.oracle.ebp.domain.UpdateUserBean;
import com.oracle.ebp.domain.User;
import com.oracle.ebp.domain.UserBean;
import com.oracle.ebp.domain.UserShopping;
import com.oracle.ebp.exception.LoginException;
import com.oracle.ebp.exception.RegisterException;
import com.oracle.ebp.service.OrderListService;
import com.oracle.ebp.service.OrderService;
import com.oracle.ebp.service.ShoppingCartService;
import com.oracle.ebp.service.UserService;
import com.oracle.ebp.util.constant.Constant;
import com.oracle.ebp.util.tools.CookiesTool;
import com.oracle.ebp.util.tools.Md5;

@Controller
public class UserController {
	@Resource
	UserService userService;

	@Resource
	OrderService orderService;

	@Resource
	OrderListService orderListService;
	
	@Resource
	ShoppingCartService shoppingCartService;

	@RequestMapping("/user/modifyPassword")
	public String modifyPassword(@Valid @ModelAttribute("modifyPasswordBean") ModifyPasswordBean modifyPasswordBean,
			Errors errors, HttpSession session) {
		if (errors.hasFieldErrors()) {
			return "user/modifyPassword";
		}

		String oldPassword = Md5.GetMD5Code(modifyPasswordBean.getOldPassword());
		String newPassword = Md5.GetMD5Code(modifyPasswordBean.getNewPassword());
		String reNewPassword = Md5.GetMD5Code(modifyPasswordBean.getReNewPassword());
		int uid = modifyPasswordBean.getUid();
		if (uid == 0) {
			return "login";
		}

		if (!newPassword.equals(reNewPassword)) {
			errors.rejectValue("newPassword", "", "前后密码不一致");
			return "user/modifyPassword";
		}

		User u = userService.getUserByUid(uid);
		if (!oldPassword.equals(u.getPassword())) {
			errors.reject("", "原密码输入错误！");
			return "user/modifyPassword";
		}

		try {
			modifyPasswordBean.setNewPassword(newPassword);
			userService.modifyPassword(modifyPasswordBean);
		} catch (Exception e) {
			errors.reject("", e.getMessage());
		}
		session.removeAttribute("session_user");

		return "redirect:/user/index.jsp";
		// return "login";
	}

	@RequestMapping("/user/topUpMoney")
	public String topUpMoney(@Valid @ModelAttribute("topUpAccountBean") TopUpAccountBean topUpAccountBean,
			Errors errors, Model model, HttpSession session) {
		if (errors.hasFieldErrors()) {
			//return "user/TopUpAccount";
			return "user/TopUpAccountBody";
		}

		try {
			User user = (User) session.getAttribute("session_user");
			userService.topUpMoney(topUpAccountBean.getMoney(), user.getUsername());
			session.setAttribute("session_user", userService.getUserByUsername(user.getUsername()));
		} catch (Exception e) {
			errors.reject("", e.getMessage());
			//return "user/TopUpAccount";
			return "user/TopUpAccountBody";
		}

		model.addAttribute("type", topUpAccountBean.getType());
		model.addAttribute("money", topUpAccountBean.getMoney());
		
//		return "user/TopUpSucc";
		return "user/TopUpSuccBody";
	}

	// @RequestMapping("/user/login")
	// public String login(HttpServletRequest req, HttpSession session) {
	// User user = userService.getUserByUsername(req.getParameter("username"));
	// session.setAttribute("session_user", user);
	//
	// return "user/index";
	// }

	@RequestMapping("/user/logout")
	public String logout(HttpServletRequest  request, HttpServletResponse response, HttpSession session) {
		User user = (User) session.getAttribute("session_user");
		int uid = user.getUid();
		Cookie cookie = CookiesTool.getShopCart(request);
		UserShopping userShopping = shoppingCartService.findUserShopping(uid);
		if(cookie==null){System.out.println("cookie空");

		session.removeAttribute(Constant.SESSION_USER);
		return "redirect:/login.jsp";}
		if (userShopping != null&&cookie.getValue()!=null) {
			userShopping.setCookie(cookie.getValue());
			shoppingCartService.updateUserShopping(userShopping);
		} else {
			userShopping = new UserShopping(0, cookie.getValue(), uid);
			shoppingCartService.createUserShopping(userShopping);
		}
		response.addCookie(cookie);
		session.removeAttribute(Constant.SESSION_USER);
		session.removeAttribute(Constant.ATTR_NEXTURL);
		return "redirect:/login.jsp";
	}

	@RequestMapping(value="/user/GetOrderListByoid",method=RequestMethod.GET)
	public ModelAndView getOrderListById(HttpSession session, HttpServletRequest  request,
			@RequestParam(value="oid", required=true) int oid,
			@RequestParam(value="keywords", required=false, defaultValue="") String keywords) {
			List<OrderList> orderLists = orderListService.getOrderListByOid(oid, keywords);
			
			ModelAndView mav = new ModelAndView();
			mav.addObject("orderList", orderLists);
			mav.setViewName("user/ShowOrdersList");
			return mav;
	}	

	@RequestMapping(value = "/admin/queryUsersByDatePage")
	/* MaxShowPage可更正为一页能显示的最大条数 */
	public String AdminqueryUsersByDatePage(Model model, String begin, String end, Integer currentPage,
			Integer pageCount) {
		model.addAttribute("isDate", 1);

		int MaxShowPage = Constant.MAXSHOWPAGE;

		Timestamp beginDate = null;
		Timestamp endDate = null;
		
		SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
		
		if(end != null && end != ""){
			endDate = Timestamp.valueOf(end + " 23:59:59");
			model.addAttribute("end",end);
		}else{
			Date nowDate = new Date();
			endDate = new Timestamp(nowDate.getTime());
			//String s  = endDate.getYear()+"-"+endDate.getMonth()+"-"+endDate.getDate();
			model.addAttribute("end",dateFormat.format(nowDate));
		}
		
		if(begin != null && begin != ""){
			beginDate = Timestamp.valueOf(begin + " 00:00:00");
			model.addAttribute("begin",begin);
		}else{
			Calendar calendar = new GregorianCalendar();
			calendar.setTime(endDate);
			calendar.add(calendar.DATE, -7);
			Date  earlyDate = calendar.getTime();
			beginDate = new Timestamp(earlyDate.getTime());
			model.addAttribute("begin",dateFormat.format(earlyDate));
		}
		
		if (pageCount == null) {
			Integer recordCount = userService.AdminGetUserBySday_Eday_recordCount(beginDate, endDate);
			if (recordCount != null && recordCount != 0) {
				pageCount = recordCount / MaxShowPage;
				if (recordCount % MaxShowPage != 0)
					pageCount++;
				model.addAttribute("pageCount", pageCount);
			} else {
				model.addAttribute("currentPage", 1);
				model.addAttribute("pageCount", 1);
				String error = "查询结果为空，请检查查询条件";
				model.addAttribute("error", error);
				return "admin/admin_user_forbid";
			}
		}

		if(begin == "" && end == ""){
			String error = "默认查询当前时间前七天时间"; 
			model.addAttribute("error", error);
		}else if(begin == "" && end != ""){
			String error = "默认查询开始日期到当前日期的数据";
			model.addAttribute("error", error);
		}else if (end == "" && begin != ""){
			String error = "默认查询结束日期前7天内的数据";
			model.addAttribute("error", error);
		}

		if (currentPage == null)
			currentPage = 1;

		if (currentPage > pageCount) {
			String error = "已是尾页";
			model.addAttribute("error", error);
			currentPage = pageCount;
		}
		if (currentPage == -1 || currentPage == 0) {
			String error = "已是首页";
			model.addAttribute("error", error);
			currentPage = 1;
		}
		model.addAttribute("currentPage", currentPage);

		// 开始分页查询
		if (currentPage != -1 && currentPage != 0 && currentPage <= pageCount) {
			Integer firstRecord = (currentPage - 1) * MaxShowPage;

			List<User> userlist = userService.AdminGetUserBySday_Eday(beginDate, endDate, firstRecord, MaxShowPage);

			model.addAttribute("list", userlist);

		}
		//return "admin/ShowAllUser";
		return "admin/admin_user_forbid";
	}

	@RequestMapping(value = "/admin/queryUsersByCondition")
	/* MaxShowPage可更正为一页能显示的最大条数 */
	public String AdminqueryUsersByCondition(Model model, Integer currentPage, Integer pageCount, String name,
			String idCard, String telno) {

		model.addAttribute("isCondition", 1);
		int MaxShowPage = Constant.MAXSHOWPAGE;

		if (pageCount == null) {
			Integer recordCount = userService.AdminGetUserBynuit_recordCount(name, idCard, telno);
			if (recordCount != null && recordCount != 0) {
				pageCount = recordCount / MaxShowPage;
				if (recordCount % MaxShowPage != 0)
					pageCount++;
				model.addAttribute("pageCount", pageCount);
			} else {
				model.addAttribute("currentPage", 1);
				model.addAttribute("pageCount", 1);
				/*
				 * model.addAttribute("name", name);
				 * model.addAttribute("sidCard",sidCard);
				 * model.addAttribute("soid", soid);
				 */
				String error = "查询结果为空，请检查查询条件";
				model.addAttribute("error", error);
				//return "admin/ShowAllUser";
				return "admin/admin_user_forbid";
			}
		}
		if (name == "" && idCard == "" && telno == "") {
			String error = "无查询条件，默认查询全部信息";
			model.addAttribute("error", error);
		}

		if (currentPage == null)
			currentPage = 1;

		if (currentPage > pageCount) {
			String error = "已是尾页";
			model.addAttribute("error", error);
			currentPage = pageCount;
		}
		if (currentPage == -1 || currentPage == 0) {
			String error = "已是首页";
			model.addAttribute("error", error);
			currentPage = 1;
		}
		model.addAttribute("currentPage", currentPage);

		// 开始分页查询
		if (currentPage != -1 && currentPage != 0 && currentPage <= pageCount) {
			Integer firstRecord = (currentPage - 1) * MaxShowPage;
			List<User> userList = userService.AdminGetUserBynuit(name, idCard, telno, firstRecord, MaxShowPage);
			model.addAttribute("list", userList);
		}
		//return "admin/ShowAllUser";
		return "admin/admin_user_forbid";
	}

	@RequestMapping(value = "/admin/updateUserStatusById")
	public void updateUserStatusById(Integer uid, Integer statu, HttpServletResponse response) {
		System.out.println(uid + "   --   " + statu);
		PrintWriter out;

		userService.AdminChangeUserStatus(uid, statu);

		try {
			out = response.getWriter();
			if (userService.AdminQueryChangeUserStatus(uid) == 1)
				out.write("1");
			else
				out.write("0");
			out.flush();
			out.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/user/register", method = RequestMethod.POST)
	public String register(@Valid @ModelAttribute("registerBean") UserBean rb, Errors errors, HttpSession session,
			HttpServletRequest request) {
		String passMd5 = Md5.GetMD5Code(rb.getPassword());
		rb.setPassword(passMd5);
		System.out.println(rb.getUsername() + rb.getName() + rb.getPassword() + rb.getGender() + rb.getAge()
				+ rb.getIdCard() + rb.getAddress() + rb.getTelno());
		try {
			userService.register(rb);
		} catch (RegisterException e) {
			return "redirect:/register.jsp";
		}

		return "redirect:/login.jsp";
	}


	@RequestMapping(value = "/user/updateUserById", method = RequestMethod.POST)
	public String updateUserById(@Valid @ModelAttribute("updateUserBean") UpdateUserBean updateUserBean, Errors errors,
			Model model, HttpSession session) {
		System.out.println(updateUserBean);
		model.addAttribute("updateUserBean", updateUserBean);
		if (errors.hasFieldErrors()) {
//			return "user/updateUser";
			return "user/updateUserBody";
		}

		userService.updateUser(updateUserBean);
		model.addAttribute("updateUserBean", updateUserBean);

		User u = (User) session.getAttribute(Constant.SESSION_USER);
		u.setAddress(updateUserBean.getAddress());
		u.setAge(updateUserBean.getAge());
		u.setGender(updateUserBean.getGender());
		u.setIdCard(updateUserBean.getIdCard());
		u.setName(updateUserBean.getName());
		u.setPassword(updateUserBean.getPassword());
		u.setTelno(updateUserBean.getTelno());
		u.setUsername(updateUserBean.getUsername());
		session.setAttribute(Constant.SESSION_USER, u);

		//return "user/index";
		return "user/updateUserBody";
	}

	@RequestMapping(value = "/user/login", method = RequestMethod.POST)
	public ModelAndView login(@RequestBody User user, HttpSession session,  HttpServletResponse response) {
		User userNow = userService.getUserByUsername(user.getUsername());
		if (userNow == null) {
			ModelAndView mav = new ModelAndView();
			mav.addObject("error", "用户名不存在");
			return mav;
		} else {
			System.out.println("origin " + user.getPassword());
			String password = user.getPassword();
			System.out.println(password);
			if (!userNow.getPassword().equals(password)) {
				ModelAndView mav = new ModelAndView();
				mav.addObject("error", "用户名密码错误");
				return mav;
			}
			if (userNow.getStatus() == 0) {
				ModelAndView mav = new ModelAndView();
				mav.addObject("error", "用户已禁用");
				return mav;
			}
			session.setAttribute(Constant.SESSION_USER, userNow);
			int uid = userNow.getUid();
			
			Cookie cookie = new Cookie("shopCart", "");
			UserShopping userShopping = shoppingCartService.findUserShopping(uid);
			if (userShopping != null) {
				String cookieValue = userShopping.getCookie();
				cookie.setValue(cookieValue);
			}
			response.addCookie(cookie);
		}
		ModelAndView mav = new ModelAndView();
		return mav;
	}
	
	@RequestMapping(value="/user/queryAllOrders", method=RequestMethod.GET)
	public ModelAndView getOrderById(
			@RequestParam(value="page", required=false, defaultValue="0") int page,
			@RequestParam(value="start", required=false, defaultValue="0") long start,
			@RequestParam(value="end", required=false, defaultValue="0") long end,
			HttpSession session) {
		User user = (User)session.getAttribute("session_user");
		int uid = user.getUid();
		List<Order> orders = new ArrayList<Order>();
		
		if (end == 0) {
			end = (new Date()).getTime();
		}
		orders = orderService.getOrderByTime(uid, start, end, page);
		
		for (Order order:orders) {
			System.out.println(order.toString());
		}

        ModelAndView mav = new ModelAndView();
        mav.setViewName("queryAllOrders");
        mav.addObject("orders", orders);
        
        return mav;
	}	
	
    @RequestMapping(value="/user/queryOrdersByKeywords",method=RequestMethod.GET)
    public ModelAndView getOrderListById(HttpSession session, HttpServletRequest  request,
			@RequestParam(value="start", required=false, defaultValue="0") long start,
			@RequestParam(value="end", required=false, defaultValue="0") long end,
			@RequestParam(value="keywords", required=false, defaultValue="") String keywords) {
    	System.out.println("queryByKeyWords");
		User user = (User)session.getAttribute("session_user");
		int uid = user.getUid();
		List<Order> orders = new ArrayList<Order>();
		if (end == 0) {
			end = (new Date()).getTime();
		}
		orders = orderService.getOrderByTime(uid, start, end,-1);
		System.out.println(orders.size());
		for (Order order:orders) {
			System.out.println(order.toString());
		}
		int deleted = 0;
		int length = orders.size();
		for (int i = 0; i<length; i++) {
			Order order = orders.get(i-deleted);
			List<OrderList> orderLists = orderListService.getOrderListByOid(order.getOid(), keywords);
			if (orderLists != null && orderLists.size()>0) {
				order.setOrderlists(orderLists);
				orders.set(i-deleted, order);
			}  else {
				orders.remove(i-deleted);
				deleted++;
			}
		}
		System.out.println(orders.size());
		for (Order order:orders) {
			for (OrderList orderlist: order.getOrderlists()) {
				System.out.println(orderlist.toString());
			}
		}
        ModelAndView mav = new ModelAndView();
        mav.addObject("orders", orders);
        
        return mav;
    }

    
    @RequestMapping(value = "/user/GetOrderCount")
	 public ModelAndView getOrderCount(@RequestParam(value="start", required=false, defaultValue="0") long start,
				@RequestParam(value="end", required=false, defaultValue="0") long end, HttpSession session) {
		 User user = (User) session.getAttribute(Constant.SESSION_USER);
		 int uid = user.getUid();
		 int count = 0;
		 if (start == 0) {
			count = orderService.getOrderCount(uid);
		 } else {
			if (end == 0) {
				end = (new Date()).getTime();
			}
			count = orderService.getOrderCountByTime(uid, start, end);
		 }
		 ModelAndView mav = new ModelAndView();
		 mav.addObject("count", count);
		 return mav;
	 }
}
