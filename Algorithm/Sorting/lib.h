#pragma once
#include <random>
#include <iostream>
#include <fstream>
#include <ctime>

#define MAXINT ((long long int(1) << 32) - 1)
#define DATASIZE1 long long int(10)
#define DATASIZE2 long long int(100)
#define DATASIZE3 long long int(1000)
#define DATASIZE4 long long int(10000)
#define DATASIZE5 long long int(100000)
#define DATASIZE6 long long int(1000000)
#define DATASIZE7 long long int(10000000)
#define DATASIZE8 long long int(100000000)
#define DATASIZE9 long long int(200000000)
#define DATASIZE long long int(1000000000)

using namespace std;

void generateRandomData(string filename, long long int datasize);

long long int* getRandomDataFromFile(string filename, long long int datasize);

long long int* getRandomData(long long int datasize);

long long int getRandomNum(long long int left, long long int right);

void prepareRandomData();