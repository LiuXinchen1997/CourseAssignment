/********************************************************************************
** Form generated from reading UI file 'widget.ui'
**
** Created by: Qt User Interface Compiler version 5.7.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_WIDGET_H
#define UI_WIDGET_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_Widget
{
public:
    QVBoxLayout *verticalLayout;
    QHBoxLayout *horizontalLayout_8;
    QLabel *ContentLabel;
    QLabel *ContentShowLabel;
    QHBoxLayout *horizontalLayout_7;
    QLabel *SetALabel;
    QLabel *SetAContentLabel;
    QPushButton *CLEARForAButton;
    QHBoxLayout *horizontalLayout_6;
    QPushButton *IN_SETForAButton;
    QLineEdit *IN_SETForA;
    QPushButton *INSERTForAButton;
    QLineEdit *INSERTForA;
    QPushButton *SHOWForAButton;
    QHBoxLayout *horizontalLayout_5;
    QLabel *SetBLabel;
    QLabel *SetBContentLabel;
    QPushButton *CLEARForBButton;
    QHBoxLayout *horizontalLayout_4;
    QPushButton *IN_SETForBButton;
    QLineEdit *IN_SETForB;
    QPushButton *INSERTForBButton;
    QLineEdit *INSERTForB;
    QPushButton *SHOWForBButton;
    QHBoxLayout *horizontalLayout_3;
    QLabel *SetCLabel;
    QLabel *SetCContentLabel;
    QPushButton *CLEARForCButton;
    QHBoxLayout *horizontalLayout_2;
    QPushButton *IN_SETForCButton;
    QLineEdit *IN_SETForC;
    QSpacerItem *horizontalSpacer_3;
    QPushButton *SHOWForCButton;
    QSpacerItem *horizontalSpacer;
    QHBoxLayout *horizontalLayout;
    QPushButton *ANDButton;
    QPushButton *XORButton;
    QPushButton *ORButton;
    QSpacerItem *horizontalSpacer_2;
    QPushButton *QuitButton;

    void setupUi(QWidget *Widget)
    {
        if (Widget->objectName().isEmpty())
            Widget->setObjectName(QStringLiteral("Widget"));
        Widget->resize(363, 284);
        Widget->setMaximumSize(QSize(363, 284));
        verticalLayout = new QVBoxLayout(Widget);
        verticalLayout->setSpacing(6);
        verticalLayout->setContentsMargins(11, 11, 11, 11);
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        horizontalLayout_8 = new QHBoxLayout();
        horizontalLayout_8->setSpacing(6);
        horizontalLayout_8->setObjectName(QStringLiteral("horizontalLayout_8"));
        ContentLabel = new QLabel(Widget);
        ContentLabel->setObjectName(QStringLiteral("ContentLabel"));
        ContentLabel->setMaximumSize(QSize(150, 50));
        ContentLabel->setStyleSheet(QString::fromUtf8("font: 75 16pt \"\345\276\256\350\275\257\351\233\205\351\273\221\";"));

        horizontalLayout_8->addWidget(ContentLabel);

        ContentShowLabel = new QLabel(Widget);
        ContentShowLabel->setObjectName(QStringLiteral("ContentShowLabel"));
        ContentShowLabel->setStyleSheet(QString::fromUtf8("font: 75 italic 11pt \"\346\226\260\345\256\213\344\275\223\";"));

        horizontalLayout_8->addWidget(ContentShowLabel);


        verticalLayout->addLayout(horizontalLayout_8);

        horizontalLayout_7 = new QHBoxLayout();
        horizontalLayout_7->setSpacing(6);
        horizontalLayout_7->setObjectName(QStringLiteral("horizontalLayout_7"));
        SetALabel = new QLabel(Widget);
        SetALabel->setObjectName(QStringLiteral("SetALabel"));
        SetALabel->setMaximumSize(QSize(70, 50));
        SetALabel->setStyleSheet(QString::fromUtf8("font: 75 16pt \"\345\276\256\350\275\257\351\233\205\351\273\221\";"));

        horizontalLayout_7->addWidget(SetALabel);

        SetAContentLabel = new QLabel(Widget);
        SetAContentLabel->setObjectName(QStringLiteral("SetAContentLabel"));
        SetAContentLabel->setStyleSheet(QString::fromUtf8("font: 75 italic 11pt \"\346\226\260\345\256\213\344\275\223\";"));

        horizontalLayout_7->addWidget(SetAContentLabel);

        CLEARForAButton = new QPushButton(Widget);
        CLEARForAButton->setObjectName(QStringLiteral("CLEARForAButton"));
        CLEARForAButton->setMaximumSize(QSize(50, 50));
        CLEARForAButton->setStyleSheet(QString::fromUtf8("font: italic 12pt \"\346\245\267\344\275\223\";"));

        horizontalLayout_7->addWidget(CLEARForAButton);


        verticalLayout->addLayout(horizontalLayout_7);

        horizontalLayout_6 = new QHBoxLayout();
        horizontalLayout_6->setSpacing(6);
        horizontalLayout_6->setObjectName(QStringLiteral("horizontalLayout_6"));
        IN_SETForAButton = new QPushButton(Widget);
        IN_SETForAButton->setObjectName(QStringLiteral("IN_SETForAButton"));
        IN_SETForAButton->setStyleSheet(QString::fromUtf8("font: italic 12pt \"\346\245\267\344\275\223\";"));

        horizontalLayout_6->addWidget(IN_SETForAButton);

        IN_SETForA = new QLineEdit(Widget);
        IN_SETForA->setObjectName(QStringLiteral("IN_SETForA"));

        horizontalLayout_6->addWidget(IN_SETForA);

        INSERTForAButton = new QPushButton(Widget);
        INSERTForAButton->setObjectName(QStringLiteral("INSERTForAButton"));
        INSERTForAButton->setStyleSheet(QString::fromUtf8("font: italic 12pt \"\346\245\267\344\275\223\";"));

        horizontalLayout_6->addWidget(INSERTForAButton);

        INSERTForA = new QLineEdit(Widget);
        INSERTForA->setObjectName(QStringLiteral("INSERTForA"));

        horizontalLayout_6->addWidget(INSERTForA);

        SHOWForAButton = new QPushButton(Widget);
        SHOWForAButton->setObjectName(QStringLiteral("SHOWForAButton"));
        SHOWForAButton->setStyleSheet(QString::fromUtf8("font: italic 12pt \"\346\245\267\344\275\223\";"));

        horizontalLayout_6->addWidget(SHOWForAButton);


        verticalLayout->addLayout(horizontalLayout_6);

        horizontalLayout_5 = new QHBoxLayout();
        horizontalLayout_5->setSpacing(6);
        horizontalLayout_5->setObjectName(QStringLiteral("horizontalLayout_5"));
        SetBLabel = new QLabel(Widget);
        SetBLabel->setObjectName(QStringLiteral("SetBLabel"));
        SetBLabel->setMaximumSize(QSize(70, 50));
        SetBLabel->setStyleSheet(QString::fromUtf8("font: 75 16pt \"\345\276\256\350\275\257\351\233\205\351\273\221\";"));

        horizontalLayout_5->addWidget(SetBLabel);

        SetBContentLabel = new QLabel(Widget);
        SetBContentLabel->setObjectName(QStringLiteral("SetBContentLabel"));
        SetBContentLabel->setStyleSheet(QString::fromUtf8("font: 75 italic 11pt \"\346\226\260\345\256\213\344\275\223\";"));

        horizontalLayout_5->addWidget(SetBContentLabel);

        CLEARForBButton = new QPushButton(Widget);
        CLEARForBButton->setObjectName(QStringLiteral("CLEARForBButton"));
        CLEARForBButton->setMaximumSize(QSize(50, 50));
        CLEARForBButton->setStyleSheet(QString::fromUtf8("font: italic 12pt \"\346\245\267\344\275\223\";"));

        horizontalLayout_5->addWidget(CLEARForBButton);


        verticalLayout->addLayout(horizontalLayout_5);

        horizontalLayout_4 = new QHBoxLayout();
        horizontalLayout_4->setSpacing(6);
        horizontalLayout_4->setObjectName(QStringLiteral("horizontalLayout_4"));
        IN_SETForBButton = new QPushButton(Widget);
        IN_SETForBButton->setObjectName(QStringLiteral("IN_SETForBButton"));
        IN_SETForBButton->setStyleSheet(QString::fromUtf8("font: italic 12pt \"\346\245\267\344\275\223\";"));

        horizontalLayout_4->addWidget(IN_SETForBButton);

        IN_SETForB = new QLineEdit(Widget);
        IN_SETForB->setObjectName(QStringLiteral("IN_SETForB"));

        horizontalLayout_4->addWidget(IN_SETForB);

        INSERTForBButton = new QPushButton(Widget);
        INSERTForBButton->setObjectName(QStringLiteral("INSERTForBButton"));
        INSERTForBButton->setStyleSheet(QString::fromUtf8("font: italic 12pt \"\346\245\267\344\275\223\";"));

        horizontalLayout_4->addWidget(INSERTForBButton);

        INSERTForB = new QLineEdit(Widget);
        INSERTForB->setObjectName(QStringLiteral("INSERTForB"));

        horizontalLayout_4->addWidget(INSERTForB);

        SHOWForBButton = new QPushButton(Widget);
        SHOWForBButton->setObjectName(QStringLiteral("SHOWForBButton"));
        SHOWForBButton->setStyleSheet(QString::fromUtf8("font: italic 12pt \"\346\245\267\344\275\223\";"));

        horizontalLayout_4->addWidget(SHOWForBButton);


        verticalLayout->addLayout(horizontalLayout_4);

        horizontalLayout_3 = new QHBoxLayout();
        horizontalLayout_3->setSpacing(6);
        horizontalLayout_3->setObjectName(QStringLiteral("horizontalLayout_3"));
        SetCLabel = new QLabel(Widget);
        SetCLabel->setObjectName(QStringLiteral("SetCLabel"));
        SetCLabel->setMaximumSize(QSize(70, 50));
        SetCLabel->setStyleSheet(QString::fromUtf8("font: 75 16pt \"\345\276\256\350\275\257\351\233\205\351\273\221\";"));

        horizontalLayout_3->addWidget(SetCLabel);

        SetCContentLabel = new QLabel(Widget);
        SetCContentLabel->setObjectName(QStringLiteral("SetCContentLabel"));
        SetCContentLabel->setMaximumSize(QSize(16777215, 16777215));
        SetCContentLabel->setStyleSheet(QString::fromUtf8("font: 75 italic 11pt \"\346\226\260\345\256\213\344\275\223\";"));

        horizontalLayout_3->addWidget(SetCContentLabel);

        CLEARForCButton = new QPushButton(Widget);
        CLEARForCButton->setObjectName(QStringLiteral("CLEARForCButton"));
        CLEARForCButton->setMaximumSize(QSize(50, 50));
        CLEARForCButton->setStyleSheet(QString::fromUtf8("font: italic 12pt \"\346\245\267\344\275\223\";"));

        horizontalLayout_3->addWidget(CLEARForCButton);


        verticalLayout->addLayout(horizontalLayout_3);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setSpacing(6);
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        IN_SETForCButton = new QPushButton(Widget);
        IN_SETForCButton->setObjectName(QStringLiteral("IN_SETForCButton"));
        IN_SETForCButton->setStyleSheet(QString::fromUtf8("font: italic 12pt \"\346\245\267\344\275\223\";"));

        horizontalLayout_2->addWidget(IN_SETForCButton);

        IN_SETForC = new QLineEdit(Widget);
        IN_SETForC->setObjectName(QStringLiteral("IN_SETForC"));
        IN_SETForC->setMaximumSize(QSize(50, 50));

        horizontalLayout_2->addWidget(IN_SETForC);

        horizontalSpacer_3 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_2->addItem(horizontalSpacer_3);

        SHOWForCButton = new QPushButton(Widget);
        SHOWForCButton->setObjectName(QStringLiteral("SHOWForCButton"));
        SHOWForCButton->setStyleSheet(QString::fromUtf8("font: italic 12pt \"\346\245\267\344\275\223\";"));

        horizontalLayout_2->addWidget(SHOWForCButton);

        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_2->addItem(horizontalSpacer);


        verticalLayout->addLayout(horizontalLayout_2);

        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setSpacing(6);
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        ANDButton = new QPushButton(Widget);
        ANDButton->setObjectName(QStringLiteral("ANDButton"));
        ANDButton->setStyleSheet(QString::fromUtf8("font: italic 12pt \"\346\245\267\344\275\223\";"));

        horizontalLayout->addWidget(ANDButton);

        XORButton = new QPushButton(Widget);
        XORButton->setObjectName(QStringLiteral("XORButton"));
        XORButton->setStyleSheet(QString::fromUtf8("font: italic 12pt \"\346\245\267\344\275\223\";"));

        horizontalLayout->addWidget(XORButton);

        ORButton = new QPushButton(Widget);
        ORButton->setObjectName(QStringLiteral("ORButton"));
        ORButton->setStyleSheet(QString::fromUtf8("font: italic 12pt \"\346\245\267\344\275\223\";"));

        horizontalLayout->addWidget(ORButton);

        horizontalSpacer_2 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout->addItem(horizontalSpacer_2);

        QuitButton = new QPushButton(Widget);
        QuitButton->setObjectName(QStringLiteral("QuitButton"));
        QuitButton->setStyleSheet(QString::fromUtf8("font: italic 12pt \"\346\245\267\344\275\223\";"));

        horizontalLayout->addWidget(QuitButton);


        verticalLayout->addLayout(horizontalLayout);


        retranslateUi(Widget);

        QMetaObject::connectSlotsByName(Widget);
    } // setupUi

    void retranslateUi(QWidget *Widget)
    {
        Widget->setWindowTitle(QApplication::translate("Widget", "Widget", 0));
        ContentLabel->setText(QApplication::translate("Widget", "Content Show:", 0));
        ContentShowLabel->setText(QApplication::translate("Widget", "aaa", 0));
        SetALabel->setText(QApplication::translate("Widget", "Set A:", 0));
        SetAContentLabel->setText(QApplication::translate("Widget", "aaa", 0));
        CLEARForAButton->setText(QApplication::translate("Widget", "CLEAR", 0));
        IN_SETForAButton->setText(QApplication::translate("Widget", "IN_SET", 0));
        INSERTForAButton->setText(QApplication::translate("Widget", "INSERT_SET", 0));
        SHOWForAButton->setText(QApplication::translate("Widget", "SHOW", 0));
        SetBLabel->setText(QApplication::translate("Widget", "Set B:", 0));
        SetBContentLabel->setText(QApplication::translate("Widget", "aaa", 0));
        CLEARForBButton->setText(QApplication::translate("Widget", "CLEAR", 0));
        IN_SETForBButton->setText(QApplication::translate("Widget", "IN_SET", 0));
        INSERTForBButton->setText(QApplication::translate("Widget", "INSERT_SET", 0));
        SHOWForBButton->setText(QApplication::translate("Widget", "SHOW", 0));
        SetCLabel->setText(QApplication::translate("Widget", "Set C:", 0));
        SetCContentLabel->setText(QApplication::translate("Widget", "aaa", 0));
        CLEARForCButton->setText(QApplication::translate("Widget", "CLEAR", 0));
        IN_SETForCButton->setText(QApplication::translate("Widget", "IN_SET", 0));
        SHOWForCButton->setText(QApplication::translate("Widget", "SHOW", 0));
        ANDButton->setText(QApplication::translate("Widget", "AND", 0));
        XORButton->setText(QApplication::translate("Widget", "XOR", 0));
        ORButton->setText(QApplication::translate("Widget", "OR", 0));
        QuitButton->setText(QApplication::translate("Widget", "QUIT", 0));
    } // retranslateUi

};

namespace Ui {
    class Widget: public Ui_Widget {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_WIDGET_H
