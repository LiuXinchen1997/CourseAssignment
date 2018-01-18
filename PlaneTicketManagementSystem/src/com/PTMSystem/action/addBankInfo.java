package com.PTMSystem.action;

import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.PTMSystem.bean.BankInfo;
import com.PTMSystem.bean.User;
import com.PTMSystem.dao.BankInfoDao;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class addBankInfo extends ActionSupport {
	private String bankId;
	private String bankName;
	
	public String getBankId() {
		return bankId;
	}

	public void setBankId(String bankId) {
		this.bankId = bankId;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String check() throws Exception {
		ActionContext actionContext = ActionContext.getContext();
		Map<String, Object> session = (Map)actionContext.get("session");
		
		User user = (User)session.get("user");
		if (user != null) {
			return "success";			
		} else {
			return "fail";
		}
	}
	
	@Override
	public String execute() throws Exception {
		ActionContext actionContext = ActionContext.getContext();
		Map<String, Object> session = (Map)actionContext.get("session");
		
		User user = (User)session.get("user");
		if (user == null) {
			return "fail";
		} else {
			BankInfo bi = new BankInfoDao().getBankInfoByUsername(user.getUsername());
			if (bi == null) {
				BankInfo bankInfo = new BankInfo();
				bankInfo.setBankId(bankId);
				bankInfo.setBankName(bankName);
				bankInfo.setUsername(user.getUsername());
				
				new BankInfoDao().add(bankInfo);
			} else {
				new BankInfoDao().updateBankInfo(user.getUsername(), bankId, bankName);
			}
			
			HttpServletResponse response = null;
			response = ServletActionContext.getResponse();
	        response.setContentType("text/html;charset=UTF-8");
	        response.setCharacterEncoding("UTF-8");
	        
	        PrintWriter out = response.getWriter();
	        out.print("<script language='javascript'>alert('绑定银行卡成功！');window.location='message.jsp';</script>");
	        out.flush();out.close();
	        return null;
		}
	}
}
