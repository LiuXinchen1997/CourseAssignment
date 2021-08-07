#include "seamcarving.h"
#include <QImage>
#include <cmath>
#include <iostream>

#define UNUSE 0
#define LEFT 1
#define RIGHT 2
#define UP 3

#define SHANG 4
#define ZHONG 5
#define XIA 6
#define INF (1<<30)

std::vector<std::vector<double>> generate_d(QImage img)
{
    std::vector<std::vector<double>> D;
    for (int x = 0; x < img.width(); x++) {
        std::vector<double> d;
        for (int y = 0; y < img.height(); y++) {
            d.push_back(0.0);
        }
        D.push_back(d);
    }

    for (int x = 0; x < img.width(); x++) {
        for (int y = 0; y < img.height(); y++) {
            double dx = 0;
            if (0 == x) {
                dx += pow((QColor(img.pixel(x, y)).red() - QColor(img.pixel(x + 1, y)).red()), 2);
                dx += pow((QColor(img.pixel(x, y)).green() - QColor(img.pixel(x + 1, y)).green()), 2);
                dx += pow((QColor(img.pixel(x, y)).blue() - QColor(img.pixel(x + 1, y)).blue()), 2);
            } else if (img.width() - 1 == x) {
                dx += pow((QColor(img.pixel(x, y)).red() - QColor(img.pixel(x - 1, y)).red()), 2);
                dx += pow((QColor(img.pixel(x, y)).green() - QColor(img.pixel(x - 1, y)).green()), 2);
                dx += pow((QColor(img.pixel(x, y)).blue() - QColor(img.pixel(x - 1, y)).blue()), 2);
            } else {
                dx += ( pow((QColor(img.pixel(x, y)).red() - QColor(img.pixel(x + 1, y)).red()), 2) +
                        pow((QColor(img.pixel(x, y)).red() - QColor(img.pixel(x - 1, y)).red()), 2) ) / 2.0;
                dx += ( pow((QColor(img.pixel(x, y)).green() - QColor(img.pixel(x + 1, y)).green()), 2) +
                        pow((QColor(img.pixel(x, y)).green() - QColor(img.pixel(x - 1, y)).green()), 2) ) / 2.0;
                dx += ( pow((QColor(img.pixel(x, y)).blue() - QColor(img.pixel(x + 1, y)).blue()), 2) +
                        pow((QColor(img.pixel(x, y)).blue() - QColor(img.pixel(x - 1, y)).blue()), 2) ) / 2.0;
            }
            dx = sqrt(dx);

            double dy = 0;
            if (0 == y) {
                dy += pow((QColor(img.pixel(x, y)).red() - QColor(img.pixel(x, y + 1)).red()), 2);
                dy += pow((QColor(img.pixel(x, y)).green() - QColor(img.pixel(x, y + 1)).green()), 2);
                dy += pow((QColor(img.pixel(x, y)).blue() - QColor(img.pixel(x, y + 1)).blue()), 2);
            } else if (img.height() - 1 == y) {
                dy += pow((QColor(img.pixel(x, y)).red() - QColor(img.pixel(x, y - 1)).red()), 2);
                dy += pow((QColor(img.pixel(x, y)).green() - QColor(img.pixel(x, y - 1)).green()), 2);
                dy += pow((QColor(img.pixel(x, y)).blue() - QColor(img.pixel(x, y - 1)).blue()), 2);
            } else {
                dy += ( pow((QColor(img.pixel(x, y)).red() - QColor(img.pixel(x, y + 1)).red()), 2) +
                        pow((QColor(img.pixel(x, y)).red() - QColor(img.pixel(x, y - 1)).red()), 2) ) / 2.0;
                dy += ( pow((QColor(img.pixel(x, y)).green() - QColor(img.pixel(x, y + 1)).green()), 2) +
                        pow((QColor(img.pixel(x, y)).green() - QColor(img.pixel(x, y - 1)).green()), 2) ) / 2.0;
                dy += ( pow((QColor(img.pixel(x, y)).blue() - QColor(img.pixel(x, y + 1)).blue()), 2) +
                        pow((QColor(img.pixel(x, y)).blue() - QColor(img.pixel(x, y - 1)).blue()), 2) ) / 2.0;
            }
            dy = sqrt(dy);

            D[size_t(x)][size_t(y)] = (dx + dy) / 2;
        }
    }

    return D;
}

std::vector<int> get_carving_inds(QImage img, int col_or_row)
{
    std::vector<std::vector<double>> D = generate_d(img);
    std::vector<std::vector<double>> M;
    std::vector<std::vector<int>> S;
    for (int x = 0; x < img.width(); x++) {
        std::vector<double> m;
        std::vector<int> s;
        for (int y = 0; y < img.height(); y++) {
            m.push_back(INF);
            s.push_back(UNUSE);
        }
        M.push_back(m);
        S.push_back(s);
    }

    std::vector<int> inds;
    if (1 == col_or_row) {
        for (int i = 0; i < img.width(); i++) {
            M[size_t(i)][0] = D[size_t(i)][0];
        }

        for (size_t y = 1; y < size_t(img.height()); y++) {
            if (M[0][y-1] < M[1][y-1]) { M[0][y] = M[0][y-1] + D[0][y]; S[0][y] = UP; }
            else { M[0][y] = M[1][y-1] + D[0][y]; S[0][y] = RIGHT; }

            for (size_t x = 1; x < size_t(img.width() - 1); x++) {
                if (M[x][y-1] < M[x-1][y-1] && M[x][y-1] < M[x+1][y-1]) {
                    M[x][y] = M[x][y-1] + D[x][y];
                    S[x][y] = UP;
                } else if (M[x-1][y-1] < M[x+1][y-1]) {
                    M[x][y] = M[x-1][y-1] + D[x][y];
                    S[x][y] = LEFT;
                } else {
                    M[x][y] = M[x+1][y-1] + D[x][y];
                    S[x][y] = RIGHT;
                }
            }


            if (M[size_t(img.width()-1)][y-1] < M[size_t(img.width()-2)][y-1]) {
                M[size_t(img.width()-1)][y] = M[size_t(img.width()-2)][y-1] + D[size_t(img.width()-1)][y];
                S[size_t(img.width()-1)][y] = UP;
            } else {
                M[size_t(img.width()-1)][y] = M[size_t(img.width()-2)][y-1] + D[size_t(img.width()-1)][y];
                S[size_t(img.width()-1)][y] = LEFT;
            }
        }

        for (size_t i = 0; i < size_t(img.height()); i++) {
            inds.push_back(0);
        }
        int height = img.height();
        size_t min_ind = 0;
        double min_m = INF;
        for (size_t i = 0; i < size_t(img.width()); i++) {
            if (M[i][size_t(height-1)] < min_m) {
                min_m = M[i][size_t(height-1)];
                min_ind = i;
            }
        }
        inds[inds.size()-1] = int(min_ind);
        for (int i = inds.size()-1; i >= 1; i--) {
            if (UP == S[inds[i]][i]) { inds[i-1] = inds[i]; }
            else if (LEFT == S[inds[i]][i]) { inds[i-1] = inds[i] - 1; }
            else if (RIGHT == S[inds[i]][i]) { inds[i-1] = inds[i] + 1; }
        }
    } else if (2 == col_or_row) {
        for (int i = 0; i < img.height(); i++) {
            M[0][size_t(i)] = D[0][size_t(i)];
        }

        for (size_t x = 1; x < size_t(img.width()); x++) {
            if (M[x-1][0] < M[x-1][1]) { M[x][0] = M[x-1][0] + D[x][0]; S[x][0] = ZHONG; }
            else { M[x][0] = M[x-1][1] + D[x][0]; S[x][0] = XIA; }

            for (size_t y = 1; y < size_t(img.height() - 1); y++) {
                if (M[x-1][y] < M[x-1][y-1] && M[x-1][y] < M[x-1][y+1]) {
                    M[x][y] = M[x-1][y] + D[x][y];
                    S[x][y] = ZHONG;
                } else if (M[x-1][y-1] < M[x-1][y+1]) {
                    M[x][y] = M[x-1][y-1] + D[x][y];
                    S[x][y] = SHANG;
                } else {
                    M[x][y] = M[x-1][y+1] + D[x][y];
                    S[x][y] = XIA;
                }
            }

            if (M[x-1][size_t(img.height()-1)] < M[x-1][size_t(img.height()-2)]) {
                M[x][size_t(img.height()-1)] = M[x-1][size_t(img.height()-1)] + D[x][size_t(img.height()-1)];
                S[x][size_t(img.height()-1)] = ZHONG;
            } else {
                M[x][size_t(img.height()-1)] = M[x-1][size_t(img.height()-2)] + D[x][size_t(img.height()-1)];
                S[x][size_t(img.height()-1)] = SHANG;
            }
        }

        for (size_t i = 0; i < size_t(img.width()); i++) {
            inds.push_back(0);
        }
        int width = img.width();
        size_t min_ind = 0;
        double min_m = INF;
        for (size_t i = 0; i < size_t(img.height()); i++) {
            if (M[size_t(width-1)][i] < min_m) {
                min_m = M[size_t(width-1)][i];
                min_ind = i;
            }
        }
        inds[inds.size()-1] = int(min_ind);
        for (int i = inds.size()-1; i >= 1; i--) {
            if (190 == i) {
                min_ind = 1;
            }

            if (ZHONG == S[i][inds[i]]) { inds[i-1] = inds[i]; }
            else if (SHANG == S[i][inds[i]]) { inds[i-1] = inds[i] - 1; }
            else if (XIA == S[i][inds[i]]) { inds[i-1] = inds[i] + 1; }
        }
    }

    return inds;
}

void test(QImage img)
{
    std::vector<int> inds;
    inds.push_back(img.width() / 2);
    for (int j = 1; j < img.height(); j++) {
        int res = rand() % 3;
        if (0 == res) { inds.push_back(inds[inds.size()-1]); }
        else if (1 == res) {
            int target = inds[inds.size()-1] + 1;
            if (target >= img.width()) { target = img.width() - 1; }
            inds.push_back(target);
        }
        else if (2 == res) {
            int target = inds[inds.size()-1] - 1;
            if (target < 0) { target = 0; }
            inds.push_back(target);
        }
    }
}
