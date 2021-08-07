#include <iostream>
#include <fstream>
#include <cstdlib>
#include <ctime>
#include "sortlib.h"
#include "lib.h"

using namespace std;

const long long int datasizes[9] = {
	DATASIZE1, DATASIZE2, DATASIZE3, DATASIZE4, DATASIZE5, DATASIZE6, DATASIZE7, DATASIZE8, DATASIZE9
};

void display(long long int* a, long long int datasize)
{
	for (int i = 0; i < datasize; i++) {
		cout << a[i] << " ";
		if (i % 10 == 0) { cout << endl; }
	}
	cout << endl;
}

void testSortersPerformance()
{
	Sorter* sorters[5] = {
		new InsertionSort, new ShellSort, new MergeSort, new QuickSort, new RadixSort };

	ofstream outfile("res.txt", ios::app);
	for (int i = 0; i < 9; i++) {
		for (int j = 0; j < 5; j++) {
			long long int datasize = datasizes[i];
			Sorter* sorter = sorters[j];

			// 特殊情况处理
			if (datasize >= DATASIZE6 && sorter->name == "InsertionSort") { continue; }
			cout << sorter->name << " " << datasize << " : ";

			long long int* a = getRandomData(datasize);

			ULONGLONG cost = 0;
			if (sorter->name == "RadixSort") {
				RadixSort* sorter2 = (RadixSort*)(sorter);
				sorter2->base = 2;
				sorter2->nbase = ceil(log2l(datasize)); // 待修改
				cost = (*sorter2)(a, datasize);
			}
			else {
				cost = (*sorter)(a, datasize);
			}
			outfile << sorter->name << " " << datasize << " " << cost << endl;
			cout << cost << " finished!" << endl;
			delete[] a;
		}
	}
	outfile.close();
}

int main()
{
	// testSortersPerformance();
	ofstream outfile("res.txt", ios::app);
	/*
	RadixSort rs;
	rs.base = 2;
	rs.nbase = 8;
	for (int i = 0; i < 9; i++) {
		long long int datasize = datasizes[i];
		long long int* a = getRandomData(datasize);
		ULONGLONG cost = rs(a, datasize);
		outfile << "radix  " << datasize << "  :  " << cost << endl;
		cout << "radix  " << datasize << "  :  " << cost << endl;
		delete[] a;
	}
	*/

	InsertionSort is;
	ShellSort ss;
	MergeSort ms;
	QuickSort qs;
	long long int datasize = DATASIZE;
	long long int* a = getRandomData(datasize);
	ULONGLONG cost = 0;

	cost = qs(a, datasize);
	outfile << "qs  " << datasize << "  :  " << cost << endl;
	cout << "qs  " << datasize << "  :  " << cost << endl;
	delete[] a;

	a = getRandomData(datasize);
	cost = ms(a, datasize);
	outfile << "ms  " << datasize << "  :  " << cost << endl;
	cout << "ms  " << datasize << "  :  " << cost << endl;
	delete[] a;

	a = getRandomData(datasize);
	cost = ss(a, datasize);
	outfile << "ss  " << datasize << "  :  " << cost << endl;
	cout << "ss  " << datasize << "  :  " << cost << endl;
	delete[] a;

	a = getRandomData(datasize);
	cost = radixSort2(a, datasize);
	outfile << "rs  " << datasize << "  :  " << cost << endl;
	cout << "rs  " << datasize << "  :  " << cost << endl;
	delete[] a;


	/*
	for (int i = 1; i < 2; i++) {
		long long int datasize = datasizes[i];
		double times = 1000.0;

		long long int* a;
		ULONGLONG cost = 0;
		for (int j = 0; j < times; j++) {
			a = getRandomData(datasize);
			//cost += is(a, datasize);
			delete[] a;
		}
		outfile << "is " << datasize << "  :  " << cost / times << endl;
		cout << "is  " << datasize << "  :  " << cost / times << endl;
		
		
		cost = 0;
		for (int j = 0; j < times; j++) {
			a = getRandomData(datasize);
			//cost += ss(a, datasize);
			delete[] a;
		}
		outfile << "ss " << datasize << "  :  " << cost / times << endl;
		cout << "ss  " << datasize << "  :  " << cost / times << endl;
		

		cost = 0;
		for (int j = 0; j < times; j++) {
			a = getRandomData(datasize);
			//cost += ms(a, datasize);
			delete[] a;
		}
		outfile << "ms " << datasize << "  :  " << cost / times << endl;
		cout << "ms  " << datasize << "  :  " << cost / times << endl;
		

		cost = 0;
		for (int j = 0; j < times; j++) {
			a = getRandomData(datasize);
			cost += qs(a, datasize);
			delete[] a;
		}
		outfile << "qs " << datasize << "  :  " << cost / times << endl;
		cout << "qs  " << datasize << "  :  " << cost / times << endl;
		

		cost = 0;
		for (int j = 0; j < times; j++) {
			a = getRandomData(datasize);
			cost += rs(a, datasize);
			delete[] a;
		}
		outfile << "rs " << datasize << "  :  " << cost / times << endl;
		cout << "rs  " << datasize << "  :  " << cost / times << endl;
	}
	*/

	outfile.close();
	system("pause");
	return 0;
}
