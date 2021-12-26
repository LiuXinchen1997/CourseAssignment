package Adapter;

// 对象适配器模式 实现
public class TestAdapter {
	public static void main(String[] args) {		
		OperationAdapter oa = new OperationAdapter();
		int[] a = {1,2,4,2};
		oa.sort(a);
		System.out.println("hello");
	}
}


interface ScoreOperation {
	public int[] sort(int[] array);
	public int search(int[] array, int key);
}

class OperationAdapter implements ScoreOperation {
	private QuickSort sortObj;
	private BinarySearch searchObj;
	
	public OperationAdapter() {
		sortObj = new QuickSort();
		searchObj = new BinarySearch();
	}
	
	@Override
	public int[] sort(int[] array) {
		return sortObj.quickSort(array);
	}
	
	@Override
	public int search(int[] array, int key) {
		return searchObj.binarySearch(array, key);
	}
}





class QuickSort { // 快速排序算法类
	public int[] quickSort(int array[]) {
		sort(array,0,array.length-1);
		return array;
	}

	public void sort(int array[],int p, int r) { //快速排序
		int q=0;
		if(p<r) {
			q=partition(array,p,r);
			sort(array,p,q-1);
            sort(array,q+1,r);
		}
	}

	public int partition(int[] a, int p, int r) { //划分
		int x=a[r];
		int j=p-1;
		for (int i=p;i<=r-1;i++) {
			if (a[i]<=x) {
				j++;
				swap(a,j,i);
			}
		}
		swap(a,j+1,r);
		return j+1;	
	}

	public void swap(int[] a, int i, int j) {   
        int t = a[i];   
        a[i] = a[j];   
        a[j] = t;   
	}
}


class BinarySearch { //二分查找算法类
	public int binarySearch(int array[],int key) { //二分查找算法
		int low = 0;
		int high = array.length -1;
		while(low <= high) {
			int mid = (low + high) / 2;
			int midVal = array[mid];
			if(midVal < key) {  
				low = mid +1;  
			}
			else if (midVal > key) {  
				high = mid -1;  
			}
			else {  
				return 1; //找到元素返回1  
			}
		}
		return -1;  //未找到元素返回-1
	}
}