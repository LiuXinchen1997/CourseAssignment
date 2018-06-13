#include "lib.h"

///对时间复杂度为O(N^2)的排序算法进行测试的数据
#define NUM1 5000
#define NUM2 10000
#define NUM3 15000
#define NUM4 20000
#define NUM5 25000

///对时间复杂度为O(NlogN)的排序算法进行测试的数据
#define BIGNUM1 50000
#define BIGNUM2 100000
#define BIGNUM3 150000
#define BIGNUM4 200000
#define BIGNUM5 250000

int main()
{
    ifstream fileTest( "sortTime.txt", ios::in ); bool exist = false;
    if( fileTest ) exist = true;
    fileTest.close();
    if( exist ) system("del sortTime.txt");


    cout << endl << "****** Data Size: "<< NUM1 << " ******" << endl;
    createData(NUM1);


    testSort( NUM1, BubbleSort() );
    testSort( NUM1, InsertSort() );
    testSort( NUM1, SelectSort() );
    testSort( NUM1, MergeSort() );
    testSort( NUM1, ShellSort() );
    testSort( NUM1, QuickSort() );
    testSort( NUM1, HeapSort() );


    cout << endl << "****** Data Size: "<< NUM2 << " ******" << endl;
    createData(NUM2);

    testSort( NUM2, BubbleSort() );
    testSort( NUM2, InsertSort() );
    testSort( NUM2, SelectSort() );
    testSort( NUM2, MergeSort() );
    testSort( NUM2, ShellSort() );
    testSort( NUM2, QuickSort() );
    testSort( NUM2, HeapSort() );


    cout << endl << "****** Data Size: "<< NUM3 << " ******" << endl;
    createData(NUM3);

    testSort( NUM3, BubbleSort() );
    testSort( NUM3, InsertSort() );
    testSort( NUM3, SelectSort() );
    testSort( NUM3, MergeSort() );
    testSort( NUM3, ShellSort() );
    testSort( NUM3, QuickSort() );
    testSort( NUM3, HeapSort() );


    cout << endl << "****** Data Size: "<< NUM4 << " ******" << endl;
    createData(NUM4);

    testSort( NUM4, BubbleSort() );
    testSort( NUM4, InsertSort() );
    testSort( NUM4, SelectSort() );
    testSort( NUM4, MergeSort() );
    testSort( NUM4, ShellSort() );
    testSort( NUM4, QuickSort() );
    testSort( NUM4, HeapSort() );


    cout << endl << "****** Data Size: "<< NUM5 << " ******" << endl;
    createData(NUM5);

    testSort( NUM5, BubbleSort() );
    testSort( NUM5, InsertSort() );
    testSort( NUM5, SelectSort() );
    testSort( NUM5, MergeSort() );
    testSort( NUM5, ShellSort() );
    testSort( NUM5, QuickSort() );
    testSort( NUM5, HeapSort() );


    cout << endl << "****** Data Size: "<< BIGNUM1 << " ******" << endl;
    createData(BIGNUM1);

    testSort( BIGNUM1, MergeSort() );
    testSort( BIGNUM1, ShellSort() );
    testSort( BIGNUM1, QuickSort() );
    testSort( BIGNUM1, HeapSort() );


    cout << endl << "****** Data Size: "<< BIGNUM2 << " ******" << endl;
    createData(BIGNUM2);

    testSort( BIGNUM2, MergeSort() );
    testSort( BIGNUM2, ShellSort() );
    testSort( BIGNUM2, QuickSort() );
    testSort( BIGNUM2, HeapSort() );


    cout << endl << "****** Data Size: "<< BIGNUM3 << " ******" << endl;
    createData(BIGNUM3);

    testSort( BIGNUM3, MergeSort() );
    testSort( BIGNUM3, ShellSort() );
    testSort( BIGNUM3, QuickSort() );
    testSort( BIGNUM3, HeapSort() );


    cout << endl << "****** Data Size: "<< BIGNUM4 << " ******" << endl;
    createData(BIGNUM4);

    testSort( BIGNUM4, MergeSort() );
    testSort( BIGNUM4, ShellSort() );
    testSort( BIGNUM4, QuickSort() );
    testSort( BIGNUM4, HeapSort() );


    cout << endl << "****** Data Size: "<< BIGNUM5 << " ******" << endl;
    createData(BIGNUM5);

    testSort( BIGNUM5, MergeSort() );
    testSort( BIGNUM5, ShellSort() );
    testSort( BIGNUM5, QuickSort() );
    testSort( BIGNUM5, HeapSort() );

    return 0;
}
