package Mediator;

public class TestGUI {
	public static void main(String[] args) {
		ConcreteMediator mediator = new ConcreteMediator();
		
		Button addBtn = new Button();
		List list = new List();
		ComboBox cb = new ComboBox();
		TextBox usernameTB = new TextBox();
		
		addBtn.setMediator(mediator);
		list.setMediator(mediator);
		cb.setMediator(mediator);
		usernameTB.setMediator(mediator);
		
		mediator.addButton = addBtn;
		mediator.list = list;
		mediator.cb = cb;
		mediator.usernameTextBox = usernameTB;
		
		addBtn.change();
	}
}






//*********************************************************************
abstract class Mediator {
	public abstract void componentChange(Component c);
}

class ConcreteMediator extends Mediator {
	public Button addButton;
	public List list;
	public ComboBox cb;
	public TextBox usernameTextBox;
	
	@Override
	public void componentChange(Component c) {
		// 点击按钮
		if (c == addButton) {
			System.out.println("单击了按钮！");
			list.update();
			cb.update();
			usernameTextBox.update();
		}
		
		// 列表框选择一项
		else if (c == list) {
			System.out.println("从列表框选择一项！");
			list.select();
			usernameTextBox.setText();
		}
		
		// 组合框选择一项
		else if (c == cb) {
			System.out.println("从组合框选择了一项！");
			cb.select();
			usernameTextBox.setText();
		}
	}
}






//*********************************************************
abstract class Component {
	protected Mediator mediator;
	
	public void setMediator(Mediator m) {
		this.mediator = m;
	}
	
	public void change() {
		mediator.componentChange(this);
	}
	
	public abstract void update();
}


class Button extends Component {
	@Override
	public void update() {
		// 按钮没有交互
	}
}

class List extends Component {
	@Override
	public void update() {
		System.out.println("列表增加一项：AAA！");
	}
	
	public void select() {
		System.out.println("选中了 列表 中的一项：AAA！");
	}
}

class ComboBox extends Component {
	@Override
	public void update() {
		System.out.println("给组合框增加一项：AAA！");
	}
	
	
	public void select() {
		System.out.println("选中了 组合框 中的一项：AAA！");
	}
}

class TextBox extends Component {
	@Override
	public void update() {
		System.out.println("客户信息增加成功后，文本框信息清空！");
	}
	
	public void setText() {
		System.out.println("设置文本框信息内容：Hello World！");
	}
}
