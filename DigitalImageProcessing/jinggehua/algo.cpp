#include "tools.h"
#include "algo.h"
#include <locale>
#include <cmath>
#include <iostream>

using namespace std;

cv::Mat masaike_process(cv::Mat image)
{
    cv::Mat image2 = image.clone();
    int cols = image2.cols;
    int rows = image2.rows;
    int msize = 8;
    for (int i = 0; i + msize < rows; i += msize) {
        for (int j = 0; j + msize < cols; j += msize) {
            int sr = 0;
            int sg = 0;
            int sb = 0;
            for (int k1 = 0; k1 < msize; k1++) {
                for (int k2 = 0; k2 < msize; k2++) {
                    sr += image2.at<cv::Vec3b>(i+k1, j+k2)[0];
                    sg += image2.at<cv::Vec3b>(i+k1, j+k2)[1];
                    sb += image2.at<cv::Vec3b>(i+k1, j+k2)[2];
                }
            }
            for (int k1 = 0; k1 < msize; k1++) {
                for (int k2 = 0; k2 < msize; k2++) {
                    image2.at<cv::Vec3b>(i+k1, j+k2)[0] = sr / (msize * msize);
                    image2.at<cv::Vec3b>(i+k1, j+k2)[1] = sg / (msize * msize);
                    image2.at<cv::Vec3b>(i+k1, j+k2)[2] = sb / (msize * msize);
                }
            }
        }
    }

    return image2;
}

double** generate_lab(cv::Mat image, char ch='l')
{
    int nrows = image.rows;
    int ncols = image.cols;

    double** lab = new double* [nrows];
    for (int i = 0; i < nrows; i++) {
        lab[i] = new double[ncols];
    }

    for (int i = 0; i < nrows; i++) {
        for (int j = 0; j < ncols; j++) {
            int r = image.at<cv::Vec3b>(i, j)[0];
            int g = image.at<cv::Vec3b>(i, j)[1];
            int b = image.at<cv::Vec3b>(i, j)[2];
            vector<double> lab_ = rgb2lab(r, g, b);
            if ('l' == ch) { lab[i][j] = lab_[0]; }
            else if ('a' == ch) { lab[i][j] = lab_[1]; }
            else if ('b' == ch) { lab[i][j] = lab_[2]; }
        }
    }

    return lab;
}

cv::Mat jingehua_process(cv::Mat image, int jsize)
{
    int m_ = 10;

    cv::Mat image2 = image.clone();
    unsigned long long ncols = unsigned(image2.cols);
    unsigned long long nrows = unsigned(image2.rows);

    // 准备LAB
    double** L = new double* [nrows] ;
    double** A = new double* [nrows];
    double** B = new double* [nrows];
    int** labels = new int* [nrows];
    for (int i = 0; i < nrows; i++) {
        L[i] = new double[ncols];
        A[i] = new double[ncols];
        B[i] = new double[ncols];
        labels[i] = new int[ncols];
    }
    for (int i = 0; i < nrows; i++) {
        for (int j = 0; j < ncols; j++) {
            labels[i][j] = -1;

            int r = image.at<cv::Vec3b>(i, j)[0]                                           ;
            int g = image.at<cv::Vec3b>(i, j)[1];
            int b = image.at<cv::Vec3b>(i, j)[2];
            vector<double> lab_ = rgb2lab(r, g, b);
            L[i][j] = lab_[0];
            A[i][j] = lab_[1];
            B[i][j] = lab_[2];
        }
    }

    // 生成中心
    int ncenters_each_row = ncols / jsize;
    int ncenters_each_col = nrows / jsize;
    int* centers_x = new int[ncenters_each_row * ncenters_each_col + 1];
    int* centers_y = new int[ncenters_each_row * ncenters_each_col + 1];
    for (int i = 1; i <= ncenters_each_col; i++) {
        for (int j = 1; j <= ncenters_each_row; j++) {
            centers_x[(i-1)*ncenters_each_row+j] = (j-1) * jsize + jsize / 2;
            centers_y[(i-1)*ncenters_each_row+j] = (i-1) * jsize + jsize / 2;
        }
    }

    // 计算
    for (int iter = 0; iter < 12; iter++) { // 仅迭代10次
        double** dists = new double* [nrows];
        for (int i = 0; i < nrows; i++) {
            dists[i] = new double[ncols];
        }
        for (int i = 0; i < nrows; i++) {
            for (int j = 0; j < ncols; j++) {
                dists[i][j] = numeric_limits<double>::max();
            }
        }

        for (int i = 1; i <= ncenters_each_row * ncenters_each_col; i++) {
            int center_x = centers_x[i];
            int center_y = centers_y[i];
            double center_l = L[center_y][center_x];
            double center_a = A[center_y][center_x];
            double center_b = B[center_y][center_x];
            for (int k = center_x - jsize; k < center_x + jsize; k++) { // col
                if (k < 0 || k >= int(ncols)) { continue; }
                for (int k2 = center_y - jsize; k2 < center_y + jsize; k2++) { // row
                    if (k2 < 0 || k2 >= int(nrows)) { continue; }
                    double cur_l = L[k2][k];
                    double cur_a = A[k2][k];
                    double cur_b = B[k2][k];
                    double dc = pow(center_l-cur_l, 2) + pow(center_a-cur_a, 2) + pow(center_b-cur_b, 2);
                    double ds = pow(k-center_x, 2) + pow(k2-center_y, 2);
                    double dist = sqrtf(dc + pow(sqrtf(ds)/2, 2)*m_*m_);

                    if (dist < dists[k2][k]) {
                        dists[k2][k] = dist;
                        labels[k2][k] = i;
                    }
                }
            }
        }

        int* centers_sum_x = new int[ncenters_each_row * ncenters_each_col + 1];
        int* centers_sum_y = new int[ncenters_each_row * ncenters_each_col + 1];
        int* centers_num = new int[ncenters_each_row * ncenters_each_col + 1];
        for (int i = 0; i < ncenters_each_row * ncenters_each_col + 1; i++) {
            centers_sum_x[i] = 0;
            centers_sum_y[i] = 0;
            centers_num[i] = 0;
        }

        for (int i = 0; i < nrows; i++) {
            for (int j = 0; j < ncols; j++) {
                int label = labels[i][j];
                centers_sum_x[label] += j;
                centers_sum_y[label] += i;
                centers_num[label] += 1;
            }
        }
        for (int i = ncenters_each_row * ncenters_each_col; i <= ncenters_each_row * ncenters_each_col; i++) {
            if (centers_num[i] == 0) { continue; }
            centers_x[i] = centers_sum_x[i] / centers_num[i];
            centers_y[i] = centers_sum_y[i] / centers_num[i];
        }

        //delete [] centers_sum_x;
        //delete [] centers_sum_y;
        //delete [] centers_num;
    }

    int* centers_sum_r = new int[ncenters_each_row * ncenters_each_col + 1];
    int* centers_sum_g = new int[ncenters_each_row * ncenters_each_col + 1];
    int* centers_sum_b = new int[ncenters_each_row * ncenters_each_col + 1];
    int* centers_num = new int[ncenters_each_row * ncenters_each_col + 1];
    for (int i = 0; i < ncenters_each_row * ncenters_each_col + 1; i++) {
        centers_sum_r[i] = 0;
        centers_sum_g[i] = 0;
        centers_sum_b[i] = 0;
        centers_num[i] = 0;
    }
    for (int i = 0; i < nrows; i++) {
        for (int j = 0; j < ncols; j++) {
            int r = image.at<cv::Vec3b>(i, j)[0];
            int g = image.at<cv::Vec3b>(i, j)[1];
            int b = image.at<cv::Vec3b>(i, j)[2];
            int label = labels[i][j];
            centers_sum_r[label] += r;
            centers_sum_g[label] += g;
            centers_sum_b[label] += b;
            centers_num[label] += 1;
        }
    }

    for (int i = 0; i < nrows; i++) {
        for (int j = 0; j < ncols; j++) {
            int label = labels[i][j];
            image2.at<cv::Vec3b>(i, j)[0] = centers_sum_r[label] / centers_num[label];
            image2.at<cv::Vec3b>(i, j)[1] = centers_sum_g[label] / centers_num[label];
            image2.at<cv::Vec3b>(i, j)[2] = centers_sum_b[label] / centers_num[label];
        }
    }

    return image2;
}

cv::Mat jingehua_process2(cv::Mat image, int jsize)
{
    int m_ = 10;

    cv::Mat image2 = image.clone();
    cv::Mat image_lab;
    cv::cvtColor(image, image_lab, cv::COLOR_RGB2Lab);

    unsigned long long ncols = unsigned(image2.cols);
    unsigned long long nrows = unsigned(image2.rows);

    int** labels = new int* [nrows];
    for (int i = 0; i < nrows; i++) {
        labels[i] = new int[ncols];
    }
    for (int i = 0; i < nrows; i++) {
        for (int j = 0; j < ncols; j++) {
            labels[i][j] = -1;
        }
    }

    // 生成中心
    int ncenters_each_row = ncols / jsize;
    int ncenters_each_col = nrows / jsize;
    int* centers_x = new int[ncenters_each_row * ncenters_each_col + 1];
    int* centers_y = new int[ncenters_each_row * ncenters_each_col + 1];
    for (int i = 1; i <= ncenters_each_col; i++) {
        for (int j = 1; j <= ncenters_each_row; j++) {
            centers_x[(i-1)*ncenters_each_row+j] = (j-1) * jsize + jsize / 2;
            centers_y[(i-1)*ncenters_each_row+j] = (i-1) * jsize + jsize / 2;
        }
    }

    // 计算
    for (int iter = 0; iter < 12; iter++) { // 仅迭代10次
        double** dists = new double* [nrows];
        for (int i = 0; i < nrows; i++) {
            dists[i] = new double[ncols];
        }
        for (int i = 0; i < nrows; i++) {
            for (int j = 0; j < ncols; j++) {
                dists[i][j] = numeric_limits<double>::max();
            }
        }

        for (int i = 1; i <= ncenters_each_row * ncenters_each_col; i++) {
            int center_x = centers_x[i];
            int center_y = centers_y[i];
            double center_l = image_lab.at<cv::Vec3b>(center_y, center_x)[0];
            double center_a = image_lab.at<cv::Vec3b>(center_y, center_x)[1];
            double center_b = image_lab.at<cv::Vec3b>(center_y, center_x)[2];
            for (int k = center_x - jsize; k < center_x + jsize; k++) { // col
                if (k < 0 || k >= int(ncols)) { continue; }
                for (int k2 = center_y - jsize; k2 < center_y + jsize; k2++) { // row
                    if (k2 < 0 || k2 >= int(nrows)) { continue; }
                    double cur_l = image_lab.at<cv::Vec3b>(k2, k)[0];
                    double cur_a = image_lab.at<cv::Vec3b>(k2, k)[1];
                    double cur_b = image_lab.at<cv::Vec3b>(k2, k)[2];
                    double dc = pow(center_l-cur_l, 2) + pow(center_a-cur_a, 2) + pow(center_b-cur_b, 2);
                    double ds = pow(k-center_x, 2) + pow(k2-center_y, 2);
                    double dist = sqrtf(dc + pow(sqrtf(ds)/2, 2)*m_*m_);

                    if (dist < dists[k2][k]) {
                        dists[k2][k] = dist;
                        labels[k2][k] = i;
                    }
                }
            }
        }

        int* centers_sum_x = new int[ncenters_each_row * ncenters_each_col + 1];
        int* centers_sum_y = new int[ncenters_each_row * ncenters_each_col + 1];
        int* centers_num = new int[ncenters_each_row * ncenters_each_col + 1];
        for (int i = 0; i < ncenters_each_row * ncenters_each_col + 1; i++) {
            centers_sum_x[i] = 0;
            centers_sum_y[i] = 0;
            centers_num[i] = 0;
        }

        for (int i = 0; i < nrows; i++) {
            for (int j = 0; j < ncols; j++) {
                int label = labels[i][j];
                centers_sum_x[label] += j;
                centers_sum_y[label] += i;
                centers_num[label] += 1;
            }
        }
        for (int i = ncenters_each_row * ncenters_each_col; i <= ncenters_each_row * ncenters_each_col; i++) {
            if (centers_num[i] == 0) { continue; }
            centers_x[i] = centers_sum_x[i] / centers_num[i];
            centers_y[i] = centers_sum_y[i] / centers_num[i];
        }
    }

    int* centers_sum_r = new int[ncenters_each_row * ncenters_each_col + 1];
    int* centers_sum_g = new int[ncenters_each_row * ncenters_each_col + 1];
    int* centers_sum_b = new int[ncenters_each_row * ncenters_each_col + 1];
    int* centers_num = new int[ncenters_each_row * ncenters_each_col + 1];
    for (int i = 0; i < ncenters_each_row * ncenters_each_col + 1; i++) {
        centers_sum_r[i] = 0;
        centers_sum_g[i] = 0;
        centers_sum_b[i] = 0;
        centers_num[i] = 0;
    }
    for (int i = 0; i < nrows; i++) {
        for (int j = 0; j < ncols; j++) {
            int r = image.at<cv::Vec3b>(i, j)[0];
            int g = image.at<cv::Vec3b>(i, j)[1];
            int b = image.at<cv::Vec3b>(i, j)[2];
            int label = labels[i][j];
            centers_sum_r[label] += r;
            centers_sum_g[label] += g;
            centers_sum_b[label] += b;
            centers_num[label] += 1;
        }
    }

    for (int i = 0; i < nrows; i++) {
        for (int j = 0; j < ncols; j++) {
            int label = labels[i][j];
            image2.at<cv::Vec3b>(i, j)[0] = centers_sum_r[label] / centers_num[label];
            image2.at<cv::Vec3b>(i, j)[1] = centers_sum_g[label] / centers_num[label];
            image2.at<cv::Vec3b>(i, j)[2] = centers_sum_b[label] / centers_num[label];
        }
    }

    return image2;
}
