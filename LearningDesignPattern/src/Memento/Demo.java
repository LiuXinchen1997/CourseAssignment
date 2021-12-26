package Memento;

import java.util.LinkedList;

public class Demo {
	public static void main(String[] args) {
		Caretaker ct = new Caretaker();
		Originator o = new Originator();
		o.state = "state1";
		ct.saveMemento(o.createMemento());
		
		o.state = "state2";
		ct.saveMemento(o.createMemento());
		
		o.state = "state3";
		
		System.out.println(o);
		
		o.restore(ct.get(1));
		System.out.println(o);
		
		o.restore(ct.getLast());
		System.out.println(o);
	}
}

class Memento {
	public int version;
	String state;
	
	public Memento(String state) {
		this.state = state;
	}
	
	public String getState() {
		return state;
	}
	
	public void setState(String state) {
		this.state = state;
	}
}

class Originator { //保存当前状态
	String state;
	
	public Memento createMemento() {
		return new Memento(state);
	}
	
	public void restore(Memento m) {
		this.state = m.getState();
	}
	
	@Override
	public String toString() {
		return state;
	}
}

class Caretaker {
	LinkedList<Memento> mementos = new LinkedList<>();
	int latestVersion;
	
	public void saveMemento(Memento m) {
		m.version = ++latestVersion;
		mementos.add(m);
	}
	
	public Memento get(int version) {
		for (Memento memento : mementos) {
			if (memento.version == version) {
				return memento;
			}
		}
		
		return null;
	}
	
	public Memento getLast() {
		return mementos.getLast();
	}
}