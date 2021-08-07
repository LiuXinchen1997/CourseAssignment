import numpy as np


# 列主元消去法
def column_main_element(A, b):
    b = b.reshape((b.shape[0], 1))
    Ab = np.concatenate((A, b), axis=1)
    nvars = A.shape[1]
    for i in range(nvars):
        # 选列主元
        row = i + np.argmax(np.abs(Ab[i:, i]))
        if row != i:
            tmp = Ab[row, :].copy()
            Ab[row, :] = Ab[i, :]
            Ab[i, :] = tmp

        # 消元
        Ab[i, i]
        for j in range(i + 1, nvars):
            Ab[j, :] -= (Ab[i, :] / Ab[i, i] * Ab[j, i])

    # 求解
    x = np.zeros(nvars)
    for i in range(nvars).__reversed__():
        tmp = 0
        for j in range(i+1, nvars):
            tmp += x[j] * Ab[i, j]
        x[i] = (Ab[i, -1] - tmp) / Ab[i, i]

    return x


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

        print(x)

    return x


if __name__ == '__main__':
    A = np.array([10, -1, 0, -1, 10, -2, 0, -2, 10]).reshape((3, 3))
    b = np.array([9, 7, 6])
    x = sor_iteration(A, b, 1.012823, iter=3)

    # 测试迭代法
    # Jacobi
    # A = np.array([10, -1, 0, -1, 10, -2, 0, -2, 10]).reshape((3, 3))
    # b = np.array([9, 7, 6])
    # x = gs_iteration(A, b)
    # print(x)

    # 测试消去法
    # A1 = np.array([3.01, 6.03, 1.99, 1.27, 4.16, -1.23, 0.987, -4.81, 9.34]).reshape((3, 3))
    # b1 = np.array([1, 1, 1])
    # x1 = column_main_element(A1, b1)
    # print('求解第一个方程组：')
    # print('A1: ', A1)
    # print('b1: ', b1)
    # print('A1的行列式: ', np.linalg.det(A1))
    # print('x1: ', x1)
    # condA1 = np.linalg.norm(A1, ord=2) * np.linalg.norm(np.linalg.inv(A1), ord=2)
    # print('A1的条件数： ', condA1)
    #
    # # solve equation 2
    # A2 = np.array([3.00, 6.03, 1.99, 1.27, 4.16, -1.23, 0.990, -4.81, 9.34]).reshape((3, 3))
    # b2 = np.array([1, 1, 1])
    # x2 = column_main_element(A2, b2)
    # condA2 = np.linalg.norm(A2, ord=2) * np.linalg.norm(np.linalg.inv(A2), ord=2)
    # print('求解第二个方程组：')
    # print('A2: ', A2)
    # print('b2: ', b2)
    # print('A2的行列式: ', np.linalg.det(A2))
    # print('x2: ', x2)
    # condA2 = np.linalg.norm(A2, ord=2) * np.linalg.norm(np.linalg.inv(A2), ord=2)
    # print('A2的条件数： ', condA2)
