package Builder2_KFC;

public class KFCWaiter
{
	private MealBuilder mb; // 需要通过不同的建造者类从而返回给客户不同的产品对象
	
	public void setMealBuilder(MealBuilder mb) {
		this.mb = mb;
	}
	
	public Meal construct() { // 对产品进行建造，可以控制产品建造的顺序，并将生成的套餐返回给客户
		mb.buildFood();
		mb.buildDrink();
		return mb.getMeal();
	}
}