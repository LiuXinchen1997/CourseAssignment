#ifndef NEARESTPOINTS_H
#define NEARESTPOINTS_H

#include <iostream>
#include <cstdlib>
#include <vector>
#include <ctime>
#include <random>
#include <algorithm>

using namespace std;

#define INF (1<<30)

struct RawPoint {
    int ind;
    double x, y;
    RawPoint(double xx, double yy, int ind);
    RawPoint(const RawPoint& p);
};

bool compare_x(RawPoint& p1, RawPoint& p2);
bool compare_y(RawPoint& p1, RawPoint& p2);

vector<RawPoint> generate_points(unsigned int num);

double calc_dist(const RawPoint& p1, const RawPoint& p2);

// method 1
// 暴力求解
vector<int> solve1(vector<RawPoint> ps);

// method 2
// 分治法
vector<int> find_nearest_point_pair(vector<RawPoint>& ps, vector<RawPoint>& xs, int xl, int xr, vector<RawPoint> ys);
vector<int> solve2(vector<RawPoint> ps);

#endif // NEARESTPOINTS_H
