#ifndef SORTLIB_H_INCLUDED
#define SORTLIB_H_INCLUDED

#include <iostream>
#include <fstream>
#include <cstdlib>
#include <iomanip>
#include <ctime>

#include "windows.h"

using namespace std;

int temp; //for swap



class BubbleSort
{
public:
    long operator()( int* a, int num );
    char* name;

    BubbleSort() { name = "BubbleSort"; }
    ~BubbleSort() { delete name; }
};

long BubbleSort::operator()( int* a, int num ) {
    long startTime = GetTickCount();
    for(int i = num - 1; i > 0; i--){
        for(int j = 0; j < i; j++){
            if(a[j] > a[j+1])
            {
                temp = a[j];
                a[j] = a[j+1];
                a[j+1] = temp;
            }
        }
    }
    long endTime = GetTickCount();
    return endTime - startTime;
}



class InsertSort
{
public:
    long operator()( int* a, int num );
    char* name;

    InsertSort() { name = "InsertSort"; }
    ~InsertSort() { delete name; }
};

long InsertSort::operator()( int* a, int num )
{
    int temp, j;
    long startTime = GetTickCount();
    for(int i = 1; i < num; i++)
    {
        temp = a[i];
        for(j = i - 1; (a[j] > temp) && (j >= 0); j--)
            a[j + 1] = a[j];
        a[j + 1] = temp;
    }
    long endTime = GetTickCount();
    return endTime - startTime;
}



class MergeSort
{
public:
    void merge(int lo, int mi, int hi, int a[]);
    void mergeSort(int lo, int hi, int a[]);
    long operator()( int* a, int num );
    char* name;

    MergeSort() { name = "MergeSort"; }
    ~MergeSort() { delete name; }
};

void MergeSort::merge(int lo, int mi, int hi, int a[])
{
    int* A = a + lo;
    int lb = mi - lo;
    int* B = new int[lb];
    for(int i = 0; i < lb; B[i] = A[i++]);
    int lc = hi - mi;
    int* C = a + mi;
    for(int i = 0, j = 0, k = 0; (j < lb)||(k < lc);)
    //i for A, j for B, k for C...
    {
        if((j < lb) && (lc <= k || (B[j] <= C[k])) ) A[i++] = B[j++];
        if((k < lc) && (lb <= j || (C[k] < B[j])) ) A[i++] = C[k++];
    }

    delete [] B;
}

void MergeSort::mergeSort(int lo, int hi, int a[])
{
    if(hi - lo < 2) return;
    int mi = (lo + hi) >> 1;
    mergeSort(lo, mi, a);
    mergeSort(mi, hi, a);
    merge(lo, mi, hi, a);
}

long MergeSort::operator()( int* a, int num )
{
    long startTime = GetTickCount();
    mergeSort(0, num, a);
    long endTime = GetTickCount();
    return endTime - startTime;
}

void merge(int lo, int mi, int hi, int a[])
{
    int* A = a + lo;
    int lb = mi - lo;
    int* B = new int[lb];
    for(int i = 0; i < lb; B[i] = A[i++]);
    int lc = hi - mi;
    int* C = a + mi;
    for(int i = 0, j = 0, k = 0; (j < lb)||(k < lc);)
    //i for A, j for B, k for C...
    {
        if((j < lb) && (lc <= k || (B[j] <= C[k])) ) A[i++] = B[j++];
        if((k < lc) && (lb <= j || (C[k] < B[j])) ) A[i++] = C[k++];
    }

    delete [] B;
}

void mergeSort(int lo, int hi, int a[])
{
    if(hi - lo < 2) return;
    int mi = (lo + hi) >> 1;
    mergeSort(lo, mi, a);
    mergeSort(mi, hi, a);
    merge(lo, mi, hi, a);
}



class SelectSort
{
public:
    long operator()( int* a, int num );
    char* name;

    SelectSort() { name = "SelectSort"; }
    ~SelectSort() { delete name; }
};

long SelectSort::operator()( int* a, int num )
{
    long startTime = GetTickCount();

    for( int i = 0; i < num - 1; i++ ) {
        int min = a[i]; int minNum = i;
        for( int j = i + 1; j < num; j++ )
            if( a[j] < min ) { min = a[j]; minNum = j; }

        if( min != i ) { temp = a[i]; a[i] = a[minNum]; a[minNum] = temp; }
    }

    long endTime = GetTickCount();
    return endTime - startTime;
}



class ShellSort
{
public:
    long operator()( int* a, int num );
    char* name;

    ShellSort() { name = "ShellSort"; }
    ~ShellSort() { delete name; }
};

long ShellSort::operator()( int* a, int num )
{
    long startTime = GetTickCount();

    int d = num / 2; ///分组参数
    while( d > 0 ) {
        for( int i = d + 1; i <= num; i++ ) {
            int x = a[i-1]; int j = i - d;
            while( j > 0 && x < a[j-1] ) { a[j+d-1] = a[j-1]; j = j - d; }
            a[j+d-1] = x;
        }

        d = d / 2;
    }

    long endTime = GetTickCount();
    return endTime - startTime;
}



class QuickSort
{
public:
    void partition( int* a, int s, int t, int* cutPoint );
    void quickSort( int* a, int s, int t );
    long operator()( int* a, int num );
    char* name;

    QuickSort() { name = "QuickSort"; }
    ~QuickSort() { delete name; }
};

void QuickSort::partition( int* a, int s, int t, int* cutPoint )
{
    ///int x = a[s];
    srand((unsigned int)time(NULL));
    int r = ( rand() % ( t - s + 1 ) ) + s;
    int x = a[r];
    int temp = a[r]; a[r] = a[s]; a[s] = temp;
    ///
    int i = s; int j = t;
    while ( i != j ) {
        while ( i < j && a[j] > x ) j--;
        if ( i < j ) { a[i] = a[j]; i++; }
        while ( i < j && a[i] < x ) i++;
        if ( i < j ) { a[j] = a[i]; j--; }
    }
    a[i] = x; *cutPoint = i;
}

void QuickSort::quickSort( int* a, int s, int t )
{
    if ( s < t ) {
        int *i = new int;
        partition( a, s, t, i );
        quickSort( a, s, *i-1 );
        quickSort( a, *i+1, t );
    }
}

long QuickSort::operator()( int* a, int num )
{
    long startTime = GetTickCount();

    quickSort( a, 0, num - 1 );

    long endTime = GetTickCount();
    return endTime - startTime;
}



class HeapSort
{
public:
    void sift( int* a, int k, int n );
    long operator()( int* a, int num );
    char* name;

    HeapSort() { name = "HeapSort"; }
    ~HeapSort() { delete name; }
};

void HeapSort::sift( int* a, int k, int n ) ///1-n中的元素中以k为根的子序列调整函数
{
    int x = a[k-1]; bool finished = false;
    int i = k, j = 2 * i;
    while ( j <= n && !finished ) {
        if ( j < n && a[j-1] < a[j] ) j++;
        if ( x >= a[j-1] ) finished = true;
        else { a[i-1] = a[j-1]; i = j; j = 2 * i; }
    }
    a[i-1] = x;
}

void swap( int& a, int& b ) { int temp = a; a = b; b = temp; }

long HeapSort::operator()( int* a, int num )
{
    long startTime = GetTickCount();

    for ( int i = num / 2; i >= 1; i-- )
        sift( a, i, num ); ///初始化堆
    for ( int i = num; i >= 2; i-- ) {
        swap( a[i-1], a[0] );
        sift( a, 1, i-1 );
    }

    long endTime = GetTickCount();
    return endTime - startTime;
}

#endif // SORTLIB_H_INCLUDED
