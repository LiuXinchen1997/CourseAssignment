#ifndef WIDGET_H
#define WIDGET_H

#include <QWidget>
#include <QLabel>
#include <QPushButton>
#include <QLabel>

class Widget : public QWidget
{
    Q_OBJECT

private slots:
    void choose_img_btn_clicked();

private:
    QLabel* textLabel;
    QPushButton* chooseImgButton;
    QLabel* imgLabel;

public:
    Widget(QWidget *parent = nullptr);
    ~Widget();
};
#endif // WIDGET_H
