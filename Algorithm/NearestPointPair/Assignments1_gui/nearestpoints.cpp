#include "nearestpoints.h"

using namespace std;

#define INF (1<<30)

RawPoint::RawPoint(double xx, double yy, int ind) {
    this->ind = ind;
    this->x = xx;
    this->y = yy;
}

RawPoint::RawPoint(const RawPoint& p) {
    this->ind = p.ind;
    this->x = p.x;
    this->y = p.y;
}

bool compare_x(RawPoint& p1, RawPoint& p2) {
    if (p1.x < p2.x) { return true; }
    else if (p1.x == p2.x && p1.y < p2.y) { return true; }
    return false;
}
bool compare_y(RawPoint& p1, RawPoint& p2) {
    if (p1.y < p2.y) { return true; }
    else if (p1.y == p2.y && p1.x < p2.x) { return true; }
    return false;
}

vector<RawPoint> generate_points(unsigned int num = 1000000)
{
    // 为了统计方便，生成的点的x,y坐标均为[0, 10000]的浮点数
    vector<RawPoint> ps;
    ps.reserve(num + 10);
    default_random_engine e(time(0));
    uniform_real_distribution<double> u(0.0, 10000.0);
    for (int i = 0; i < num; i++) {
        ps.push_back(RawPoint(u(e), u(e), i));
    }

    return ps;
}

double calc_dist(const RawPoint& p1, const RawPoint& p2)
{
    double dx = p1.x - p2.x;
    double dy = p1.y - p2.y;
    return dx * dx + dy * dy;
}

// method 1
// 暴力求解
vector<int> solve1(vector<RawPoint> ps)
{
    int ps_size = ps.size();
    double min_dist = INF;
    int min_i = -1;
    int min_j = -1;
    for (int i = 0; i < ps_size; i++) {
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
vector<int> find_nearest_point_pair(vector<RawPoint>& ps, vector<RawPoint>& xs, int xl, int xr, vector<RawPoint> ys)
{
    vector<int> res;
    int pnum = xr - xl + 1;
    if (2 == pnum) {
        res.push_back(xs[xl].ind);
        res.push_back(xs[xr].ind);
        return res;
    }
    else if (3 == pnum) {
        double d1 = calc_dist(RawPoint(xs[xl]), RawPoint(xs[xl + 1]));
        double d2 = calc_dist(RawPoint(xs[xl + 1]), RawPoint(xs[xr]));
        double d3 = calc_dist(RawPoint(xs[xl]), RawPoint(xs[xr]));
        if (d1 <= d2 && d1 <= d3) { res.push_back(xs[xl].ind); res.push_back(xs[xl + 1].ind); return res; }
        if (d2 <= d1 && d2 <= d3) { res.push_back(xs[xl + 1].ind); res.push_back(xs[xr].ind); return res; }
        if (d3 <= d1 && d3 <= d2) { res.push_back(xs[xl].ind); res.push_back(xs[xr].ind); return res; }
    }

    int xm;
    if ((xr - xl) & 1) { xm = xl + floor((xr - xl) / 2.0); }
    else { xm = xl + (xr - xl) / 2; }
    vector<RawPoint> ysl, ysr;
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
    vector<RawPoint> ys_;
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
vector<int> solve2(vector<RawPoint> ps)
{
    vector<RawPoint> xs = ps;
    sort(xs.begin(), xs.end(), compare_x);
    vector<RawPoint> ys = ps;
    sort(ys.begin(), ys.end(), compare_y);

    vector<int> res = find_nearest_point_pair(ps, xs, 0, ps.size()-1, ys);
    return res;
}
