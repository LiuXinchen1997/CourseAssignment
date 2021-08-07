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
    cout << "请输入生成字符串长度：";
    cin >> len;
    string file_path;
    cout << "请输入文本文件路径：";
    cin >> file_path;
    ofstream outfile(file_path.c_str());

    for (int i = 0; i < len; i++) {
        char ch = chs[rand() % NUM];
        outfile << ch;
    }

    cout << "已经成功生成字符串！" << endl;
    system("pause");
    return 0;
}
