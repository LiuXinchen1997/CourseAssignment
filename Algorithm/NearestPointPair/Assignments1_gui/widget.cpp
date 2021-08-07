#include <iostream>
#include <cstdio>
#include "widget.h"
#include "constant.h"
#include <QHBoxLayout>
#include <QVBoxLayout>
#include <QPainter>
#include <QMouseEvent>
#include <random>

Widget::Widget(QWidget *parent)
    : QWidget(parent)
{
    resize(500, 400);
    setWindowFlags(windowFlags()&~Qt::WindowMaximizeButtonHint);
    setFixedSize(this->width(), this->height());
    setWindowTitle(tr("最近点对算法"));

    clearButton = new QPushButton(tr("清空"));
    calcButton = new QPushButton(tr("计算"));
    generateButton = new QPushButton(tr("随机生成"));
    datasizes = new QComboBox;
    datasizes->addItem("10");
    datasizes->addItem("20");
    datasizes->addItem("30");
    datasizes->addItem("40");
    datasizes->addItem("50");
    label = new QLabel(tr("您选择的算法："));
    label->minimumSizeHint();
    choices = new QComboBox;
    choices->addItem("暴力法");
    choices->addItem("分治法");

    connect(clearButton, SIGNAL(clicked()), this, SLOT(clearClicked()));
    connect(calcButton, SIGNAL(clicked()), this, SLOT(calcClicked()));
    connect(generateButton, SIGNAL(clicked()), this, SLOT(generateClicked()));

    QHBoxLayout* topLayout = new QHBoxLayout;
    topLayout->addWidget(clearButton);
    topLayout->addWidget(calcButton);
    topLayout->addWidget(generateButton);
    topLayout->addWidget(datasizes);
    topLayout->addWidget(label);
    topLayout->addWidget(choices);
    QVBoxLayout* mainLayout = new QVBoxLayout;
    label2 = new QLabel(tr(INIT_MSG));
    mainLayout->addLayout(topLayout);
    mainLayout->addWidget(label2);
    mainLayout->addStretch();

    display_x = 10;
    display_y = 60;
    display_w = this->width() - display_x * 2;
    display_h = this->height() - (display_y + display_x);

    setLayout(mainLayout);
}

Widget::~Widget()
{
    delete label;
}

void Widget::clearClicked()
{
    ps.clear();
    res.clear();
    update();
    label2->setText(INIT_MSG);
}

void Widget::calcClicked()
{
    if (!res.empty()) { return; }
    if (ps.size() < 2) {
        label2->setText(ERR_MSG2);
        return;
    }
    if (choices->currentIndex() == 0) {
        res = solve1(ps);
    } else if (choices->currentIndex() == 1) {
        res = solve2(ps);
    }
    update();
    char str[150];
    sprintf(str, "最近点对：(%d, %d), (%d, %d). 最近距离：%lf",
            int(ps[res[0]].x), int(ps[res[0]].y), int(ps[res[1]].x), int(ps[res[1]].y),
            sqrt(calc_dist(ps[res[0]], ps[res[1]])));
    label2->setText(str);
}

void Widget::generateClicked()
{
    if (!res.empty()) { return; }

    std::default_random_engine e(time(0));
    std::uniform_int_distribution<int> u1(display_x, display_x + display_w);
    std::uniform_int_distribution<int> u2(display_y, display_y + display_h);
    int datasize = (this->datasizes->currentIndex() + 1) * 10;
    for (int i = 0; i < datasize; i++) {
        ps.push_back(RawPoint(double(u1(e)), double(u2(e)), int(ps.size())));
    }

    update();
}

void Widget::paintEvent(QPaintEvent* )
{
    QPainter painter(this);
    QPen pen;
    pen.setWidth(1);
    pen.setColor(Qt::black);
    painter.setPen(pen);
    painter.drawRect(display_x, display_y, display_w, display_h);
    pen.setWidth(5);
    painter.setPen(pen);
    for (unsigned int i = 0; i < ps.size(); i++) {
        painter.drawPoint(int(ps[i].x), int(ps[i].y));
    }
    if (!res.empty()) {
        pen.setWidth(10);
        pen.setColor(Qt::red);
        painter.setPen(pen);
        painter.drawPoint(int(ps[res[0]].x), int(ps[res[0]].y));
        painter.drawPoint(int(ps[res[1]].x), int(ps[res[1]].y));
        pen.setWidth(5);
        pen.setColor(Qt::black);
        painter.setPen(pen);
    }
}

void Widget::mousePressEvent(QMouseEvent* e)
{
    QPoint cur_pos = e->pos();
    if (cur_pos.x() > display_x + display_w || cur_pos.x() < display_x ||
            cur_pos.y() > display_y + display_h || cur_pos.y() < display_y) {
        // label2->setText(ERR_MSG);
        return;
    }
    ps.push_back(RawPoint(double(cur_pos.x()), double(cur_pos.y()), int(ps.size())));
    update();
}
