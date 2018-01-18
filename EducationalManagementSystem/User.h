#ifndef USER_H_INCLUDED
#define USER_H_INCLUDED
#include <cstring>
using namespace std;

class User
{
public:
    char username[20];
    char password[20];
    int right; //1 for managers, 2 for teachers, 3 for students...
    User();
    User(char *username, char *password, int right);
};

class Date
{
public:
    Date();
    Date(int year, int month);
    void show();
    int year;
    int month;
};

class Student
{
public:
    char stu_id[20];
    char name[20];
    int sex; //0 for male, 1 for female
    char major[20];
    Date birthdate;
    int status; //1 for public, 2 for league, 3 for party
    char address[20];
    Student();
    Student(char *stu_id, char *name, int sex, char* major,
         int year, int month, int status, char *address);
    void show();
};

class Teacher
{
public:
    char job_id[20];
    char name[20];
    int sex; //0 for male, 1 for female
    char academy[20];
    Date birthdate;
    int status; //1 for public, 2 for league, 3 for party
    int ranks; //1 for lecturer, 2 for associate professor, 3 for professor, 4 for academician
    Teacher();
    Teacher(char *job_id, char *name, int sex, char *academy,
            int year, int month, int status, int ranks);
    void show();
};

class Course
{
public:
    char course_id[20];
    char course_name[20];
    float point;
    char job_id[20];
    Course();
    Course(char *course_id, char *course_name, float point, char *job_id);
    void show();
};

class Score
{
public:
    char stu_id[20];
    char course_id[20];
    int score;
    Score();
    Score(char *stu_id, char *course_id, int score);
    void show();
};
#endif // USER_H_INCLUDED
