#ifndef ALGO_H
#define ALGO_H

#include <string>
#include <vector>
#include <ctime>

using namespace std;

long brute_force(const string& P, const string& T, vector<int>& res);

long kmp(const string& P, const string& T, vector<int>& res);

long bm(const string& P, const string& T, vector<int>& res);

#endif // ALGO_H
