#include "algo.h"
#include <QCoreApplication>
#include <QDir>

#include <iostream>

vector<Rect> getFaces(Mat image)
{
    QDir dir;
    std::cout << dir.currentPath().toStdString() << std::endl;
    cv::Mat image_gray;
    cv::cvtColor(image, image_gray, cv::COLOR_RGB2GRAY);
    cv::equalizeHist(image_gray, image_gray);
    cv::CascadeClassifier cascade;
    // cascade.load("E:\\OpenCV\\opencv\\sources\\data\\haarcascades\\haarcascade_frontalface_alt.xml");
    cascade.load("haarcascade_frontalface_alt.xml");

    vector<Rect> faces;
    cascade.detectMultiScale(image_gray, faces, 1.1, 2, 0, Size(30, 30));

    return faces;
}

void getColorMask(vector<double>& colorMask, double sigma)
{
    // 打表
    for (int i = 0; i < 256; i++) {
        double colordiff = exp(-(i * i) / (2 * sigma * sigma));
        colorMask.push_back(colordiff);
    }
}

Mat biFilter(Mat& image, Rect region, int ksize)
{
    if (ksize % 2 == 0) { return image; }

    int colorSigma = 35;
    int spaceSigma = 10;
    vector<double> colorMask;
    getColorMask(colorMask, colorSigma);

    int nrows = image.rows;
    int ncols = image.cols;

    cv::Mat image_gray;
    cv::cvtColor(image, image_gray, cv::COLOR_RGB2GRAY);

    int m = (ksize - 1) / 2;
    Mat processed_image = image.clone();
    for (int x = region.tl().x; x <= region.br().x; x++) {
        for (int y = region.tl().y; y < region.br().y; y++) {
            int count = 1;
            int sum_r = image.at<Vec3b>(y, x)[0];
            int sum_g = image.at<Vec3b>(y, x)[1];
            int sum_b = image.at<Vec3b>(y, x)[2];
            for (int i = x - m; i <= x + m; i++) {
                if (i < 0 || i >= ncols) { continue; }
                for (int j = y - m; j <= y + m; j++) {
                    if (j < 0 || j >= nrows) { continue; }
                    if (j == y && i == x) { continue; }

                    int colorDiff = abs(image_gray.at<uchar>(y, x) - image_gray.at<uchar>(j, i));
                    double colorWeight = colorMask[colorDiff];
                    double spaceWeight = exp(-((i-x)*(i-x)+(j-y)*(j-y))/(2*spaceSigma*spaceSigma));
                    sum_r += colorWeight * spaceWeight * image.at<Vec3b>(j, i)[0];
                    sum_g += colorWeight * spaceWeight * image.at<Vec3b>(j, i)[1];
                    sum_b += colorWeight * spaceWeight * image.at<Vec3b>(j, i)[2];

                    count++;
                }
            }
            processed_image.at<Vec3b>(y, x)[0] = sum_r / count;
            processed_image.at<Vec3b>(y, x)[1] = sum_g / count;
            processed_image.at<Vec3b>(y, x)[2] = sum_b / count;
        }
    }

    /*
    for (int x = region.tl().x; x <= region.br().x; x++) {
        processed_image.at<Vec3b>(region.tl().y, x)[0] = 255;
        processed_image.at<Vec3b>(region.tl().y, x)[1] = 255;
        processed_image.at<Vec3b>(region.tl().y, x)[2] = 255;
        processed_image.at<Vec3b>(region.br().y, x)[0] = 255;
        processed_image.at<Vec3b>(region.br().y, x)[1] = 255;
        processed_image.at<Vec3b>(region.br().y, x)[2] = 255;
    }
    for (int y = region.tl().y; y <= region.br().y; y++) {
        processed_image.at<Vec3b>(y, region.tl().x)[0] = 255;
        processed_image.at<Vec3b>(y, region.tl().x)[1] = 255;
        processed_image.at<Vec3b>(y, region.tl().x)[2] = 255;
        processed_image.at<Vec3b>(y, region.br().x)[0] = 255;
        processed_image.at<Vec3b>(y, region.br().x)[1] = 255;
        processed_image.at<Vec3b>(y, region.br().x)[2] = 255;
    }
    */

    return processed_image;
}
