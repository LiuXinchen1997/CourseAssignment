package Adapter;

public class TestStudentAdapter {
	public static void main(String[] args) {
		StudentOperation operation;
		
		// Class.forName内需要输入的是 完整的类路径
		operation = (StudentOperation)XMLUtil.getBean("student");
		
		Student[] students = new Student[3];
		students[0] = new Student(90);
		students[1] = new Student(100);
		students[2] = new Student(80);
		
		int[] sortedScores = operation.sort(students);
		display(sortedScores);
		
		System.out.println(operation.search(students, 90));
	}
	
	public static void display(int[] prices) {
		for (int i = 0; i < prices.length; i++) {
			System.out.print(prices[i] + " ");
		}
		System.out.println();
	}
}



class Student {
	private int score;
	
	public Student(int score) {
		this.score = score;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}
}


interface StudentOperation {
	public int[] sort(Student[] students);
	public int search(Student[] students, int score);
}

class StudentAdapter implements StudentOperation {
	private QuickSort sortObj = new QuickSort();
	private BinarySearch searchObj = new BinarySearch();
	
	@Override
	public int[] sort(Student[] students) {
		int[] scores = new int[students.length];
		for (int i = 0; i < students.length; i++) {
			scores[i] = students[i].getScore();
		}
		
		return sortObj.quickSort(scores);
	}

	@Override
	public int search(Student[] students, int score) {
		int[] scores = new int[students.length];
		for (int i = 0; i < students.length; i++) {
			scores[i] = students[i].getScore();
		}
		
		return searchObj.binarySearch(scores, score);
	}
}