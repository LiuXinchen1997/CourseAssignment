#include "algo.h"
#include <iostream>

long brute_force(const string& P, const string& T, vector<int>& res)
{
    long starttime = clock();
    int lenp = P.size();
    int lent = T.size();
    for (int i = 0; i < lent; i++) {
        int q = 0;
        while (P[q] == T[i+q]) {
            q++;
            if (q == lenp) { break; }
        }

        if (q == lenp) { res.push_back(i); }
    }

    long endtime = clock();
    return endtime - starttime;
}

void calc_pi(const string& P, int*& pi)
{
    int lenp = P.size();
    pi[0] = -1;
    int k = -1;
    for (int i = 1; i < lenp; i++) {
        while (k >= 0 && P[k+1] != P[i]) {
            k = pi[k];
        }

        if (P[k+1] == P[i]) {
            k++;
        }

        pi[i] = k;
    }
}

long kmp(const string& P, const string& T, vector<int>& res)
{
    long starttime = clock();
    int lenp = P.size();
    int lent = T.size();
    int* pi = new int[lenp];
    calc_pi(P, pi);
    int q = -1;
    for (int i = 0; i < lent; i++) {
        while (q >= 0 && P[q+1] != T[i]) {
            q = pi[q];
        }
        if (P[q+1] == T[i]) {
            q++;
        }
        if (q == lenp - 1) {
            res.push_back(i - q);
            q = pi[q];
        }
    }

    delete[] pi;

    long endtime = clock();
    return endtime - starttime;
}


#define SIZE 256

void calc_bmBc(const string& P, int*& bmBc)
{
    int m = P.size();
    for (int i = 0; i < SIZE; i++) {
        bmBc[i] = m;
    }
    for (int i = 0; i < m - 1; i++) {
        bmBc[P[i]] = m - i - 1;
    }
}

void calc_osuff(const string& P, int*& osuff)
{
    int m = P.size();
    for (int i = 0; i < m; i++) {
        int j = i;
        while (j >= 0) {
            if (P[j] == P[m - (i - j)]) {
                j--;
            }
            else {
                break;
            }
        }
        osuff[i] = i - j;
    }
}

void calc_bmGs(const string& P, int*& bmGs, int*& osuff)
{
    int m = P.size();
    calc_osuff(P, osuff);
    for (int i = 0; i < m; i++) {
        bmGs[i] = m;
    }

    int j = 0;
    for (int i = m - 2; i >= 0; i--) {
        if (osuff[i] == i + 1) {
            while (j <= m - i - 2) {
                if (bmGs[j] == m) { bmGs[j] = m - i - 1; }
                j++;
            }
        }
    }
    for (int i = 0; i < m; i++) {
        bmGs[m - osuff[i] - 1] = m - i - 1;
    }
}

int max_of_2(int a, int b)
{
    if (a <= b) { return b; }
    return a;
}

long bm(const string& P, const string& T, vector<int>& res)
{
    long starttime = clock();
    int lenp = P.size();
    int lent = T.size();

    int* bmBc = new int[SIZE];
    int* osuff = new int[lenp];
    int* bmGs = new int[lenp];
    calc_bmBc(P, bmBc);
    calc_bmGs(P, bmGs, osuff);
    int s = 0;
    while (s <= lent - lenp) {
        int i = lenp - 1;
        while (P[i] == T[s + i]) {
            if (0 == i) { res.push_back(s); break; }
            else { i--; }
        }
        s += max_of_2(bmGs[i], bmBc[T[s+i]] - lenp + i + 1);
    }

    delete[] bmBc;
    delete[] osuff;
    delete[] bmGs;
    long endtime = clock();
    return endtime - starttime;
}
