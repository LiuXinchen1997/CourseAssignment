#ifndef LIST_H
#define LIST_H

#include <iostream>
#include <cstdlib>
#include <time.h>
#include <stack>

#define Posi(T) ListNode<T>*
#define Rank int

using namespace std;

template <typename T>
struct ListNode{
    T data;
    Posi(T) pred;
    Posi(T) succ;
    ListNode() {}
    ListNode(T e, Posi(T) p = NULL, Posi(T) s = NULL)
        : data(e), pred(p), succ(s) {}
    Posi(T) insertAsPred(T const& e);
    Posi(T) insertAsSucc(T const& e);
};



template <typename T>
Posi(T) ListNode<T>::insertAsPred(T const& e)
{
    Posi(T) x = new  ListNode(e, pred, this);
    pred->succ = x;
    this->pred = x;
    return x;
}

template <typename T>
Posi(T) ListNode<T>::insertAsSucc(T const& e)
{
    Posi(T) x = new ListNode(e, this, succ);
    this->succ = x;
    succ->pred = x;
    return x;
}











template <typename T>
class List
{
private:
    Posi(T) header;
    Posi(T) trailer;
protected:
    void init();
    Posi(T) selectMax(Posi(T) p, int n);
public:
    Posi(T) first();
    Posi(T) getHeader() { return header; }
    Posi(T) getTrailer() { return trailer; }
    int _size; int size() { return _size; }
    bool isEmpty();

    List() {init();}
    List( T* a, int n );
    T operator[](Rank r);
    Posi(T) find(T const& e, int n, Posi(T) p) const;
    Posi(T) find(T const& e, Posi(T) p, int n) const;

    Posi(T) insertBefore(Posi(T) p, T const& e);
    Posi(T) insertAfter(Posi(T) p, T const& e);
    void copyNodes(Posi(T) p, int n);
    void insertAsLast(T const& e);
    T remove(Posi(T) p);
    int clear(); ~List();
    int deduplicate();

    int uniquify();
    Posi(T) search(T const& e, int n, Posi(T) p) const;
    void setting() { selectSort(); uniquify(); }


    ///选择排序
    void selectSort(Posi(T) p, int n);
    void selectSort() { if( first()==NULL ) return; selectSort( first(), _size ); }
    ///插入排序
    void insertionSort(Posi(T) p, int n );
    void insertionSort() { if( first()==NULL ) return; insertionSort( first(), _size ); }
    ///排序总算法
    void Sort();

    void tranverse();

    bool IN_SET( T e );
    void INSERT_SET( T e );
    void SHOW();
};

template <typename T>
bool List<T>::isEmpty()
{
    if ( List<T>::getHeader()->succ == List<int>::getTrailer() ) return true;
    else return false;
}

template <typename T>
List<T>::List( T* a, int n )
{
    init();
    for( int i = 0; i < n; i++ )
        insertBefore( trailer, *(a+i) );
}

template <typename T>
Posi(T) List<T>::first()
{
    if(0 == _size) return NULL;
    return header->succ;
}

template <typename T>
void List<T>::init()
{
    header = new ListNode<T>;
    trailer = new ListNode<T>;
    header->succ = trailer;
    header->pred = NULL;
    trailer->pred = header;
    trailer->succ = NULL;
    _size = 0;
}

template <typename T>
T List<T>::operator[](Rank r)
{
    Posi(T) p = first();
    while(0 < r--) p = p->succ;
    return p->data;
}

template <typename T>
Posi(T) List<T>::find(T const & e, int n, Posi(T) p) const
{
    while(0 < n--)
        if(e == (p = p->pred)->data) return p;
    return NULL;
}

template <typename T>
Posi(T) List<T>::find(T const& e, Posi(T) p, int n) const
{
    while(0 < n--)
        if(e == (p = p->succ)->data) return p;
    return NULL;
}

template <typename T>
Posi(T) List<T>::insertBefore(Posi(T) p, T const& e)
{
    _size++;
    return p->insertAsPred(e);
}

template <typename T>
Posi(T) List<T>::insertAfter(Posi(T) p, T const& e)
{
    _size++;
    return p->insertAsSucc(e);
}

template <typename T>
void List<T>::copyNodes(Posi(T) p, int n)
{
    init();
    while(n--)
    {
        insertAsLast(p->data);
        p = p->succ;
    }
    setting();
}

template <typename T>
void List<T>::insertAsLast(T const& e)
{
    insertBefore(trailer, e);
}

template <typename T>
T List<T>::remove(Posi(T) p)
{
    T e = p->data;
    p->pred->succ = p->succ;
    p->succ->pred = p->pred;
    delete p;
    _size--;
    return e;
}

template <typename T>
List<T>::~List()
{
    clear();
    delete header;
    delete trailer;
}

template <typename T>
int List<T>::clear()
{
    int oldSize = _size;
    while( header->succ != trailer )
        remove(header->succ);
    return oldSize;
}

template <typename T> ///无序表中的唯一化算法。
int List<T>::deduplicate()
{
    if(_size < 2) return 0;
    int oldSize = _size;
    Posi(T) p = first(); Rank r = 1;
    while( trailer != ( p = p->succ ) ){
        Posi(T) q = find( p->data, r, p);
        q ? remove(q) : r++;
    }
    return oldSize - _size;
}

template <typename T> ///有序表中的唯一化算法。
int List<T>::uniquify()
{
    if ( _size < 2 ) return 0;
    int oldSize = _size;
    Posi(T) p = first(); Posi(T) q;
    while ( trailer != ( q = p->succ) )
    {
        if ( p->data != q->data) p = q;
        else remove(q);
    }
    return oldSize - _size;
}

template <typename T> ///有序表中的查找算法。
Posi(T) List<T>::search(T const& e, int n, Posi(T) p) const
{
    while ( 0 <= n-- )
        if ( ( ( p = p->pred ) -> data ) <= e ) break;
    return p;
}

///排序算法
template <typename T>
void List<T>::selectSort( Posi(T) p, int n )
{
    Posi(T) head = p->pred; Posi(T) tail = p;
    for (int i = 0; i < n; i++) tail = tail->succ;
    while( 1 < n ) {
        insertBefore( tail, remove( selectMax(head->succ, n ) ) );
        tail = tail->pred; n--;
    }
}

template <typename T>
Posi(T) List<T>::selectMax(Posi(T) p, int n)
{
    Posi(T) max = p;
    for (Posi(T) cur = p; 1 < n; n--)
        if( (cur = cur->succ)->data >= max->data)
            max = cur;
    return max;
}

template <typename T>
void List<T>::insertionSort(Posi(T) p, int n)
{
    for(int r = 0; r < n; r++){
        insertAfter( search(p->data, r, p), p->data );
        p = p->succ; remove( p->pred );
    }
}

template <typename T>
void List<T>::Sort()
{
    srand((unsigned int)time(NULL));
    switch( rand() % 2 ) {
        case 0: selectSort(); break;
        case 1: insertionSort(); break;
        default: selectSort(); break;
    }
}


///用于debug的遍历输出
template <typename T>
void List<T>::tranverse()
{
    Posi(T) p = first();
    if( NULL == p ) return;
    while( p != trailer ) {
        cout << p->data << " ";
        p = p->succ;
    }
    cout << endl;
}





template <typename T>
bool List<T>::IN_SET( T e )
{
    if ( isEmpty() ) return false;
    return find( e, first()->pred, size() );
}

template <typename T>
void List<T>::INSERT_SET( T e )
{
    insertBefore( trailer, e );
    setting();
}

template <typename T>
void List<T>::SHOW()
{
    stack<int> s;
    Posi(T) p = first();
    if( p == NULL ) { cout << "Nothing!" << endl; return; }
    while( p && ( p != getTrailer() ) ) {
        s.push( p->data );
        p = p->succ;
    }

    while( !s.empty() ) {
        cout << s.top() << " ";
        s.pop();
    }

    cout << endl;
}

template <typename T>
void AND( List<T>& A, List<T>& B, List<T>& C )
{
    C.clear();
    for( int i = 0; i < A.size(); i++ )
        if ( B.IN_SET(A[i]) ) C.insertBefore( C.getTrailer(), A[i] );
    C.setting();
}

template <typename T>
void OR( List<T>& A, List<T>& B, List<T>& C )
{
    C.clear();
    for( int i = 0; i < A.size(); i++ )
        C.insertBefore( C.getTrailer(), A[i] );
    for( int i = 0; i < B.size(); i++ )
        C.insertBefore( C.getTrailer(), B[i] );
    C.setting();
}

template <typename T>
void XOR( List<T>& A, List<T>& B, List<T>& C )
{
    C.clear();
    for( int i = 0; i < A.size(); i++ )
        if ( !B.IN_SET(A[i]) ) C.insertBefore( C.getTrailer(), A[i] );
    for( int i = 0; i < B.size(); i++ )
        if ( !A.IN_SET(B[i]) ) C.insertBefore( C.getTrailer(), B[i] );
    C.setting();
}

#endif // LIST_H
