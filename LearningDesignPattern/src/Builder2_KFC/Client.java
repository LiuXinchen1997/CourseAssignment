package Builder2_KFC;

public class Client
{
	public static void main(String args[])
	{
		MealBuilder mbA = new SubMealBuilderA(); // 生成套餐A建造者对象
	    MealBuilder mbB = new SubMealBuilderB(); // 生成套餐B建造者对象
		KFCWaiter waiter = new KFCWaiter(); // 生成服务员指挥类对象
		
		System.out.println("我选择了套餐A！");
	    waiter.setMealBuilder(mbA); //通过给指挥者类注入套餐建造者，从而生成不同的套餐
	    Meal meal = waiter.construct(); // 指挥者类通过建造者类建造并返回生成的套餐
        
        System.out.println("我的套餐是："); // 下面对套餐进行展示
        System.out.println(meal.getFood());
        System.out.println(meal.getDrink());
        System.out.println();
        
        System.out.println("我选择了套餐B！");
	    waiter.setMealBuilder(mbB);
	    Meal meal2 = waiter.construct();
        
        System.out.println("我的套餐是：");
        System.out.println(meal2.getFood());
        System.out.println(meal2.getDrink());
	}
}
