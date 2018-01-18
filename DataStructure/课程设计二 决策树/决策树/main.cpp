/**********************************************************************
*
*   决策树算法即为分类算法。其基本思路是不断选取产生信息增益最大的
*属性来划分样例集合，构造决策树。
*   信息增益定义为节点与其子节点的信息熵之差，用于描述信息的不纯度
*即信息的不稳定性。信息增益越大，该属性作为一棵树的根节点就能使这
*棵树更简洁。
*   大体思路就是这样：先使用一个训练集文件进行机器学习构造决策树，
*再给出一个未作出决策（即输出结果未知）的样例集文件，让机器通过决策
*树能够对该样例集文件进行正确的决策，并将结果输出。
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

#define MAXLEN 6 //输入每行的数据个数
#define EXERCISE_FILE "exercise.txt"
#define SAMPLES_FILE "samples.txt"
#define DECISION_FILE "decision.txt"

///多叉树的实现
///这里采用每个节点的所有孩子用vector来保存的方法来建立多叉树
///注意维护剩余样例和剩余属性信息，建树时横向遍历靠循环，纵向靠递归

///以下为建立决策树所需要用到的一些信息、数据结构
vector < vector<string> > state; ///实例集
vector <string> item( MAXLEN ); ///对应一行实例集
vector <string> attribute_row; ///保存首行 即 属性行数据

string end("end");
string yes("Y");
string no("N");
string blank("");

///存储属性对应的所有属性值
map < string, vector< string > > map_attribute_values;
int tree_size = 0;

///决策树节点
struct Node {
    string attribute; ///属性
    string arrived_value; ///到达的属性值
    vector < Node* > childs; ///所有的孩子

    Node() {
        attribute = blank;
        arrived_value = blank;
    }
};

///根据二维数据实例集state计算获取属性与值组成的map_attribute_values
void ComputeMapForm2DVector()
{
    unsigned int i, j, k;
    bool existed = false;
    vector< string > values;

    for( i = 1; i < MAXLEN - 1; i++ ) { ///按照列遍历
        for( j = 1; j < state.size(); j++ ) { ///样例集state第一行为属性名，因此从第二行开始
            for( k = 0; k < values.size(); k++ )
                if( !values[k].compare(state[j][i]) ) existed = true;
            if( !existed ) values.push_back(state[j][i]);
            existed = false;
        }
        map_attribute_values[ state[0][i] ] = values;
        values.erase( values.begin(), values.end() );
    }
}

///根据具体属性和值来计算熵
double ComputeEntropy( vector < vector <string> > remain_state,
                      string attribute, string value, bool ifParent ) {
    vector<int> count(2, 0); ///分别用来存储样例集中正例和负例的个数
    unsigned int i, j;
    bool done_flag = false; ///哨兵值
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

    if( 0 == count[0] || 0 == count[1] ) return 0; ///全部是正例或者负例

    ///计算具体熵，根据(+count[0],-count[1]),log2为底可通过换底公式换成自然数底数
    double sum = count[0] + count[1];
    double entropy = -(count[0]/sum)*(log(count[0]/sum)/log(2.0))-(count[1]/sum)*(log(count[1]/sum)/log(2.0));
    return entropy;
}

///计算按照属性attribute划分当前剩余实例的信息增益
double ComputeGain( vector <vector <string> > remain_state, string attribute )
{
    unsigned int j, k, m;

    ///首先求不做划分时的熵（父熵）
    double parent_entropy = ComputeEntropy( remain_state, attribute, blank, true );
    double children_entropy = 0;

    ///然后求做划分后各个值的熵
    vector <string> values = map_attribute_values[ attribute ];
    vector <double> ratio;
    vector <int> count_values;
    int tempint;

    ///得到attribute的每个属性值在remain_state中的个数。
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


///找出样例中占多数的正/负性
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

///判断样例集的输出属性的属性值是否都是label。
bool AllTheSameLabel(vector < vector <string> > remain_state, string label)
{
    int count = 0;
    for(unsigned int i = 0; i < remain_state.size(); i++)
        if( !remain_state[i][MAXLEN-1].compare(label) ) count++;
    if( count == remain_state.size() - 1 ) return true;
    else return false;
}


///计算信息增益，DFS构建决策树
///current_node为当前的节点
///remain_state为剩余待分类的样例
///remain_attribute为剩余还没有考虑的属性
///返回根节点指针
Node* BuildDecisionTreeDFS( Node* p, vector < vector <string> > remain_state,
                           vector <string> remain_attribute )
{
    if( NULL == p ) p = new Node();

    ///先看搜索到树叶的情况 即递归出口
    if( AllTheSameLabel(remain_state, yes) ) {
        p -> attribute = yes;
        return p;
    }
    if( AllTheSameLabel(remain_state, no) ) {
        p -> attribute = no;
        return p;
    }
    if( 0 == remain_attribute.size() ) { ///所有的属性均已经考虑完了，还没有分尽
        string label = MostCommonLabel(remain_state);///用于补充样例集不充足的情况
        p -> attribute = label;
        return p;
    }

    ///在remain_attribute中找出当前情况下信息增益最大的属性
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

    ///下面根据max_it指向的属性来划分当前样例，更新样例集和属性集
    vector <string> new_attribute;
    vector < vector <string> > new_state;
    for( vector <string>::iterator it2 = remain_attribute.begin();
        it2 < remain_attribute.end(); it2++ )
        if( (*it2).compare(*max_it) ) new_attribute.push_back(*it2);

    ///确定了最佳划分属性，注意保存
    p -> attribute = *max_it;
    vector <string> values = map_attribute_values[*max_it];
    int attribute_num = FindAttriNumByName(*max_it);
    new_state.push_back(attribute_row);
        ///对属性值进行挨个访问
    for( vector <string>::iterator it3 = values.begin(); it3 < values.end(); it3++ ){
        for( unsigned int i = 1; i < remain_state.size(); i++ )
            if( !remain_state[i][attribute_num].compare(*it3) )
                new_state.push_back(remain_state[i]);


        Node* new_node = new Node();
        new_node ->  arrived_value = *it3;
        if( 0 == new_state.size() )///表示当前没有这个分支的样例，当前的new_node是叶子
            new_node -> attribute = MostCommonLabel(remain_state);
        else
            BuildDecisionTreeDFS( new_node, new_state, new_attribute );

        ///递归函数返回时即回溯时需要1、将新节点加入父节点孩子容器
                                ///2、清除new_state容器
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
    for( int i = 0; i < depth; i++ ) cout << '\t'; ///按树的深度先输出Tab
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
    tree_size++; ///统计树的规模
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
    cout << "经过训练集所构造的决策树是 : " << endl;
    PrintTree(root, 0);

    ///使用训练集得到的决策树来对未知输出结果的样例进行决策。
    vector <string> samples_item(MAXLEN);
    vector < vector<string> > samples_state;
    getSamples( samples_item, samples_state );

    ///查看samples是否导入成功，即显示未做决策/待做决策的样例集。
    cout << endl << "未做决策的样例集：" << endl;
    for( int j = 0; j < samples_state.size(); j++ ) {
        for( int i = 0; i < MAXLEN; i++ )
            cout << " " << samples_state[j][i];
        cout << endl;
    }
    cout << endl;

    ///逐行对每个输出结果未知（未做决策）的样例集进行决策判断。
    for( int i = 1; i < samples_state.size(); i++ )
        makeDecision( samples_state[i], root );


    ///对决策后的样例集进行输出。
    ofstream outfile( DECISION_FILE, ios::out );
    if( !outfile ) {
        cerr << "Open Error!" << endl;
        exit(1);
    }

    cout << endl << "做决策之后的样例集：" << endl;
    for( int j = 0; j < samples_state.size(); j++ ) {
        for( int i = 0; i < MAXLEN; i++ ) {
            cout << " " << samples_state[j][i];
            outfile << samples_state[j][i] << " ";
        }
        cout << endl; outfile << endl;
    }

    FreeTree(root);
    cout << endl; ///最后不忘统计树的规模
    cout << "决策树的规模: " << tree_size << endl;

    system("python animation.py");
    system("pause");

    return 0;
}
