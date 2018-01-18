#include "widget.h"
#include "ui_widget.h"
#include <iostream>
#include <fstream>
#include <cstdlib>

using namespace std;

Widget::Widget(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::Widget)
{
    ui->setupUi(this);

    connect( ui->deleteButton, SIGNAL(clicked(bool)), this, SLOT(deleteText()) );
    connect( ui->copyButton, SIGNAL(clicked(bool)), this, SLOT(copy()) );
    connect( ui->pasteButton, SIGNAL(clicked(bool)), this, SLOT(paste()) );
    connect( ui->cutButton, SIGNAL(clicked(bool)), this, SLOT(cut()) );
    connect( ui->openButton, SIGNAL(clicked(bool)), this, SLOT(openFile()) );
    connect( ui->saveButton, SIGNAL(clicked(bool)), this, SLOT(saveFile()) );

    setWindowTitle("My Notebook!");
}

Widget::~Widget()
{
    delete ui;
}

void Widget::deleteText()
{
    ui->textArea->setText("");
}

void Widget::copy()
{
    copyText = ui->textArea->toPlainText();
}

void Widget::paste()
{
    QString content = ui->textArea->toPlainText();
    content += copyText;

    ui->textArea->setText(content);
}

void Widget::cut()
{
    copy();
    deleteText();
}

void Widget::openFile()
{
    const char* openPath = ui->openPath->text().toStdString().c_str();

    ifstream infile( openPath, ios::in|ios::binary );
    if( !infile ) {
        cerr << "Infile Failed!" << endl;
        return;
    }
    string s; char c;
    while( !infile.eof() ) {
        infile.read( &c, sizeof(char) );
        if( infile.eof() ) break;
        s += c;
    }

    QString str(s.c_str());
    ui->textArea->setText(str);
    infile.close(); delete openPath;
    ui->openPath->setText("");
}

void Widget::saveFile()
{
    const char* savePath = ui->savePath->text().toStdString().c_str();

    ofstream outfile( savePath, ios::out|ios::binary );
    if( !outfile ) {
        cerr << "Outfile Failed" << endl;
        return;
    }
    delete savePath;

    string content = ui->textArea->toPlainText().toStdString();
    for( int i = 0; i < content.length(); i++ ) {
        char a = content[i];
        outfile.write( &a, sizeof(char) );
    }

    outfile.close();
    ui->savePath->setText("");
    cout << "Save file completely." << endl;
}
