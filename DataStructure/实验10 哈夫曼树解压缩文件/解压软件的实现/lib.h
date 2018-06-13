#ifndef LIB_H_INCLUDED
#define LIB_H_INCLUDED

#include "BinTree.h"
#include "HuffChar.h"

#include <vector>
#include <fstream>
#include<iostream>
#include <cstdlib>
#include <cstring>
#include <map>

#define N_CHAR ( 0x80 - 0x20 ) //ASCII码中可打印字符均位于此区间内

using namespace std;

#define HuffTree BinTree<HuffChar> //实现Huffman编码树
typedef vector< HuffTree* > HuffForest; //实现Hufman编码森林
typedef map<char,string> HuffTable; //实现Huffman编码表
typedef pair<char,string> Pair;

int* statistics( char* filename ) //统计各字符出现的频率
{
    int *freq = new int[N_CHAR];
    memset( freq, 0, sizeof( int ) * N_CHAR );

    ifstream infile( filename, ios::in );
    if(!infile) {
        cerr << "Open Error!" << endl;
        exit(1);
    }

    char ch;
    while( infile.get(ch) )
        if( ch >= 0x20 )
            freq[ ch - 0x20 ]++;
    /*for(int i=0;i<N_CHAR;i++)
        cout << char(0x20+i) << " " << freq[i]<<endl;*/

    infile.close();
    return freq;
}

HuffForest* initForest( int* freq ) //根据算法思想，初始时刻可视为是单节点二叉树
{                                   //集合，即一个森林。
    HuffForest* forest = new HuffForest;//构造每个单节点二叉树时需要用到频率作为权
    for ( int i = 0; i < N_CHAR; i++ ) {
        HuffTree* tree = new HuffTree( HuffChar( 0x20+i, freq[i] ) );
        forest->push_back( tree );
    }
    return forest;
}

//构造Huffman编码树
HuffTree* minHChar( HuffForest* forest )
{
    vector<HuffTree*>::iterator it = forest->begin(); //从首节点出发
    vector<HuffTree*>::iterator minChar = it; //最小Huffman树所在的节点位置
    int minWeight = (*it)->getRoot()->data.weight; //目前的最小权重

    for( ; it < forest->end(); it++ ) //基于迭代器遍历森林，找到根节点权值最小的树
        if( minWeight > (*it)->getRoot()->data.weight ) {
            minWeight = (*it)->getRoot()->data.weight; minChar = it; }

    HuffTree* minTree = *minChar;
    forest->erase( minChar ); //在森林中去除最小树

    return minTree;
}

HuffTree* generateTree( HuffForest* forest ) //哈夫曼树的构建算法
{
    while( 1 < forest->size() ) {
        HuffTree* T1 = minHChar( forest ); HuffTree* T2 = minHChar( forest );
        HuffTree* S = new HuffTree();
        int w = T1->getRoot()->data.weight + T2->getRoot()->data.weight;
        S->insertAsRoot( HuffChar( '^', w ) );
        S->attachAsLC( S->getRoot(), T1 ); S->attachAsRC( S->getRoot(), T2 );
        forest->push_back( S );
    }

    return forest->front();
}

//构造Huffman编码表
/*
void generateTable( BinNode<HuffChar>* p, int i, HuffTable* &table )
{
    if( p->isLeaf() )
        { Pair pa( (p->data).ch, i ); table->insert(pa); return; }

    if( p->hasLChild() )
        generateTable( p->lChild, i << 1, table );
    if( p->hasRChild() )
        generateTable( p->rChild, ( i << 1 ) | 1, table );
}
*/

void generateTable( BinNode<HuffChar>* p, string s, HuffTable* &table )
{
    if( p->isLeaf() )
        { Pair pa( (p->data).ch, s ); table->insert(pa); return; }

    if( p->hasLChild() )
        generateTable( p->lChild, s+'0', table );
    if( p->hasRChild() )
        generateTable( p->rChild, s+'1', table );
}

HuffTable* getTable( HuffTree* tree )
{
    HuffTable* table = new HuffTable; string s;
    generateTable( tree->getRoot(), s, table );
    return table;
}

#endif // LIB_H_INCLUDED
