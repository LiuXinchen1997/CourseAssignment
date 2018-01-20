<%@page contentType="text/html;charset=utf-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<h2>
	编辑推荐
</h2>
<div id=__bianjituijian/danpin>
	<div class=second_c_02>
	<s:iterator value="books">
		<div class=second_c_02_b1>
			<div class=second_c_02_b1_1>
				<a href="/BookStoreOL/BookInfoAction?id=${id}" ><img src="${pageContext.request.contextPath}/bookImages/${image}" width=70 border=0 /> </a>
			</div>
			<div class=second_c_02_b1_2>
				<h3>
					<a href="/BookStoreOL/BookInfoAction?id=${id}" title='${name}'>书名:${name}</a>
				</h3>
				<h4>
					作者：${author} 著
					<br />
					出版社：${publishing}&nbsp;&nbsp;&nbsp;&nbsp;版本：${version}
				</h4>
				<h5>
					简介:${summary}
				</h5>
				<h6>
					定价：￥${price}&nbsp;&nbsp;
				</h6>
				<div class=line_xx></div>
			</div>
		</div>
		</s:iterator>
		
	</div>
</div>
