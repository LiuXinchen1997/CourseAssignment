package com.bookstore.action;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;
import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

public class GetVerifyCode extends ActionSupport implements SessionAware,ServletResponseAware
{
    private Map<String, Object> session;
    private HttpServletResponse response;
    private static final long serialVersionUID = 1L;
    private String chknumber;
    
    @Override
    public String execute() throws Exception
    {
        response.setHeader("Cache-Control", "no-cache");
        int width=50; //图片宽度
        int height=20; //图片高度
        BufferedImage image=new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB);
        Graphics graphics=image.createGraphics();
        graphics.setColor(this.getColor());   //背景颜色
        graphics.fillRect(0, 0, width, height);
        graphics.setFont(new Font("Arial",Font.BOLD,18));
        graphics.setColor(this.getColor());   //字的颜色
        String number = String.valueOf(System.currentTimeMillis()%9000+1000);   //生成四位随机数
        
        session.put("verifyCode", number);     //写入session中
        graphics.drawString(number, (int)(width*0.1), (int)(height*0.8));
        graphics.dispose();
        JPEGImageEncoder encoder=JPEGCodec.createJPEGEncoder(response.getOutputStream());
        encoder.encode(image);
        response.getOutputStream().flush();    //刷新到页面生成图片
        response.getOutputStream().close();    //关闭writer
        return null;
    }
    
    private Color getColor() {
        int red = (int)(Math.random()*1000%256);
        int green = (int)(Math.random()*1000%256);
        int blue = (int)(Math.random()*1000%256);
        return new Color(red,green,blue);
    }
    
    public String getChknumber() {
        return chknumber;
    }
    
    public void setChknumber(String chknumber) {
        this.chknumber = chknumber;
    }
    
    @Override
    public void setSession(Map<String, Object> session) {
        // TODO Auto-generated method stub
        this.session = session;
    }
    
    @Override
    public void setServletResponse(HttpServletResponse response) {
        // TODO Auto-generated method stub
        this.response = response;
    }
}