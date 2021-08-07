#ifndef ALGO_H
#define ALGO_H

#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/opencv.hpp>
#include <opencv2/objdetect/objdetect.hpp>
#include <opencv2/imgproc/imgproc.hpp>

#include <vector>

using namespace std;
using namespace cv;

vector<Rect> getFaces(Mat image);

Mat biFilter(Mat& image, Rect region, int ksize);

#endif // ALGO_H
