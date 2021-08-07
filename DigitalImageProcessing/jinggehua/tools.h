#ifndef TOOLS_H
#define TOOLS_H

#include <vector>
using namespace std;

vector<double> rgb2lab(vector<char> rgb);
vector<double> rgb2lab(int r, int g, int b);

#endif // TOOLS_H
