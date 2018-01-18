package com.oracle.ebp.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.LinkedList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.springframework.core.env.SystemEnvironmentPropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.oracle.ebp.dao.TicketMapper;
import com.oracle.ebp.domain.AddTicketBean;
import com.oracle.ebp.domain.Ticket;
import com.oracle.ebp.domain.TicketDetail;
import com.oracle.ebp.domain.TopUpAccountBean;
import com.oracle.ebp.domain.UpdateTicketBean;
import com.oracle.ebp.service.TicketService;
import com.oracle.ebp.util.constant.Constant;
import com.oracle.ebp.util.tools.CookiesTool;
import com.oracle.ebp.util.tools.CookiesTrans;
import com.oracle.ebp.util.tools.FileUpload;
import com.oracle.ebp.util.tools.StringUtils;

@Controller
public class TicketController {
	@Resource
	private TicketService ticketService;

	@RequestMapping("/user/queryTicketsByDate")
	public String queryTicketByDate(Model model, String date) {
		Timestamp earlyTime = null;

		if (date == null || date.length() == 0) {
			earlyTime = new Timestamp(new Date().getTime());
		} else {
			earlyTime = Timestamp.valueOf(date + " 00:00:00");
		}

		Timestamp lateTime = null;
		Date earlyDate = earlyTime;
		Date lateDate = null;

		try {
			Calendar calendar = new GregorianCalendar();
			calendar.setTime(earlyDate);
			calendar.add(calendar.DATE, 7);
			lateDate = calendar.getTime();
			lateTime = new Timestamp(lateDate.getTime());
		} catch (Exception e) {
			e.printStackTrace();
		}

		model.addAttribute("list", ticketService.listTicketsByDate(earlyTime.toString(), lateTime.toString()));
		return "user/ShowTickets";
	}

	@RequestMapping("/user/ticketdetail")
	public String showTicketDetail(HttpServletRequest req, Model model) {
		if (req.getParameter("tid") == null) {
			//return "user/showTicketDetail";
			return "user/ticket";
		}

		int tid = Integer.parseInt(req.getParameter("tid"));
		TicketDetail td = ticketService.getTicketDetailsByTid(tid);

		List<String> descs = new LinkedList<String>();
		if (td.getDescs() != null) {
			descs = Arrays.asList(td.getDescs().split("/"));
		}

		List<String> images = new LinkedList<String>();
		if (td.getImages() != null) {
			images = Arrays.asList(td.getImages().split(","));
		}

		List<String> sequences = new LinkedList<String>();
		if (td.getSequence() != null) {
			sequences = Arrays.asList(td.getSequence().split(","));
		}

		model.addAttribute("descs", descs);
		model.addAttribute("images", images);
		model.addAttribute("sequences", sequences);
		model.addAttribute("tid", tid);
		//return "user/showTicketDetail";
		return "user/ticket";
	}

		
	@RequestMapping("/admin/AddTicket")
	public String addTicket(@Valid @ModelAttribute("addTicketBean") AddTicketBean atb, Errors errors, Model model,
			HttpSession session, HttpServletResponse response) {
		if (errors.hasFieldErrors()) {
			return "admin/AddTicket";
		}

		if (session.getAttribute("uploadImages") != null) {
			session.removeAttribute("uploadImages");
		}

		if (session.getAttribute("sequence") != null) {
			session.removeAttribute("sequence");
		}

		if (session.getAttribute("uploadDescs") != null) {
			session.removeAttribute("uploadDescs");
		}

		Ticket t = AddTicketBean.convertToTicket(atb);
		// ticketService.addTicket(t);

		String ticketInfo = CookiesTrans.ticketConvertToCookieString(t);
		Cookie c = new Cookie("ticket", ticketInfo);
		c.setMaxAge(24 * 3600);
		c.setPath("/");
		response.addCookie(c);

		model.addAttribute("ticket", t);
		session.setAttribute("ticket", t);

		return "admin/AddTicketDetail";
	}

	@RequestMapping(value = "/admin/addTicketImage", method = RequestMethod.POST)
	public String imageUpload(@RequestParam("image") MultipartFile image, HttpServletRequest request,
			HttpSession session) {
		if (!image.isEmpty()) {
			try {
				String filePath = image.getOriginalFilename();

				image.transferTo(new File(filePath));
				File imageSrc = new File(filePath);

				// String imagePath = System.getProperty("catalina.home");
				String imagePath = "E:/Tomcat/apache-tomcat-8.0.43/";
				File imageLocalDst = new File(Constant.LOCAL_IMAGE_PATH + filePath);
				File imageDst = new File(imagePath + "/webapps/ebp_2/upload/" + filePath);

				try {
					FileUpload.copyFile(imageSrc, imageDst);
					FileUpload.copyFile(imageSrc, imageLocalDst);
				} catch (Exception e) {
				}

				// 记录图片名
				List<String> list = (List<String>) session.getAttribute("uploadImages");
				if (list == null) {
					list = new LinkedList<String>();
				}
				list.add(filePath);
				session.setAttribute("uploadImages", list);

				// 记录序列
				String sequence = (String) session.getAttribute("sequence");
				if (sequence == null) {
					sequence = "m1";
				} else {
					int num = StringUtils.findLastNum("m", sequence) + 1;
					sequence += (",m" + num);
				}
				session.setAttribute("sequence", sequence);

				return "admin/AddTicketDetail";
			} catch (Exception e) {
				e.printStackTrace();
				return "admin/AddTicketDetail";
			}
		} else {
			System.out.println("读入的文件为null");
			return "admin/AddTicketDetail";
		}
	}
	
	@RequestMapping(value = "/admin/addTicketDescs", method = RequestMethod.POST)
	public String descsUpload(String descs, HttpSession session, HttpServletRequest request) {
		if (descs == null || descs.length() == 0) {
			return "admin/AddTicketDetail";
		}

		List<String> list = (List<String>) session.getAttribute("uploadDescs");
		if (list == null) {
			list = new LinkedList<String>();
		}
		list.add(descs);
		session.setAttribute("uploadDescs", list);

		// 记录序列
		String sequence = (String) session.getAttribute("sequence");
		if (sequence == null) {
			sequence = "p1";
		} else {
			int num = StringUtils.findLastNum("p", sequence) + 1;
			sequence += (",p" + num);
		}
		session.setAttribute("sequence", sequence);

		return "admin/AddTicketDetail";
	}

	@RequestMapping(value = "/admin/addTicketDetail", method = RequestMethod.POST)
	public String addTicketDetail(HttpSession session, HttpServletRequest request) {
		if (session.getAttribute("ticket") == null) {
			return "admin/AddTicket";
		}

		Cookie ticketCookie = CookiesTool.getCookie("ticket", request);
		if (ticketCookie == null) {
			return "admin/AddTicket";
		}

		Ticket t = CookiesTrans.loadTicketFromString(ticketCookie.getValue());
		ticketService.addTicket(t);
		System.out.println(t);

		// Integer tid = ((Ticket) session.getAttribute("ticket")).getTid();

		String sequence = (String) session.getAttribute("sequence");
		if (sequence == null) {
			sequence = "";
		}

		List<String> images = (List<String>) session.getAttribute("uploadImages");
		List<String> descses = (List<String>) session.getAttribute("uploadDescs");

		String imagesStr = "";
		if (images != null && images.size() > 0) {
			imagesStr = images.get(0);
		}
		if (images != null && images.size() >= 1) {
			for (int i = 1; i < images.size(); i++) {
				imagesStr += ("," + images.get(i));
			}
		}

		String descsesStr = "";
		if (descses != null && descses.size() > 0) {
			descsesStr = descses.get(0);
		}
		if (descses != null && descses.size() >= 1) {
			for (int i = 1; i < descses.size(); i++) {
				descsesStr += ("/" + descses.get(i));
			}
		}

//		TicketDetail td = new TicketDetail();
//		td.settId(t.getTid());
//		td.setDescs(descsesStr);
//		td.setImages(imagesStr);
//		td.setSequence(sequence);
		
		TicketDetail td = (TicketDetail) session.getAttribute("ticketDetail");
		td.settId(t.getTid());
		
		int flag = ticketService.addTicketDetail(td);

		if (flag == 0) {
			return "admin/AddTicketDetail";
		} else {
			return "admin/AddTicket";
		}
	}

	/* MaxShowPage可更正为一页能显示的最大条数 */
	@RequestMapping(value = "/user/queryAllOrderList")
	public String User_GetAllTicket(Model model, Integer currentPage, Integer pageCount, HttpSession session) {
		model.addAttribute("isQueryAll", 1);
		
		int MaxShowPage = Constant.MAXSHOWPAGE;
		
		session.removeAttribute("TicketDescs");
		session.removeAttribute("lowPrice");
		session.removeAttribute("highPrice");
/*		Timestamp beginDate = null;
		Timestamp endDate = null;

		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date nowDate = new Date();
		endDate = new Timestamp(nowDate.getTime());
		session.setAttribute("Ticketend", dateFormat.format(nowDate));
		session.removeAttribute("TicketDescs");

		Calendar calendar = new GregorianCalendar();
		calendar.setTime(endDate);
		calendar.add(calendar.DATE, -7);
		Date earlyDate = calendar.getTime();
		beginDate = new Timestamp(earlyDate.getTime());
		session.setAttribute("Ticketbegin", dateFormat.format(earlyDate));*/
		
		Timestamp beginDate = null;
		Timestamp endDate = null;
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		
		Date nowDate = new Date();
		beginDate = new Timestamp(nowDate.getTime());
		model.addAttribute("Ticketbegin", dateFormat.format(nowDate));
		session.setAttribute("Ticketbegin", dateFormat.format(nowDate));

		//结束日期变为时间戳
		Calendar calendar = new GregorianCalendar();
		calendar.setTime(beginDate);
		calendar.add(calendar.DATE, 7);
		Date earlyDate = calendar.getTime();
		endDate = new Timestamp(earlyDate.getTime());
		model.addAttribute("Ticketend", dateFormat.format(earlyDate));
		session.setAttribute("Ticketend", dateFormat.format(earlyDate));
		System.out.println(endDate);

		if (pageCount == null) {
			Integer recordCount = ticketService.Admin_GetTicketBySday_Eday_GetRecordCount(beginDate, endDate);
			if (recordCount != null && recordCount != 0) {
				pageCount = recordCount / MaxShowPage;
				if (recordCount % MaxShowPage != 0)
					pageCount++;
				model.addAttribute("pageCount", pageCount);

				session.setAttribute("pageCount", pageCount);
			} else {
				model.addAttribute("currentPage", 1);
				model.addAttribute("pageCount", 1);
				String error = "查询结果为空，请检查查询条件";
				model.addAttribute("error", error);
				return "user/ShowTickets";
			}
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

		session.setAttribute("currentPage", currentPage);

		if (currentPage != -1 && currentPage != 0 && currentPage <= pageCount) {
			Integer firstRecord = (currentPage - 1) * MaxShowPage;

			List<Ticket> ticketlist = ticketService.Admin_GetTicketBySday_Eday(beginDate, endDate, firstRecord,
					MaxShowPage);

			model.addAttribute("list", ticketlist);
		}
		return "user/ShowTickets";
	}

	@RequestMapping(value = "/user/GetTicketBySday_Eday")
	 /*MaxShowPage可更正为一页能显示的最大条数 */
	public String User_GetTicketBySday_Eday(Model model, String Ticketbegin, String Ticketend, Integer currentPage,
			Integer pageCount, HttpSession session) {
		model.addAttribute("isDate", 1);
		
		int MaxShowPage = Constant.MAXSHOWPAGE;

		session.setAttribute("currentPage", currentPage);
		session.removeAttribute("TicketDescs");
		session.removeAttribute("lowPrice");
		session.removeAttribute("highPrice");
	
		
		
		Timestamp endDate = null;
		Timestamp beginDate = null;
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		if (Ticketbegin == "" || Ticketbegin == null) {
			//开始日期变为时间戳
			Date nowDate = new Date();
			beginDate = new Timestamp(nowDate.getTime());
			Ticketbegin = dateFormat.format(nowDate);
			model.addAttribute("Ticketbegin", dateFormat.format(nowDate));
			session.setAttribute("Ticketbegin", dateFormat.format(nowDate));
            
			//结束日期变为时间戳
			Calendar calendar = new GregorianCalendar();
			calendar.setTime(beginDate);
			calendar.add(calendar.DATE, 7);
			Date earlyDate = calendar.getTime();
			endDate = new Timestamp(earlyDate.getTime());
			Ticketend = dateFormat.format(earlyDate);
			session.setAttribute("Ticketend", dateFormat.format(earlyDate));
			String error = "默认查询当前时间后七天时间";
			model.addAttribute("error", error);
		} 
		if (Ticketbegin != ""&& Ticketbegin != null) {
			
			//开始日期变为时间戳
			beginDate = Timestamp.valueOf(Ticketbegin + " 00:00:00");
			model.addAttribute("Ticketbegin", Ticketbegin);
			session.setAttribute("Ticketbegin", Ticketbegin);
			
			Calendar calendar = new GregorianCalendar();
			calendar.setTime(beginDate);
			calendar.add(calendar.DATE, 7);
			Date earlyDate = calendar.getTime();
			endDate = new Timestamp(earlyDate.getTime());
			model.addAttribute("Ticketend", dateFormat.format(earlyDate));
			session.setAttribute("Ticketend", dateFormat.format(earlyDate));
			String error = "默认查询当前日期后7天的数据";
			model.addAttribute("error", error);
		}
		
		if (pageCount == null) {
			Integer recordCount = ticketService.Admin_GetTicketBySday_Eday_GetRecordCount(beginDate, endDate);
			if (recordCount != null && recordCount != 0) {
				pageCount = recordCount / MaxShowPage;
				if (recordCount % MaxShowPage != 0)
					pageCount++;
				model.addAttribute("pageCount", pageCount);

				session.setAttribute("pageCount", pageCount);
			} else {
				model.addAttribute("currentPage", 1);
				model.addAttribute("pageCount", 1);
				String error = "查询结果为空，请检查查询条件";
				model.addAttribute("error", error);
				return "user/list";
			}
		}
		
		if(currentPage == null) currentPage = 1;
		 

		if (currentPage > pageCount) {
			currentPage = pageCount;
			String error = "已是尾页";
			model.addAttribute("error", error);
		}
		
		if (currentPage == -1 || currentPage == 0) {
			currentPage = 1;
			String error = "已是首页";
			model.addAttribute("error", error);

		}
		model.addAttribute("currentPage", currentPage);

		session.setAttribute("currentPage", currentPage);

		// 开始分页查询
		if (currentPage != -1 && currentPage != 0 && currentPage <= pageCount) {
			Integer firstRecord = (currentPage - 1) * MaxShowPage;
			 
			List<Ticket> ticketlist = ticketService.Admin_GetTicketBySday_Eday(beginDate, endDate, firstRecord,
					MaxShowPage);
			
			for (Ticket ticket : ticketlist) {
				String images = ticketService.getTicketDetailsByTid(ticket.getTid()).getImages();
				if (images != null && images.length() != 0) {
					String cover = images.split(",")[0];
					ticket.setCover(cover);
				}
			}

			model.addAttribute("list", ticketlist);
		}
		//return "user/ShowTickets";
		return "user/list";
	}
	
	@RequestMapping(value = "user/GetTicketByDescs")
	public String User_GetTicketBy_Descs(Model model, String TicketDescs, Integer currentPage, Integer pageCount,
			HttpSession session) {
		int MaxShowPage = Constant.MAXSHOWPAGE;
		
		model.addAttribute("isDescs", 1);
		
		if (TicketDescs == null || TicketDescs == "") {
			String error = "描述名不能为空";
			model.addAttribute(error, "error");
//			return "user/ShowTickets";
			return "user/list";
		}

		
		model.addAttribute("TicketDescs", TicketDescs);

		session.removeAttribute("Ticketbegin");
		session.removeAttribute("Ticketend");
		session.removeAttribute("lowPrice");
		session.removeAttribute("highPrice");
		session.setAttribute("TicketDescs", TicketDescs);

		if (pageCount == null) {
			Integer recordCount = ticketService.Admin_GetTicketByDescs_GetRecordCount(TicketDescs);
			if (recordCount != null && recordCount != 0) {
				pageCount = recordCount / MaxShowPage;
				if (recordCount % MaxShowPage != 0)
					pageCount++;
				model.addAttribute("pageCount", pageCount);

				session.setAttribute("pageCount", pageCount);
			} else {
				model.addAttribute("currentPage", 1);
				model.addAttribute("pageCount", 1);
				String error = "查询结果为空，请检查查询条件";
				model.addAttribute("error", error);
//				return "user/ShowTickets";
				return "user/list";
			}
		}
		System.out.println("currentPage " + currentPage);
		System.out.println("pageCount" + pageCount);
		
		if (currentPage == null)
			currentPage = 1;
		
		if (currentPage == -1 || currentPage == 0) {
			currentPage = 1;
			String error = "已是首页";
			model.addAttribute("error", error);

		}
		if (currentPage > pageCount) {
			currentPage = pageCount;
			String error = "已是尾页";
			model.addAttribute("error", error);

		}
	

		model.addAttribute("currentPage", currentPage);
		session.setAttribute("currentPage", currentPage);

		if (currentPage != -1 && currentPage != 0 && currentPage <= pageCount) {
			Integer firstRecord = (currentPage - 1) * MaxShowPage;

			List<Ticket> ticketlist = ticketService.Admin_GetTicketByDescs(TicketDescs, firstRecord, MaxShowPage);
			
			for (Ticket ticket : ticketlist) {
				String images = ticketService.getTicketDetailsByTid(ticket.getTid()).getImages();
				if (images != null && images.length() != 0) {
					String cover = images.split(",")[0];
					ticket.setCover(cover);
				}
			}
			
			model.addAttribute("list", ticketlist);

		}
//		return "user/ShowTickets";
		return "user/list";
	}
	
	@RequestMapping(value = "/user/GetTicketByPrice")
	 /*MaxShowPage可更正为一页能显示的最大条数 */
	public String User_GetTicketByPrice(Model model, Integer lowPrice, Integer highPrice, Integer currentPage,
			Integer pageCount, HttpSession session) {
		
		model.addAttribute("isPrice", 1);
		
		int MaxShowPage = Constant.MAXSHOWPAGE;
		
		session.setAttribute("currentPage", currentPage);
		session.removeAttribute("TicketDescs");
		session.removeAttribute("Ticketbegin");
		session.removeAttribute("Ticketend");
			
		if (pageCount == null) {
			Integer recordCount = ticketService.User_GetTicketByPrice_GetRecordCount(lowPrice, highPrice);
			if (recordCount != null && recordCount != 0) {
				pageCount = recordCount / MaxShowPage;
				if (recordCount % MaxShowPage != 0)
					pageCount++;
				model.addAttribute("pageCount", pageCount);

				session.setAttribute("pageCount", pageCount);
			} else {
				model.addAttribute("currentPage", 1);
				model.addAttribute("pageCount", 1);
				String error = "查询结果为空，请检查查询条件";
				model.addAttribute("error", error);
				//return "user/ShowTickets";
				return "user/list";
			}
		}

		
		  if(currentPage == null) currentPage = 1;
		 

		if (currentPage > pageCount) {
			currentPage = pageCount;
			String error = "已是尾页";
			model.addAttribute("error", error);
		}
		
		if (currentPage == -1 || currentPage == 0) {
			currentPage = 1;
			String error = "已是首页";
			model.addAttribute("error", error);

		}
		model.addAttribute("currentPage", currentPage);

		session.setAttribute("currentPage", currentPage);
		
		model.addAttribute("lowPrice", lowPrice);
		session.setAttribute("lowPrice", lowPrice);
		session.setAttribute("highPrice",highPrice);
		model.addAttribute("highPrice",highPrice);

		// 开始分页查询
		if (currentPage != -1 && currentPage != 0 && currentPage <= pageCount) {
			Integer firstRecord = (currentPage - 1) * MaxShowPage;
			 
			List<Ticket> ticketlist = ticketService.User_GetTicketByPrice(lowPrice, highPrice, firstRecord, MaxShowPage);
			
			for (Ticket ticket : ticketlist) {
				String images = ticketService.getTicketDetailsByTid(ticket.getTid()).getImages();
				if (images != null && images.length() != 0) {
					String cover = images.split(",")[0];
					ticket.setCover(cover);
				}
			}
			
			model.addAttribute("list", ticketlist);

		}
		//return "user/ShowTickets";
		return "user/list";
	}

	/* MaxShowPage可更正为一页能显示的最大条数 */
	@RequestMapping(value = "/admin/queryAllOrderList")
	public String GetAllTicket(Model model, Integer currentPage, Integer pageCount, HttpSession session) {
		int MaxShowPage = Constant.MAXSHOWPAGE;

		/*
		 * session.setAttribute("Ticketbegin", null);
		 * session.setAttribute("Ticketend", null);
		 */
		session.removeAttribute("TicketDescs");
		Timestamp beginDate = null;
		Timestamp endDate = null;
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		
		Date nowDate = new Date();
		beginDate = new Timestamp(nowDate.getTime());
		model.addAttribute("Ticketbegin", dateFormat.format(nowDate));
		session.setAttribute("Ticketbegin", dateFormat.format(nowDate));
		/*model.addAttribute("Ticketbegin", "");
		session.setAttribute("Ticketbegin","");*/
        
		//结束日期变为时间戳
		Calendar calendar = new GregorianCalendar();
		calendar.setTime(beginDate);
		calendar.add(calendar.DATE, 7);
		Date earlyDate = calendar.getTime();
		endDate = new Timestamp(earlyDate.getTime());
		session.setAttribute("Ticketend", dateFormat.format(earlyDate));
		model.addAttribute("Ticketend", dateFormat.format(earlyDate));
		/*session.setAttribute("Ticketend", "");
		model.addAttribute("Ticketend", "");*/

		
		if (pageCount == null) {
			/*Integer recordCount = ticketService.Admin_GetALLTicket_Number();*/
			Integer recordCount = ticketService.Admin_GetTicketBySday_Eday_GetRecordCount(beginDate, endDate);
			if (recordCount != null && recordCount != 0) {
				pageCount = recordCount / MaxShowPage;
				if (recordCount % MaxShowPage != 0)
					pageCount++;
				model.addAttribute("pageCount", pageCount);

				session.setAttribute("pageCount", pageCount);
			} else {
				model.addAttribute("currentPage", 1);
				model.addAttribute("pageCount", 1);
				String error = "查询结果为空，请检查查询条件";
				model.addAttribute("error", error);
				return "admin/admin_ticket_change";
			}
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

		session.setAttribute("currentPage", currentPage);

		if (currentPage != -1 && currentPage != 0 && currentPage <= pageCount) {
			Integer firstRecord = (currentPage - 1) * MaxShowPage;

			List<Ticket> ticketlist = ticketService.Admin_GetTicketBySday_Eday(beginDate, endDate, firstRecord, MaxShowPage);
			
			model.addAttribute("list", ticketlist);
		}
		//return "admin/ShowAllTicket";
		return "admin/admin_ticket_change";
	}

	@RequestMapping(value = "/admin/GetTicketBySday_Eday")
	/* MaxShowPage可更正为一页能显示的最大条数 */
	public String GetTicketBySday_Eday(Model model, String Ticketbegin, String Ticketend, Integer currentPage,
			Integer pageCount, HttpSession session) {
		int MaxShowPage = Constant.MAXSHOWPAGE;
		
		/*
		 * model.addAttribute("Ticketbegin", Ticketbegin);
		 * model.addAttribute("Ticketend", Ticketend);
		 */
		/*
		 * session.setAttribute("Ticketbegin", Ticketbegin);
		 * session.setAttribute("Ticketend", Ticketend);
		 */
		session.setAttribute("currentPage", currentPage);
		session.removeAttribute("TicketDescs");
		session.removeAttribute("Ticketbegin");
		session.removeAttribute("Ticketend");
		
		Timestamp endDate = null;
		Timestamp beginDate = null;
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		if (Ticketbegin == "" && Ticketend == "") {
			//开始日期变为时间戳
			Date nowDate = new Date();
			beginDate = new Timestamp(nowDate.getTime());
			Ticketbegin = dateFormat.format(nowDate);
			model.addAttribute("Ticketbegin", dateFormat.format(nowDate));
			session.setAttribute("Ticketbegin", dateFormat.format(nowDate));
            
			//结束日期变为时间戳
			Calendar calendar = new GregorianCalendar();
			calendar.setTime(beginDate);
			calendar.add(calendar.DATE, 7);
			Date earlyDate = calendar.getTime();
			endDate = new Timestamp(earlyDate.getTime());
			Ticketend = dateFormat.format(earlyDate);
			session.setAttribute("Ticketend", dateFormat.format(earlyDate));
			String error = "默认查询当前时间后七天时间";
			model.addAttribute("error", error);
		} else if (Ticketbegin == "" && Ticketend != "") {
			//结束日期变为时间戳
			endDate = Timestamp.valueOf(Ticketend + " 23:59:59");
			model.addAttribute("Ticketend", Ticketend);
			session.setAttribute("Ticketend", Ticketend);
			
			//开始日期变为时间戳
			Calendar calendar = new GregorianCalendar();
			calendar.setTime(endDate);
			calendar.add(calendar.DATE, -7);
			Date earlyDate = calendar.getTime();
			beginDate = new Timestamp(earlyDate.getTime());
			Ticketbegin = dateFormat.format(earlyDate);
			model.addAttribute("Ticketbegin", dateFormat.format(earlyDate));
			session.setAttribute("Ticketbegin", dateFormat.format(earlyDate));
			String error = "默认查询结束日期前7天内的数据";
			model.addAttribute("error", error);
		} else if (Ticketend == "" && Ticketbegin != "") {
			//开始日期变为时间戳
			beginDate = Timestamp.valueOf(Ticketbegin + " 00:00:00");
			model.addAttribute("Ticketbegin", Ticketbegin);
			session.setAttribute("Ticketbegin", Ticketbegin);
			
			//当前日期变为时间戳
			Date nowDate = new Date();
			endDate = new Timestamp(nowDate.getTime());
			Ticketend = dateFormat.format(nowDate);
			model.addAttribute("Ticketend", Ticketend);
			session.setAttribute("Ticketend", Ticketend);
			
			String error = "默认查询开始日期到当前日期的数据";
			model.addAttribute("error", error);
		}else{
			endDate  = Timestamp.valueOf(Ticketend + " 23:59:59");
			beginDate = Timestamp.valueOf(Ticketbegin + " 00:00:00");
			model.addAttribute("Ticketend", Ticketend);
			model.addAttribute("Ticketbegin", Ticketbegin);
		}

		if (pageCount == null) {
			Integer recordCount = ticketService.Admin_GetTicketBySday_Eday_GetRecordCount(beginDate, endDate);
			if (recordCount != null && recordCount != 0) {
				pageCount = recordCount / MaxShowPage;
				if (recordCount % MaxShowPage != 0)
					pageCount++;
				model.addAttribute("pageCount", pageCount);

				session.setAttribute("pageCount", pageCount);
			} else {
				model.addAttribute("currentPage", 1);
				model.addAttribute("pageCount", 1);
				String error = "查询结果为空，请检查查询条件";
				model.addAttribute("error", error);
				return "admin/admin_ticket_change";
			}
		}

		

		
		 if(currentPage == null) currentPage = 1;
		 
		if (currentPage == -1 || currentPage == 0) {
				currentPage = 1;
				String error = "已是首页";
				model.addAttribute("error", error);

		}
		
		if (currentPage > pageCount) {
			currentPage = pageCount;
			String error = "已是尾页";
			model.addAttribute("error", error);
		}
		
	
		model.addAttribute("currentPage", currentPage);

		session.setAttribute("currentPage", currentPage);

		// 开始分页查询
		if (currentPage != -1 && currentPage != 0 && currentPage <= pageCount) {
			Integer firstRecord = (currentPage - 1) * MaxShowPage;
			List<Ticket> ticketlist = ticketService.Admin_GetTicketBySday_Eday(beginDate, endDate, firstRecord,
					MaxShowPage);

			model.addAttribute("list", ticketlist);

		}
		return "admin/admin_ticket_change";
	}

	@RequestMapping(value = "admin/GetTicketByDescs")
	public String GetTicketBy_Descs(Model model, String TicketDescs, Integer currentPage, Integer pageCount,
			HttpSession session) {
		int MaxShowPage = Constant.MAXSHOWPAGE;
		
		if (TicketDescs == null || TicketDescs == "") {
			
			String error = "描述名不能为空";
			model.addAttribute("error",error);
			return "admin/admin_ticket_change";
		}

		model.addAttribute("isTicketCondition", 1);
		model.addAttribute("TicketDescs", TicketDescs);

		session.removeAttribute("Ticketbegin");
		session.removeAttribute("Ticketend");
		session.setAttribute("TicketDescs", TicketDescs);

		if (pageCount == null) {
			Integer recordCount = ticketService.Admin_GetTicketByDescs_GetRecordCount(TicketDescs);
			if (recordCount != null && recordCount != 0) {
				pageCount = recordCount / MaxShowPage;
				if (recordCount % MaxShowPage != 0)
					pageCount++;
				model.addAttribute("pageCount", pageCount);

				session.setAttribute("pageCount", pageCount);
			} else {
				model.addAttribute("currentPage", 1);
				model.addAttribute("pageCount", 1);
				String error = "查询结果为空，请检查查询条件";
				model.addAttribute("error", error);
				return "admin/admin_ticket_change";
			}
		}
		if (currentPage > pageCount) {
			currentPage = pageCount;
			String error = "已是尾页";
			model.addAttribute("error", error);

		}
		if (currentPage == -1 || currentPage == 0) {
			currentPage = 1;
			String error = "已是首页";
			model.addAttribute("error", error);

		}

		model.addAttribute("currentPage", currentPage);
		session.setAttribute("currentPage", currentPage);

		if (currentPage != -1 && currentPage != 0 && currentPage <= pageCount) {
			Integer firstRecord = (currentPage - 1) * MaxShowPage;

			List<Ticket> ticketlist = ticketService.Admin_GetTicketByDescs(TicketDescs, firstRecord, MaxShowPage);
			
			model.addAttribute("list", ticketlist);

		}
		
		//return "admin/ShowAllTicket";
		return "admin/admin_ticket_change";
	}

	@RequestMapping(value = "/admin/GetTicketById")
	public void UpdateTicketStatus(Integer tid, HttpServletResponse response) {
		Integer status = 0;
		PrintWriter out;
		if (ticketService.Admin_Query_UpdateTicketStatus(tid) == 0)
			status = 1;
		ticketService.Admin_UpdateTicketStatus(tid, status);
		try {
			out = response.getWriter();
			if (ticketService.Admin_Query_UpdateTicketStatus(tid) == 1)
				out.write("售票中");
			else
				out.write("已停售");
			out.flush();
			out.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/admin/AdminGetTicketById")
	public String Admin_Get_UpdatedTicketInformation(Model model, Integer tid) {
		Ticket t = ticketService.Admin_get_TicketInformation(tid);
		UpdateTicketBean utb = new UpdateTicketBean();
		
		utb.setAmount(t.getAmount());
		utb.setBalance(t.getBalance());
		utb.setDescs(t.getDescs());
		utb.setPrice(t.getPrice());
		utb.setStartTime(t.getStartTime());
		utb.setStatus(t.getStatus());
		utb.setTid(t.getTid());
		System.out.println(utb);
		
		model.addAttribute("updateTicketBean", utb);
		//return "admin/UpdateTicket";
		//return "admin/admin_ticket_change";
		System.out.println("ssss");
		return "admin/change_ticket";
	}

	// AdminUpdateTicketById
	@RequestMapping(value = "/admin/AdminUpdateTicketById")
	public String Admin_Update_TicketInformation(@Valid @ModelAttribute("updateTicketBean") UpdateTicketBean updateTicketBean, Errors errors, Model model, HttpSession session) {
		if (errors.hasFieldErrors()) {
			model.addAttribute("updateTicketBean", updateTicketBean);
			//return "admin/UpdateTicket";
			return "admin/change_ticket";
		}

		
		if (updateTicketBean.getAmount() < updateTicketBean.getBalance()) {
			model.addAttribute("updateTicketBean", updateTicketBean);
			errors.rejectValue("balance", "NumberFormatException.ticketBean.balance", "剩余票数不能大于总票数");
//			return "admin/UpdateTicket";
			return "admin/change_ticket";
		}
		

		// Ticket ticket = new
		// Ticket(tid,descs,null,Integer.parseInt(amount),Integer.parseInt(balance),
		// Double.parseDouble(price),0);
		ticketService.Admin_Update_TicketInformation(updateTicketBean);
		// ticketSVC.Admin_Update_TicketInformation(ticket);

		int currentPage = (int) session.getAttribute("currentPage");
		int pageCount = (int) session.getAttribute("pageCount");

		int MaxShowPage = Constant.MAXSHOWPAGE;

		try {
			String descs = (String) session.getAttribute("TicketDescs");
			if (descs != null)
				model.addAttribute("TicketDescs");
			if (currentPage != -1 && currentPage != 0 && currentPage <= pageCount) {
				Integer firstRecord = (currentPage - 1) * MaxShowPage;
				List<Ticket> ticketlist = ticketService.Admin_GetTicketByDescs(descs, firstRecord, MaxShowPage);

				model.addAttribute("list", ticketlist);
			}
		} catch (Exception e) {
			String Ticketbegin = (String) session.getAttribute("Ticketbegin");
			String Ticketend = (String) session.getAttribute("Ticketend");
			Timestamp beginDate = null;
			if (Ticketbegin != null && Ticketbegin != "") {
				beginDate = Timestamp.valueOf(Ticketbegin + " 00:00:00");
				model.addAttribute("Ticketbegin", Ticketbegin);
			}

			Timestamp endDate = null;
			if (Ticketend != null && Ticketend != "") {
				endDate = Timestamp.valueOf(Ticketend + " 23:59:59");
				model.addAttribute("Ticketend", Ticketend);
			}

			if (currentPage != -1 && currentPage != 0 && currentPage <= pageCount) {
				Integer firstRecord = (currentPage - 1) * MaxShowPage;

				List<Ticket> ticketlist = ticketService.Admin_GetTicketBySday_Eday(beginDate, endDate, firstRecord,
						MaxShowPage);

				model.addAttribute("list", ticketlist);
			}
		}
		//return "admin/ShowAllTicket";
		return "redirect:/admin/queryAllOrderList";
	}
}