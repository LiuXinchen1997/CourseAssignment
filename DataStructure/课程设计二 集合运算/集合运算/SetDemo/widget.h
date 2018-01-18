#ifndef WIDGET_H
#define WIDGET_H

#include <QWidget>
#include <List.h>

namespace Ui {
class Widget;
}

class Widget : public QWidget
{
    Q_OBJECT

public:
    explicit Widget(QWidget *parent = 0);
    ~Widget();

private:
    Ui::Widget *ui;
    List<int> A, B, C;

private slots:
    void IN_SETForA();
    void IN_SETForB();
    void IN_SETForC();

    void INSERTForA();
    void INSERTForB();

    void SHOWA();
    void SHOWB();
    void SHOWC();

    void CLEARA();
    void CLEARB();
    void CLEARC();

    void ANDCal();
    void ORCal();
    void XORCal();
};

#endif // WIDGET_H
