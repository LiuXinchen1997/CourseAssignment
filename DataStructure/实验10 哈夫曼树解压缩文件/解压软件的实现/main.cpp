/********************************************************************
*  算法描述：                                                       *
*  字符集Σ1与Σ2之间没有公共字符，且PFC编码方案对应于二叉树T1与T2, *
*  则通过引入一个根节点合并T1与T2之后所得到的二叉树,就是对应于    *
*  Σ1∪Σ2的一种PFC编码方案。                                         *
*  而哈夫曼编码算法，即是在此编码算法上进行拓展。                  *
**********************************************************************/

#include "BinTree.h"
#include "lib.h"
#define FILE_NAME "demo.txt" //待压缩文件
#define COMPRESS_FILE "compress.zip" //压缩文件
#define DECOMPRESS_FILE "decompress.txt" //解压文件

//for(int i=0x20; i<0x80;i++){ cout <<char(i)<<" "<<(*table)[i]<<endl; }
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
            '0' == s[i] ? code = code << 1 : code = (code << 1) | 1; count++;
        }
    }
    infile.close(); outfile.close();

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
