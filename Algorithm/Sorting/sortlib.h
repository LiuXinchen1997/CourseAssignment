#pragma once
#ifndef SORTLIB_H_INCLUDED
#define SORTLIB_H_INCLUDED

#include <iostream>
#include <fstream>
#include <cstdlib>
#include <iomanip>
#include <ctime>
#include <string>
#include <vector>

#include "windows.h"

using namespace std;

class Sorter
{
public:
	virtual ULONGLONG operator() (long long int* a, long long int num) = 0;
	string name;
};


class BubbleSort : public Sorter
{
public:
	ULONGLONG operator()(long long int* a, long long int num);
	
	BubbleSort();
};


class SelectSort : public Sorter
{
public:
	ULONGLONG operator()(long long int* a, long long int num);
	
	SelectSort();
};


class HeapSort : public Sorter
{
public:
	void sift(long long int* a, long long int k, long long int n);
	ULONGLONG operator()(long long int* a, long long int num);
	
	HeapSort();
};




class InsertionSort : public Sorter
{
public:
	ULONGLONG operator()(long long int* a, long long int num);
	
	InsertionSort();
};


class MergeSort : public Sorter
{
public:
	void merge(long long int lo, long long int mi, long long int hi, long long int a[]);
	void mergeSort(long long int lo, long long int hi, long long int a[]);
	ULONGLONG operator()(long long int* a, long long int num);
	
	MergeSort();
};


class ShellSort : public Sorter
{
public:
	ULONGLONG operator()(long long int* a, long long int num);
	
	ShellSort();
};


class QuickSort : public Sorter
{
public:
	void partition(long long int* a, long long int s, long long int t, long long int* cutPoint);
	void quickSort(long long int* a, long long int s, long long int t);
	ULONGLONG operator()(long long int* a, long long int num);
	
	QuickSort();
};


struct Number
{
	vector<long long int> parts;
	long long int ind;
	long long int raw;
};
#define Numbers vector<Number>

class RadixSort : public Sorter
{
private:
	void preprocess(long long int* a, long long int num, Numbers& numbers);
	Number processBase2(long long int raw, long long int ind, int digits);

public:
	int base;
	int nbase;
	ULONGLONG operator()(long long int* a, long long int num);

	RadixSort();
	RadixSort(int base, int nbase);
};

void countSort2(long long int*& a, int num, vector<long long int>*& a2, int turns);
ULONGLONG radixSort2(long long int*& a, int num);

#endif // SORTLIB_H_INCLUDED
