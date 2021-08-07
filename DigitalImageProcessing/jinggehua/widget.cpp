#include "widget.h"
#include <iostream>
#include <QVBoxLayout>
#include <QFileDialog>

#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>

#include "algo.h"

using namespace std;

Widget::Widget(QWidget *parent) :
    QWidget(parent)
{
    QVBoxLayout* mainLayout = new QVBoxLayout;
    textLabel = new QLabel("original image: ");
    textLabel->minimumSizeHint();
    chooseImgButton = new QPushButton("Please choose image");
    chooseImgButton->minimumSizeHint();
    QHBoxLayout* controlLayout = new QHBoxLayout;
    controlLayout->addWidget(textLabel);
    controlLayout->addWidget(chooseImgButton);
    mainLayout->addLayout(controlLayout);

    imgLabel = new QLabel("You haven't upload any image!");
    mainLayout->addWidget(imgLabel);

    setLayout(mainLayout);
    connect(chooseImgButton, SIGNAL(clicked()), this, SLOT(choose_img_btn_clicked()));
}

void Widget::choose_img_btn_clicked()
{
    QString qfilename = "";
    qfilename = QFileDialog::getOpenFileName();
    // QString qfilename = QString("D:\\1.jpg");

    if (qfilename == "") { return; }

    QImage img(qfilename);
    imgLabel->setPixmap(QPixmap::fromImage(img));

    string filename = qfilename.toStdString();
    cv::Mat image = cv::imread(filename, 1);
    //cv::namedWindow("my image");
    // cv::imshow("my image", image);

    cv::namedWindow("filtered image");
    //cv::Mat image2 = masaike_process(image);
    //cv::imshow("masaike", image2);

    cv::Mat image3 = jingehua_process(image, 7);
    cv::imshow("crystallized image", image3);
}

Widget::~Widget()
{
    delete ui;
}
