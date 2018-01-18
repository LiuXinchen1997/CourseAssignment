#include <QtGui>
#include "analogclock.h"

AnalogClock::AnalogClock(QWidget *parent)
    : QWidget(parent)
{
    QTimer* timer = new QTimer(this);
    connect( timer, SIGNAL(timeout()), this, SLOT(update()) );
    timer->start(1000);
    setWindowTitle("Analog Clock");
    resize(200, 200);
}

AnalogClock::~AnalogClock()
{

}

void AnalogClock::paintEvent(QPaintEvent *event)
{
    //时针、分针、秒针的点坐标
    static const QPoint hourHand[3] = {
        QPoint(7,8),
        QPoint(-7,8),
        QPoint(0,-30)
    };

    static const QPoint minuteHand[3] = {
        QPoint(7,8),
        QPoint(-7,8),
        QPoint(0,-60)
    };

    static const QPoint secondHand[3] = {
        QPoint(4,8),
        QPoint(-4,8),
        QPoint(0,-100)
    };

    //设置时针、分针、秒针的颜色
    QColor hourColor(127, 0, 127);
    QColor minuteColor(0, 127, 127, 191);
    QColor secondColor(0, 100, 100);

    int side = qMin( width(), height() );

    QTime time = QTime::currentTime();


    QPainter painter(this);
    painter.setRenderHint(QPainter::Antialiasing, true);

    painter.translate( width()/2, height()/2 );

    //对时针进行处理
    //缩小该坐标系坐标
    painter.scale( side/200.0, side/200.0 );

    //NoPen表示无线
    painter.setPen(Qt::NoPen);

    painter.setBrush(hourColor);

    painter.save();

    painter.rotate( 30.0 * ( time.hour() + time.minute()/60.0 ) );

    painter.drawConvexPolygon(hourHand, 3);

    painter.restore();

    painter.setPen(hourColor);

    //绘制大刻度
    painter.save();

    painter.rotate(-60);
    for( int i = 0; i < 12; ++i ) {
        painter.drawLine(88, 0, 96, 0);

        painter.save();
        painter.setFont( QFont("微软雅黑", 7.5, QFont::Bold) );
        QString s = QString("%1").arg(i+1);
        painter.drawText( QPoint(75, 3), s );
        painter.restore();

        painter.rotate(30.0);
    }

    painter.restore();


    //对分针进行处理
    painter.setPen(Qt::NoPen);
    painter.setBrush(minuteColor);
    painter.save();
    painter.rotate( 6.0 * ( time.minute() + time.second()/60.0 ) );
    painter.drawConvexPolygon(minuteHand, 3);
    painter.restore();
    painter.setPen(minuteColor);

    //绘制小刻度
    for( int j = 0; j < 60; j++ ) {
        if( (j % 5) != 0 )
            painter.drawLine(92,0,96,0);
        painter.rotate(6.0);
    }


    //对秒针进行处理
    painter.setPen(Qt::NoPen);
    painter.setBrush(secondColor);
    painter.save();
    painter.rotate( 6.0 * time.second() );
    painter.drawConvexPolygon(secondHand, 3);
    painter.restore();
    painter.setPen(minuteColor);

    //输出电子表形式
    painter.setFont( QFont("微软雅黑", 15, QFont::Bold) );
    QString txtTime = time.toString("hh:mm:ss");
    painter.drawText( QPoint(-41,53), txtTime );
}
