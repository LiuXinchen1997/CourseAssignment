#include <iostream>
#include <string>
#include <fstream>
#include <cstdlib>

using namespace std;

int main()
{
    const int NUM = 50;
    char chs[NUM] = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
    'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '.', '/',
    '<', '>', '?', ';', ':', '[', ']', '{', '}', '*', '&' };


    int len;
    cout << "�����������ַ������ȣ�";
    cin >> len;
    string file_path;
    cout << "�������ı��ļ�·����";
    cin >> file_path;
    ofstream outfile(file_path.c_str());

    for (int i = 0; i < len; i++) {
        char ch = chs[rand() % NUM];
        outfile << ch;
    }

    cout << "�Ѿ��ɹ������ַ�����" << endl;
    system("pause");
    return 0;
}
