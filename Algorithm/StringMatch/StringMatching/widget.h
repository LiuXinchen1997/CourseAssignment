#ifndef WIDGET_H
#define WIDGET_H

#include <QWidget>
#include <string>
#include <QLabel>
#include <QLineEdit>
#include <QPushButton>
#include <QComboBox>

using namespace std;

class Widget : public QWidget
{
    Q_OBJECT

public:
    Widget(QWidget *parent = nullptr);
    ~Widget();

private:
    string P;
    string T;
    QLabel* text_label1;
    QLineEdit* text_edit1;
    QLabel* text_label2;
    QLineEdit* text_edit2;
    bool text_edit2_enable;
    QLabel* text_label3;
    QPushButton* choose_file_btn;
    QLabel* text_label4;
    QComboBox* choose_algo_combobox;
    QPushButton* match_btn;

private slots:
    void match_btn_clicked();
    void text_edit1_changed(const QString& str);
    void text_edit2_changed(const QString& str);
    void choose_file_btn_clicked();
};
#endif // WIDGET_H
