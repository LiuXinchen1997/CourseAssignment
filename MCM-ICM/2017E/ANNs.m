%% �ô���Ϊ����BP���������ʶ��

%% ��ջ�������
clc
clear

%% ѵ������Ԥ��������ȡ����һ��

% ��ʼ������,���Ѽ��������ݼ��ص��ڴ���
%{
data = [
    220	215	210	204	227	11.5	11.1
    103100	133297	51795.02638	91686.6496	110700	254987.4	411122
    34.5921	40.1428621	29.5175464	25.660089	51.1287	0.6234	0.7898
    0.41312	0.4612	0.38725	0.452213	0.6352	0.532820426	0.415966218
    13.88	14.67	10	11	14	1088.11	90.19
    48.8	48.9	43.2	46.76	47.43112	0.856	0.872
    398	399	596.1365678	666.9362	475.3635719	134.9837	360.75857
    22.05	23.06	19.05	23.53	25.232	3.510610854	2.774597409
    0.004072473	0.004357448	0.003578	0.004298	0.0056323	0.003	0.0018
    0.000498429	0.000642528	0.00040557	0.000492	0.0005062	0.029365797	0.198125261
    34686	34699	16769.34	27154	28137	32404	91256
    97.33	97.54	98.3483044	98.442687	97.2131	0.931	0.038
    10141.49718	13263.04321	9785.52	10634.88	15146.112	10813.6686	11965.318
];
%}

data = [
    215	210	204	227	11.5	11.1
    133297	51795.02638	91686.6496	110700	254987.4	411122
    40.1428621	29.5175464	25.660089	51.1287	0.6234	0.7898
    0.4612	0.38725	0.452213	0.6352	0.532820426	0.415966218
    14.67	10	11	14	1088.11	90.19
    48.9	43.2	46.76	47.43112	0.856	0.872
    399	596.1365678	666.9362	475.3635719	134.9837	360.75857
    23.06	19.05	23.53	25.232	3.510610854	2.774597409
    0.004357448	0.003578	0.004298	0.0056323	0.003	0.0018
    0.000642528	0.00040557	0.000492	0.0005062	0.029365797	0.198125261
    34699	16769.34	27154	28137	32404	91256
    97.54	98.3483044	98.442687	97.2131	0.931	0.038
    13263.04321	9785.52	10634.88	15146.112	10813.6686	11965.318
    0.1759051	0.126234	0.161241	0.1823123	0.378383608	0.705679261
    35.87	33.12	34.14	36.63	34	70.34
    114	152	167	535	96	86
];
test_data = [220;103100;34.5921;0.41312;13.88;48.8;398;22.05;0.004072473;0.000498429;34686;97.33;10141.49718;0.1673431;36.06;107];

pm_25 = data(1,:);
gdp_avg = data(2,:);
third_ratio = data(3,:);
house_avg = data(4,:);
green_area_avg = data(5,:);
high_stu_ratio = data(6,:);
people_density = data(7,:);
path_avg = data(8,:);
bed_avg = data(9,:);
bus_avg = data(10,:);
salary_avg = data(11,:);
work_ratio = data(12,:);
infrastr_avg = data(13,:);
car_avg = data(14,:);
agriculture_ratio = data(15,:);
scene_num = data(16,:);

hdi = [0.856 0.7897	0.7945	0.8912	0.902 0.959];
test_hdi = 0.85;

% �������ݹ�һ������
[pm_25n, pm_25s] = mapminmax(pm_25);
[gdp_avgn, gdp_avgs] = mapminmax(gdp_avg);
[third_ration, third_ratios] = mapminmax(third_ratio);
[house_avgn, house_avgs] = mapminmax(house_avg);
[green_area_avgn, green_area_avgs] = mapminmax(green_area_avg);
[high_stu_ration, high_stu_ratios] = mapminmax(high_stu_ratio);
[people_densityn, people_densitys] = mapminmax(people_density);
[path_avgn, path_avgs] = mapminmax(path_avg);
[bed_avgn, bed_avgs] = mapminmax(bed_avg);
[bus_avgn, bus_avgs] = mapminmax(bus_avg);
[salary_avgn, salary_avgs] = mapminmax(salary_avg);
[work_ration, work_ratios] = mapminmax(work_ratio);
[infrastr_avgn, infrastr_avgs] = mapminmax(infrastr_avg);
[car_avgn, car_avgs] = mapminmax(car_avg);
[agri_ration, agri_ratios] = mapminmax(agriculture_ratio);
[scene_numn, scene_nums] = mapminmax(scene_num);

input = [
    pm_25n; gdp_avgn; third_ration; house_avgn; green_area_avgn;
    high_stu_ration; people_densityn; path_avgn; bed_avgn; bus_avgn; 
    salary_avgn; work_ration; infrastr_avgn; car_avgn; agri_ration;
    scene_numn
];

input;
output = hdi;

%% ȷ������ṹ����
innum = 16;
midnum = 14;
outnum = 1;

% Ȩֵ��ʼ��
% ���У�w����ʾȨ�أ�b��ʾ��ֵ
w1=rands(midnum,innum);
b1=rands(midnum,1);
w2=rands(midnum,outnum);
b2=rands(outnum,1);

w2_1=w2;w2_2=w2_1;
w1_1=w1;w1_2=w1_1;
b1_1=b1;b1_2=b1_1;
b2_1=b2;b2_2=b2_1;

%ѧϰ��
xite=0.1;
alfa=0.01;
loopNumber=2000; % ѧϰ����
I=zeros(1,midnum);
Iout=zeros(1,midnum);
FI=zeros(1,midnum);

dw1=zeros(innum,midnum); % w������ֵ
db1=zeros(1,midnum); % b������ֵ


%% ����ѵ��
% ȷ�����ڵ����
midnums = floor(sqrt(innum+outnum)):ceil(sqrt(innum+outnum)+10);
fore_errors = [];

for ind=1:length(midnums);
    % ��Ҫ�ĳ�ʼ��
    midnum = midnums(ind);
    
    % Ȩֵ��ʼ��
    % ���У�w����ʾȨ�أ�b��ʾ��ֵ
    w1=rands(midnum,innum);
    b1=rands(midnum,1);
    w2=rands(midnum,outnum);
    b2=rands(outnum,1);
    
    w2_1=w2;w2_2=w2_1;
    w1_1=w1;w1_2=w1_1;
    b1_1=b1;b1_2=b1_1;
    b2_1=b2;b2_2=b2_1;
    
    %ѧϰ��
    xite=0.1;
    alfa=0.01;
    loopNumber=2000; % ѧϰ����
    I=zeros(1,midnum);
    Iout=zeros(1,midnum);
    FI=zeros(1,midnum);
    
    dw1=zeros(innum,midnum); % w������ֵ
    db1=zeros(1,midnum); % b������ֵ
    
    
    E=zeros(1,loopNumber);
    input_size = size(input);
    for ii=1:loopNumber
        E(ii)=0;
        for i=1:1:input_size(2)
           %% ����Ԥ�����
            x=input(:,i);
            % ���������
            for j=1:1:midnum
                I(j)=input(:,i)'*w1(j,:)'+b1(j);
                Iout(j)=1/(1+exp(-I(j)));
            end
            % ��������
            yn=w2'*Iout'+b2;
            
           %% Ȩֵ��ֵ����
            % �������
            e=output(:,i)-yn;
            E(ii)=E(ii)+sum(abs(e));
            
            % ����Ȩֵ�仯��
            dw2=e*Iout;
            db2=e';
            
            for j=1:1:midnum
                S=1/(1+exp(-I(j)));
                FI(j)=S*(1-S);
            end
            
            for k=1:1:innum
                for j=1:1:midnum
                    dw1(k,j)=FI(j)*x(k)*(e(1)*w2(j,1));
                    db1(j)=FI(j)*(e(1)*w2(j,1));
                end
            end
            
            w1=w1_1+xite*dw1';
            b1=b1_1+xite*db1';
            w2=w2_1+xite*dw2';
            b2=b2_1+xite*db2';
            
            w1_2=w1_1;w1_1=w1;
            w2_2=w2_1;w2_1=w2;
            b1_2=b1_1;b1_1=b1;
            b2_2=b2_1;b2_1=b2;
        end
    end    
    
    
    test_data_size = size(test_data);
    fore=zeros(1, test_data_size(2));
    for i=1:test_data_size(2)
        % ���������
        for j=1:1:midnum
            I(j)=input(:,i)'*w1(j,:)'+b1(j);
            Iout(j)=1/(1+exp(-I(j)));
        end
        
        fore(:,i)=w2'*Iout'+b2;
    end
    
    cur_fore_error = 0;
    for i=1:length(fore);
        cur_fore_error = cur_fore_error + (abs(fore(i) - test_hdi(i)))^2;
    end;
    
    if ~isempty(fore_errors);
        if cur_fore_error < min(fore_errors);
            disp(midnum);
            weight = zeros(1, innum);
            for i=1:innum;
                sum_w = 0;
                for j=1:midnum;
                    sum_w = sum_w + abs(w1(j,i));
                end;
                weight(1,i) = sum_w;
            end;
            
            sum_weight = sum(weight);
            weight = weight ./ sum_weight;
        end;
    end;
    fore_errors = [fore_errors cur_fore_error];
end;

%% �������
figure(1);
title('������ڵ����������Ӱ��');
plot(midnums, fore_errors, 'r');
hold on;


%{
%% �������

%BP����Ԥ�����
error=output_fore-output1(n(1501:2000))';

%����Ԥ�����������ʵ����������ķ���ͼ
figure(1)
plot(output_fore,'r')
hold on
plot(output1(n(1501:2000))','b')
legend('Ԥ���������','ʵ���������')

%�������ͼ
figure(2)
plot(error)
title('BP����������','fontsize',12)
xlabel('�����ź�','fontsize',12)
ylabel('�������','fontsize',12)

%print -dtiff -r600 1-4

k=zeros(1,4);
%�ҳ��жϴ���ķ���������һ��
for i=1:500
    if error(i)~=0  % ~=����˼�� ������
        [b,c]=max(output_test(:,i));
        switch c
            case 1
                k(1)=k(1)+1;
            case 2
                k(2)=k(2)+1;
            case 3
                k(3)=k(3)+1;
            case 4
                k(4)=k(4)+1;
        end
    end
end

%�ҳ�ÿ��ĸ����
kk=zeros(1,4);
for i=1:500
    [b,c]=max(output_test(:,i));
    switch c
        case 1
            kk(1)=kk(1)+1;
        case 2
            kk(2)=kk(2)+1;
        case 3
            kk(3)=kk(3)+1;
        case 4
            kk(4)=kk(4)+1;
    end
end

%��ȷ��
rightridio=(kk-k)./kk;
disp('��ȷ��')
disp(rightridio);

error_count = sum(k);
disp(error_count); 
%}