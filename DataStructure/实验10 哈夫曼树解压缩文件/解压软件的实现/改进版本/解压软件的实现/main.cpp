/********************************************************************
*  �㷨������                                                       *
*  �ַ�����1�릲2֮��û�й����ַ�����PFC���뷽����Ӧ�ڶ�����T1��T2, *
*  ��ͨ������һ�����ڵ�ϲ�T1��T2֮�����õ��Ķ�����,���Ƕ�Ӧ��    *
*  ��1�Ȧ�2��һ��PFC���뷽����                                         *
*  �������������㷨�������ڴ˱����㷨�Ͻ�����չ��                  *
**********************************************************************/

/*********************************************************************
*
* Ŀǰ���ڵ����⣺
*   1����ѹ����ļ�ĩβ����֡�����ַ����������������ڽ���ѹ���ַ�д
*��ʱ�����һ�������ֽ��ַ���8λ��û��д����ɵġ�
*   2������һ���ı��ļ��Ĵ�����չ���Ը����ļ���ͼƬ����Ƶ����Ƶ�ȣ�
*��ѹ����ѹ����
*   3����д�ж�ԭ�ļ����ѹ�ļ��Ƿ���ȫ��ͬ�ĺ������Ӷ��Գ������ܵ�
*���ӽ����жϡ�
*
**********************************************************************/
#include "BinTree.h"
#include "lib.h"
#define FILE_NAME "demo.txt" //��ѹ���ļ�
#define COMPRESS_FILE "compress.zip" //ѹ���ļ�
#define DECOMPRESS_FILE "decompress.txt" //��ѹ�ļ�

//for(int i=0x00; i<0xFF; i++){ cout <<char(i)<<" "<<(*table)[i]<<endl; }
string convert( char ch );


int main()
{
    int *freq = statistics( FILE_NAME ); //��ȡ�ı��ļ��и��ַ����ֵ�Ƶ��
    HuffForest* forest = initForest( freq );
    HuffTree* tree = generateTree( forest );
    HuffTable* table = getTable( tree );

    //ѹ���ļ�
    ifstream infile( FILE_NAME );
    if(!infile) {
        cerr << "Infile Error!" << endl;
        exit(1);
    }
    ofstream outfile( COMPRESS_FILE, ios::binary );
    if(!outfile) {
        cerr << "Outfile Error!" << endl;
        exit(1);
    }

    char ch; char code = '\0'; int count = 0;
    while( infile.get(ch) ) { //��ȡ����ѹ�ļ�����
        string s = (*table)[ch];
        for(int i = 0; i < s.length(); i++) { //���������ַ��滻Ϊ��Ӧ��Huffman����
            if( count >= 8 ) {
                outfile.write( &code, sizeof(char) );
                count = 0; code = '\0';
            }
            '0' == s[i] ? code = code << 1 : code = (code << 1) | 1;
            count++;
        }
    }
    infile.close(); outfile.close();
    cout << "Compress complete!" << endl;

    //��ѹ�ļ�
    infile.open( COMPRESS_FILE, ios::binary );
    outfile.open( DECOMPRESS_FILE );
    char decode = '\0';

    BinNode<HuffChar>* x = tree->getRoot();
    while( !( infile.eof() ) ) {
        infile.read( &decode, sizeof(char) );
        string str = convert(decode);

        for( int i = 0; i < 8; i++ ) {
            x = (str[i] == '0') ? x->lChild : x->rChild;
            if( x->isLeaf() ) { outfile.put(x->data.ch); x = tree->getRoot(); }
        }
    }

    infile.close(); outfile.close();
    cout << "Decompress complete!" << endl;

    return 0;
}


string convert( char ch )
{
    string s;
    for(int i = 0; i < 8; i++) {
        s.insert( 0, 1, char( (ch % 2) + '0') );
        ch = ch >> 1;
    }

    return s;
}
