/********************************************************************************
*
*   �������
*   suffix[i] �ַ������Ե�i���ַ�Ϊ���ĺ�׺
*   SA[i] ������i�ĺ�׺
*   Rank[i] ��i����׺�������Ƕ���
*   Height[i] ����Ϊi������Ϊi-1�ĺ�׺�������ǰ׺
*             ��Suffix[SA[i]]��Suffix[SA[i-1]]�������ǰ׺
*   H(i) ��ͬ��Height[Rank[i]]
*
*   ��������ǰ׺�����ڲ�ͬ���ַ������Ҿ����ܳ�����ʱ�õ��Ĺ���ǰ׺���������
*�Ӵ��ˡ�
*
*********************************************************************************/

#include <cstdio>
#include <iostream>
#include <cstdlib>
#include <cstring>

using namespace std;

#define GetI() (SA12[t] < n0 ? SA12[t] * 3 + 1 : (SA12[t] - n0) *3 + 2)

bool leq(int a1, int a2,   int b1, int b2) {
  return( a1 < b1 || a1 == b1 && a2 <= b2 );
}

bool leq(int a1, int a2, int a3,   int b1, int b2, int b3) {
  return( a1 < b1 || a1 == b1 && leq( a2, a3, b2, b3 ) );
}

static void radixPass(int* a, int* b, int* r, int n, int K) ///��������
{
  int* c = new int[K + 1];
  for (int i = 0;  i<= K;  i++) c[i] = 0;
  for (int i = 0;  i< n;  i++) c[r[a[i]]]++;
  for (int i = 0, sum = 0; i <= K;  i++) {
     int t =c[i];  c[i] = sum;  sum += t;
  }
  for (int i = 0;  i< n;  i++) b[c[r[a[i]]]++] =a[i];      //sort
  delete [] c;
}

void suffixArray(int* s, int* SA, int n, int K) { ///��ú�׺����
  int n0 = ( n + 2 ) / 3, n1 = ( n + 1 ) / 3, n2 = n / 3, n02 = n0 + n2;
  ///n0���ַ�����ģ3Ϊ0���±�ĸ�����n1��n2��������
  int* s12  = new int[n02 + 3]; s12[n02]= s12[n02 + 1]= s12[n02 + 2]=0;
  int* SA12 = new int[n02 + 3];SA12[n02]=SA12[n02 + 1]=SA12[n02 + 2]=0;
  int* s0   = new int[n0];
  int* SA0  = new int[n0];

  for (int i = 0, j = 0; i < n + ( n0 - n1 );  i++) if (i % 3 != 0) s12[j++] = i;
  ///������ģ3��Ϊ0���±����s12��

  radixPass(s12 , SA12, s + 2, n02, K);
  radixPass(SA12, s12 , s + 1, n02, K);
  radixPass(s12 , SA12, s  , n02, K);

  int name = 0, c0 = -1, c1 = -1, c2 = -1;
  for (int i = 0;  i< n02;  i++) {
    if(s[SA12[i]] != c0 || s[SA12[i]+1] != c1 || s[SA12[i]+2] != c2) {
      name++; c0 = s[SA12[i]];  c1 =s[SA12[i]+1];  c2 = s[SA12[i]+2];
    }
     ///name�Ǽ����׺����SA12��ǰ�����ַ�����ȫ��ͬ�ĺ�׺����
     ///��ô�жϵ�ԭ���ǣ�SA12���򣬹�ֻ�����ں�׺��ǰ�����ַ��ſ�����ͬ
    if (SA12[i] % 3 == 1) { s12[SA12[i]/3] = name; }/// ����
    else { s12[SA12[i]/3 + n0] = name;} /// �Ұ��
     ///SA12[i]ģ3����1����2��s12������Ǻ�׺����SA12��ǰ�����ַ�����λ
  }

  /// ������ֲ�Ψһ�ͽ���ݹ�
  if (name <n02) {
     ///���name����n02����ζ��SA12ǰ������ĸ������ȣ���SA12������
     ///���򣬸���s12�ĺ�׺������SA12�ȼۣ���s12�ĺ�׺����������򼴿�
    suffixArray(s12, SA12, n02, name);

    for (int i = 0;  i< n02;  i++) s12[SA12[i]] = i + 1;
  } else
    for (int i = 0;  i< n02;  i++) SA12[s12[i] - 1] = i;
  ///s12������Ǻ�׺����SA12��ǰ�����ַ�����λ
  ///�����к�׺ǰ�����ַ�����һ��������£�s12���Ǻ�׺����λ

  ///����SA12�������
  ///SA12[i]�ǵ�iС�ĺ�׺�����(��Ŵӵ�n02)��s12[i]�����Ϊi�ĺ�׺����λ
  ///ʹ�ú�׺��Ŷ�����ʵ��λ�õ�ԭ���ǵݹ����suffixArrayʱ���ܱ�������Ϣ

  for (int i=0, j=0; i < n02;  i++) if (SA12[i] < n0) s0[j++] = 3*SA12[i];
  ///��SA12�����е�ģΪ�ĺ�׺��ʵ��λ�ü�ȥ����洢��s0��
  ///ע���׺��ŵ�ʵ��λ�õ�ת���轫ǰ�߳�
  ///����ζ�������Ѿ�����ģΪ�ĺ�׺��SA0�����˳�������
  ///ֻ��Ҫ����һ�μ������򼴿ɶ�SA0��ɻ�����������һ��
  radixPass(s0, SA0, s, n0, K);

  ///���һ�����������SA12��SA0���й鲢

  for (int p = 0, t = n0 - n1,  k = 0;  k < n; k++) {
    int i = GetI();
    int j = SA0[p];
    if (SA12[t] < n0 ?
        leq(s[i], s12[SA12[t] + n0], s[j], s12[j/3]) :
        leq(s[i],s[i+1],s12[SA12[t]-n0+1],s[j],s[j+1],s12[j/3+n0]))
    {
      SA[k] = i; t++;
      if ( t == n02 ) {
        for(k++; p < n0; p++, k++) SA[k] = SA0[p];
      }
    } else {
      SA[k] = j;  p++;
      if (p == n0)  {
        for(k++; t < n02; t++, k++) SA[k] = GetI();
      }
    }
  }
  delete [] s12; delete [] SA12; delete [] SA0; delete [] s0;
}

void suffixArrayHeight(int *s, int *SA, int n, int K, int *rank, int *height)
{
    int i, j,h;
     for(i = 0;i < n; i++){
         rank[SA[i]] = i;
         ///rank��SA���棬��SA[rank[i]] == i&&rank[SA[i]] == i
     }
     h = 0;
     for(i = 0;i < n; i++){
         if(rank[i]== 0){
            height[rank[i]] = 0;
         } else {
              j = SA[rank[i] - 1];
              ///�����ǰ׺�ĵ�һ���ַ����±�����ʶǰ׺
              ///��ô��j��ǰ׺i == SA[rank[i]]������ǰ׺
              while(s[i+ h] == s[j + h]) h++; ///���û�й���h[i]��h[i+1]�Ĵ�С��ϵ�Ķ���h��Ҫ�ӿ�ʼ
              height[rank[i]] = h;
              ///�����h[i]��ֵ
              if(h> 0) h--; ///h[i+1]��ֵ���ڻ����h[i]-1
        }
     }
}

#define maxStrNum 4001
#define maxStrLen 201
#define maxNum (maxStrNum * maxStrLen + 3)

int s[maxNum];
int SA[maxNum];
int rank[maxNum];
int height[maxNum];
int sequence[maxNum]; ///��Ӧ���ַ��������

#define keyNum ('z' - 'a' + 1)
bool visited[maxStrNum];
char LCS[maxStrLen];
int n;
int N;

bool check(int A)
{
     int i, j, k;
     int temp;
     if(A <= 0)
         return true;
     for (i =1;i < n; i++)
     {
         ///����A>0����height[0]==0,�ʴ�i���Բ��ӿ�ʼ
         if(height[i]< A) continue;
         for(j =i + 1; j < n; j++)
              if(height[j]< A) break;
         if(j -i + 1 < N)
         { ///���������������ַ�����������[i - 1, j)���ж�Ӧ�ĺ�׺SA[k]
              i = j;
              continue;
         }
         memset(visited, 0,sizeof(visited));
         for(k =i - 1; k < j; k++) {
              ///����k�����i-1��ʼ������i��ʼ��ͬʱҪ��ֹi==0ʱԽ��
              temp = sequence[SA[k]];
              if(temp!= -1)
                   visited[temp] = true;
         }
         for(k =0; k < N; k++)
              if(visited[k]== false) break;

         if(k ==N) return true;
         i = j;
         ///���У�height[j]< A || j == n
         ///���ﲻ��i = j +1;����Ϊ����i++
     }
     return false;
}

bool findLeast(int A)
{
     int i, j, k;
     char str[maxStrLen];
     bool success;
     if(A <=0)
         return true;
     success = false;
     for (i =1;i < n;i++)
     {
         ///�������֪������A>0����height[0]==0
         ///�ʴ�i���Բ��ӿ�ʼ
         if(height[i]< A) continue;
         for(j =i + 1; j < n; j++)
              if(height[j]< A) break;

         if(j -i + 1 < N)
         { ///���������������ַ�����������[i - 1, j)���ж�Ӧ�ĺ�׺SA[k]
              i = j;
              continue;
         }
         memset(visited, 0,sizeof(visited));
         for(k =i - 1; k < j; k++)
              ///����k�����i-1��ʼ������i��ʼ��ͬʱҪ��ֹi==0ʱԽ��
              if(k>= 0) visited[sequence[SA[k]]] = true;

         for(k =0; k < N; k++)
              if(visited[k]== false) break;

         if(k ==N)
         {
              success = true;
              for(k= 0; k < A; k++) str[k] = s[SA[i] + k] + 'a' - 1;

              str[A] = NULL;
              if(LCS[0] == NULL || strcmp(str, LCS) < 0) strcpy(LCS, str);
         }
         i = j;
         ///i = j + 1;
         ///���У�height[j]< A || j == n
     }
     return success;
}

int dichotomize(int top)
{
     int low,high, mid;
     low = 0;
     high = top;
     while(low +1 < high){
         mid = (low + high) / 2;
         if(check(mid))
            low = mid;
         else high = mid - 1;
     }
     if(check(high))
        low = high;
     return low;
}

#define MAX 0x7FFFFFFF

int main()
{
     int i, j;
     int b;
     int min;
     char str[maxStrLen];
     int len;
     int max;

     N = 2;
     n = 0;
     memset(sequence, 0xFF, sizeof(sequence));
     min = MAX;
     for (i= 0; i < N; i++)
     {
        cout << "�������ַ���" << i+1 << ": ";
        cin >> str;
        len = strlen(str);
        if(min> len) min = len;
        for(j = 0; j < len; j++){
            sequence[n] = i;
            s[n++] = str[j] - 'a' + 1;
        }
        if(i < N - 1)
            s[n++]= keyNum + i + 1;
     }
     b = keyNum + N - 1;
     s[n] = s[n+1] = s[n+2] = SA[n] =SA[n+1] = SA[n+2] = 0;
     suffixArray(s, SA, n, b);
     suffixArrayHeight(s, SA, n, b, rank,height);
     max = dichotomize(min);

     if(max == 0){
        cout << "IDENTITY LOST" << endl;
     } else {
        memset(LCS, 0, sizeof(LCS));
        findLeast(max);
        cout << "������Ӵ���" << LCS << endl;
     }

     return 0;
}
