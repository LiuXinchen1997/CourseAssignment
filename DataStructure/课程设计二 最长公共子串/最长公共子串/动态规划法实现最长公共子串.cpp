#include <iostream>
#include <string>

using namespace std;

void longestCommonSubstring( string str1, string str2 )
{
    int max, x, y;
    int len1 = str1.length();
    int len2 = str2.length();

    int** c = new int*[len1+1];
    for( int i = 0; i < len1 + 1; i++ ) c[i] = new int[len2+1];

    for( int i = 0; i < len1 + 1; i++ ) c[i][0] = 0;
    for( int j = 0; j < len2 + 1; j++ ) c[0][j] = 0;
    max = -1;

    for( int i = 1; i < len1 + 1; i++ )
        for( int j = 1; j < len2 + 1; j++ ) {
            if( str1[i-1] == str2[j-1] ) c[i][j] = c[i-1][j-1] + 1;
            else c[i][j] = 0;

            if( c[i][j] > max ) {
                max = c[i][j];
                x = i; y = j;
            }
        }

    char *LCS = new char[max];
    int k = max;
    LCS[k--] = '\0';
    for( int i = x - 1, j = y - 1; i >= 0 && j >= 0; ) {
        if( str1[i] == str2[j] ) {
            LCS[k--] = str1[i];
            i--; j--;
        }
        else break;
    }

    cout << "×î³¤¹«¹²×Ó´®£º" << LCS << endl; delete LCS;
}

int main()
{
    string s1; string s2;
    cout << "ÇëÊäÈë×Ö·û´®1£º"; cin >> s1;
    cout << "ÇëÊäÈë×Ö·û´®2£º"; cin >> s2;

    longestCommonSubstring( s1, s2 );
    return 0;
}
