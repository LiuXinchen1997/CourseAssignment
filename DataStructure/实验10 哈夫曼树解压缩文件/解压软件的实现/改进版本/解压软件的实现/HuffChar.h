#ifndef HUFFCHAR_H_INCLUDED
#define HUFFCHAR_H_INCLUDED

struct HuffChar {
    char ch; int weight; //字符内容、频率
    HuffChar( char c = '^', int w = 0 )
        : ch( c ), weight( w ) {};

    //此处相反设置为后面算法实现提供便利
    //在哈夫曼树中，权值小的在下，权值大的在上。
    bool operator< ( HuffChar const& hc ) { return weight > hc.weight; }
    bool operator== ( HuffChar const& hc ) { return weight == hc.weight; }
};

#endif // HUFFCHAR_H_INCLUDED
