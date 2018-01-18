package com.oracle.ebp.dao;

import java.util.List;

import com.oracle.ebp.domain.OrderList;

public interface OrderListMapper {
	public void createOrderList(OrderList orderList);
	public List<OrderList> getOrderListByOid(int oid, String keywords);
	
	public List<OrderList> getOrderListByOid2(int oid);
}
