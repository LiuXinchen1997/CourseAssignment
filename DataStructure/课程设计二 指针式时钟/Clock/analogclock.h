#ifndef ANALOGCLOCK_H
#define ANALOGCLOCK_H

#include <QWidget>

class AnalogClock : public QWidget
{
    Q_OBJECT

public:
    AnalogClock(QWidget *parent = 0);
    ~AnalogClock();

signals:

public slots:

protected:
    void paintEvent(QPaintEvent *event);
};

#endif // ANALOGCLOCK_H
