package com.oracle.ebp.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.oracle.ebp.dao.OrderListMapper;
import com.oracle.ebp.domain.OrderList;

@Service
@Scope("singleton")
public class OrderListService {
	@Resource
	OrderListMapper orderListMapper;

	public void createOrderList(OrderList orderList) {
		orderListMapper.createOrderList(orderList);
	}
	
	public List<OrderList> getOrderListByOid(int oid, String keywords) {
		List<OrderList> orderList = orderListMapper.getOrderListByOid(oid, "%"+keywords+"%");
		return orderList;
	}
	
	public List<OrderList> getOrderListByOid(int oid) {
		return orderListMapper.getOrderListByOid2(oid);
	}

}
