function [i, j] = calcij(x, y)
    % assert: x,y����(-50,50)֮��
    s = 100 / 256;  % ÿһ��С����ı߳�
    if x >= 0;
        nx = floor(x / s);
    else
        nx = ceil(x/s);
    end;
    
    j = nx + 129;
    
    if y >= 0;
        ny = floor(y/s);
        i = 129 - ny;
    else
        ny = ceil(y/s);
        i = 129 - ny;
    end;
    
    % i = ny + 129;
    
end

