#include <iostream>
#include <string>

using namespace std;

void longestCommonSubstring( string str1, string str2 )
{
    int s1_start; ///两字符串公共区域 中str1的起始位置
    int s2_start; ///两字符串公共区域 中str2的起始位置
    int idx; ///在对两字符串公共区域进行逐个扫描时用于计数的变量
    int curmax, max, k; ///curmax:当前公共区域中获得的一个完整的
                        ///公共子串的长度（同一公共区域可能有多个公
                        ///共子串）
                        ///max:两个字符串 最大公共子串长度
    int len1 = str1.length();
    int len2 = str2.length();
    int len = len1 + len2;
    max = 0;

    for( int i = 0; i < len; i++ ) {
        s1_start = s2_start = 0;
        if( i < len1 ) s1_start = len1 - i;
        else s2_start = i - len1;

        curmax = 0;
        for( idx = 0; ( s1_start + idx < len1 ) && ( s2_start + idx < len2 ); idx++ )
            if( str1[s1_start+idx] == str2[s2_start+idx]) curmax++;
            else {
                if( curmax > max ) {
                    max = curmax;
                    k = s1_start + idx - 1;
                }
                curmax = 0;
            }
        if( curmax > max ) {
            max = curmax;
            k = s1_start + idx - 1;
        }
    }

    char *LCS = new char[max];
    for( int i = 0; i < max; i++ ) LCS[i] = str1[k-max+1+i];
    LCS[max] = '\0';
    cout << "最长公共子串：" << LCS << endl; delete LCS;
}

int main()
{
    string s1; string s2;
    cout << "请输入字符串1："; cin >> s1;
    cout << "请输入字符串2："; cin >> s2;

    longestCommonSubstring( s1, s2 );

    return 0;
}
