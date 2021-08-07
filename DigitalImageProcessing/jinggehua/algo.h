#ifndef ALGO_H
#define ALGO_H

#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/opencv.hpp>

cv::Mat masaike_process(cv::Mat image);

cv::Mat jingehua_process(cv::Mat image, int jsize);

cv::Mat jingehua_process2(cv::Mat image, int jsize);

#endif // ALGO_H
