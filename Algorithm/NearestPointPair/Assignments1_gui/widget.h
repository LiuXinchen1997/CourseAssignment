#ifndef WIDGET_H
#define WIDGET_H

#include "nearestpoints.h"
#include <QWidget>
#include <QLabel>
#include <QPushButton>
#include <QComboBox>

class Widget : public QWidget
{
    Q_OBJECT

public:
    Widget(QWidget *parent = 0);
    ~Widget();

protected:
    void paintEvent(QPaintEvent* );
    void mousePressEvent(QMouseEvent* e);

private slots:
    void clearClicked();
    void calcClicked();
    void generateClicked();

private:
    vector<RawPoint> ps;
    vector<int> res;
    QPushButton* clearButton;
    QPushButton* calcButton;
    QPushButton* generateButton;
    QComboBox* datasizes;
    QLabel* label;
    QComboBox* choices;
    QLabel* label2;
    int display_x;
    int display_y;
    int display_w;
    int display_h;
};

#endif // WIDGET_H
