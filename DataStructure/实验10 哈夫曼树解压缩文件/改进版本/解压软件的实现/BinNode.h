#ifndef BINNODE_H_INCLUDED
#define BINNODE_H_INCLUDED

#include <iostream>
using namespace std;

template <class T> struct BinNode
{
    T data;
    BinNode *lChild, *rChild;

    BinNode *insertAsLC( T const & data );
    BinNode *insertAsRC( T const & data );
    bool hasLChild() { return lChild; }
    bool hasRChild() { return rChild; }
    bool isLeaf() { return ( !lChild && !rChild ); }

    BinNode() { }
    BinNode( T e, BinNode* lc=NULL, BinNode* rc=NULL ) : data(e), lChild(lc), rChild(rc) { }
};

template <class T>
BinNode<T> * BinNode<T>::insertAsLC( T const & data )
{
    lChild = new BinNode; lChild -> data = data;
    lChild -> lChild = NULL; lChild -> rChild = NULL;
    return lChild;
}

template <class T>
BinNode<T> * BinNode<T>::insertAsRC( T const & data )
{
    rChild = new BinNode; rChild -> data = data;
    rChild -> lChild = NULL; rChild -> rChild = NULL;
    return rChild;
}


#endif // BINNODE_H_INCLUDED
