#ifndef WIDGET_H
#define WIDGET_H

#include <QWidget>
#include <ui_widget.h>

class Calculator : public QWidget, public Ui::Widget
{
    Q_OBJECT

public:
    explicit Calculator(QWidget *parent = 0);
    ~Calculator();

    void showError(QString str);

private slots:
    void digitClicked();

    void operateClicked();

    void clearDisplay();
    void backspace();

    void calculate();

private:
};

#endif // WIDGET_H
