package com.oracle.ebp.service;

import java.sql.Timestamp;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.oracle.ebp.dao.OrderMapper;
import com.oracle.ebp.domain.Order;

@Service
@Scope("singleton")
public class OrderService {
	@Resource
	OrderMapper orderMapper;

	@Resource
	OrderListService orderListService;

//	public List<Order> getOrderById(int uid) {
//		List<Order> orders = orderMapper.getOrderByUserId(uid);
//		return orders;
//	}

	public int createOrder(Order order) {
		int oid = orderMapper.createOrder(order);
		return oid;
	}

	public List<Order> AdminqueryOrderByDate(Timestamp begin, Timestamp end, Integer firstRecord, Integer MaxShowNumber) {

		return orderMapper.AdminqueryOrderByDate(begin, end, firstRecord, MaxShowNumber);
	}

	public List<Order> GetUserByAdmin_oni(int oid, String name, String username, String idCard, Integer firstRecord,
			Integer MaxShowNumber) {
		return orderMapper.GetUserByAdmin_oni(oid, name, username, idCard, firstRecord, MaxShowNumber);
	}

	public Integer AdminqueryOrderByDate_GetPageCount(Timestamp begin, Timestamp end) {
		return orderMapper.AdminqueryOrderByDate_GetPageCount(begin, end);
	}

	public Integer GetUserByAdmin_oni_GetPageCount(int oid, String name, String username, String idCard) {
		return orderMapper.GetUserByAdmin_oni_GetPageCount(oid, name, username, idCard);
	}

	public List<Order> getOrderById(int uid, int page) {
		List<Order> orders = orderMapper.getOrderByUserId(uid, page * 10);
		return orders;
	}

	public List<Order> getOrderByTime(int uid, long start, long end, int page) {
		Timestamp startTime = new Timestamp(start);
		Timestamp endTime = new Timestamp(end);
		List<Order> orders = orderMapper.getOrderByIdAndTime(uid, startTime, endTime, page * 10);
		return orders;
	}

	public void updateAmount(int oid, double amount) {
		orderMapper.updateAmount(oid, amount);
	}
	
	public int getOrderCount(int uid) {
		int count = orderMapper.getOrderCount(uid);
		System.out.println(count);
		return count;
	}
	
	public int getOrderCountByTime(int uid, long start, long end) {
		Timestamp startTime = new Timestamp(start);
		Timestamp endTime = new Timestamp(end);
		int count = orderMapper.getOrderCountByTime(uid, startTime, endTime);
		System.out.println(count);
		return count;
	}
}
