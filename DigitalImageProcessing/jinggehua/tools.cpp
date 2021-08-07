#include "tools.h"

inline float gamma(float x) {return x > 0.04045 ? pow((x+0.055f)/1.055f,2.4f) : x/12.92;};

vector<double> rgb2lab(vector<int> rgb)
{
    float B = gamma(rgb[0]/255.0f);
    float G=gamma(rgb[1]/255.0f);
    float R=gamma(rgb[2]/255.0f);
    float X=0.412453*R+0.357580*G+0.180423*B;
    float Y=0.212671*R+0.715160*G+0.072169*B;
    float Z=0.019334*R+0.119193*G+0.950227*B;

    X/=0.95047;
    Y/=1.0;
    Z/=1.08883;

    float FX = X > 0.008856f ? pow(X,1.0f/3.0f) : (7.787f * X +0.137931f);
    float FY = Y > 0.008856f ? pow(Y,1.0f/3.0f) : (7.787f * Y +0.137931f);
    float FZ = Z > 0.008856f ? pow(Z,1.0f/3.0f) : (7.787f * Z +0.137931f);

    vector<double> lab = {0.0, 0.0, 0.0};
    lab[0] = Y > 0.008856f ? (116.0f * FY - 16.0f) : (903.3f * Y);
    lab[1] = 500.f * (FX - FY);
    lab[2] = 200.f * (FY - FZ);

    return lab;
}

vector<double> rgb2lab(int r, int g, int b)
{
    vector<int> rgb;
    rgb.push_back(r);
    rgb.push_back(g);
    rgb.push_back(b);

    vector<double> lab = rgb2lab(rgb);
    return lab;
}
