/**********************************************************************
*
*   �������㷨��Ϊ�����㷨�������˼·�ǲ���ѡȡ������Ϣ��������
*�����������������ϣ������������
*   ��Ϣ���涨��Ϊ�ڵ������ӽڵ����Ϣ��֮�����������Ϣ�Ĳ�����
*����Ϣ�Ĳ��ȶ��ԡ���Ϣ����Խ�󣬸�������Ϊһ�����ĸ��ڵ����ʹ��
*��������ࡣ
*   ����˼·������������ʹ��һ��ѵ�����ļ����л���ѧϰ�����������
*�ٸ���һ��δ�������ߣ���������δ֪�����������ļ����û���ͨ������
*���ܹ��Ը��������ļ�������ȷ�ľ��ߣ�������������
*
**********************************************************************/

#include <fstream>
#include <cstdlib>
#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <cmath>

using namespace std;

#define MAXLEN 6 //����ÿ�е����ݸ���
#define EXERCISE_FILE "exercise.txt"
#define SAMPLES_FILE "samples.txt"
#define DECISION_FILE "decision.txt"

///�������ʵ��
///�������ÿ���ڵ�����к�����vector������ķ��������������
///ע��ά��ʣ��������ʣ��������Ϣ������ʱ���������ѭ�������򿿵ݹ�

///����Ϊ��������������Ҫ�õ���һЩ��Ϣ�����ݽṹ
vector < vector<string> > state; ///ʵ����
vector <string> item( MAXLEN ); ///��Ӧһ��ʵ����
vector <string> attribute_row; ///�������� �� ����������

string end("end");
string yes("Y");
string no("N");
string blank("");

///�洢���Զ�Ӧ����������ֵ
map < string, vector< string > > map_attribute_values;
int tree_size = 0;

///�������ڵ�
struct Node {
    string attribute; ///����
    string arrived_value; ///���������ֵ
    vector < Node* > childs; ///���еĺ���

    Node() {
        attribute = blank;
        arrived_value = blank;
    }
};

///���ݶ�ά����ʵ����state�����ȡ������ֵ��ɵ�map_attribute_values
void ComputeMapForm2DVector()
{
    unsigned int i, j, k;
    bool existed = false;
    vector< string > values;

    for( i = 1; i < MAXLEN - 1; i++ ) { ///�����б���
        for( j = 1; j < state.size(); j++ ) { ///������state��һ��Ϊ����������˴ӵڶ��п�ʼ
            for( k = 0; k < values.size(); k++ )
                if( !values[k].compare(state[j][i]) ) existed = true;
            if( !existed ) values.push_back(state[j][i]);
            existed = false;
        }
        map_attribute_values[ state[0][i] ] = values;
        values.erase( values.begin(), values.end() );
    }
}

///���ݾ������Ժ�ֵ��������
double ComputeEntropy( vector < vector <string> > remain_state,
                      string attribute, string value, bool ifParent ) {
    vector<int> count(2, 0); ///�ֱ������洢�������������͸����ĸ���
    unsigned int i, j;
    bool done_flag = false; ///�ڱ�ֵ
    for( j = 1; j < MAXLEN; j++ ) {
        if( done_flag ) break;
        if( !attribute_row[j].compare(attribute) ) {
            for( i = 1; i < remain_state.size(); i++ )
                if( !ifParent && !remain_state[i][j].compare(value) || ifParent )
                    if( !remain_state[i][MAXLEN-1].compare(yes) ) count[0]++;
                    else count[1]++;

            done_flag = true;
        }
    }

    if( 0 == count[0] || 0 == count[1] ) return 0; ///ȫ�����������߸���

    ///��������أ�����(+count[0],-count[1]),log2Ϊ�׿�ͨ�����׹�ʽ������Ȼ������
    double sum = count[0] + count[1];
    double entropy = -(count[0]/sum)*(log(count[0]/sum)/log(2.0))-(count[1]/sum)*(log(count[1]/sum)/log(2.0));
    return entropy;
}

///���㰴������attribute���ֵ�ǰʣ��ʵ������Ϣ����
double ComputeGain( vector <vector <string> > remain_state, string attribute )
{
    unsigned int j, k, m;

    ///������������ʱ���أ����أ�
    double parent_entropy = ComputeEntropy( remain_state, attribute, blank, true );
    double children_entropy = 0;

    ///Ȼ���������ֺ����ֵ����
    vector <string> values = map_attribute_values[ attribute ];
    vector <double> ratio;
    vector <int> count_values;
    int tempint;

    ///�õ�attribute��ÿ������ֵ��remain_state�еĸ�����
    for( m = 0; m < values.size(); m++ ) {
        tempint = 0;
        for( k = 1; k < MAXLEN - 1; k++ ) {
            if( !attribute_row[k].compare(attribute) ) {
                for( j = 1; j < remain_state.size(); j++ )
                    if( !remain_state[j][k].compare(values[m]) ) tempint++;
            }
        }
        count_values.push_back(tempint);
    }

    for( j = 0; j < values.size(); j++ )
        ratio.push_back( (double)count_values[j] / (double)(remain_state.size()-1) );

    double temp_entropy;
    for( j = 0; j < values.size(); j++ ) {
        temp_entropy = ComputeEntropy(remain_state, attribute, values[j], false);
        children_entropy += ratio[j] * temp_entropy;
    }

    return ( parent_entropy - children_entropy );
}


int FindAttriNumByName(string attri)
{
    for( int i = 0; i < MAXLEN; i++ )
        if( !state[0][i].compare(attri) ) return i;

    cerr << "Can not find the index of attribute." << endl;
    return 0;
}


///�ҳ�������ռ��������/����
string MostCommonLabel(vector < vector <string> > remain_state)
{
    int p = 0, n = 0;
    for( unsigned int i = 0; i < remain_state.size(); i++ ) {
        if( !remain_state[i][MAXLEN].compare(yes) ) p++;
        else n++;
    }
    if(p >= n) return yes;
    else return no;
}

///�ж���������������Ե�����ֵ�Ƿ���label��
bool AllTheSameLabel(vector < vector <string> > remain_state, string label)
{
    int count = 0;
    for(unsigned int i = 0; i < remain_state.size(); i++)
        if( !remain_state[i][MAXLEN-1].compare(label) ) count++;
    if( count == remain_state.size() - 1 ) return true;
    else return false;
}


///������Ϣ���棬DFS����������
///current_nodeΪ��ǰ�Ľڵ�
///remain_stateΪʣ������������
///remain_attributeΪʣ�໹û�п��ǵ�����
///���ظ��ڵ�ָ��
Node* BuildDecisionTreeDFS( Node* p, vector < vector <string> > remain_state,
                           vector <string> remain_attribute )
{
    if( NULL == p ) p = new Node();

    ///�ȿ���������Ҷ����� ���ݹ����
    if( AllTheSameLabel(remain_state, yes) ) {
        p -> attribute = yes;
        return p;
    }
    if( AllTheSameLabel(remain_state, no) ) {
        p -> attribute = no;
        return p;
    }
    if( 0 == remain_attribute.size() ) { ///���е����Ծ��Ѿ��������ˣ���û�з־�
        string label = MostCommonLabel(remain_state);///���ڲ�������������������
        p -> attribute = label;
        return p;
    }

    ///��remain_attribute���ҳ���ǰ�������Ϣ������������
    double max_gain = 0, temp_gain;
    vector <string>::iterator max_it = remain_attribute.begin();
    vector <string>::iterator it1;
    for(it1 = remain_attribute.begin(); it1 < remain_attribute.end(); it1++ ) {
        temp_gain = ComputeGain( remain_state, (*it1) );
        if( temp_gain > max_gain ) {
            max_gain = temp_gain;
            max_it = it1;
        }
    }

    ///�������max_itָ������������ֵ�ǰ���������������������Լ�
    vector <string> new_attribute;
    vector < vector <string> > new_state;
    for( vector <string>::iterator it2 = remain_attribute.begin();
        it2 < remain_attribute.end(); it2++ )
        if( (*it2).compare(*max_it) ) new_attribute.push_back(*it2);

    ///ȷ������ѻ������ԣ�ע�Ᵽ��
    p -> attribute = *max_it;
    vector <string> values = map_attribute_values[*max_it];
    int attribute_num = FindAttriNumByName(*max_it);
    new_state.push_back(attribute_row);
        ///������ֵ���а�������
    for( vector <string>::iterator it3 = values.begin(); it3 < values.end(); it3++ ){
        for( unsigned int i = 1; i < remain_state.size(); i++ )
            if( !remain_state[i][attribute_num].compare(*it3) )
                new_state.push_back(remain_state[i]);


        Node* new_node = new Node();
        new_node ->  arrived_value = *it3;
        if( 0 == new_state.size() )///��ʾ��ǰû�������֧����������ǰ��new_node��Ҷ��
            new_node -> attribute = MostCommonLabel(remain_state);
        else
            BuildDecisionTreeDFS( new_node, new_state, new_attribute );

        ///�ݹ麯������ʱ������ʱ��Ҫ1�����½ڵ���븸�ڵ㺢������
                                ///2�����new_state����
        p -> childs.push_back(new_node);
        new_state.erase( new_state.begin() + 1, new_state.end() );
    }

    return p;
}

void Input()
{
    string s;
    ifstream infile(EXERCISE_FILE, ios::in);
    if(!infile) {
        cerr << "Open Error!" << endl;
        exit(1);
    }

    while( infile >> s, s.compare(end) != 0 ) {
        item[0] = s;
        for(int i = 1; i < MAXLEN; i++)
            infile >> item[i];
        state.push_back(item);
    }
    for( int j = 0; j < MAXLEN; j++ )
        attribute_row.push_back(state[0][j]);

    infile.close();
}


void PrintTree(Node* p, int depth)
{
    for( int i = 0; i < depth; i++ ) cout << '\t'; ///��������������Tab
    if( !p->arrived_value.empty() ) {
        cout << p -> arrived_value << endl;
        for( int i = 0; i < depth + 1; i++ ) cout << '\t';
    }
    cout << p -> attribute << endl;
    for( vector<Node*>::iterator it = p->childs.begin(); it != p->childs.end(); it++ )
        PrintTree( *it, depth + 1 );
}


void FreeTree( Node* p )
{
    if( p == NULL ) return;
    for(vector<Node*>::iterator it = p->childs.begin(); it != p->childs.end(); it++)
        FreeTree(*it);
    delete p;
    tree_size++; ///ͳ�����Ĺ�ģ
}


void getSamples( vector <string>& samples_item, vector < vector<string> >& samples_state )
{
    string s;
    ifstream infile(SAMPLES_FILE, ios::in);
    if(!infile) {
        cerr << "Open Error!" << endl;
        exit(1);
    }

    while( !infile.eof() ) {
        for(int i = 0; i < MAXLEN; i++)
            infile >> samples_item[i];
        samples_state.push_back(samples_item);
    }

    infile.close();
}


void makeDecision( vector <string>& samples_item, Node* root )
{
    Node* cur_node = root;
    while( !cur_node->childs.empty() ) {
        string att = cur_node->attribute;
        int num = FindAttriNumByName( att );
        string value = samples_item[num];
        for( vector<Node*>::iterator it = cur_node->childs.begin();
            it < cur_node->childs.end(); it++ )
            if( !(*it)->arrived_value.compare(value) ) { cur_node = *it; break; }
    }
    samples_item[MAXLEN-1] = cur_node->attribute;
}



int main()
{
    Input();
    vector <string> remain_attribute;

    string outlook("Outlook");
    string temperature("Temperature");
    string humidity("Humidity");
    string wind("Wind");
    remain_attribute.push_back(outlook);
    remain_attribute.push_back(temperature);
    remain_attribute.push_back(humidity);
    remain_attribute.push_back(wind);

    vector < vector <string> > remain_state;
    for(unsigned int i = 0; i < state.size(); i++)
        remain_state.push_back(state[i]);

    ComputeMapForm2DVector();
    Node* root = NULL;
    root = BuildDecisionTreeDFS(root, remain_state, remain_attribute);
    cout << "����ѵ����������ľ������� : " << endl;
    PrintTree(root, 0);

    ///ʹ��ѵ�����õ��ľ���������δ֪���������������о��ߡ�
    vector <string> samples_item(MAXLEN);
    vector < vector<string> > samples_state;
    getSamples( samples_item, samples_state );

    ///�鿴samples�Ƿ���ɹ�������ʾδ������/�������ߵ���������
    cout << endl << "δ�����ߵ���������" << endl;
    for( int j = 0; j < samples_state.size(); j++ ) {
        for( int i = 0; i < MAXLEN; i++ )
            cout << " " << samples_state[j][i];
        cout << endl;
    }
    cout << endl;

    ///���ж�ÿ��������δ֪��δ�����ߣ������������о����жϡ�
    for( int i = 1; i < samples_state.size(); i++ )
        makeDecision( samples_state[i], root );


    ///�Ծ��ߺ�����������������
    ofstream outfile( DECISION_FILE, ios::out );
    if( !outfile ) {
        cerr << "Open Error!" << endl;
        exit(1);
    }

    cout << endl << "������֮�����������" << endl;
    for( int j = 0; j < samples_state.size(); j++ ) {
        for( int i = 0; i < MAXLEN; i++ ) {
            cout << " " << samples_state[j][i];
            outfile << samples_state[j][i] << " ";
        }
        cout << endl; outfile << endl;
    }

    FreeTree(root);
    cout << endl; ///�����ͳ�����Ĺ�ģ
    cout << "�������Ĺ�ģ: " << tree_size << endl;

    system("python animation.py");
    system("pause");

    return 0;
}
