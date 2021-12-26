package Builder;

public class Client {
	public static void main(String[] args) {
		ActorBuilder ab;
		ab = (ActorBuilder)XMLUtil.getBean("className");
		
		ActorController ac = new ActorController();
		Actor actor;
		actor = ac.construct(ab);
		
		System.out.println("种类：" + actor.getType());
		System.out.println("性别：" + actor.getSex());
		System.out.println("服饰：" + actor.getCostume());
		System.out.println("相貌：" + actor.getFace());
		System.out.println("发型：" + actor.getHairstyle());
	}
}
