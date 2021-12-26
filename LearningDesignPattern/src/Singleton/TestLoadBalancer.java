package Singleton;

import java.util.LinkedList;
import java.util.List;

public class TestLoadBalancer {
	public static void main(String[] args) {
		LoadBalancer balancer1 = LoadBalancer.getInstance();
		LoadBalancer balancer2 = LoadBalancer.getInstance();
		LoadBalancer balancer3 = LoadBalancer.getInstance();
		LoadBalancer balancer4 = LoadBalancer.getInstance();
		
		if (balancer1 == balancer2 && balancer2 == balancer3 && balancer3 == balancer4) {
			System.out.println("Yes! Singleton!");
		}
		
		balancer1.addServer("server1");
		balancer1.addServer("server2");
		balancer1.addServer("server3");
		balancer1.addServer("server4");
		
		for (int i = 0; i < 5; i++) {
			System.out.println(balancer1.getServer());
		}
	}
}

class LoadBalancer {
	private LoadBalancer() {
		serverList = new LinkedList<String>();
		System.out.println("First constructed!");
	}
	
	private static LoadBalancer loadBalancer = null;
	
	private List<String> serverList = null;
	
	public static LoadBalancer getInstance() {
		if (loadBalancer == null) {
			loadBalancer = new LoadBalancer();
		}
		
		return loadBalancer;
	}
	
	public void addServer(String server) {
		serverList.add(server);
	}
	
	public void removeServer(int index) {
		serverList.remove(index);
	}
	
	public String getServer() {
		java.util.Random random = new java.util.Random();
		return serverList.get(random.nextInt(serverList.size()));
	}
}