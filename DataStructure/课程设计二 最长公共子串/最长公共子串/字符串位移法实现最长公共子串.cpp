#include <iostream>
#include <string>

using namespace std;

void longestCommonSubstring( string str1, string str2 )
{
    int s1_start; ///���ַ����������� ��str1����ʼλ��
    int s2_start; ///���ַ����������� ��str2����ʼλ��
    int idx; ///�ڶ����ַ�����������������ɨ��ʱ���ڼ����ı���
    int curmax, max, k; ///curmax:��ǰ���������л�õ�һ��������
                        ///�����Ӵ��ĳ��ȣ�ͬһ������������ж����
                        ///���Ӵ���
                        ///max:�����ַ��� ��󹫹��Ӵ�����
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
    cout << "������Ӵ���" << LCS << endl; delete LCS;
}

int main()
{
    string s1; string s2;
    cout << "�������ַ���1��"; cin >> s1;
    cout << "�������ַ���2��"; cin >> s2;

    longestCommonSubstring( s1, s2 );

    return 0;
}
