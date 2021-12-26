package Visitor;

public class Test {
	public static void main(String[] args) {
		Computer computer = new Computer();
		TypeVisitor typeVisitor = new TypeVisitor();
		RunVisitor runVisitor = new RunVisitor();
		
		computer.accept(typeVisitor);
		computer.accept(runVisitor);
	}
}


interface ComputerVisitor {
	public void visitCPU(CPU cpu);
	public void visitHarddisk(Harddisk harddisk);
}

class TypeVisitor implements ComputerVisitor {

	@Override
	public void visitCPU(CPU cpu) {
		System.out.println("CPU type is " + cpu.getType());
	}

	@Override
	public void visitHarddisk(Harddisk harddisk) {
		System.out.println("Harddisk type is " + harddisk.getType());
	}
}

class RunVisitor implements ComputerVisitor {

	@Override
	public void visitCPU(CPU cpu) {
		cpu.run();
	}

	@Override
	public void visitHarddisk(Harddisk harddisk) {
		harddisk.run();
	}
}




abstract class Hardware {
	protected String type;
	
	public Hardware(String type) {
		this.type = type;
	}
	
	public String getType() {
		return type;
	}
	
	public abstract void run();
	
	public abstract void accept(ComputerVisitor computerVisitor);
}

class CPU extends Hardware {
	public CPU(String type) {
		super(type);
	}
	
	public void run() {
		System.out.println(this.type + " is running!");
	}
	
	public void accept(ComputerVisitor computerVisitor) {
		computerVisitor.visitCPU(this);
	}
}

class Harddisk extends Hardware {
	public Harddisk(String type) {
		super(type);
	}
	
	public void run() {
		System.out.println(this.type + " is running!");
	}
	
	public void accept(ComputerVisitor computerVisitor) {
		computerVisitor.visitHarddisk(this);
	}
}

class Computer {
	private CPU cpu;
	private Harddisk harddisk;
	
	public Computer(CPU cpu, Harddisk harddisk) {
		this.cpu = cpu;
		this.harddisk = harddisk;
	}
	
	public Computer() {
		this.cpu = new CPU("i7 intel");
		this.harddisk = new Harddisk("Seagate 500G");
	}
	
	public void accept(ComputerVisitor computerVisitor) {
		computerVisitor.visitCPU(cpu);
		computerVisitor.visitHarddisk(harddisk);
	}
}