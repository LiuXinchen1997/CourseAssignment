package com.oracle.ebp.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.oracle.ebp.domain.OrderList;
import com.oracle.ebp.service.OrderListService;

@Controller
public class AdminAjaxController {
	@Resource
	OrderListService orderListService;
	
	@RequestMapping(value = "/admin/ajax/listOrderList")
	public void ajaxGetOrderList(Integer oid, HttpServletResponse response, HttpSession session) {		
		PrintWriter out = null;
		List<OrderList> ol = orderListService.getOrderListByOid(oid);
		String content = "";
		if (ol.size() >= 1) {
			content += ol.get(0).getLid();
			content += ","+ol.get(0).getDescs();
			content += ","+ol.get(0).getPrice();
			content += ","+ol.get(0).getQuantity();
			content += ","+ol.get(0).getAmount();
		}
		
		if (ol.size() > 1) {
			content += ";";
			for (int i = 1; i < ol.size(); i++) {
				content += ol.get(0).getLid();
				content += ","+ol.get(0).getDescs();
				content += ","+ol.get(0).getPrice();
				content += ","+ol.get(0).getQuantity();
				content += ","+ol.get(0).getAmount();
			}
		}
		System.out.println(content);
		
		try {
			out = response.getWriter();
			out.write(content);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
