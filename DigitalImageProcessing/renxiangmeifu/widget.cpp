#include "widget.h"

#include "algo.h"

#include <QVBoxLayout>
#include <QHBoxLayout>
#include <QFileDialog>

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
    QString qfilename = QFileDialog::getOpenFileName();
    // QString qfilename = QString("D:\\3.png");
    QImage img(qfilename);
    imgLabel->setPixmap(QPixmap::fromImage(img));

    cv::Mat image = cv::imread(qfilename.toStdString());
    vector<Rect> faces = getFaces(image);
    Rect face = faces[0];
    face.tl(); // 左上角
    face.br(); // 右下角
    Mat processed_image = biFilter(image, face, 3);

    cv::imshow("renxiangmeifu", processed_image);
}

Widget::~Widget()
{
}
