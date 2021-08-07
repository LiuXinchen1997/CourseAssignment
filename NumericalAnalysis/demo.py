import numpy as np


# 迭代法
# 雅可比迭代法
def jacobi_iteration(A, b, iter=5, epsilon=1e-5):
    nvars = A.shape[0]
    x = np.zeros((nvars, 1))
    for _ in range(iter):
        old_x = x.copy()
        for i in range(nvars):
            tmp = np.dot(A[i, :].reshape((1, nvars)), old_x)
            x[i] = (b[i] - (tmp - (A[i, i] * old_x[i]))) / A[i, i]

        if np.sqrt(np.dot((old_x - x).transpose(), old_x - x)) < epsilon:
            print('reach such precision.')
            break
    return x


# 高斯-赛德尔迭代法
def gs_iteration(A, b, iter=1000, epsilon=1e-5):
    nvars = A.shape[0]
    x = np.zeros((nvars, 1))
    for _ in range(iter):
        old_x = x.copy()
        for i in range(nvars):
            tmp = np.dot(A[i, :].reshape((1, nvars)), x)
            x[i] = (b[i] - (tmp - (A[i, i] * x[i]))) / A[i, i]

        if np.sqrt(np.dot((old_x - x).transpose(), old_x - x)) < epsilon:
            print('reach such precision.')
            break
    return x


# 超松弛迭代法
def sor_iteration(A, b, omega, iter=1000, epsilon=1e-5):
    nvars = A.shape[0]
    x = np.zeros((nvars, 1))
    for _ in range(iter):
        old_x = x.copy()
        for i in range(nvars):
            tmp = np.dot(A[i, :].reshape((1, nvars)), x)
            x[i] = (omega * (b[i] - (tmp - A[i, i] * x[i])) / A[i, i]) + (1 - omega) * old_x[i]

        if np.sqrt(np.dot((old_x - x).transpose(), old_x - x)) < epsilon:
            print('reach such precision.')
            break

    return x


def generate_H(num):
    H = np.zeros((num, num))
    for i in range(H.shape[0]):
        for j in range(H.shape[1]):
            H[i, j] = 1.0 / ((i+1) + (j+1) - 1)

    return H


if __name__ == '__main__':
    # for question 1
    n = 6
    H1 = generate_H(num=n)
    x_ = np.ones((n, ))
    b = np.dot(H1, x_)

    x_j = jacobi_iteration(H1, b, iter=5, epsilon=1e-6)
    x_sor = sor_iteration(H1, b, omega=1, iter=1000, epsilon=1e-6)
    x_sor = sor_iteration(H1, b, omega=1.25, iter=1000, epsilon=1e-6)
    x_sor = sor_iteration(H1, b, omega=1.5, iter=1000, epsilon=1e-6)

    # for question 2
    ns = [8, 10, 12, 14]
    omegas = [1, 1.25, 1.5]
    iters = [100, 200, 400, 600, 800, 1000, 2000, 4000]
    for n_ in ns:
        H = generate_H(n_)
        x_ = np.ones((n_,))
        b = np.dot(H, x_)
        for omega in omegas:
            for iter in iters:
                x_sor = sor_iteration(H, b, omega=omega, iter=iter, epsilon=1e-6)
                err = np.sqrt(np.dot((x_.reshape((x_.shape[0], 1))-x_sor).transpose(), (x_.reshape((x_.shape[0], 1))-x_sor)))
                print('n: %d, omega: %f, iter: %d, err: %f' % (n_, omega, iter, err[0,0]))
