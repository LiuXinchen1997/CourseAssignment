package Builder;

public abstract class ActorBuilder {
	protected Actor actor = new Actor();
	
	public abstract void buildType();
	public abstract void buildSex();
	public abstract void buildFace();
	public abstract void buildCostume();
	public abstract void buildHairstyle();
	
	public Actor createActor() {
		return actor;
	}
	
	public boolean isBareHeaded() { // 判断是否为光头
		return false;
	}
}

class HeroBuilder extends ActorBuilder {
	@Override
	public void buildType() {
		actor.setType("英雄");
	}

	@Override
	public void buildSex() {
		actor.setSex("男");
	}

	@Override
	public void buildFace() {
		actor.setFace("雄姿英发");
	}

	@Override
	public void buildCostume() {
		actor.setCostume("铠甲");
	}

	@Override
	public void buildHairstyle() {
		actor.setHairstyle("飘逸");
	}
}


class AngelBuilder extends ActorBuilder {
	@Override
	public void buildType() {
		actor.setType("天使");
	}

	@Override
	public void buildSex() {
		actor.setSex("女");
	}

	@Override
	public void buildFace() {
		actor.setFace("闭月羞花");
	}

	@Override
	public void buildCostume() {
		actor.setCostume("白裙");
	}

	@Override
	public void buildHairstyle() {
		actor.setHairstyle("长发");
	}
}

class DevilBuilder extends ActorBuilder {
	@Override
	public void buildType() {
		actor.setType("恶魔");
	}

	@Override
	public void buildSex() {
		actor.setSex("妖");
	}

	@Override
	public void buildFace() {
		actor.setFace("丑陋嘴脸");
	}

	@Override
	public void buildCostume() {
		actor.setCostume("黑袍");
	}

	@Override
	public void buildHairstyle() {
		actor.setHairstyle("光头");
	}
	
	public boolean isBareHeaded() { // 判断是否为光头
		return true;
	}
}