package com.oracle.ebp.controller;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.oracle.ebp.domain.Order;
import com.oracle.ebp.domain.OrderList;
import com.oracle.ebp.domain.User;
import com.oracle.ebp.service.OrderService;
import com.oracle.ebp.util.constant.Constant;



@Controller
public class OrderController {
	@Resource
	private OrderService orderSVC;
	
	
	/* MaxShowPage可更正为一页能显示的最大条数*/
	@RequestMapping(value = "/admin/queryOrderByDate")
	public String queryOrderByDate(
			                      Model model,String begin,String end,Integer currentPage,Integer pageCount){
		/*isOrderDate == 1
		model.addAttribute("isDate", 1);*/
		
		model.addAttribute("isOrderDate", 1);
		//System.out.println("coming------"+isOrderDate);
		
		/*1.如开始日期和结束日期均不提供，则默认查询当前日期前7天提交的订单 begin:end前七天，end:当前
		2.如仅提供开始日期，则默认查询开始日期到当前日期的数据                                                         end：当前
		3.如仅提供结束日期，则默认查询结束日期前7天内的数据                            begin:end前7天
		4.如开始和结束日期均提供，则查询日期区间内的数据，包含结束日期当天的数据*/
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
		
		
		
		
		
		if(pageCount == null){
			Integer recordCount = orderSVC.AdminqueryOrderByDate_GetPageCount(beginDate, endDate);
			if(recordCount != null && recordCount != 0){
				pageCount = recordCount / MaxShowPage;
				if(recordCount % MaxShowPage != 0)
					pageCount++;
				model.addAttribute("pageCount",pageCount);
			}else{
				model.addAttribute("currentPage",1);
				model.addAttribute("pageCount",1);
/*				model.addAttribute("begin", begin);
				model.addAttribute("end", end);*/
				String error = "查询结果为空，请检查查询条件";
				model.addAttribute("error", error);
				//return "admin/ShowAllOrder";
				return "admin/admin_order_list";
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
		
		if(currentPage == null)
			currentPage = 1;
        
		if(currentPage > pageCount){
			String error = "已是尾页"; 
			model.addAttribute("error", error);
			currentPage = pageCount;
		}
		if(currentPage == -1 || currentPage == 0){
			String error = "已是首页"; 
			model.addAttribute("error", error);
			currentPage = 1;
		}  
		model.addAttribute("currentPage",currentPage);
		 

		//开始分页查询
	    if(currentPage != -1 && currentPage != 0 && currentPage <= pageCount){
	    	  Integer firstRecord = (currentPage - 1) * MaxShowPage;	
	    	 
		  List<Order> orderlist = orderSVC.AdminqueryOrderByDate(beginDate,endDate,firstRecord,MaxShowPage);
			  
		  model.addAttribute("list", orderlist);
		  
		 }
		//return "admin/ShowAllOrder";
	    return "admin/admin_order_list";
	}
	
	
	@RequestMapping(value = "/admin/GetUserByAdmin_oni")
	public String GetUserByAdmin_oni(@Valid @ModelAttribute("orderBean")Order orderBean,Model model,
			                         String sname,String sidCard,String soid,Integer currentPage,Integer pageCount){
		model.addAttribute("isOrderCondition", 1);
		
		/* MaxShowPage可更正为一页能显示的最大条数*/
		int MaxShowPage = Constant.MAXSHOWPAGE;
		int oid = -1;
		try {
			if(soid!="")
				oid = Integer.parseInt(soid);
		} catch (Exception e) {
			String error = "订单号要是整数";
			model.addAttribute("error", error);
			//return "admin/ShowAllOrder";
			return "admin/admin_order_list";
		}
		
		if(pageCount == null){
			Integer recordCount = orderSVC.GetUserByAdmin_oni_GetPageCount(oid, sname, sname, sidCard);
			if(recordCount != null && recordCount != 0){
				pageCount = recordCount / MaxShowPage;
				if(recordCount % MaxShowPage != 0)
					pageCount++;
				model.addAttribute("pageCount",pageCount);
			}else{
				model.addAttribute("currentPage",1);
				model.addAttribute("pageCount",1);
				model.addAttribute("sname", sname);
			    model.addAttribute("sidCard",sidCard);
			    model.addAttribute("soid", soid);
				String error = "查询结果为空，请检查查询条件";
				model.addAttribute("error", error);
				//return "admin/ShowAllOrder";
				return "admin/admin_order_list";
			}		
		}
		//回填信息
		if(sname != null && sname != "")
          model.addAttribute("sname", sname);
      
		if(sidCard != null && sidCard != "")
          model.addAttribute("sidCard",sidCard);
      
		if(soid != null && soid != "")
          model.addAttribute("soid", soid);
        if( sname == "" && sidCard == "" && soid == ""){
        	String error = "无查询条件，默认查询全部信息"; 
			model.addAttribute("error", error);
        }
        
		if(currentPage == null)
			currentPage = 1;
        
		if(currentPage > pageCount){
			String error = "已是尾页"; 
			model.addAttribute("error", error);
			currentPage = pageCount;
		}
		if(currentPage == -1 || currentPage == 0){
			String error = "已是首页"; 
			model.addAttribute("error", error);
			currentPage = 1;
		}  
		model.addAttribute("currentPage",currentPage);
		

		
		//开始分页查询
	    if(currentPage != -1 && currentPage != 0 && currentPage <= pageCount){
	    	  Integer firstRecord = (currentPage - 1) * MaxShowPage;	
	    	  List<Order> orderList = orderSVC.GetUserByAdmin_oni(oid,sname,sname,sidCard,firstRecord,MaxShowPage);  
	    	  model.addAttribute("list", orderList);
		 }
       
	    //return "admin/ShowAllOrder";
	    return "admin/admin_order_list";
	}
	
}
