#ifndef STACK_H
#define STACK_H

const int MAXLEN = 15;

enum Error_Code
{
    success, overflow, underflow
};

template <typename T>
class Stack
{
private:
    T data[MAXLEN];
    int count;
public:
    Stack();
    bool empty() const;
    bool full() const;
    Error_Code get_top(T &x) const;
    Error_Code push(const T x);
    Error_Code pop();
};


template <typename T>
Stack<T>::Stack()
    : count(0)
{
}

template <typename T>
bool Stack<T>::empty() const { return count == 0; }

template <typename T>
bool Stack<T>::full() const { return count == MAXLEN; }

template <typename T>
Error_Code Stack<T>::get_top(T &x) const
{
    if( empty() ) return underflow;
    x = data[count - 1];
    return success;
}

template <typename T>
Error_Code Stack<T>::push(const T x)
{
    if( full() ) return overflow;
    data[count++] = x;
    return success;
}

template <typename T>
Error_Code Stack<T>::pop()
{
    if( empty() ) return underflow;
    count--;
    return success;
}





#endif // STACK_H
