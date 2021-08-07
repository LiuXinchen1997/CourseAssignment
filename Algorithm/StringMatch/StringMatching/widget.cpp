#include "widget.h"
#include <QVBoxLayout>
#include <QHBoxLayout>
#include <QFileDialog>
#include <QMessageBox>

#include <iostream>
#include <fstream>

#include "algo.h"

Widget::Widget(QWidget *parent)
    : QWidget(parent)
{
    P = "";
    T = "";
    text_edit2_enable = true;

    QVBoxLayout* mainLayout = new QVBoxLayout;

    QHBoxLayout* layout1 = new QHBoxLayout;
    text_label1 = new QLabel("Input Pattern String: ");
    text_edit1 = new QLineEdit();
    layout1->addWidget(text_label1);
    layout1->addWidget(text_edit1);

    QHBoxLayout* layout2 = new QHBoxLayout;
    text_label2 = new QLabel("Input Text String: ");
    text_edit2 = new QLineEdit();
    layout2->addWidget(text_label2);
    layout2->addWidget(text_edit2);

    QHBoxLayout* layout3 = new QHBoxLayout;
    text_label3 = new QLabel("Input Text String From txt File: ");
    choose_file_btn = new QPushButton("Choose File");
    layout3->addWidget(text_label3);
    layout3->addWidget(choose_file_btn);

    mainLayout->addLayout(layout1);
    mainLayout->addLayout(layout2);
    mainLayout->addLayout(layout3);

    QHBoxLayout* layout4 = new QHBoxLayout();
    text_label4 = new QLabel("Choose Algorithm: ");
    choose_algo_combobox = new QComboBox();
    choose_algo_combobox->addItem("Brute Force");
    choose_algo_combobox->addItem("KMP");
    choose_algo_combobox->addItem("BM");
    match_btn = new QPushButton("Match");
    layout4->addWidget(text_label4);
    layout4->addWidget(choose_algo_combobox);
    layout4->addWidget(match_btn);
    mainLayout->addLayout(layout4);

    setLayout(mainLayout);

    connect(match_btn, SIGNAL(clicked()), this, SLOT(match_btn_clicked()));
    connect(text_edit1, SIGNAL(textEdited(const QString&)), this, SLOT(text_edit1_changed(const QString&)));
    connect(text_edit2, SIGNAL(textEdited(const QString&)), this, SLOT(text_edit2_changed(const QString&)));
    connect(choose_file_btn, SIGNAL(clicked()), this, SLOT(choose_file_btn_clicked()));
}

Widget::~Widget()
{
}

void Widget::match_btn_clicked()
{

    if (this->P == "") {
        QMessageBox::warning(NULL, "Error", "You should input the pattern string!", QMessageBox::Ok);
        return;
    }
    if (this->T == "") {
        QMessageBox::warning(NULL, "Error", "You should input the text string!", QMessageBox::Ok);
        return;
    }
    if (this->P.size() > this->T.size()) {
        QMessageBox::warning(NULL, "Error", "Text should be longer than pattern!", QMessageBox::Ok);
        return;
    }

    vector<int> res;
    long costtime = 0;
    switch (this->choose_algo_combobox->currentIndex()) {
    case 0:
        costtime = brute_force(this->P, this->T, res);
        break;
    case 1:
        costtime = kmp(this->P, this->T, res);
        break;
    case 2:
        costtime = bm(this->P, this->T, res);
        break;
    }

    string saved_res_file = "./res";
    saved_res_file += ('0' + this->choose_algo_combobox->currentIndex());
    saved_res_file += ".txt";
    ofstream outfile(saved_res_file);
    outfile << "Cost Time: " << costtime << endl;
    outfile << "Pattern String: " << this->P << endl;
    if (this->T.size() <= 1000) {
        outfile << "Text String: " << this->T << endl;
    } else {
        outfile << "Text String: Too long!!!" << endl;
    }
    for (int i = 0; i < res.size(); i++) {
        outfile << res[i] << endl;
    }

    text_edit2_enable = true;
    this->text_edit2->setEnabled(text_edit2_enable);
    this->P = "";
    this->T = "";
    this->text_edit1->setText("");
    this->text_edit2->setText("");
    QMessageBox::information(NULL, "Message", "Results has been saved in res.txt!", QMessageBox::Ok);
}

void Widget::text_edit1_changed(const QString& str)
{
    this->P = str.toStdString();
}

void Widget::text_edit2_changed(const QString& str)
{
    this->T = str.toStdString();
}

void Widget::choose_file_btn_clicked()
{
    string filename = QFileDialog::getOpenFileName().toStdString();
    // string filename = "J:/Qt/StringMatching/a.txt";
    ifstream infile(filename);
    if (!infile) { return; }

    while (!infile.eof()) {
        string tmp;
        infile >> tmp;
        this->T += tmp;
        // infile >> this->T;
    }

    QMessageBox::information(NULL, "Message", "Input Text String Sucessfully!", QMessageBox::Ok);
    this->text_edit2_enable = false;
    this->text_edit2->setEnabled(this->text_edit2_enable);
}
