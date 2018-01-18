package com.oracle.ebp.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.oracle.ebp.domain.AddTicketBean;
import com.oracle.ebp.domain.Ticket;
import com.oracle.ebp.domain.TicketDetail;
import com.oracle.ebp.domain.UpdateTicketBean;
import com.oracle.ebp.service.TicketService;
import com.oracle.ebp.util.constant.Constant;

@Controller
public class UserSelectTicketController {
	
	@Resource
	private TicketService ticketService;
	
	@RequestMapping("/admin/ajax/uploadPic")
	public void uploadPic(@RequestParam(value = "file", required = false) MultipartFile file,
			HttpServletResponse response, HttpSession session) throws Exception {
		// 尝试从session中读取保存的TicketDetail对象，如没有则创建一个
		TicketDetail td = (TicketDetail) session.getAttribute("ticketDetail");
		if (td == null) {
			td = new TicketDetail();
			// 以下根据需要对保存的文件名进行处理，统一保存文件的命名格式
			int tId = 1;// 这里这个tid是模拟的数据，正常当前为哪个票项添加详情，就使用该票项的tid
			td.settId(tId);
			session.setAttribute("ticketDetail", td);
		}
		
		// 获取服务器上保存图片文件夹的路径
		String path = session.getServletContext().getRealPath("/") + "upload/";
		// 获取图片的原名称(如果使用原图片名称，则通过此代码获取)
		String fileName = file.getOriginalFilename();
		// 在这里不使用原文件名称，而是使用自定义的文件名称
		// 格式为："tId"+"-image(标号)"+".jpg/"
//		String fileNameStr = td.gettId() + "-" + "image" + (td.getiCount() + 1)
//				+ fileName.substring(fileName.lastIndexOf("."));	
		String fileNameStr = fileName;
		// 根据新的路径和文件名创建文件对象
		File targetFile = new File(path, fileNameStr);
		// if (!targetFile.exists()) {
		// targetFile.mkdirs();
		// }
		// 在测试环境中，也应该将文件保存到本地workspace的本项目源码中，以免再次部署时服务器上的图片被删除
		String localPath = Constant.LOCAL_IMAGE_PATH;
		File localFile = new File(localPath, fileNameStr);
		// if (!localFile.exists()) {
		// localFile.mkdirs();
		// }
		
		// 保存
		try {
			copyFile(file, targetFile);// 复制文件到服务器上
			copyFile(file, localFile);// 复制文件到本地workspace
			// 如果添加成功，修改td中保存图片路径，保存序列和图片计数器
			String imagePath = targetFile.getAbsolutePath().substring(targetFile.getAbsolutePath().indexOf("upload"));
			//添加图片路径
			if(td.getImages()==null || td.getImages().length()==0){
				td.setImages(fileName);
			}else{
				td.setImages(td.getImages().concat(","+fileName));
			}
			//设置图片计数器
			td.setiCount(td.getiCount() + 1);
			//设置序列
			if (td.getSequence()==null || td.getSequence().length() == 0) {// 如果第一次添加序列，不拼接前面的逗号
				td.setSequence(td.getSequence().concat("m" + td.getiCount()));
			} else {// 拼接一个逗号分隔符
				td.setSequence(td.getSequence().concat(",m" + td.getiCount()));
			}
			session.setAttribute("ticketDetail", td);
			
			response.setContentType("text/html;charset=UTF-8");
			PrintWriter out = response.getWriter();
			//out.println(imagePath);
			out.println(fileNameStr);
		} catch (Exception e) {
			e.printStackTrace();
			response.setContentType("text/html;charset=UTF-8");
			PrintWriter out = response.getWriter();
			out.println("error");
		}
		System.out.println(td);
	}

	@RequestMapping("/admin/ajax/uploadDesc")
	public void uploadDesc(String desc, HttpServletResponse response, HttpSession session) {
		// 尝试从session中读取保存的TicketDetail对象，如没有则创建一个
		TicketDetail td = (TicketDetail) session.getAttribute("ticketDetail");
		if (td == null) {
			td = new TicketDetail();
			// 以下根据需要对保存的文件名进行处理，统一保存文件的命名格式
			int tId = 1;// 这里这个tid是模拟的数据，正常当前为哪个票项添加详情，就使用该票项的tid
			td.settId(tId);
			session.setAttribute("ticketDetail", td);
		}
		
		//添加文字描述
		if(td.getDescs()==null || td.getDescs().length()==0){
			td.setDescs(desc);
		}else{
			td.setDescs(td.getDescs().concat("/"+desc));//注意使用特殊的分隔符，不要用常用标点符号
		}
		//设置文字描述计数器
		td.setdCount(td.getdCount() + 1);
		//设置序列
		if (td.getSequence()==null || td.getSequence().length() == 0) {// 如果第一次添加序列，不拼接前面的逗号
			td.setSequence(td.getSequence().concat("p" + td.getdCount()));
		} else {// 拼接一个逗号分隔符
			td.setSequence(td.getSequence().concat(",p" + td.getdCount()));
		}
		session.setAttribute("ticketDetail", td);
		
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out;
		try {
			out = response.getWriter();
			out.println(desc);
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println(td);
	}
	
	@RequestMapping("/admin/ajax/addTicket")
	public String submitTicket(@Valid @ModelAttribute("addTicketBean") AddTicketBean addTicketBean, Errors errors, Model model, HttpSession session) {
		if (errors.hasFieldErrors()) {
			model.addAttribute("addTicketBean", addTicketBean);
			return "admin/createticket";
		}
		
		if (addTicketBean.getAmount() < addTicketBean.getBalance()) {
			errors.rejectValue("amount", "", "剩余票数不能大于总票数~");
			model.addAttribute("addTicketBean", addTicketBean);
			return "admin/createticket";
		}
		
		Ticket t = new Ticket();
		try {
			t = AddTicketBean.convertToTicket(addTicketBean);
		} catch (IllegalArgumentException e) {
			errors.rejectValue("startTime", "", "开始时间输入格式不正确~");
			model.addAttribute("addTicketBean", addTicketBean);
			return "admin/createticket";
		}
		ticketService.addTicket(t);
		
		TicketDetail td = (TicketDetail) session.getAttribute("ticketDetail");
		session.removeAttribute("ticketDetail");
		if (td == null) {
			td = new TicketDetail();
		}
		td.settId(t.getTid());
		
		int flag = ticketService.addTicketDetail(td);
		return "redirect:/admin/queryAllOrderList";
	}
	
	
	
	
	public void copyFile(MultipartFile fromFile, File toFile) {
		FileOutputStream fos = null;
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		try {
			bis = new BufferedInputStream(fromFile.getInputStream());
			fos = new FileOutputStream(toFile);
			bos = new BufferedOutputStream(fos);
			int length = 0;
			byte[] buf = new byte[1024];
			while ((length = bis.read(buf)) != -1) {
				bos.write(buf, 0, length);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (bis != null) {
				try {
					bis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			
			if (bos != null) {
				try {
					bos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			
			if (fos != null) {
				try {
					fos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
