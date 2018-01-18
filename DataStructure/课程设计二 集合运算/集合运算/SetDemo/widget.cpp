#include "widget.h"
#include "ui_widget.h"
#include <string>
#include <QDebug>

Widget::Widget(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::Widget)
{
    ui->setupUi(this);

    ui->ContentShowLabel->setText("");
    ui->SetAContentLabel->setText("");
    ui->SetBContentLabel->setText("");
    ui->SetCContentLabel->setText("");

    connect( ui->IN_SETForAButton, SIGNAL(clicked(bool)), this, SLOT(IN_SETForA()) );
    connect( ui->IN_SETForBButton, SIGNAL(clicked(bool)), this, SLOT(IN_SETForB()) );
    connect( ui->IN_SETForCButton, SIGNAL(clicked(bool)), this, SLOT(IN_SETForC()) );

    connect( ui->INSERTForAButton, SIGNAL(clicked(bool)), this, SLOT(INSERTForA()) );
    connect( ui->INSERTForBButton, SIGNAL(clicked(bool)), this, SLOT(INSERTForB()) );

    connect( ui->SHOWForAButton, SIGNAL(clicked(bool)), this, SLOT(SHOWA()) );
    connect( ui->SHOWForBButton, SIGNAL(clicked(bool)), this, SLOT(SHOWB()) );
    connect( ui->SHOWForCButton, SIGNAL(clicked(bool)), this, SLOT(SHOWC()) );

    connect( ui->CLEARForAButton, SIGNAL(clicked(bool)), this, SLOT(CLEARA()) );
    connect( ui->CLEARForBButton, SIGNAL(clicked(bool)), this, SLOT(CLEARB()) );
    connect( ui->CLEARForCButton, SIGNAL(clicked(bool)), this, SLOT(CLEARC()) );

    connect( ui->ANDButton, SIGNAL(clicked(bool)), this, SLOT(ANDCal()) );
    connect( ui->ORButton, SIGNAL(clicked(bool)), this, SLOT(ORCal()) );
    connect( ui->XORButton, SIGNAL(clicked(bool)), this, SLOT(XORCal()) );

    connect( ui->QuitButton, SIGNAL(clicked(bool)), this, SLOT(close()) );

    setWindowTitle("Set Demo!");
}

Widget::~Widget()
{
    delete ui;
}

void Widget::IN_SETForA()
{
    if( ui->IN_SETForA->text() == "" ) return;

    QString str = ui->IN_SETForA->text();
    int num = str.toInt();
    if ( A.IN_SET(num) ) ui->ContentShowLabel->setText("Yes");
    else ui->ContentShowLabel->setText("No");
}

void Widget::IN_SETForB()
{
    if( ui->IN_SETForB->text() == "" ) return;

    QString str = ui->IN_SETForB->text();
    int num = str.toInt();
    if ( B.IN_SET(num) ) ui->ContentShowLabel->setText("Yes");
    else ui->ContentShowLabel->setText("No");
}

void Widget::IN_SETForC()
{
    if( ui->IN_SETForC->text() == "" ) return;

    QString str = ui->IN_SETForC->text();
    int num = str.toInt();
    if ( C.IN_SET(num) ) ui->ContentShowLabel->setText("Yes");
    else ui->ContentShowLabel->setText("No");
}

void Widget::INSERTForA()
{
    if( ui->INSERTForA->text() == "" ) return;

    QString str = ui->INSERTForA->text();
    int num = str.toInt();
    QString cont = ui->SetAContentLabel->text();
    cont += " "; cont += str; ui->SetAContentLabel->setText(cont);
    A.INSERT_SET(num);
    ui->ContentShowLabel->setText("Insert Finished!");

    ui->INSERTForA->setText("");
}

void Widget::INSERTForB()
{
    if( ui->INSERTForB->text() == "" ) return;

    QString str = ui->INSERTForB->text();
    int num = str.toInt();
    QString cont = ui->SetBContentLabel->text();
    cont += " "; cont += str; ui->SetBContentLabel->setText(cont);
    B.INSERT_SET(num);
    ui->ContentShowLabel->setText("Insert Finished!");

    ui->INSERTForB->setText("");
}

void Widget::SHOWA()
{
    stack<int> s;
    ListNode<int>* p = A.first();
    if( p == NULL ) { ui->ContentShowLabel->setText("Nothing in A!"); return; }
    while( p && ( p != A.getTrailer() ) ) {
        s.push( p->data );
        p = p->succ;
    }

    QString str; str += "Set A:";
    while( !s.empty() ) {
        str += " "; str += QString("%1").arg(s.top());
        s.pop();
    }
    ui->ContentShowLabel->setText(str);
}

void Widget::SHOWB()
{
    stack<int> s;
    ListNode<int>* p = B.first();
    if( p == NULL ) { ui->ContentShowLabel->setText("Nothing in B!"); return; }
    while( p && ( p != B.getTrailer() ) ) {
        s.push( p->data );
        p = p->succ;
    }

    QString str;  str += "Set B:";
    while( !s.empty() ) {
        str += " "; str += QString("%1").arg(s.top());
        s.pop();
    }
    ui->ContentShowLabel->setText(str);
}

void Widget::SHOWC()
{
    stack<int> s;
    ListNode<int>* p = C.first();
    if( p == NULL ) { ui->ContentShowLabel->setText("Nothing in C!"); return; }
    while( p && ( p != C.getTrailer() ) ) {
        s.push( p->data );
        p = p->succ;
    }

    QString str; str += "Set C:";
    while( !s.empty() ) {
        str += " "; str += QString("%1").arg(s.top());
        s.pop();
    }
    ui->ContentShowLabel->setText(str);
}

void Widget::CLEARA()
{
    A.clear();
    ui->ContentShowLabel->setText("");
    ui->SetAContentLabel->setText("");
    ui->IN_SETForA->setText("");
    ui->INSERTForA->setText("");
    ui->ContentShowLabel->setText("Clear A Finished!");
}

void Widget::CLEARB()
{
    B.clear();
    ui->ContentShowLabel->setText("");
    ui->SetBContentLabel->setText("");
    ui->IN_SETForB->setText("");
    ui->INSERTForB->setText("");
    ui->ContentShowLabel->setText("Clear B Finished!");
}

void Widget::CLEARC()
{
    C.clear();
    ui->ContentShowLabel->setText("");
    ui->SetCContentLabel->setText("");
    ui->IN_SETForC->setText("");
    ui->ContentShowLabel->setText("Clear C Finished!");
}

void Widget::ANDCal()
{
    AND(A, B, C);
    QString str;

    ListNode<int>* p = C.first();
    if( NULL == p ) return;
    while( p != C.getTrailer() ) {
        str += QString("%1").arg(p->data); str += " ";
        p = p->succ;
    }
    ui->SetCContentLabel->setText(str);

    ui->ContentShowLabel->setText("AND Finished!");
}

void Widget::ORCal()
{
    OR(A, B, C);
    QString str;

    ListNode<int>* p = C.first();
    if( NULL == p ) return;
    while( p != C.getTrailer() ) {
        str += QString("%1").arg(p->data); str += " ";
        p = p->succ;
    }
    ui->SetCContentLabel->setText(str);

    ui->ContentShowLabel->setText("OR Finished!");
}

void Widget::XORCal()
{
    XOR(A, B, C);
    QString str;

    ListNode<int>* p = C.first();
    if( NULL == p ) return;
    while( p != C.getTrailer() ) {
        str += QString("%1").arg(p->data); str += " ";
        p = p->succ;
    }
    ui->SetCContentLabel->setText(str);

    ui->ContentShowLabel->setText("XOR Finished!");
}
