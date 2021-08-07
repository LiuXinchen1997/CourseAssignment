import numpy as np


def iterate_solve(x, iter_format, epsilon):
    ind = 0
    while True:
        x_old = x
        x = iter_format(x)
        ind = ind + 1
        if np.abs(x_old - x) <= 1e-9:
            break
        if ind > 100000:
            break

    return ind, x


def iterate_solve2(x, iter_format, epsilon):
    ind = 0
    while True:
        y = iter_format(x)
        z = iter_format(y)
        x_old = x
        x = x - (y - x) * (y - x) / (z - 2 * y + x)
        ind = ind + 1
        if np.abs(x_old - x) <= 1e-9:
            break
        if ind > 100000:
            break

    return ind, x


if __name__ == '__main__':
    x = 1.0
    epsilon = 1e-9

    # 1st iter
    x = 1.0
    def iter1(x):
        return 20.0 / (x * x + 2 * x + 10)
    ind, x = iterate_solve(x, iter1, epsilon)
    print('第一种迭代格式，迭代 %d 轮，解得x=%.9lf' % (ind, x))

    # 2nd iter
    x = 1.0
    def iter2(x):
        return (20.0 - 2 * x * x - x * x * x) / 10.0
    ind, x = iterate_solve(x, iter2, epsilon)
    print('第二种迭代格式，迭代 %d 轮，解得x=%.9lf' % (ind, x))
    print('第二种迭代格式无法收敛')

    # 3rd iter
    x = 1.0
    ind, x = iterate_solve2(x, iter1, epsilon)
    print('第一种迭代格式使用Steffensen加速方法，迭代 %d 轮，解得x=%.9lf' % (ind, x))

    # 4th iter
    x = 1.0
    ind, x = iterate_solve2(x, iter2, epsilon)
    print('第二种迭代格式使用Steffensen加速方法，迭代 %d 轮，解得x=%.9lf' % (ind, x))
    print('此时第二种迭代格式收敛了')

    # 5th iter
    x = 1.0
    def iter5(x):
        return x - (x*x*x + 2*x*x + 10*x - 20) / (3*x*x + 4*x + 10)
    ind, x = iterate_solve(x, iter5, epsilon)
    print('第五种迭代格式，迭代 %d 轮，解得x=%.9lf' % (ind, x))
    print('Newton法可以达到一般迭代法采用加速方法后的效果')
