package com.oracle.ebp.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.oracle.ebp.domain.Admin;
import com.oracle.ebp.util.constant.Constant;

/**
 * Servlet Filter implementation class UserLoginFilter
 */
@WebFilter("/AdminLoginFilter")
public class AdminLoginFilter implements Filter {

	public AdminLoginFilter() {
	}

	public void destroy() {
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpSession session = req.getSession();

		String requestURI = req.getRequestURI();
		// 以下尝试截取用户拟请求的目标路径
		String uri = requestURI.substring(requestURI.indexOf(Constant.ADMIN_LOGIN_PREFIX));
		
		// 用户不是请求登录，进行拦截
		if (uri.indexOf("login") == -1) {
			Admin admin = (Admin) session.getAttribute(Constant.SESSION_ADMIN);
			if (admin == null) {
				session.setAttribute(Constant.ATTR_NEXTURL, uri);
				String loginUri = req.getContextPath() + Constant.ADMIN_LOGIN_PAGE;
				System.out.println(loginUri);
				((HttpServletResponse) response).sendRedirect(loginUri);
				return;
			}
		}
		
		chain.doFilter(request,response);
	}

	public void init(FilterConfig fConfig) throws ServletException {
	}
}