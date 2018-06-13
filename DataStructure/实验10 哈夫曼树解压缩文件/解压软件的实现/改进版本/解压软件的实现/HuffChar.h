#ifndef HUFFCHAR_H_INCLUDED
#define HUFFCHAR_H_INCLUDED

struct HuffChar {
    char ch; int weight; //�ַ����ݡ�Ƶ��
    HuffChar( char c = '^', int w = 0 )
        : ch( c ), weight( w ) {};

    //�˴��෴����Ϊ�����㷨ʵ���ṩ����
    //�ڹ��������У�ȨֵС�����£�Ȩֵ������ϡ�
    bool operator< ( HuffChar const& hc ) { return weight > hc.weight; }
    bool operator== ( HuffChar const& hc ) { return weight == hc.weight; }
};

#endif // HUFFCHAR_H_INCLUDED
