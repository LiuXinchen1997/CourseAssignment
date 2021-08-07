#ifndef WIDGET_H
#define WIDGET_H

#include <QWidget>
#include <QLabel>
#include <QPushButton>

namespace Ui {
class Widget;
}

class Widget : public QWidget
{
    Q_OBJECT

public:
    explicit Widget(QWidget *parent = nullptr);
    ~Widget();

private slots:
    void choose_img_btn_clicked();

private:
    Ui::Widget *ui;
    QLabel* textLabel;
    QPushButton* chooseImgButton;
    QLabel* imgLabel;
};

#endif // WIDGET_H
