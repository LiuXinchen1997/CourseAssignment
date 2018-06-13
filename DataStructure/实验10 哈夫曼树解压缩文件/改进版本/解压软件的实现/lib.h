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

#define N_CHAR ( 0x100 - 0x00 ) //һ���ֽ����ܱ�ʾ���������

using namespace std;

#define HuffTree BinTree<HuffChar> //ʵ��Huffman������
typedef vector< HuffTree* > HuffForest; //ʵ��Hufman����ɭ��
typedef map<char,string> HuffTable; //ʵ��Huffman�����
typedef pair<char,string> Pair;

int* statistics( char* filename ) //ͳ�Ƹ��ַ����ֵ�Ƶ��
{
    int *freq = new int[N_CHAR];
    memset( freq, 0, sizeof( int ) * N_CHAR );

    ifstream infile( filename, ios::binary );
    if(!infile) {
        cerr << "Open Error!" << endl;
        exit(1);
    }

    char ch;
    while( !( infile.eof() ) ) {
        infile.read( &ch, sizeof(char) );
        if( ch <= 255 && ch >= 0 ) freq[ ch - 0x00 ]++;
    }
    /* //For debug!
    for(int i=0;i<N_CHAR;i++)
        cout << 0x00+i << " " << freq[i]<<endl;*/

    infile.close();
    return freq;
}

HuffForest* initForest( int* freq ) //�����㷨˼�룬��ʼʱ�̿���Ϊ�ǵ��ڵ������
{                                   //���ϣ���һ��ɭ�֡�
    HuffForest* forest = new HuffForest;//����ÿ�����ڵ������ʱ��Ҫ�õ�Ƶ����ΪȨ
    for ( int i = 0; i < N_CHAR; i++ ) {
        HuffTree* tree = new HuffTree( HuffChar( 0x00+i, freq[i] ) );
        forest->push_back( tree );
    }
    return forest;
}

//����Huffman������
HuffTree* minHChar( HuffForest* forest )
{
    vector<HuffTree*>::iterator it = forest->begin(); //���׽ڵ����
    vector<HuffTree*>::iterator minChar = it; //��СHuffman�����ڵĽڵ�λ��
    int minWeight = (*it)->getRoot()->data.weight; //Ŀǰ����СȨ��

    for( ; it < forest->end(); it++ ) //���ڵ���������ɭ�֣��ҵ����ڵ�Ȩֵ��С����
        if( minWeight > (*it)->getRoot()->data.weight ) {
            minWeight = (*it)->getRoot()->data.weight; minChar = it; }

    HuffTree* minTree = *minChar;
    forest->erase( minChar ); //��ɭ����ȥ����С��

    return minTree;
}

HuffTree* generateTree( HuffForest* forest ) //���������Ĺ����㷨
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

//����Huffman�����
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
