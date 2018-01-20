
#pragma once


#include "stdafx.h"
#include <vector>

//------simulation parameters-----//
#define BoidsNum 50    //The number of the boids
#define Separation 1.0
#define Aligment 1.0
#define Cohesion 1.0
#define Follow 1.0
#define Avoidance 1.0

//----Init-----//
extern void AllInit();

//------Cube------//
extern float CubePosition[3];
extern void CubeMotion();
extern bool bCubeMotion;

//-----Boids------//
extern float BoidsPosition[BoidsNum][3]; //boids position
extern void BoidsMotion();
extern double StepSpeed;  //The distance movement for each step, such as 0.1

//#define UseOGRE

//------For OGRE------//
//
//preparing
//
//0 uncomment the above line of "#define UseOGRE"
//0 add the MyBoids.h and MyBoids.cpp to you OGRE project
//0 add the '#include "MyBoids.h"' to your main module of the OGRE project

//
//run the boids
//
//1 call AllInit() firstly;
//2 draw a land surface(x between -100 and 100, y=0, z between -150 and 150) in the OGRE
//3 draw a unit cube(1¡Á1¡Á1) at position from CubePosition[3];
//4 draw BoidsNum boids(solid sphere with radius 0.3) at position BoidsPosition[BoidsNum][3]
//5 In OGRE Rendering Loop, 
//6 first call CubeMotion for moving cube, and it will update the CubePosition[3] for cube's position
//7 then call BoidsMotion() for moving all boids to follow the cube, and it will update  BoidsPosition[BoidsNum][3] for all Boids' position 
//8 what's more, variable "StepSpeed" could be used to ajust the boids' speed, 
//9 and bool "bCubeMotion" could be stop the cube for a static following scenario
//10 Similar with the OpenGL version, I strongly recommended that everyone should add some interaction functions in the OGRE, such as speedup/slowddown the boids' speed, 
//11   move/stop the cube, increase/decrease the 4 rules' strength , etc....., which will increase your grade of this course :-)
//
//
//12 please refer DemoForOGRE.cpp for more details
//
//
//13 finally remember to attend the last two experiment courses
//14 please finish all experiments and send the 6 experiment reports together(gathered by monitor) to me(leepyzh@qq.com) before 6/22 
//15 good luck!
//
//from Liping Zheng and Lin Li
//