%% ���³��������ҳ� ��������Ƕ�ʹ��ͼ��ĶԳ�����õ�һ������   ������Ľ����Excel BI�� ���е�61��
clear
clc

load recv_data.mat recv1;
s = [];

% Excel BA��53�У���Excel����71��
for i=53:71;
    col = recv1(:,i);
    row = col';
    
    start = 1;
    over = 512;
    for j=1:512;
        if row(1, j) ~= 0 && start == 1;
            start = j;
        end;
        
        if row(1, j) == 0 && start ~= 1;
            over = j-1;
            break;
        end;
    end;
     fprintf('start: %d   ', start);
     fprintf('over: %d\n', over);
    
    mid = (start + over) / 2;
    % fprintf('mid: %d\n', mid);
    
    % mid������
    sum = 0;
    count = 0;
    if mid == ceil(mid);
        for j = 1:200;
            low = mid-j;
            high = mid+j;
            if high > over || low < start;
                break;
            end;
            
            count = count + 1;
            sum = sum + (row(1, high) - row(1,low)) * (row(1, high) - row(1,low));
        end;
        
        s = [s sum/count];
        
    % mid�Ǹ�����
    else
        for j = 1:200;
            low = mid - (0.5 + (j-1)*1 );
            high = mid + (0.5 + (j-1)*1 );
            if high > over || low < start;
                break;
            end;
            
            count = count + 1;
            sum = sum + (row(1, high) - row(1,low)) * (row(1, high) - row(1,low));
        end;
        
        s = [s sum/count];
    end;
end;


%% ���³��������ҳ� ��Բ��Բ �������һ������     ������Ľ���� ��151��152��

clear
clc

load recv_data.mat recv1;

blanks = [];
for i=109:180;
    col = recv1(:,i);
    row = col';
    
    j = 1;
    while row(1,j) == 0;
        j = j + 1;
    end;
    
    while row(1,j) ~= 0;
        j = j + 1;
    end;
    start = j;
    
    while row(1,j) == 0;
        j = j + 1;
    end;
    
    over = j - 1;
    span = over - start + 1;
    blanks = [blanks span];
end;



%% �����������d��X���ߵ�180������
a = 15;
b = 40;
for i=1:180;
    
    l = 2 * sqrt( a*a * b*b * (1+k*k) * (a *  )   );
    
    
end;














