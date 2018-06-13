#ifndef BINTREE_H_INCLUDED
#define BINTREE_H_INCLUDED

#include <queue>

#include "BinNode.h"

template <class T> class BinTree
{
private:
    BinNode<T> *root;

public:
    BinTree() : root(NULL) { };
    BinTree(T data); //Data as root value.
    BinTree(T *data, int n);

    BinNode<T> *insertAsRoot( T const& e );
    BinNode<T> *getRoot() { return root; }

    BinNode<T> *attachAsLC( BinNode<T>* x, BinTree<T>* &S ) { x->lChild = S->root; }
    BinNode<T> *attachAsRC( BinNode<T>* x, BinTree<T>* &S ) { x->rChild = S->root; }
};

template <class T>
BinTree<T>::BinTree(T data)
{
    root = new BinNode<T>; root -> data = data;
    root -> lChild = NULL; root -> rChild = NULL;
}

template <class T>
BinTree<T>::BinTree(T *data, int n)
{
    queue<BinNode<T> *> q;
    root = new BinNode<T>;
    root -> data = *data; data++; n--;
    root -> lChild = NULL; root -> rChild = NULL;

    BinNode<T> *curNode = root;
    while( n ) {
        if( !(curNode -> hasLChild()) ) {
            q.push( curNode -> insertAsLC( *data ) ); data++; n--;
        }
        else if( !(curNode -> hasRChild()) ) {
            q.push( curNode -> insertAsRC( *data ) ); data++; n--;
        }
        else {
            curNode = q.front(); q.pop();
        }
    }
}

template <class T>
BinNode<T>* BinTree<T>::insertAsRoot( T const& e )
{ return root = new BinNode<T>( e ); }



#endif // BINTREE_H_INCLUDED
