package Observer;

import java.util.ArrayList;

public class ObserverTest {
	public static void main(String[] args) {
		AllyController acc = new ConcreteAllyController("ABCD");
		
		Player player1 = new Player("A");
		acc.join(player1);
		
		Player player2 = new Player("B");
		acc.join(player2);
		
		Player player3 = new Player("C");
		acc.join(player3);
		
		Player player4 = new Player("D");
		acc.join(player4);
		
		player4.beAttacked(acc);
	}
}







interface Observer {
	public String getName();
	public void setName(String name);
	public void help();
	public void beAttacked(AllyController acc);
}

class Player implements Observer {
	private String name;
	
	public Player(String name) {
		this.name = name;
	}
	
	@Override
	public String getName() {
		return name;
	}

	@Override
	public void setName(String name) {
		this.name = name;
	}

	@Override
	public void help() {
		System.out.println("坚持住，" + this.name + "来救你！");
	}

	@Override
	public void beAttacked(AllyController acc) {
		System.out.println(this.name + "被攻击！");
		acc.notifyObserver(name);
	}
}








abstract class AllyController {
	protected String allyName;
	protected ArrayList<Observer> observers = new ArrayList<>();
	
	public void setAllyName(String allyName) {
		this.allyName = allyName;
	}
	
	public String getAllyName() {
		return allyName;
	}
	
	public void join(Observer obs) {
		System.out.println(obs.getName() + "加入" + this.allyName + "的战队！");
		observers.add(obs);
	}
	
	public void quit(Observer obs) {
		System.out.println(obs.getName() + "退出" + this.allyName + "的战队！");
		observers.remove(obs);
	}
	
	public abstract void notifyObserver(String name);
}

class ConcreteAllyController extends AllyController {
	
	public ConcreteAllyController(String allyName) {
		System.out.println(allyName + "战队创建成功！");
		System.out.println("----------------------");
		this.allyName = allyName;
	}
	
	@Override
	public void notifyObserver(String name) {
		System.out.println(this.allyName + "战队紧急通知，盟友" + name + "遭到攻击！");
		
		for (Object obs : observers) {
			if (!((Observer)obs).getName().equalsIgnoreCase(name)) {
				((Observer)obs).help();
			}
		}
	}
	
}