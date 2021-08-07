#include "widget.h"
#include "ui_widget.h"
#include <iostream>
#include <QVBoxLayout>
#include <QHBoxLayout>
#include <QImage>
#include <QMessageBox>
#include <vector>
#include "seamcarving.h"

Widget::Widget(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::Widget)
{
    setWindowTitle("Seam Carving!");
    filename = "";

    QVBoxLayout* mainLayout = new QVBoxLayout;

    textLabel1 = new QLabel("原始图像：");
    textLabel1->minimumSizeHint();
    chooseImgButton = new QPushButton("选择图像文件");
    chooseImgButton->minimumSizeHint();
    QHBoxLayout* controlLayout1 = new QHBoxLayout;
    controlLayout1->addWidget(textLabel1);
    controlLayout1->addWidget(chooseImgButton);
    mainLayout->addLayout(controlLayout1);

    imgLabel1 = new QLabel("暂未上传原始图像！");
    mainLayout->addWidget(imgLabel1);

    textLabel2 = new QLabel("选择宽度切割比例：");
    textLabel2->minimumSizeHint();
    comboBox = new QComboBox();
    comboBox->minimumSizeHint();
    comboBox->addItem("0");
    comboBox->addItem("10");
    comboBox->addItem("20");
    comboBox->addItem("40");
    comboBox->addItem("60");
    comboBox->addItem("80");
    comboBox->addItem("0.0");
    comboBox->addItem("0.1");
    comboBox->addItem("0.2");
    comboBox->addItem("0.3");
    comboBox->addItem("0.4");
    comboBox->addItem("0.5");
    QHBoxLayout* controlLayout2 = new QHBoxLayout;
    controlLayout2->addWidget(textLabel2);
    controlLayout2->addWidget(comboBox);
    mainLayout->addLayout(controlLayout2);

    textLabel3 = new QLabel("选择高度切割比例：");
    textLabel3->minimumSizeHint();
    comboBox2 = new QComboBox();
    comboBox2->minimumSizeHint();
    comboBox2->addItem("0");
    comboBox2->addItem("10");
    comboBox2->addItem("20");
    comboBox2->addItem("40");
    comboBox2->addItem("60");
    comboBox2->addItem("80");
    comboBox2->addItem("0.0");
    comboBox2->addItem("0.1");
    comboBox2->addItem("0.2");
    comboBox2->addItem("0.3");
    comboBox2->addItem("0.4");
    comboBox2->addItem("0.5");
    QHBoxLayout* controlLayout3 = new QHBoxLayout;
    controlLayout3->addWidget(textLabel3);
    controlLayout3->addWidget(comboBox2);
    mainLayout->addLayout(controlLayout3);

    textLabel4 = new QLabel("生成图像：");
    textLabel4->minimumSizeHint();
    checkBox = new QCheckBox("是否显示切割路径");
    processImgButton = new QPushButton("裂缝切割图像");
    processImgButton->minimumSizeHint();
    QHBoxLayout* controlLayout4 = new QHBoxLayout;
    controlLayout4->addWidget(textLabel4);
    controlLayout4->addWidget(checkBox);
    controlLayout4->addWidget(processImgButton);
    mainLayout->addLayout(controlLayout4);

    imgLabel2 = new QLabel("暂未获得生成图像！");
    imgLabel2->minimumSizeHint();
    mainLayout->addWidget(imgLabel2);

    setLayout(mainLayout);

    connect(chooseImgButton, SIGNAL(clicked()), this, SLOT(choose_img_btn_clicked()));
    connect(processImgButton, SIGNAL(clicked()), this, SLOT(process_img_btn_clicked()));
}

Widget::~Widget()
{
    delete ui;
}

void Widget::choose_img_btn_clicked()
{
    this->filename = QFileDialog::getOpenFileName();
    QImage img(filename);
    imgLabel1->setPixmap(QPixmap::fromImage(img));
}

void Widget::process_img_btn_clicked()
{
    if (this->filename == "") {
        QMessageBox::information(this, tr("错误"), tr("还没有上传图像！"));
        return;
    }

    QImage cur_img(filename);

    int col_times = 0;
    if (comboBox->currentIndex() <= 5) {
        col_times = comboBox->currentText().toInt();
    } else {
        col_times = int(cur_img.width() * comboBox->currentText().toDouble());
    }
    std::vector<std::vector<int>> history_inds;
    for (int i = 0; i < col_times; i++) {
        std::vector<int> inds = get_carving_inds(cur_img, 1);
        history_inds.push_back(inds);

        QImage new_img(cur_img.width()-1, cur_img.height(), QImage::Format_ARGB32);
        for (int y = 0; y < cur_img.height(); y++) {
            for (int x = 0; x < inds[size_t(y)]; x++) {
                new_img.setPixel(x, y, qRgb(QColor(cur_img.pixel(x, y)).red(), QColor(cur_img.pixel(x, y)).green(), QColor(cur_img.pixel(x, y)).blue() ));
            }
            for (int x = inds[size_t(y)] + 1; x < cur_img.width(); x++) {
                new_img.setPixel(x-1, y, qRgb(QColor(cur_img.pixel(x, y)).red(), QColor(cur_img.pixel(x, y)).green(), QColor(cur_img.pixel(x, y)).blue() ));
            }
        }

        inds.clear();
        cur_img = new_img;
    }

    int row_times = 0;
    if (comboBox2->currentIndex() <= 5) {
        row_times = comboBox2->currentText().toInt();
    } else {
        row_times = int(cur_img.height() * comboBox2->currentText().toDouble());
    }
    std::vector<std::vector<int>> history_inds2;
    for (int i = 0; i < row_times; i++) {
        std::vector<int> inds = get_carving_inds(cur_img, 2);
        history_inds2.push_back(inds);

        QImage new_img(cur_img.width(), cur_img.height()-1, QImage::Format_ARGB32);
        for (int x = 0; x < cur_img.width(); x++) {
            for (int y = 0; y < inds[size_t(x)]; y++) {
                new_img.setPixel(x, y, qRgb(QColor(cur_img.pixel(x, y)).red(), QColor(cur_img.pixel(x, y)).green(), QColor(cur_img.pixel(x, y)).blue() ));
            }
            for (int y = inds[size_t(x)] + 1; y < cur_img.height(); y++) {
                new_img.setPixel(x, y-1, qRgb(QColor(cur_img.pixel(x, y)).red(), QColor(cur_img.pixel(x, y)).green(), QColor(cur_img.pixel(x, y)).blue() ));
            }
        }

        inds.clear();
        cur_img = new_img;
    }

    if (checkBox->isChecked()) {
        for (int i = history_inds2.size() - 1; i >= 0; i--) {
            QImage new_img(cur_img.width(), cur_img.height()+1, QImage::Format_ARGB32);
            for (int x = 0; x < cur_img.width(); x++) {
                for (int y = 0; y < history_inds2[i][size_t(x)]; y++) {
                    new_img.setPixel(x, y, qRgb(QColor(cur_img.pixel(x, y)).red(), QColor(cur_img.pixel(x, y)).green(), QColor(cur_img.pixel(x, y)).blue() ));
                }
                new_img.setPixel(x, history_inds2[i][size_t(x)], qRgb(0, 0, 255));
                for (int y = history_inds2[i][size_t(x)] + 1; y < new_img.height(); y++) {
                    new_img.setPixel(x, y, qRgb(QColor(cur_img.pixel(x, y-1)).red(), QColor(cur_img.pixel(x, y-1)).green(), QColor(cur_img.pixel(x, y-1)).blue() ));
                }
            }
            cur_img = new_img;
        }

        for (int i = history_inds.size() - 1; i >= 0; i--) {
            QImage new_img(cur_img.width()+1, cur_img.height(), QImage::Format_ARGB32);
            for (int y = 0; y < cur_img.height(); y++) {
                for (int x = 0; x < history_inds[i][size_t(y)]; x++) {
                    new_img.setPixel(x, y, qRgb(QColor(cur_img.pixel(x, y)).red(), QColor(cur_img.pixel(x, y)).green(), QColor(cur_img.pixel(x, y)).blue() ));
                }
                new_img.setPixel(history_inds[i][size_t(y)], y, qRgb(255, 0, 0));
                for (int x = history_inds[i][size_t(y)] + 1; x < new_img.width(); x++) {
                    new_img.setPixel(x, y, qRgb(QColor(cur_img.pixel(x-1, y)).red(), QColor(cur_img.pixel(x-1, y)).green(), QColor(cur_img.pixel(x-1, y)).blue() ));
                }
            }
            cur_img = new_img;
        }
    }

    imgLabel2->setPixmap((QPixmap::fromImage(cur_img)));
    return;
}
