#include "sortlib.h"
#include "lib.h"

BubbleSort::BubbleSort() { name = "BubbleSort"; }

ULONGLONG BubbleSort::operator()(long long int* a, long long int num) {
	ULONGLONG startTime = GetTickCount64();
	for (long long int i = num - 1; i > 0; i--) {
		for (long long int j = 0; j < i; j++) {
			if (a[j] > a[j + 1])
			{
				long long int temp = a[j];
				a[j] = a[j + 1];
				a[j + 1] = temp;
			}
		}
	}
	ULONGLONG endTime = GetTickCount64();
	return endTime - startTime;
}


SelectSort::SelectSort() { name = "SelectSort"; }

ULONGLONG SelectSort::operator()(long long int* a, long long int num)
{
	ULONGLONG startTime = GetTickCount64();

	for (long long int i = 0; i < num - 1; i++) {
		long long int min = a[i]; long long int minNum = i;
		for (long long int j = i + 1; j < num; j++)
			if (a[j] < min) { min = a[j]; minNum = j; }

		if (min != i) { long long int temp = a[i]; a[i] = a[minNum]; a[minNum] = temp; }
	}

	ULONGLONG endTime = GetTickCount64();
	return endTime - startTime;
}


HeapSort::HeapSort() { name = "HeapSort"; }

void HeapSort::sift(long long int* a, long long int k, long long int n) ///1-n中的元素中以k为根的子序列调整函数
{
	long long int x = a[k - 1]; bool finished = false;
	long long int i = k, j = 2 * i;
	while (j <= n && !finished) {
		if (j < n && a[j - 1] < a[j]) j++;
		if (x >= a[j - 1]) finished = true;
		else { a[i - 1] = a[j - 1]; i = j; j = 2 * i; }
	}
	a[i - 1] = x;
}

void swap(long long int& a, long long int& b) { long long int temp = a; a = b; b = temp; }

ULONGLONG HeapSort::operator()(long long int* a, long long int num)
{
	ULONGLONG startTime = GetTickCount64();

	for (long long int i = num / 2; i >= 1; i--)
		sift(a, i, num); ///初始化堆
	for (long long int i = num; i >= 2; i--) {
		swap(a[i - 1], a[0]);
		sift(a, 1, i - 1);
	}

	ULONGLONG endTime = GetTickCount64();
	return endTime - startTime;
}





InsertionSort::InsertionSort() { name = "InsertionSort"; }

ULONGLONG InsertionSort::operator()(long long int* a, long long int num)
{
	long long int temp, j;
	ULONGLONG startTime = GetTickCount64();
	for (long long int i = 1; i < num; i++)
	{
		temp = a[i];
		for (j = i - 1; (a[j] > temp) && (j >= 0); j--)
			a[j + 1] = a[j];
		a[j + 1] = temp;
	}
	ULONGLONG endTime = GetTickCount64();
	return endTime - startTime;
}


MergeSort::MergeSort() { name = "MergeSort"; }

void MergeSort::merge(long long int lo, long long int mi, long long int hi, long long int a[])
{
	long long int* A = a + lo;
	long long int lb = mi - lo;
	long long int* B = new long long int[lb];
	for (long long int i = 0; i < lb; B[i] = A[i++]);
	long long int lc = hi - mi;
	long long int* C = a + mi;
	for (long long int i = 0, j = 0, k = 0; (j < lb) || (k < lc);)
	{
		if ((j < lb) && (lc <= k || (B[j] <= C[k]))) A[i++] = B[j++];
		if ((k < lc) && (lb <= j || (C[k] < B[j]))) A[i++] = C[k++];
	}

	delete[] B;
}

void MergeSort::mergeSort(long long int lo, long long int hi, long long int a[])
{
	if (hi - lo < 2) return;
	long long int mi = (lo + hi) >> 1;
	mergeSort(lo, mi, a);
	mergeSort(mi, hi, a);
	merge(lo, mi, hi, a);
}

ULONGLONG MergeSort::operator()(long long int* a, long long int num)
{
	ULONGLONG startTime = GetTickCount64();
	mergeSort(0, num, a);
	ULONGLONG endTime = GetTickCount64();
	return endTime - startTime;
}


ShellSort::ShellSort() { name = "ShellSort"; }

ULONGLONG ShellSort::operator()(long long int* a, long long int num)
{
	ULONGLONG startTime = GetTickCount64();

	long long int d = num / 2; ///分组参数
	while (d > 0) {
		for (long long int i = d + 1; i <= num; i++) {
			long long int x = a[i - 1]; long long int j = i - d;
			while (j > 0 && x < a[j - 1]) { a[j + d - 1] = a[j - 1]; j = j - d; }
			a[j + d - 1] = x;
		}

		d = d / 2;
	}

	ULONGLONG endTime = GetTickCount64();
	return endTime - startTime;
}


QuickSort::QuickSort() { name = "QuickSort"; }

void QuickSort::partition(long long int* a, long long int s, long long int t, long long int* cutPoint)
{
	long long int x = a[s];
	//srand((unsigned long long int)time(NULL));
	//long long int r = getRandomNum(s, t);
	//long long int x = a[r];
	//long long int temp = a[r]; a[r] = a[s]; a[s] = temp;
	///
	long long int i = s; long long int j = t;
	while (i != j) {
		while (i < j && a[j] > x) j--;
		if (i < j) { a[i] = a[j]; i++; }
		while (i < j && a[i] < x) i++;
		if (i < j) { a[j] = a[i]; j--; }
	}
	a[i] = x; *cutPoint = i;
}

void QuickSort::quickSort(long long int* a, long long int s, long long int t)
{
	if (s < t) {
		long long int* i = new long long int;
		partition(a, s, t, i);
		quickSort(a, s, *i - 1);
		quickSort(a, *i + 1, t);
	}
}

ULONGLONG QuickSort::operator()(long long int* a, long long int num)
{
	ULONGLONG startTime = GetTickCount64();

	quickSort(a, 0, num - 1);

	ULONGLONG endTime = GetTickCount64();
	return endTime - startTime;
}


RadixSort::RadixSort() 
{
	this->name = "RadixSort";
	this->base = 2;
	this->nbase = 4;
}

RadixSort::RadixSort(int base, int nbase)
{
	this->name = "RadixSort";
	this->base = base;
	this->nbase = nbase;
}

void RadixSort::preprocess(long long int* a, long long int num, Numbers& numbers)
{
	int digits = ceil(log2l(MAXINT) / log2l(this->base));
	for (long long int i = 0; i < num; i++) {
		long long int raw = a[i];
		Number number;
		if (2 == this->base) {
			number = processBase2(raw, i, digits);
		}
		numbers.push_back(number);
	}
}

Number RadixSort::processBase2(long long int raw, long long int ind, int digits)
{
	Number number;
	number.ind = ind;
	number.raw = raw;
	int pass = ceil(digits / double(nbase));
	for (int i = 1; i <= pass; i++) {
		long long int cur = 0;
		if (0 == raw) {
			number.parts.push_back(0);
			continue;
		}
		for (int j = 1; j <= nbase; j++)
		{
			cur = ((0 | (raw & 1)) << (j - 1)) | cur;
			raw >>= 1;
			if (0 == raw) { break; }
		}
		number.parts.push_back(cur);
	}

	return number;
}

ULONGLONG RadixSort::operator()(long long int* a, long long int num)
{
	ULONGLONG startTime = GetTickCount64();

	Numbers* pNumbers = new Numbers;
	pNumbers->reserve(num + 3);
	preprocess(a, num, *pNumbers);

	int pass = (*pNumbers)[0].parts.size();
    long long int nrooms = long long int(powl(base, nbase)) + 1;
	
	Numbers* pNumbers2 = new Numbers;
	pNumbers2->reserve(num + 3);
	vector<long long int>* rooms = new vector<long long int>[nrooms];
	for (int i = 0; i < pass; i++)
	{
		for (long long int j = 0; j < pNumbers->size(); j++) { rooms[(*pNumbers)[j].parts[i]].push_back(j); }

		for (long long int j = 0; j < nrooms; j++)
		{
			if (0 == rooms[j].size()) { continue; }
			for (long long int k = 0; k < rooms[j].size(); k++) {
				pNumbers2->push_back((*pNumbers)[rooms[j][k]]);
			}
			rooms[j].clear();
			rooms[j].shrink_to_fit();
		}

		Numbers* tmp = pNumbers2; pNumbers2 = pNumbers; pNumbers = tmp;
		pNumbers2->clear();
		pNumbers2->shrink_to_fit();
	}
	delete[] rooms;
	ULONGLONG endTime = GetTickCount64();

	for (int i = 0; i < pNumbers->size(); i++) {
		a[i] = (*pNumbers)[i].raw;
	}
	delete pNumbers;
	delete pNumbers2;
	return endTime - startTime;
}

void countSort2(long long int*& a, int num, vector<long long int>*& a2, int turns)
{
	int flag = (turns << 3);
	for (int i = 0; i < num; i++) {
		a2[(a[i] >> flag) & 255].push_back(a[i]);
	}

	int cur = 0;
	for (int i = 0; i < 256; i++) {
		if (0 == a2[i].size()) { continue; }
		for (int j = 0; j < a2[i].size(); j++) {
			a[cur] = a2[i][j];
			cur++;
		}

		a2[i].clear();
		a2[i].shrink_to_fit();
	}
}

ULONGLONG radixSort2(long long int*& a, int num)
{
	// 默认是2进制，并且一次移8位
	// 假设每个数的范围是0-2^32，因此最多4个pass
	ULONGLONG startTime = GetTickCount64();
	vector<long long int>* a2 = new vector<long long int>[256];
	for (int i = 0; i < 4; i++) {
		countSort2(a, num, a2, i);
	}
	ULONGLONG endTime = GetTickCount64();

	return endTime - startTime;
}
