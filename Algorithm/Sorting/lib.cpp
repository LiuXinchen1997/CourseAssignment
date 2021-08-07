#include "lib.h"

void generateRandomData(string filename, long long int datasize)
{
	ofstream outfile;
	outfile.open(filename, ios::out);

	default_random_engine e(time(0));
	uniform_int_distribution<long long int> u(0, MAXINT);

	for (int i = 0; i < datasize; i++)
	{
		if (i % 10 == 0 && i != 0) outfile << endl;
		outfile << u(e) << " ";
	}
	outfile.close();
}

long long int* getRandomData(long long int datasize)
{
	default_random_engine e(time(0));
	uniform_int_distribution<long long int> u(0, MAXINT);

	long long int* a = new long long int[datasize];
	for (long long int i = 0; i < datasize; i++) {
		a[i] = u(e);
	}

	return a;
}

long long int getRandomNum(long long int left, long long int right)
{
	default_random_engine e(time(0));
	uniform_int_distribution<long long int> u(left, right);

	return u(e);
}

long long int* getRandomDataFromFile(string filename, long long int datasize)
{
	ifstream infile(filename, ios::in);
	if (!infile) {
		cerr << "Infile error!" << endl;
		exit(1);
	}

	long long int* a = new long long int[datasize];
	for (int i = 0; i < datasize; i++) { infile >> a[i]; }
	infile.close();
	return a;
}

void prepareRandomData()
{
	generateRandomData("datasize1.txt", DATASIZE1);
	generateRandomData("datasize2.txt", DATASIZE2);
	generateRandomData("datasize3.txt", DATASIZE3);
	generateRandomData("datasize4.txt", DATASIZE4);
	generateRandomData("datasize5.txt", DATASIZE5);
	generateRandomData("datasize6.txt", DATASIZE6);
	generateRandomData("datasize7.txt", DATASIZE7);
	generateRandomData("datasize8.txt", DATASIZE8);
	generateRandomData("datasize9.txt", DATASIZE9);
	generateRandomData("datasize.txt", DATASIZE);
}