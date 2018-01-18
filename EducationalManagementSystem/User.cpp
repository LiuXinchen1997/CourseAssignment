#include "User.h"
#include <iostream>
#include <iomanip>
#include <cstring>

using namespace std;

User::User()
{
}

User::User(char *username, char *password, int right)
{
    strcpy(this->username, username);
    strcpy(this->password, password);
    this->right = right;
}

Date::Date()
{
}

Date::Date(int year, int month)
{
    this->year = year;
    this->month = month;
}

void Date::show()
{
    cout << right;
    cout << setw(12) << "birth date : " << setw(6) << year << setw(6) << month << endl;
}

Student::Student()
{
}

Student::Student(char *stu_id, char *name, int sex, char* major,int year, int month, int status, char *address):birthdate(year, month)
{
    strcpy(this->stu_id, stu_id);
    strcpy(this->name, name);
    this->sex = sex;
    strcpy(this->major, major);
    this->status = status;
    strcpy(this->address, address);
}

void Student::show()
{
    cout << right;
    cout << setw(12) << "student Id : " << setw(12) << stu_id << endl;
    cout << setw(12) << "name : " << setw(12) << name << endl;
    cout << setw(12) << "sex : " << setw(12) << ((sex == 0)? "male" : "female") << endl;
    cout << setw(12) << "major : " << setw(12) << major << endl;
    birthdate.show();
    cout << setw(12) << "status : " << flush;
    switch(status)
    {
    case 1:
        cout << setw(12) << "public" <<endl;
        break;
    case 2:
        cout << setw(12) << "league" << endl;
        break;
    case 3:
        cout << setw(12) << "party" << endl;
        break;
    }
    cout << setw(12) << "address : " << setw(12) << address << endl;
}

Teacher::Teacher()
{
}

Teacher::Teacher(char *job_id, char *name, int sex, char *academy, int year, int month, int status, int ranks):birthdate(year,month)
{
    strcpy(this->job_id, job_id);
    strcpy(this->name, name);
    this->sex = sex;
    strcpy(this->academy, academy);
    this->status = status;
    this->ranks = ranks;
}

void Teacher::show()
{
    cout << right;
    cout << setw(12) << "Teacher Id : " << setw(12) << job_id << endl;
    cout << setw(12) << "name : " << setw(12) << name << endl;
    cout << setw(12) << "sex : " << setw(12) << ((sex == 0)? "male" : "female") << endl;
    cout << setw(12) << "academy : " << setw(12) << academy << endl;
    birthdate.show();
    cout << setw(12) << "status : " << flush;
    switch(status)
    {
    case 1:
        cout << setw(12) << "public" <<endl;
        break;
    case 2:
        cout << setw(12) << "league" << endl;
        break;
    case 3:
        cout << setw(12) << "party" << endl;
        break;
    }
    cout << setw(12) << "ranks : " << flush;
    switch(ranks)
    {
    case 1:
        cout << setw(12) << "lecturer" <<endl;
        break;
    case 2:
        cout << setw(12) << "associate professor" << endl;
        break;
    case 3:
        cout << setw(12) << "professor" << endl;
        break;
    case 4:
        cout << setw(12) << "academician" << endl;
        break;
    }
}

Course::Course()
{
}

Course::Course(char *course_id, char *course_name, float point, char *job_id)
{
    strcpy(this->course_id, course_id);
    strcpy(this->course_name, course_name);
    this->point = point;
    strcpy(this->job_id, job_id);
}

void Course::show()
{
    cout << right;
    cout << setw(12) << "Course Id : " << setw(12) << course_id << endl;
    cout << setw(12) << "Course name : " << setw(12) << course_name << endl;
    cout << setw(12) << "Point : " << setw(12) << point << endl;
    cout << setw(12) << "Teacher Id : " << setw(12) << job_id << endl;
}

Score::Score()
{
}

Score::Score(char *stu_id, char *course_id, int score)
{
    strcpy(this->stu_id, stu_id);
    strcpy(this->course_id, course_id);
    this->score = score;
}

void Score::show()
{
    cout << right;
    cout << setw(8) << "stu id: " << setw(6) << stu_id << endl;
    cout << setw(8) << "cou id: " << setw(6) << course_id << endl;
    cout << setw(8) << "score: " << setw(6) << score << endl;
}
