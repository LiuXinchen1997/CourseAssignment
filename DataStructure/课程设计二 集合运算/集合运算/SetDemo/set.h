#ifndef SET_H
#define SET_H

#include "List.h"
#include <stack>

template <typename T>
class Set : public List<T>
{
public:
    Set() : List<T>() { List<T>::init(); };
    Set( T* a, int n ) : List<T>(a, n) { setting(); }
    Set( List<T>& s );
    Set( Set<T>& s );

    bool isEmpty();

    void setting() { List<T>::selectSort(); List<T>::uniquify(); }

    T operator[](Rank r);
    Set<T> operator+( Set<T> A ); ///并运算
    Set<T>& operator=( Set<T> A );

    ///For 集合运算
    bool IN_SET( T e );
    void INSERT_SET( T e );
    void SHOW();
};


template <typename T>
bool Set<T>::isEmpty()
{
    if ( List<T>::getHeader()->succ == List<int>::getTrailer() ) return true;
    else return false;
}

template <typename T>
T Set<T>::operator[](Rank r)
{
    Posi(T) p = List<T>::first();
    while(0 < r--) p = p->succ;
    return p->data;
}

template <typename T> /// 并运算！
Set<T> Set<T>::operator+( Set<T> A )
{
    Set<T> S(*this);
    Posi(T) p = A.getHeader();
    while( A.getTrailer() != ( p = p->succ ) )
        S.insertBefore( S.getTrailer(), p->data );

    S.setting();
    return S;
}

///如何实现 s1 = s2 + s3...
template <typename T>
Set<T>& Set<T>::operator=( Set<T> A )
{
    List<T>::clear();
    List<T>::copyNodes( A.getHeader()->succ, A.size() );
    setting(); return *this;
}


template <typename T>
Set<T>::Set( List<T>& s )
{
    List<T>::copyNodes( s.getHeader()->succ, s.size() );
    setting();
}

template <typename T>
Set<T>::Set( Set<T>& s )
{
    List<T>::copyNodes( s.getHeader()->succ, s._size );
    setting();
}


/// 集合测试函数
///注意：集合中的元素均是以非递减方式存储的。
///实际上，集合与链表的区别就在于集合元素的有序性与唯一性。

template <typename T>
bool Set<T>::IN_SET( T e )
{
    if ( isEmpty() ) return false;
    return List<T>::find( e, List<T>::first()->pred, List<T>::size() );
}

template <typename T>
void Set<T>::INSERT_SET( T e )
{
    if ( isEmpty() ) {
        ListNode<int>* p = new ListNode<int>(e);
        List<int>::getHeader()->succ = p; p->pred = List<int>::getHeader();
        List<int>::getTrailer()->pred = p; p->succ = List<int>::getTrailer();
    }
    else { List<T>::insertBefore( List<T>::first(), e ); setting(); }
}

template <typename T>
void Set<T>::SHOW()
{
    stack<int> s;
    Posi(T) p = List<T>::first();
    while( p && ( p != List<T>::getTrailer() ) ) {
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
void AND( Set<T> A, Set<T> B, Set<T>& C )
{
    C.clear();
    for( int i = 0; i < A.size(); i++ )
        if ( B.IN_SET(A[i]) ) C.insertBefore( C.getTrailer(), A[i] );
    C.setting();
}

template <typename T>
void OR( Set<T> A, Set<T> B, Set<T>& C )
{
    C.clear();
    for( int i = 0; i < A.size(); i++ )
        C.insertBefore( C.getTrailer(), A[i] );
    for( int i = 0; i < B.size(); i++ )
        C.insertBefore( C.getTrailer(), B[i] );
    C.setting();
}

template <typename T>
void XOR( Set<T> A, Set<T> B, Set<T>& C )
{
    C.clear();
    for( int i = 0; i < A.size(); i++ )
        if ( !B.IN_SET(A[i]) ) C.insertBefore( C.getTrailer(), A[i] );
    for( int i = 0; i < B.size(); i++ )
        if ( !A.IN_SET(B[i]) ) C.insertBefore( C.getTrailer(), B[i] );
    C.setting();
}


#endif // SET_H
