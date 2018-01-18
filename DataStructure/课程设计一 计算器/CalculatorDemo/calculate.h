#ifndef CALCULATE_H
#define CALCULATE_H

#include "widget.h"
#include "Stack.h"
#include <string>
using namespace std;

typedef int Rank;

//仍然存在问题：尝试 将该文件的声明和实现分离，出现错误。

const int opNum = 10;
char operate[] = {'+', '-', '*', '/', '(', ')', '#', '&', '|', '!'};
char priority[opNum][opNum] = {
//op_on_the_top_of_stack     +    -    *    /    (    )    #    &    |    !  (current_op)
                  /* + */ { '>', '>', '<', '<', '<', '>', '>', '>', '>', '<' },
                  /* - */ { '>', '>', '<', '<', '<', '>', '>', '>', '>', '<' },
                  /* * */ { '>', '>', '>', '>', '<', '>', '>', '>', '>', '<' },
                  /* / */ { '>', '>', '>', '>', '<', '>', '>', '>', '>', '<' },
                  /* ( */ { '<', '<', '<', '<', '<', '=', ' ', '<', '<', '<' },
                  /* ) */ { '>', '>', '>', '>', ' ', '>', '>', '>', '>', '>' },
                  /* # */ { '<', '<', '<', '<', '<', ' ', '=', '<', '<', '<' },
                  /* & */ { '<', '<', '<', '<', '<', '>', '>', '>', '>', '<' },
                  /* | */ { '<', '<', '<', '<', '<', '>', '>', '<', '<', '<' },
                  /* ! */ { '>', '>', '>', '>', '<', '>', '>', '>', '>', '>' }
};

float Operate(float a, char op, float b)
{
    switch(op){
        case '+' : return a+b;
        case '-' : return a-b;
        case '*' : return a*b;
        case '/' : return a/b;
        case '&' : return a&&b;
        case '|' : return a||b;
        default : return 0;
    }
}

bool isNum(char a)  { return (a >= '0' && a <= '9'); }

bool isOp(char a)
{
    for(int i = 0; i < opNum; i++)
        if( a == operate[i] )
            return true;
    return false;
}

void pushNum(int &i, string &express, Stack<float> &s)
{
    float x = express[i] - '0';
    for(i = i + 1; isNum(express[i]); i++)
        x = x * 10 + ( express[i] - '0' );
    i--;
    s.push(x);
}



char testPri(char a, char b)  // a is on the top of stack, b is current operator.
{
    Rank i, j, k;
    for(i = 0; i < opNum; i++){
        if( a == operate[i] )
            j = i;
        if( b == operate[i] )
            k = i;
    }
    return priority[j][k];
}

bool handleSinglePri( Stack<float> &s ) {
    float n;
    if( s.empty() ) {
        return false;
    }
    s.get_top(n); s.pop();
    float nn = !n;
    s.push(nn);
    return true;
}

bool showValue( Stack<float> &s, Calculator *calc )  //布尔值作为标记，返回为false则说明遇到了error，
{                                                    //程序非正常结束。
    if( s.empty() ) {
        calc -> showError("Nothing!");
        return false;
    }
    float value;
    s.get_top(value);
    s.pop();
    if( !s.empty() ) {
        calc -> showError("Error : Syntax error!");
        return false;
    }
    else
        //Display -> setText( QString("The value is %1").arg(value) );
        calc -> ValueLabel -> setText( QString(" =  %1     ").arg(value) );
    return true;
}



bool popStack( Stack<float> &s1, Stack<char> &s2, Calculator *calc, int &i, string &express )
{  //布尔值作为标记，返回为false则说明遇到了error,程序非正常结束。
    char op1;
    s2.get_top(op1);
    while( testPri( op1 ,express[i] ) == '>' ){
        if( '!' == op1 ) {
            if( !handleSinglePri(s1) ) return false;
            s2.pop(); s2.get_top(op1);
            continue;
        }

        s2.pop();

        float a, b;
        if( s1.empty() ){
             calc -> showError("Error : Syntax error!");
             return false;
        }
        s1.get_top(b);
        s1.pop();
        if( s1.empty() ){
             calc -> showError("Error : Syntax error!");
             return false;
        }
        s1.get_top(a);
        s1.pop();

        float c = Operate(a, op1, b);
        s1.push(c);

        s2.get_top(op1);
    }
    if( testPri( op1 ,express[i] ) == '<' )
        s2.push(express[i]);
    if( testPri( op1 ,express[i] ) == '=' )
        s2.pop();

    return true;
}


bool pushOperator( Stack<float> &s1, Stack<char> &s2, Calculator *calc, int &i, string &express )
{
    char stop;
    s2.get_top(stop);
    if(s2.empty()) s2.push(express[i]);
    else if( testPri( stop ,express[i] ) == '<' )
        s2.push(express[i]);
    else if( testPri( stop ,express[i] ) == '=' )
        s2.pop();
    else if( testPri( stop ,express[i] ) == ' ' ){
        calc -> showError("Error : Syntax error!");
        return false;
    }
    else if( testPri( stop ,express[i] ) == '>' ) {
        if( !popStack(s1, s2, calc, i, express) ) return false;
    }
    return true;
}


#endif // CALCULATE_H
