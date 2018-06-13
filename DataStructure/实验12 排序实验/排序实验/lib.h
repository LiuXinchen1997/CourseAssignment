#ifndef LIB_H_INCLUDED
#define LIB_H_INCLUDED

#include "sortlib.h"

#define MESS_FILE "mess1.txt"
#define SORTED_FILE "sorted.txt"
#define INVERSED_FILE "inverse.txt"

void createMessData( char* messFile, int num )
{
    ofstream outfile;
    if( !outfile ) {
        cerr << "Outfile error!" << endl;
        exit(1);
    }

    outfile.open( messFile, ios::out );

    srand((unsigned int)time(NULL));
    int *a = new int[num];
    for(int i = 0; i < num; i++)
    {
        if( i % 10 == 0 && i != 0 ) outfile << endl;
        a[i] = rand() % 99999;
        outfile << setw(5) << a[i] << " ";
    }

    outfile.close(); delete [] a;
    cout << num << " mess data created successfully in " << messFile << endl;
}

int* getMessData( char* messFile, int num )
{
    ifstream infile( messFile, ios::in );
    if( !infile ) {
        cerr << "Infile error!" << endl;
        exit(1);
    }

    int *a = new int[num];
    for (int i = 0; i < num; i++) infile >> a[i];
    infile.close();
    return a;
}


void createSortedData( int num )
{
    ofstream outfile;
    if( !outfile ) {
        cerr << "Outfile error!" << endl;
        exit(1);
    }

    outfile.open( SORTED_FILE, ios::out );

    int* a = getMessData( MESS_FILE, num );
    mergeSort(0, num, a);

    for(int i = 0; i < num; i++)
    {
        if( i % 10 == 0 && i != 0 ) outfile << endl;
        outfile << setw(5) << a[i] << " ";
    }

    outfile.close(); delete [] a;
    cout << num << " sorted data created successfully in " << SORTED_FILE << endl;
}

int* getSortedData( int num )
{
    ifstream infile( SORTED_FILE, ios::in );
    if( !infile ) {
        cerr << "Infile error!" << endl;
        exit(1);
    }

    int *a = new int[num];
    for(int i = 0; i < num; i++) infile >> a[i];
    infile.close();
    return a;
}

void createInverseData( int num )
{
    ofstream outfile;
    if( !outfile ) {
        cerr << "Outfile error!" << endl;
        exit(1);
    }

    outfile.open( INVERSED_FILE, ios::out );

    int *a = getSortedData(num);
    for(int i = num-1; i >= 0; i--)
    {
        if( (i + 1) % 10 == 0 && (i + 1) != num ) outfile << endl;
        outfile << setw(5) << a[i] << " ";
    }

    outfile.close(); delete [] a;
    cout << num << " inversed data created successfully in " << INVERSED_FILE << endl;
}

int* getInversedData( int num )
{
    ifstream infile( INVERSED_FILE, ios::in );
    if( !infile ) {
        cerr << "Infile error!" << endl;
        exit(1);
    }

    int *a = new int[num];
    for(int i = 0; i < num; i++) infile >> a[i];
    infile.close();
    return a;
}


void createData( int num )
{
    createMessData( MESS_FILE, num);
    createMessData( "mess2.txt", num);
    createMessData( "mess3.txt", num);
    createSortedData(num);
    createInverseData(num);
}


template <typename SORT>
void testSort( int num, SORT Sort )
{
    ofstream outfile( "sortTime.txt", ios::out|ios::app );
    if( !outfile ) {
        cerr << "Outfile error!" << endl;
        exit(1);
    }

    outfile << "****** Data Size: "<< num << " ******" << endl;

    cout << endl << Sort.name << ": " << endl;
    outfile << Sort.name << ": " << endl;
    int* mess = getMessData( MESS_FILE, num );
    long messTime1 = Sort( mess, num ); delete [] mess;
    int* sorted = getSortedData(num);
    long sortedTime = Sort( sorted, num ); delete [] sorted;
    int* inversed = getInversedData(num);
    long inversedTime = Sort( inversed, num ); delete [] inversed;

    mess = getMessData( "mess2.txt", num );
    long messTime2 = Sort( mess, num ); delete [] mess;

    mess = getMessData( "mess3.txt", num );
    long messTime3 = Sort( mess, num ); delete [] mess;

    long messAverageTime = (messTime1 + messTime2 + messTime3) / 3;
    long totalAverageTime = (messTime1 + messTime2 + messTime3 + sortedTime + inversedTime) / 5;

    cout << left << setw(18) << "Mess1: " << messTime1 << " ms." << endl;
    outfile << left << setw(18) << "Mess1: " << messTime1 << " ms." << endl;
    cout << left << setw(18) << "Mess2: " << messTime2 << " ms." << endl;
    outfile << left << setw(18) << "Mess2: " << messTime2 << " ms." << endl;
    cout << left << setw(18) << "Mess3: " << messTime3 << " ms." << endl;
    outfile << left << setw(18) << "Mess3: " << messTime3 << " ms." << endl;
    cout << left << setw(18) << "messAverageTime: " << messAverageTime << " ms." << endl;
    outfile << left << setw(18) << "messAverageTime: " << messAverageTime << " ms." << endl;
    cout << left << setw(18) << "Sorted: " << sortedTime << " ms." << endl;
    outfile << left << setw(18) << "Sorted: " << sortedTime << " ms." << endl;
    cout << left << setw(18) << "Inversed: " << inversedTime << " ms." << endl;
    outfile << left << setw(18) << "Inversed: " << inversedTime << " ms." << endl << endl;
    cout << left << setw(18) << "totalAverageTime: " << totalAverageTime << " ms." << endl;
    outfile << left << setw(18) << "totalAverageTime: " << totalAverageTime << " ms." << endl;

    outfile.close();
}


#endif // LIB_H_INCLUDED
