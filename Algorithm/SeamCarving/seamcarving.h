#ifndef SEAMCARVING_H
#define SEAMCARVING_H

#include <vector>
#include <QImage>

std::vector<std::vector<double>> generate_d(QImage img);
std::vector<int> get_carving_inds(QImage img, int col_or_row);

#endif // SEAMCARVING_H
