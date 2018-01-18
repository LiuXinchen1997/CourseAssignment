#-------------------------------------------------
#
# Project created by QtCreator 2016-11-13T19:42:46
#
#-------------------------------------------------

QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = CalculatorDemo
TEMPLATE = app


SOURCES += main.cpp\
        widget.cpp

HEADERS  += widget.h \
    Stack.h \
    calculate.h

FORMS    += widget.ui
