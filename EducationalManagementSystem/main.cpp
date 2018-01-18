#include <fstream>
#include <iomanip>
#include <iostream>
#include <cstring>
#include "User.h"

using namespace std;

void set_info();
int login();
void showmenu(int i);



int showManagerMenu();
void showSecondMenu();

void managerOperate(int j);

void manageStuInfo(int k);
void addStuInfo();
void deleteStuInfo();
void inquireStuInfo();

void manageTeacherInfo(int k);
void addTeacherInfo();
void deleteTeacherInfo();
void inquireTeacherInfo();

void manageCourseInfo(int k);
void addCourseInfo();
void deleteCourseInfo();
void inquireCourseInfo();

void createScoreInfo();




int showTeacherMenu();

void teacherOperate(int j);

void enterScore();
void inquireScore();




int showStudentMenu();

void studentOperate(int j);

void inquireBasicInfo();
void inquireScoreInfo();


void modify_password();


int main()
{
    set_info(); //Create and initialize some files.

    int i;
    char a = 'y';
    while(a == 'y')
    {
        cout << "================Welcome to Education Management System!======================" << endl;
        cout << "=                                                                           =" << endl;
        cout << "=                    What do you want to do?                                =" << endl;
        cout << "=                      1. I want to login!                                  =" << endl;
        cout << "=                 2. I want to modify my password!                          =" << endl;
        cout << "=                                                                           =" << endl;
        cout << "=============================================================================" << endl;
        cout << "Please enter your choice(1 or 2) : ";

        int flag;
        cin >> flag;
        switch(flag)
        {
        case 1:
            i = login(); //Get the different rights(1 for manager, 2 for teacher, 3 for student)
            showmenu(i); //Show different menu according to different rights
            cout << "Do you want to return to main menu('y' to try again, 'q' to quit...) : ";
            cin >> a;
            break;
        case 2:
            modify_password();
            cout << "Do you want to return to main menu('y' to try again, 'q' to quit...) : ";
            cin >> a;
            break;
        default:
            cout << "Input error! Enter 'y' to try again, 'q' to quit..." << endl;
            cin >> a;
        }
    }

    return 0;
}

void set_info()
{
    ofstream outfile("users.dat", ios::in);
    User user[3] = {User("01", "123456", 1),
                    User("001", "111111", 2),
                    User("0001", "333333", 3)};
    //user[1] = User("01", "123456", 1);
    //user[2] = User("001", "111111", 2);
    //user[3] = User("0001", "333333", 3);
    for(int i = 0; i < 3; i++)
    {
        outfile << user[i].username << " " << user[i].password << " " << user[i].right << endl;
    }
    outfile.close();

    outfile.open("teacher.dat", ios::out);
    Teacher t("001", "Tim", 0, "Management", 1956, 7, 3, 3);
    outfile << t.job_id << " " << t.name << " " << t.sex << " " << t.academy << " " << t.birthdate.year
    << " " << t.birthdate.month << " " << t.status << " " << t.ranks << endl;
    outfile.close();

    outfile.open("student.dat", ios::out);
    Student s("0001", "Mary", 1, "ComputerScience", 1996, 8, 2, "Shanghai");
    outfile << s.stu_id << " " << s.name << " " << s.sex << " " << s.major << " " << s.birthdate.year
    << " " <<  s.birthdate.month << " " << s.status << " " << s.address << endl;
    outfile.close();

    outfile.open("course.dat", ios::out);
    Course c("001", "Math", 6, "001");
    outfile << c.course_id << " " << c.course_name << " " << c.point << " " << c.job_id << endl;
    outfile.close();
}

int login()
{
    ifstream infile;
    int i, j;
    char a = 'y';
    while(a == 'y')
    {
        cout << endl;

        cout << "Please enter your username: ";
        char username[20];
        cin >> username;
        cout << endl;

        cout << "Please enter your password: ";
        char password[20];
        cin >> password;
        cout << endl;

        infile.open("users.dat", ios::in);
        User user[10];
        for(i = 0; !infile.eof(); i++)
            infile >> user[i].username >> user[i].password >> user[i].right;
        for(j = 0; j < i; j ++)
        {
            if (!strcmp(user[j].username, username))
            {
                if (!strcmp(user[j].password, password))
                    return user[j].right;
                else
                {
                    cout << "Password is not correct!" << endl;
                    cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
                    cin >> a;
                    break;
                }
            }
        }
        if (j == i)
        {
            cout << "Username does not exist!" << endl;
            cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
            cin >> a;
        }
        infile.close();
    }

    return 0;
}




void showmenu(int i)
{
    int j;
    char a = 'y';
    while(a == 'y')
    {
        switch(i)
        {
        case 0:
            return;
            break;
        case 1:
            j = showManagerMenu();
            managerOperate(j);
            break;
        case 2:
            j = showTeacherMenu();
            teacherOperate(j);
            break;
        case 3:
            j = showStudentMenu();
            studentOperate(j);
            break;
        }
        cout << "Do you want to return to previous menu('y' to yes, 'q' to quit): ";
        cin >> a;
    }
}

int showManagerMenu()
{
    cout << "=======================Welcome to you, Manager!==============================" << endl;
    cout << "=                                                                           =" << endl;
    cout << "=                1.Manage students' basic information.                      =" << endl;
    cout << "=                2.Manage teachers' basic information.                      =" << endl;
    cout << "=                    3.Manage courses' information.                         =" << endl;
    cout << "=            4.Create students' curricula-variable information.             =" << endl;
    cout << "=                                                                           =" << endl;
    cout << "=============================================================================" << endl;
    cout << "Please enter your choice(1, 2, 3 or 4) : ";
    int i;
    cin >> i;
    return i;
}

void showSecondMenu()
{
    cout << "=============================================================================" << endl;
    cout << "=                                                                           =" << endl;
    cout << "=                           1.Add some information.                         =" << endl;
    cout << "=                         2.Delete some information.                        =" << endl;
    cout << "=                         3.Inquire some information.                       =" << endl;
    cout << "=                                                                           =" << endl;
    cout << "=============================================================================" << endl;
}



void managerOperate(int j)
{
    int k;
    switch(j)
    {
    case 1:
        showSecondMenu();
        cout << "Please enter your choice(1 , 2, or 3) : ";
        cin >> k;
        manageStuInfo(k);
        break;
    case 2:
        showSecondMenu();
        cout << "Please enter your choice(1 , 2, or 3) : ";
        cin >> k;
        manageTeacherInfo(k);
        break;
    case 3:
        showSecondMenu();
        cout << "Please enter your choice(1 , 2, or 3) : ";
        cin >> k;
        manageCourseInfo(k);
        break;
    case 4:
        createScoreInfo();
    }
}




void manageStuInfo(int k)
{
    switch(k)
    {
    case 1:
        addStuInfo();
        break;
    case 2:
        deleteStuInfo();
        break;
    case 3:
        inquireStuInfo();
        break;
    }

}

void addStuInfo()
{
    ifstream infile;
    ofstream outfile;
    Student s[20];
    char c = 'y';
    char a[20];
    int i, j;
    while(c == 'y')
    {
        infile.open("student.dat", ios::in);
        for(i = 0; !infile.eof(); i ++)
        {
            infile >> s[i].stu_id >> s[i].name >> s[i].sex >> s[i].major >> s[i].birthdate.year >> s[i].birthdate.month
             >> s[i].status >> s[i].address;
        }
        infile.close();
        i --;

        cout << "Now you can add students' basic information~ " << endl;
        cout << "Please enter student ID number first: ";
        cin >> a;
        for(j = 0; j < i; j ++)
            if(!strcmp(a, s[j].stu_id))
            {
                cout << "The student ID number has existed!" << endl;
                cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
                cin >> c;
                break;
            }
        if(j == i)
        {
            cout << "Please enter more information~ " << endl;
            strcpy(s[i].stu_id, a);
            cout << right;
            cout << setw(8) << "name : ";
            cin >> s[i].name;
            cout << setw(8) << "sex : ";
            cin >> s[i].sex;
            cout << setw(8) << "major : ";
            cin >> s[i].major;
            cout << setw(10) << "birth_y : ";
            cin >> s[i].birthdate.year;
            cout << setw(10) << "birth_m : ";
            cin >> s[i].birthdate.month;
            cout << setw(8) << "status : ";
            cin >> s[i].status;
            cout << setw(10) << "address : ";
            cin >> s[i].address;

            outfile.open("student.dat", ios::out);
            for(int k = 0; k <= i; k ++)
                outfile << s[k].stu_id << " " << s[k].name << " " <<  s[k].sex << " " << s[k].major
                 << " " << s[k].birthdate.year << " " << s[k].birthdate.month << " " << s[k].status << " " << s[k].address << endl;
            outfile.close();

            cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
            cin >> c;
        }
    }

}

void deleteStuInfo()
{
    int i, j;
    Student s[20];
    char a[20];
    ifstream infile;
    ofstream outfile;
    char c = 'y';
    while(c == 'y')
    {
        infile.open("student.dat", ios::in);
        for(i = 0; !infile.eof(); i ++)
        {
            infile >> s[i].stu_id >> s[i].name >> s[i].sex >> s[i].major >> s[i].birthdate.year >> s[i].birthdate.month
             >> s[i].status >> s[i].address;
        }
        infile.close();
        i --;

        cout << "Now you can delete students' basic information~ " << endl;
        cout << "Please enter the ID of the student whose information you want to delete! " << endl;
        cin >> a;
        for(j = 0; j < i; j ++)
            if(!strcmp(a, s[j].stu_id))
            {
                outfile.open("student.dat", ios::out);
                for(int k = 0; k < i; k ++)
                {
                    if(k == j)
                    {
                        if(k == 0)
                            outfile << " " << endl;
                        continue;
                    }
                    outfile << s[k].stu_id << " " << s[k].name << " " <<  s[k].sex << " " << s[k].major
                     << " " << s[k].birthdate.year << " " << s[k].birthdate.month << " " << s[k].status << " " << s[k].address << endl;
                }
                outfile.close();
                cout << "Well done! " << endl;

                cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
                cin >> c;
                break;
            }
        if(j == i)
        {
            cout << "Sorry,the student ID number does not exist! " << endl;
            cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
            cin >> c;
        }
    }

}

void inquireStuInfo()
{
    ifstream infile;
    int i, j;
    Student s[20];
    char a[20];
    char c = 'y';
    while(c == 'y')
    {
        infile.open("student.dat", ios::in);
        for(i = 0; !infile.eof(); i ++)
        {
            infile >> s[i].stu_id >> s[i].name >> s[i].sex >> s[i].major >> s[i].birthdate.year >> s[i].birthdate.month
             >> s[i].status >> s[i].address;
        }
        infile.close();
        i --;

        cout << "Please enter the Id number you want to inquire~ " << endl;
        cin >> a;
        for(j = 0; j < i; j ++)
            if(!strcmp(a, s[j].stu_id))
            {
                s[j].show();
                cout << endl;
                cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
                cin >> c;
                break;
            }
        if(j == i)
        {
            cout << "Sorry,the student ID number does not exist! " << endl;
            cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
            cin >> c;
        }
    }
}




void manageTeacherInfo(int k)
{
    switch(k)
    {
    case 1:
        addTeacherInfo();
        break;
    case 2:
        deleteTeacherInfo();
        break;
    case 3:
        inquireTeacherInfo();
        break;
    }
}

void addTeacherInfo()
{
    ifstream infile;
    ofstream outfile;
    Teacher s[20];
    char c = 'y';
    char a[20];
    int i, j;
    while(c == 'y')
    {
        infile.open("teacher.dat", ios::in);
        for(i = 0; !infile.eof(); i ++)
        {
            infile >> s[i].job_id >> s[i].name >> s[i].sex >> s[i].academy >> s[i].birthdate.year >> s[i].birthdate.month
             >> s[i].status >> s[i].ranks;
        }
        infile.close();
        i --;

        cout << "Now you can add teachers' basic information~ " << endl;
        cout << "Please enter teacher ID number first! " << endl;
        cin >> a;
        for(j = 0; j < i; j ++)
            if(!strcmp(a, s[j].job_id))
            {
                cout << "The teacher ID number has existed!" << endl;
                cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
                cin >> c;
                break;
            }
        if(j == i)
        {
            cout << "Please enter more information~ " << endl;
            strcpy(s[i].job_id, a);
            cout << right;
            cout << setw(8) << "name : ";
            cin >> s[i].name;
            cout << setw(8) << "sex : ";
            cin >> s[i].sex;
            cout << setw(10) << "academy : ";
            cin >> s[i].academy;
            cout << setw(10) << "birth_y : ";
            cin >> s[i].birthdate.year;
            cout << setw(10) << "birth_m : ";
            cin >> s[i].birthdate.month;
            cout << setw(8) << "status : ";
            cin >> s[i].status;
            cout << setw(8) << "ranks : ";
            cin >> s[i].ranks;

            outfile.open("teacher.dat", ios::out);
            for(int k = 0; k <= i; k ++)
                outfile << s[k].job_id << " " << s[k].name << " " <<  s[k].sex << " " << s[k].academy
                 << " " << s[k].birthdate.year << " " << s[k].birthdate.month << " " << s[k].status << " " << s[k].ranks << endl;
            outfile.close();

            cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
            cin >> c;
        }
    }
}

void deleteTeacherInfo()
{
    int i, j;
    Teacher s[20];
    char a[20];
    ifstream infile;
    ofstream outfile;
    char c = 'y';
    while(c == 'y')
    {
        infile.open("teacher.dat", ios::in);
        for(i = 0; !infile.eof(); i ++)
        {
            infile >> s[i].job_id >> s[i].name >> s[i].sex >> s[i].academy >> s[i].birthdate.year >> s[i].birthdate.month
             >> s[i].status >> s[i].ranks;
        }
        infile.close();
        i --;

        cout << "Now you can delete teachers' basic information~ " << endl;
        cout << "Please enter the ID of the teacher whose information you want to delete! " << endl;
        cin >> a;
        for(j = 0; j < i; j ++)
            if(!strcmp(a, s[j].job_id))
            {
                outfile.open("teacher.dat", ios::out);
                for(int k = 0; k < i; k ++)
                {
                    if(k == j)
                    {
                        if(k == 0)
                            outfile << " " << endl;
                        continue;
                    }
                    outfile << s[k].job_id << " " << s[k].name << " " <<  s[k].sex << " " << s[k].academy
                     << " " << s[k].birthdate.year << " " << s[k].birthdate.month << " " << s[k].status << " " << s[k].ranks << endl;
                }
                outfile.close();
                cout << "Well done! " << endl;

                cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
                cin >> c;
                break;
            }
        if(j == i)
        {
            cout << "Sorry,the teacher ID number does not exist! " << endl;
            cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
            cin >> c;
        }
    }

}

void inquireTeacherInfo()
{
    ifstream infile;
    int i, j;
    Teacher s[20];
    char a[20];
    char c = 'y';
    while(c == 'y')
    {
        infile.open("teacher.dat", ios::in);
        for(i = 0; !infile.eof(); i ++)
        {
            infile >> s[i].job_id >> s[i].name >> s[i].sex >> s[i].academy >> s[i].birthdate.year >> s[i].birthdate.month
             >> s[i].status >> s[i].ranks;
        }
        infile.close();
        i --;

        cout << "Please enter the Id number you want to inquire~ " << endl;
        cin >> a;
        for(j = 0; j < i; j ++)
            if(!strcmp(a, s[j].job_id))
            {
                s[j].show();
                cout << endl;
                cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
                cin >> c;
                break;
            }
        if(j == i)
        {
            cout << "Sorry,the teacher ID number does not exist! " << endl;
            cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
            cin >> c;
        }
    }
}




void manageCourseInfo(int k)
{
    switch(k)
    {
    case 1:
        addCourseInfo();
        break;
    case 2:
        deleteCourseInfo();
        break;
    case 3:
        inquireCourseInfo();
        break;
    }
}

void addCourseInfo()
{
    ifstream infile;
    ofstream outfile;
    Course s[20];
    char c = 'y';
    char a[20];
    int i, j;
    while(c == 'y')
    {
        infile.open("course.dat", ios::in);
        for(i = 0; !infile.eof(); i ++)
            infile >> s[i].course_id >> s[i].course_name >> s[i].point >> s[i].job_id;
        infile.close();
        i --;

        cout << "Now you can add courses' basic information~ " << endl;
        cout << "Please enter course ID number first! " << endl;
        cin >> a;
        for(j = 0; j < i; j ++)
            if(!strcmp(a, s[j].course_id))
            {
                cout << "The course ID number has existed!" << endl;
                cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
                cin >> c;
                break;
            }
        if(j == i)
        {
            cout << "Please enter more information~ " << endl;
            strcpy(s[i].course_id, a);
            cout << setw(8) << "name : ";
            cin >> s[i].course_name;
            cout << setw(8) << "point : ";
            cin >> s[i].point;
            cout << setw(10) << "job_id : ";
            cin >> s[i].job_id;

            outfile.open("course.dat", ios::out);
            for(int k = 0; k <= i; k ++)
                outfile << s[k].course_id << " " << s[k].course_name << " " <<  s[k].point << " " << s[k].job_id << endl;
            outfile.close();

            cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
            cin >> c;
        }
    }
}

void deleteCourseInfo()
{
    int i, j;
    Course s[20];
    char a[20];
    ifstream infile;
    ofstream outfile;
    char c = 'y';
    while(c == 'y')
    {
        infile.open("course.dat", ios::in);
        for(i = 0; !infile.eof(); i ++)
            infile >> s[i].course_id >> s[i].course_name >> s[i].point >> s[i].job_id;
        infile.close();
        i --;

        cout << "Now you can delete courses' basic information~ " << endl;
        cout << "Please enter the ID of the course whose information you want to delete! " << endl;
        cin >> a;
        for(j = 0; j < i; j ++)
            if(!strcmp(a, s[j].course_id))
            {
                outfile.open("course.dat", ios::out);
                for(int k = 0; k < i; k ++)
                {
                    if(k == j)
                    {
                        if(k == 0)
                            outfile << " " << endl;
                        continue;
                    }
                    outfile << s[k].course_id << " " << s[k].course_name << " " <<  s[k].point << " " << s[k].job_id << endl;
                }
                outfile.close();
                cout << "Well done! " << endl;

                cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
                cin >> c;
                break;
            }
        if(j == i)
        {
            cout << "Sorry,the course ID number does not exist! " << endl;
            cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
            cin >> c;
        }
    }
}

void inquireCourseInfo()
{
    ifstream infile;
    int i, j;
    Course s[20];
    char a[20];
    char c = 'y';
    while(c == 'y')
    {
        infile.open("course.dat", ios::in);
        for(i = 0; !infile.eof(); i ++)
            infile >> s[i].course_id >> s[i].course_name >> s[i].point >> s[i].job_id;
        infile.close();
        i --;

        cout << "Please enter the Id number you want to inquire~ " << endl;
        cin >> a;
        for(j = 0; j < i; j ++)
            if(!strcmp(a, s[j].course_id))
            {
                s[j].show();
                cout << endl;
                cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
                cin >> c;
                break;
            }
        if(j == i)
        {
            cout << "Sorry,the course ID number does not exist! " << endl;
            cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
            cin >> c;
        }
    }
}



void createScoreInfo()
{
    ofstream outfile;
    int i, j;
    outfile.open("score.dat", ios::out);
    Score s[20];
    cout << "Now please enter student Id number and course Id number for curricula-variable information~ " << endl;
    cout << "How many classes of scores do you want to enter? ";
    cin >> i;
    cout << "Please enter some information~ " << endl;
    for(j = 0; j < i; j ++)
    {
        cout << setw(10) << "stu id : ";
        cin >> s[j].stu_id;
        cout << setw(10) << "cou id : ";
        cin >> s[j].course_id;
        s[j].score = 0;
    }

    for(j = 0; j < i; j ++)
    {
        outfile << s[j].stu_id << " " << s[j].course_id << " " << s[j].score << endl;
    }
}







int showTeacherMenu()
{
    cout << "==========================Welcome to you, Teacher!===========================" << endl;
    cout << "=                                                                           =" << endl;
    cout << "=                         1.Enter students' scores.                         =" << endl;
    cout << "=                        2.Inquire score information.                       =" << endl;
    cout << "=                                                                           =" << endl;
    cout << "=============================================================================" << endl;
    cout << "Please enter your choice(1 or 2) : ";
    int i;
    cin >> i;
    return i;
}

void teacherOperate(int j)
{
    switch(j)
    {
    case 1:
        enterScore();
        break;
    case 2:
        inquireScore();
        break;
    }
}

void enterScore()
{
    ifstream infile;
    ofstream outfile;
    int i, j;
    Score s[20];
    char a[20];
    char c = 'y';
    while(c == 'y')
    {
        cout << "Now please enter course Id number, so that you can enter the course's scores! " << endl;
        cin >> a;

        infile.open("score.dat", ios::in);
        for(i = 0; !infile.eof(); i ++)
            infile >> s[i].stu_id >> s[i].course_id >> s[i].score;
        infile.close();
        i --;

        for(j = 0; j < i; j ++)
        {
            if(!strcmp(a, s[j].course_id))
            {
                cout << "Please enter the student's score whose student id is " << s[j].stu_id << " : ";
                cin >> s[j].score;
            }
        }
        outfile.open("score.dat", ios::out);
        for(j = 0; j < i; j ++)
            outfile << s[j].stu_id << " " << s[j].course_id << " " << s[j].score << endl;
        outfile.close();

        cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
        cin >> c;
    }
}

void inquireScore()
{
    ifstream infile;
    ofstream outfile;
    int i, j, f;
    Score s[20];
    char a[20];
    char c = 'y';
    double sum;
    while(c == 'y')
    {
        sum = 0;
        f = 0;
        cout << "Now please enter course Id number, so that you can inquire score information! " << endl;
        cin >> a;

        infile.open("score.dat", ios::in);
        for(i = 0; !infile.eof(); i ++)
            infile >> s[i].stu_id >> s[i].course_id >> s[i].score;
        infile.close();
        i --;

        for(j = 0; j < i; j ++)
            if(!strcmp(a, s[j].course_id))
            {
                f ++;
                cout << right;
                cout << setw(8) << "stu id: " << setw(6) << s[j].stu_id << setw(8) << "score: " << setw(4) << s[j].score << endl;
                sum += s[j].score;
            }

        if(f == 0)
        {
            cout << "Sorry, the score information does not exist!" << endl;
            cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
            cin >> c;
        }
        else
        {
            cout << "The average of the scores is " << sum / f << endl;
            cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
            cin >> c;
        }
    }
}







int showStudentMenu()
{
    cout << "===========================Welcome to you, Student!==========================" << endl;
    cout << "=                                                                           =" << endl;
    cout << "=                       1.Inquire my basic information.                     =" << endl;
    cout << "=                       2.Inquire my score information.                     =" << endl;
    cout << "=                                                                           =" << endl;
    cout << "=============================================================================" << endl;
    cout << "Please enter your choice(1 or 2) : ";
    int i;
    cin >> i;
    return i;
}

void studentOperate(int j)
{
    switch(j)
    {
    case 1:
        inquireBasicInfo();
        break;
    case 2:
        inquireScoreInfo();
        break;
    }
}

void inquireBasicInfo()
{
    char a[20];
    Student s[20];
    ifstream infile;
    int i, j;
    char c = 'y';
    while(c == 'y')
    {
        cout << "Please enter your student Id number: ";
        cin >> a;

        infile.open("student.dat", ios::in);
        for(i = 0; !infile.eof(); i ++)
        {
            infile >> s[i].stu_id >> s[i].name >> s[i].sex >> s[i].major >> s[i].birthdate.year >> s[i].birthdate.month
             >> s[i].status >> s[i].address;
        }
        infile.close();
        i --;

        for(j = 0; j < i; j ++)
            if(!strcmp(a, s[j].stu_id))
            {
                s[j].show();
                c = 'q';
                break;
            }
        if(j == i)
        {
            cout << "The Id number you entered does not exist! " << endl;
            cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
            cin >> c;
        }
    }
}

void inquireScoreInfo()
{
    char a[20];
    Score s[20];
    ifstream infile;
    int i, j, f;
    char c = 'y';
    while(c == 'y')
    {
        f = 0;
        cout << "Please enter your student Id number: ";
        cin >> a;

        infile.open("score.dat", ios::in);
        for(i = 0; !infile.eof(); i ++)
            infile >> s[i].stu_id >> s[i].course_id >> s[i].score;
        infile.close();
        i --;

        for(j = 0; j < i; j ++)
            if(!strcmp(a, s[j].stu_id))
            {
                f ++;
                s[j].show();
                c = 'q';
            }
        if(f == 0)
        {
            cout << "The Id number you entered does not exist! " << endl;
            cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
            cin >> c;
        }
    }
}






void modify_password()
{
    ifstream infile;
    ofstream outfile;
    User s[20];
    char a[20];
    char b[20];
    char c[20];
    int i, j;
    char d = 'y';

    while(d == 'y')
    {
        infile.open("users.dat", ios::in);
        for(i = 0; !infile.eof(); i++)
            infile >> s[i].username >> s[i].password >> s[i].right;
        infile.close();
        i --;

        cout << "Now please enter your user name. " << endl;
        cin >> a;
        cout << "Now please enter your original password. " << endl;
        cin >> b;
        cout << "Now please enter your new password. " << endl;
        cin >> c;

        for(j = 0; j < i; j++)
            if(!strcmp(a, s[j].username))
            {
                if(!strcmp(b, s[j].password))
                {
                    strcpy(s[j].password, c);

                    outfile.open("users.dat", ios::out);
                    for(int k = 0; k < i; k ++)
                        outfile << s[k].username << " " << s[k].password << " " << s[k].right << endl;
                    outfile.close();

                    cout << "Well done!" << endl;
                    return;
                }
                else
                {
                    cout << "The password is not correct! " << endl;
                    cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
                    cin >> d;
                    break;
                }
            }
        if(j == i)
        {
            cout << "Sorry, the user name does not exist! " << endl;
            cout << "Do you want to try again?(Enter 'y' to try again, 'q' to quit...) ";
            cin >> d;
        }
    }
}
