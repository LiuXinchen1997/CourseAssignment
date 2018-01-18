#include "widget.h"
#include "Stack.h"
#include "calculate.h"
#include <QPushButton>
#include <QByteArray>
#include <QDebug>
#include <QString>


Calculator::Calculator(QWidget *parent) :
    QWidget(parent)
{
    setupUi(this);
    //优化界面


    //设置数字按钮的信号与槽
    connect( ZeroButton, SIGNAL(clicked(bool)), this, SLOT(digitClicked()) );
    connect( OneButton, SIGNAL(clicked(bool)), this, SLOT(digitClicked()) );
    connect( TwoButton, SIGNAL(clicked(bool)), this, SLOT(digitClicked()) );
    connect( ThreeButton, SIGNAL(clicked(bool)), this, SLOT(digitClicked()) );
    connect( FourButton, SIGNAL(clicked(bool)), this, SLOT(digitClicked()) );
    connect( FiveButton, SIGNAL(clicked(bool)), this, SLOT(digitClicked()) );
    connect( SixButton, SIGNAL(clicked(bool)), this, SLOT(digitClicked()) );
    connect( SevenButton, SIGNAL(clicked(bool)), this, SLOT(digitClicked()) );
    connect( EightButton, SIGNAL(clicked(bool)), this, SLOT(digitClicked()) );
    connect( NineButton, SIGNAL(clicked(bool)), this, SLOT(digitClicked()) );

    //设置操作运算符号的信号与槽
    connect( AddButton, SIGNAL(clicked(bool)), this, SLOT(operateClicked()) );
    connect( MinusButton, SIGNAL(clicked(bool)), this, SLOT(operateClicked()) );
    connect( MultiplyButton, SIGNAL(clicked(bool)), this, SLOT(operateClicked()) );
    connect( DivisionButton, SIGNAL(clicked(bool)), this, SLOT(operateClicked()) );
    connect( AndButton, SIGNAL(clicked(bool)), this, SLOT(operateClicked()) );
    connect( OrButton, SIGNAL(clicked(bool)), this, SLOT(operateClicked()) );
    connect( NotButton, SIGNAL(clicked(bool)), this, SLOT(operateClicked()) );
    connect( LeftBracketButton, SIGNAL(clicked(bool)), this, SLOT(operateClicked()) );
    connect( RightBracketButton, SIGNAL(clicked(bool)), this, SLOT(operateClicked()) );

    //设置清除建和回删键的信号与槽
    connect( ClearButton, SIGNAL(clicked(bool)), this, SLOT(clearDisplay()) );
    connect( BackspaceButton, SIGNAL(clicked(bool)), this, SLOT(backspace()) );

    //设置等号的信号与槽，计算结果
    connect( EqualButton, SIGNAL(clicked(bool)), this, SLOT(calculate()) );
    Display -> setText("Welcome to CalculatorDemo!");

    setWindowTitle("Calculator!");
}

Calculator::~Calculator()
{
}

void Calculator::digitClicked()
{
    QPushButton *clickedButton = qobject_cast<QPushButton *>(sender());
    int digitValue = clickedButton->text().toInt();
    if (Display->text() == "0" && digitValue == 0.0)
        return;
    if (Display->text() == "" && digitValue == 0.0)
        return;

    Display->setText(Display->text() + QString::number(digitValue));
}

void Calculator::operateClicked()
{
    QPushButton *clickedButton = qobject_cast<QPushButton *>(sender());
    QByteArray bytes = clickedButton->text().toLocal8Bit();
    char* operateValue = bytes.data();

    if (operateValue[0] == '&')
        Display->setText(Display->text() + '&');
    else
        Display->setText(Display->text() + operateValue);
}

void Calculator::clearDisplay()
{
    Display -> clear();
    ValueLabel -> setText(" =         ");
}

void Calculator::backspace()
{
    QString text = Display -> text();
    if(text.isEmpty()) return;

    text.chop(1);

    if(text.isEmpty())
        text = "0";

    Display -> setText(text);
    ValueLabel -> setText(" =         ");
}

void Calculator::showError(QString errInfo)
{
    Display -> setText(errInfo);
    ValueLabel -> setText(" =         ");
}

void Calculator::calculate()
{
    QString content = Display -> text();
    string express( content.toStdString() );
    express.insert(0,1,'#');
    express += '#';


    Stack<float> s1;
    Stack<char> s2;

    Rank i;
    for(i = 0; i < express.length(); i++){
        if ( ' ' == express[i] ) continue;
        if( isNum(express[i]) )
            pushNum(i, express, s1);

        else if( isOp(express[i]) ){
            if ( ( '-' == express[i] ) && ( (express[i-1] == '#') || (express[i-1] == '(') ) )
                s1.push(0);
            if ( !pushOperator(s1, s2, this, i, express) ) return;
        }
        else {
            showError("Error : Invalid char!");
            return;
        }
    }

    if( !showValue(s1,this) ) return;
}
