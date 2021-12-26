package Prototype;

public class TestPrototype {
	public static void main(String[] args) {
		ConcretePrototype c1 = new ConcretePrototype();
		c1.setName("啊啊啊");
		c1.setAttr("不不不");
		System.out.println(c1);
		
		ConcretePrototype c2 = c1.clone();
		System.out.println(c2);
	}
}

class ConcretePrototype implements Cloneable {
	private String name;
	private String attr;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAttr() {
		return attr;
	}
	public void setAttr(String attr) {
		this.attr = attr;
	}
	
	public ConcretePrototype clone() {
		Object obj = null;
		try {
			obj = super.clone();
			return (ConcretePrototype)obj;
		} catch (CloneNotSupportedException e) {
			System.out.println("不支持复制！");
			return null;
		}
	}
	
	@Override
	public String toString() {
		return "ConcretePrototype [name=" + name + ", attr=" + attr + "]";
	}
}