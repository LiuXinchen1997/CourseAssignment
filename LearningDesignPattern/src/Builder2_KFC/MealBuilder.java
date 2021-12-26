package Builder2_KFC;

public abstract class MealBuilder
{
	protected Meal meal = new Meal(); // 作为需要生产的对象，不同的建造者对于产品类的生产方式是不同的！
	public abstract void buildFood(); // 声明接口，建造主食
	public abstract void buildDrink(); // 声明接口，建造饮料
	
	public Meal getMeal() {
		return meal;
	}
}