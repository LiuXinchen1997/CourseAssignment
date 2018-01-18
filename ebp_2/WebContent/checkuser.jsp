<%@ page language="java" import="java.sql.*" pageEncoding="UTF-8"%>
<% 
Class.forName("com.mysql.jdbc.Driver").newInstance();  
String url="jdbc:mysql://localhost:3306/ebp";  
String user="root";  
String password="0604";  
Connection conn = DriverManager.getConnection(url, user, password);  
Statement st = conn.createStatement();  
System.out.print(request.getParameter("username"));
try{
	System.out.print("select * from user where username='"+request.getParameter("username")+"'");
ResultSet rs = st.executeQuery("select * from user where username='"+request.getParameter("username")+"'");  
if(!rs.next()){  
out.print("ok");  
}  
conn.close(); }
catch(Exception e)
{
	e.printStackTrace();
}
%>
