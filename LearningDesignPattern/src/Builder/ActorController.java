package Builder;

public class ActorController {
	public Actor construct(ActorBuilder ab) {
		Actor actor;
		ab.buildType();
		ab.buildSex();
		ab.buildFace();
		ab.buildCostume();
		
		if (!ab.isBareHeaded()) {			
			ab.buildHairstyle();
		}
		actor = ab.createActor();
		return actor;
	}
}