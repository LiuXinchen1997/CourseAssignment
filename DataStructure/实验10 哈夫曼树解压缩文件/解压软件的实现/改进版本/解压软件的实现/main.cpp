/********************************************************************
*  算法描述：                                                       *
*  字符集Σ1与Σ2之间没有公共字符，且PFC编码方案对应于二叉树T1与T2, *
*  则通过引入一个根节点合并T1与T2之后所得到的二叉树,就是对应于    *
*  Σ1∪Σ2的一种PFC编码方案。                                         *
*  而哈夫曼编码算法，即是在此编码算法上进行拓展。                  *
**********************************************************************/

/*********************************************************************
*
* 目前存在的问题：
*   1、解压后的文件末尾会出现“奇怪字符”，可能是由于在进行压缩字符写
*入时，最后一个编码字节字符（8位）没有写满造成的。
*   2、将对一般文本文件的处理拓展至对各种文件（图片、音频、视频等）
*的压缩解压处理。
*   3、编写判断原文件与解压文件是否完全相同的函数，从而对程序性能的
*优劣进行判断。
*
**********************************************************************/
#include "BinTree.h"
#include "lib.h"
#define FILE_NAME "demo.txt" //待压缩文件
#define COMPRESS_FILE "compress.zip" //压缩文件
#define DECOMPRESS_FILE "decompress.txt" //解压文件

//for(int i=0x00; i<0xFF; i++){ cout <<char(i)<<" "<<(*table)[i]<<endl; }
string convert( char ch );


int main()
{
    int *freq = statistics( FILE_NAME ); //获取文本文件中各字符出现的频率
    HuffForest* forest = initForest( freq );
    HuffTree* tree = generateTree( forest );
    HuffTable* table = getTable( tree );

    //压缩文件
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
    while( infile.get(ch) ) { //读取待解压文件内容
        string s = (*table)[ch];
        for(int i = 0; i < s.length(); i++) { //将读到的字符替换为对应的Huffman编码
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

    //解压文件
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
