#ifndef WIDGET_H
#define WIDGET_H

#include <QWidget>
#include <QLabel>
#include <QFileDialog>
#include <QPushButton>
#include <QComboBox>
#include <QCheckBox>

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
    void process_img_btn_clicked();

private:
    Ui::Widget *ui;
    QLabel* textLabel1;
    QPushButton* chooseImgButton;
    QLabel* imgLabel1;

    QLabel* textLabel2;
    QComboBox* comboBox;
    QCheckBox* checkBox;

    QLabel* textLabel3;
    QComboBox* comboBox2;

    QLabel* textLabel4;
    QPushButton* processImgButton;
    QLabel* imgLabel2;
    QString filename;
};

#endif // WIDGET_H
