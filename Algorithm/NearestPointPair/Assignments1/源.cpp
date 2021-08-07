#include <iostream>
#include <cstdlib>
#include <vector>
#include <ctime>
#include <random>
#include <Windows.h>
#include <algorithm>
#include <cfloat>

using namespace std;

struct Point {
	int ind;
	double x, y;
	Point(double xx, double yy, int ind) {
		this->ind = ind;
		this->x = xx;
		this->y = yy;
	}
	Point(const Point& p) {
		this->ind = p.ind;
		this->x = p.x;
		this->y = p.y;
	}
};

bool compare_x(Point& p1, Point& p2) {
	if (p1.x < p2.x) { return true; }
	else if (p1.x == p2.x && p1.y < p2.y) { return true; }
	return false;
}
bool compare_y(Point& p1, Point& p2) { 
	if (p1.y < p2.y) { return true; }
	else if (p1.y == p2.y && p1.x < p2.x) { return true; }
	return false;
}

vector<Point> generate_points(int num = 1000000)
{
	// 为了统计方便，生成的点的x,y坐标均为[0, 10000]的浮点数
	vector<Point> ps;
	ps.reserve(num + 10);
	default_random_engine e(time(0));
	uniform_real_distribution<double> u(0.0, 10000.0);
	for (int i = 0; i < num; i++) {
		ps.push_back(Point(u(e), u(e), i));
	}

	return ps;
}

double calc_dist(const Point& p1, const Point& p2)
{
	double dx = p1.x - p2.x;
	double dy = p1.y - p2.y;
	return dx * dx + dy * dy;
}

// method 1
// 暴力求解
vector<int> solve1(vector<Point> ps)
{
	int ps_size = ps.size();
	double min_dist = DBL_MAX;
	int min_i = -1;
	int min_j = -1;
	DWORD start_time = GetTickCount64();
	for (int i = 0; i < ps_size; i++) {
		if (i % 100 == 0) { 
			cout << i << endl;
			cout << GetTickCount64() - start_time << endl;
		}
		for (int j = i + 1; j < ps_size; j++) {
			double cur_dist = calc_dist(ps[i], ps[j]);
			if (min_dist > cur_dist) {
				min_dist = cur_dist;
				min_i = i;
				min_j = j;
			}
		}
	}

	vector<int> res = { min_i, min_j };
	return res;
}

// method 2
// 分治法
vector<int> find_nearest_point_pair(vector<Point>& ps, vector<Point>& xs, int xl, int xr, vector<Point> ys)
{
	vector<int> res;
	int pnum = xr - xl + 1;
	if (2 == pnum) {
		res.push_back(xs[xl].ind);
		res.push_back(xs[xr].ind);
		return res;
	}
	else if (3 == pnum) {
		double d1 = calc_dist(Point(xs[xl]), Point(xs[xl + 1]));
		double d2 = calc_dist(Point(xs[xl + 1]), Point(xs[xr]));
		double d3 = calc_dist(Point(xs[xl]), Point(xs[xr]));
		if (d1 <= d2 && d1 <= d3) { res.push_back(xs[xl].ind); res.push_back(xs[xl + 1].ind); return res; }
		if (d2 <= d1 && d2 <= d3) { res.push_back(xs[xl + 1].ind); res.push_back(xs[xr].ind); return res; }
		if (d3 <= d1 && d3 <= d2) { res.push_back(xs[xl].ind); res.push_back(xs[xr].ind); return res; }
	}

	int xm;
	if ((xr - xl) & 1) { xm = xl + floor((xr - xl) / 2.0); }
	else { xm = xl + (xr - xl) / 2; }
	vector<Point> ysl, ysr;
	ysl.reserve((xr - xl) / 2 + 3);
	ysr.reserve((xr - xl) / 2 + 3);

	bool xflag = (xs[xm].x == xs[xm + 1].x);
	bool yflag = (xs[xm].y == xs[xm + 1].y);
	for (int i = 0; i < ys.size(); i++) {
		if (ys[i].x < xs[xm].x) { ysl.push_back(ys[i]); }
		else if ((ys[i].x > xs[xm].x)) { ysr.push_back(ys[i]); }
		else if (ys[i].x == xs[xm].x) {
			if (!xflag) { ysl.push_back(ys[i]); }
			else {
				if (ys[i].y < xs[xm].y) { ysl.push_back(ys[i]); }
				else if (ys[i].y > xs[xm].y) { ysr.push_back(ys[i]); }
				else if (ys[i].y == xs[xm].y) {
					if (!yflag) { ysl.push_back(ys[i]); }
					else {
						ys[i].x, ys[i].y;
						int cur = xm;
						bool found = false;
						while (true) {
							if (xs[cur].x != ys[i].x || xs[cur].y != ys[i].y) { break; }
							if (xs[cur].ind == ys[i].ind) {
								found = true;
								ysl.push_back(ys[i]);
								break;
							}
							cur--;
						}
						if (!found) {
							cur = xm + 1;
							while (true) {
								if (xs[cur].x != ys[i].x || xs[cur].y != ys[i].y) { break; }
								if (xs[cur].ind == ys[i].ind) {
									found = true;
									ysr.push_back(ys[i]);
									break;
								}
								cur++;
							}
						}
					}
				}
			}
		}
	}

	vector<int> res1 = find_nearest_point_pair(ps, xs, xl, xm, ysl);
	vector<int> res2 = find_nearest_point_pair(ps, xs, xm + 1, xr, ysr);
	int ind1 = res1[0];
	int ind2 = res1[1];
	if (calc_dist(ps[res2[0]], ps[res2[1]]) < calc_dist(ps[res1[0]], ps[res1[1]])) {
		ind1 = res2[0];
		ind2 = res2[1];
	}
	double min_dist = calc_dist(ps[ind1], ps[ind2]);
	vector<Point> ys_;
	double xmid = (xs[xm].x + xs[xm + 1].x) / 2.0;
	for (int i = 0; i < ys.size(); i++) {
		if (ys[i].x <= xmid + min_dist && ys[i].x >= xmid - min_dist) {
			ys_.push_back(ys[i]);
		}
	}
	for (int i = 0; i < ys_.size(); i++) {
		for (int j = 1; j <= 7; j++) {
			if (i + j >= ys_.size()) { break; }
			double cur_dist = calc_dist(ys_[i], ys_[i + j]);
			if (cur_dist < min_dist) {
				min_dist = cur_dist;
				ind1 = ys_[i].ind;
				ind2 = ys_[i + j].ind;
			}
		}
	}
	res.push_back(ind1);
	res.push_back(ind2);

	return res;
}
vector<int> solve2(vector<Point> ps)
{
	vector<Point> xs = ps;
	sort(xs.begin(), xs.end(), compare_x);
	vector<Point> ys = ps;
	sort(ys.begin(), ys.end(), compare_y);

	vector<int> res = find_nearest_point_pair(ps, xs, 0, ps.size()-1, ys);
	return res;
}

using namespace std;

int main()
{
	int epoch = 1;
	const int NUM = 1000000;
	DWORD cost1 = 0, cost2 = 0;
	cout << "使用分治法求解一百万个点的最近点对，请稍等..." << endl;
	for (int i = 0; i < epoch; i++) {
		vector<Point> ps = generate_points(NUM);

		DWORD start_time = GetTickCount64();
		// vector<int> res = solve1(ps);
		DWORD end_time = GetTickCount64();
		cost1 += end_time - start_time;
		// cout << "方法一计算距离：" << sqrt(calc_dist(ps[res[0]], ps[res[1]])) << endl;

		start_time = GetTickCount64();
		vector<int> res2 = solve2(ps);
		end_time = GetTickCount64();
		cost2 += end_time - start_time;
		cout << "方法二计算距离：" << sqrt(calc_dist(ps[res2[0]], ps[res2[1]])) << endl;
	}
	// cout << "方法一花费时间：" << cost1 / double(epoch) << " ms." << endl;
	cout << "方法二花费时间：" << cost2 / double(epoch) << " ms." << endl;

	system("pause");
	return 0;
}
