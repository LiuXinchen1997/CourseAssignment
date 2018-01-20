// MyBoids.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"

#include "MyBoids.h"

#define GLUT_DISABLE_ATEXIT_HACK
#include <GL/glut.h>
#include <math.h>
#include <stdlib.h>
#include <iostream>
#include <vector>

// 自己增加的一些参数
#define ISNEIGHBOR 4.5f
#define SIDELEN 10.0f
#define STEPLEN 1.0f
#define SMALL 0.01f

// screen width and height
int screenWidth;
int screenHeight;

//------simulation parameters-----//
double StepSpeed = 0.1;  //The distance movement for each step
double copy_speed = 0.0f;

bool bCubeMotion = true;  //Control whether Cube is moving

//------Cube------//
float CubePosition[3] = {0,0,0}; //init
//for cube's motion path
GLfloat MM[16]={0};//matrix for cubic
GLfloat QuaternionArray[4][7]={{1,0,0,0,-7,5,-10},{0,1,0,0,7,5,-10},{0,0,1,0,7,5,6},{0,0,0,1,-7,5,6}};
GLfloat BSplineMatrix[16]={-1.0f/6.0f,3.0f/6.0f,-3.0f/6.0f,1.0f/6.0f,3.0f/6.0f,-1.0f,0,4.0f/6.0f,-3.0f/6.0f,3.0f/6.0f,3.0f/6.0f,1.0f/6.0f,1.0f/6.0f,0,0,0};
int Number = 4; //the cubic position point number
int PNumber = 0;//cubic at which position
GLfloat t=0; 
static GLfloat M[16]={0};//the matrix for glMatrixMult

//-----Boids------//
float BoidsPosition[BoidsNum][3]={0}; //init the extern variable
GLfloat Velocity[BoidsNum][3]={0}; //boids velocity

GLfloat MR[BoidsNum][16];

//-----Boids Rules------//
GLfloat vr1[3]={0}; //velocity for rule1
GLfloat vr2[3]={0}; //velocity for rule2
GLfloat vr3[3]={0}; //velocity for rule3
GLfloat vr4[3]={0}; //velocity for rule4
bool vr5[3] = { false }; // for avoidance
void Rule1(int Num);
void Rule2(int Num);
void Rule3(int Num);
void Rule4(int Num);
void Rule5(int Num);



//normalise the vector
void Normalise(GLfloat InterArray[3]){  // 将向量的长度单位化
	GLfloat m2 = InterArray [0] * InterArray [0] + InterArray [1] * InterArray [1] + InterArray [2] * InterArray [2];
	if (m2!=0 && (fabs(m2-1.0f)>0.00001f)){
		GLfloat m = sqrt(m2);
		InterArray[1] /= m;
		InterArray[2] /= m;
		InterArray[0] /= m;
	}
} 

//Compute the distances between two balls
GLfloat Distance (GLfloat Vector1[3],GLfloat Vector2[3]){
	
	GLfloat Distance=sqrt((Vector1[0]-Vector2[0])*(Vector1[0]-Vector2[0])+(Vector1[1]-Vector2[1])*(Vector1[1]-Vector2[1])+(Vector1[2]-Vector2[2])*(Vector1[2]-Vector2[2]));
	return Distance;

}

//comput T*M*G,and return the result
GLfloat MatrixMult(GLfloat T[4],GLfloat MT[16],GLfloat G[4]) { 
	GLfloat Temp[4]={0};
	Temp[0]=T[0]*MT[0]+T[1]*MT[1]+T[2]*MT[2]+T[3]*MT[3];
	Temp[1]=T[0]*MT[4]+T[1]*MT[5]+T[2]*MT[6]+T[3]*MT[7];
	Temp[2]=T[0]*MT[8]+T[1]*MT[9]+T[2]*MT[10]+T[3]*MT[11];
	Temp[3]=T[0]*MT[12]+T[1]*MT[13]+T[2]*MT[14]+T[3]*MT[15];
	GLfloat result=Temp[0]*G[0]+Temp[1]*G[1]+Temp[2]*G[2]+Temp[3]*G[3];
	return result;
}

// user initialization
void AllInit() 
{
	for (int j=0;j<BoidsNum;j++){
		MR[j][0] = 1.0f;
		MR[j][5] = 1.0f;		
		MR[j][10] = 1.0f;

		//
		//init the position of boids
		//random position
		//
		for (int i=0;i<3;i++)
		{
			MR[j][12+i] = 5+(rand()-RAND_MAX/2.0) / (RAND_MAX/10.0);
			BoidsPosition[j][i] = MR[j][12+i];
		}
		MR[j][15]=1.0f;
	}

		//init the cube position
	for (int i=0; i<3;i++){
		CubePosition[i] = MM[12+i];
	}
}

//compute the quaternion matrix
void Quaternion (GLfloat InterArray[7],GLfloat M[16]){
	GLfloat w=InterArray[0];
	GLfloat x=InterArray[1];
	GLfloat y=InterArray[2];
	GLfloat z=InterArray[3];
	M[0]=1.0f-2.0f*(y*y+z*z);
	M[1]=2.0f*(x*y+w*z);
	M[2]=2.0f*(x*z-w*y);
	M[3]=0.0f;
	M[4]=2.0f*(x*y-w*z);
	M[5]=1.0f-2.0f*(x*x+z*z);
	M[6]=2.0f*(y*z+w*x);
	M[7]=0.0f;
	M[8]=2.0f*(x*z+w*y);
	M[9]=2.0f*(y*z-w*x);
	M[10]=1-2.0f*(x*x+y*y);
	M[11]=0.0f;
	M[12]=InterArray[4];
	M[13]=InterArray[5];
	M[14]=InterArray[6];
	M[15]=1.0f;
}

//the movement of the cubic
void Interpolation (GLfloat InterpolationMatrix[16],GLfloat P[4][7]){    

	GLfloat InterArray[7];
	GLfloat TMatrix[4]={t*t*t,t*t,t,1};
	for (int i=0; i<7 ; i++){
		GLfloat GMatrix [4] = {P[PNumber][i],P[(PNumber+1)%Number][i],P[(PNumber+2)%Number][i],P[(PNumber+3)%Number][i]};
		InterArray[i] = MatrixMult(TMatrix,InterpolationMatrix,GMatrix);
	}
	Normalise(InterArray);
	Quaternion(InterArray,MM);	
	
	//fill the cube position
	for (int i=0; i<3;i++){
		CubePosition[i] = MM[12+i];
	}
}

GLfloat addVelocity(GLfloat v1[3], GLfloat v2[3])
{
	GLfloat tmp[3] = { 0 };
	for (int i = 0; i < 3; i++) {
		tmp[i] = v1[i] - v2[i];
	}

	return sqrtf(tmp[0]*tmp[0]+tmp[1]*tmp[1]+tmp[2]*tmp[2]);
}

//the boids movement function
void BoidsMotion()
{
	GLfloat v1[3]={0};
	GLfloat v2[3]={0};
	GLfloat v3[3]={0};
	GLfloat v4[3]={0};
	for (int i=0;i<BoidsNum;i++)
	{
		Rule1(i);
		for(int j=0;j<3;j++){
			v1[j]=vr1[j];
			vr1[j] = 0;
		}
		Rule2(i);
		for(int j=0;j<3;j++){
			v2[j]=vr2[j];
			vr2[j] = 0;		
		}
		Rule3(i);
		for(int j=0;j<3;j++){
			v3[j]=vr3[j];
			vr3[j] = 0;
		}
		Rule4(i);
		for(int j=0;j<3;j++){
			v4[j]=vr4[j];
			vr4[j] = 0;
		}
		Rule5(i);
		for(int j=0;j<3;j++){
			Velocity[i][j]=Velocity[i][j]+Cohesion*v1[j]+Separation*v2[j]+Aligment*v3[j]+Follow*v4[j];
			
			float velocity = sqrtf(Velocity[i][0] * Velocity[i][0] + Velocity[i][1] * Velocity[i][1] + Velocity[i][2] * Velocity[i][2]);
			float cur_lar = sqrtf(BoidsPosition[i][0] * BoidsPosition[i][0] + BoidsPosition[i][1] * BoidsPosition[i][1] + BoidsPosition[i][2] * BoidsPosition[i][2]);
			if (vr5[j]) {
				// Velocity[i][j] += -BoidsPosition[i][j] * velocity / cur_lar;
				// Velocity[i][j] = -BoidsPosition[i][j] * 0.01;
				// Velocity[i][j] += -BoidsPosition[i][j] * velocity / addVelocity(Velocity[i], BoidsPosition[i]);

				float curr = BoidsPosition[i][j];
				float nextt = BoidsPosition[i][j] + Velocity[i][j];
				if (fabs(nextt) > fabs(curr)) {
					Velocity[i][j] = -Velocity[i][j];
				}
			}
			
			BoidsPosition[i][j]=BoidsPosition[i][j]+Velocity[i][j]*StepSpeed;
			MR[i][12+j]=BoidsPosition[i][j];
		}
	}

}

// rule 1 for Boids try to fly towards the centre of mass of neighbouring boids
// Conhension
void Rule1(int Num){
	GLfloat center[3]={0};
	int neigh_count = 0;
	for (int i=0; i<BoidsNum; i++)
	{
		if (i != Num) {
			if (Distance(BoidsPosition[Num], BoidsPosition[i]) < ISNEIGHBOR) {
				center[0] += MR[i][12];
				center[1] += MR[i][13];
				center[2] += MR[i][14];
				neigh_count++;
			}
		}
	}

	if (neigh_count != 0) {
		center[0] = (center[0] - MR[Num][12]) / neigh_count; // exclude itself
		center[1] = (center[1] - MR[Num][13]) / neigh_count;
		center[2] = (center[2] - MR[Num][14]) / neigh_count;
	}
	
	for (int i=0;i<3;i++) {
		vr1[i]=(center[i]-MR[Num][12+i]) / 5000;
	}
}

//rule 2 for Boids try to keep a small distance away from other objects (including other boids).
// Separation
void Rule2(int Num) {
	int neigh_count = 0;
	GLfloat direct[3] = { 0 };
	for (int i=0; i<BoidsNum;i++) {
		if (i!=Num) {
			if (Distance(BoidsPosition[Num],BoidsPosition[i]) < ISNEIGHBOR) {
				for (int j=0;j<3;j++) {
					GLfloat dist = Distance(BoidsPosition[Num], BoidsPosition[i]);
					direct[j] += (BoidsPosition[i][j] - BoidsPosition[Num][j]) / (dist * dist);
					neigh_count++;
				}
			}
		}
	}

	if (neigh_count > 0) {
		for (int i = 0; i < 3; i++) {
			direct[i] = direct[i] / (GLfloat)neigh_count;
		}
	}

	for (int i = 0; i < 3; i++) {
		vr2[i] = (vr2[i] - direct[i]) / 80.0;
	}
}

// rule 3 for Boids try to match velocity with near boids.
// alignment
void Rule3(int Num){
	GLfloat avg[3]={0};
	int neigh_count = 0;
	for (int i=0; i < BoidsNum; i++) {
		if (i != Num) {
			if (Distance(BoidsPosition[Num], BoidsPosition[i]) < ISNEIGHBOR) {
				avg[0] += Velocity[i][0];
				avg[1] += Velocity[i][1];
				avg[2] += Velocity[i][2];
				neigh_count++;
			}
		}
	}

	if (neigh_count != 0) {
		avg[0] = (avg[0] - Velocity[Num][0]) / neigh_count; //exclude itself
		avg[1] = (avg[1] - Velocity[Num][1]) / neigh_count;
		avg[2] = (avg[2] - Velocity[Num][2]) / neigh_count;
	}
	
	for (int i=0;i<3;i++)
	{
		vr3[i]=(avg[i]-Velocity[Num][i])/2000; //error-correction 
	}
}

// rule 4 for boids try to follow the cubic
// follow
void Rule4(int Num) {
	for (int i=0; i<3;i++) {
		vr4[i]=(CubePosition[i]-MR[Num][12+i])/3000;
	}
}

// rule 5 for Boids bound from the boundary.
// Avoidance
void Rule5(int Num) {
	float posi_x = BoidsPosition[Num][0];
	float posi_y = BoidsPosition[Num][1];
	float posi_z = BoidsPosition[Num][2];

	if (posi_x >= SIDELEN - SMALL || posi_x <= -SIDELEN + SMALL) {
		vr5[0] = true;
	}
	else {
		vr5[0] = false;
	}

	if (posi_y >= SIDELEN - SMALL || posi_y <= -SIDELEN + SMALL) {
		vr5[1] = true;
	}
	else {
		vr5[1] = false;
	}

	if (posi_z >= SIDELEN - SMALL || posi_z <= -SIDELEN + SMALL) {
		vr5[2] = true;
	}
	else {
		vr5[2] = false;
	}
}

//display one ball
void BallDisplay (int Num)
{
	glColor3f(0.9f, 0.9f, 0.0f);
	glPushMatrix();
	for (int i=0;i<16;i++){
		M[i]=MR[Num][i];
	}
	glMultMatrixf(M);
	glutSolidSphere(0.3,20,20);
	glPopMatrix();
}

//display the cubic that be followed
void CubeMotion()
{
	if(bCubeMotion)
	{
		t=t+0.002;
		if(t>1)
		{
			t=0;
			if(PNumber<Number-1){
				PNumber++;
			}
			else{
				PNumber=0;
			}	
		}

		Interpolation(BSplineMatrix,QuaternionArray);
	}
}

void CubeDisplay ()
{
	glPushMatrix();
	glMultMatrixf(MM);

	glColor3f(0.9f, 0.0f, 0.0f);
	glutSolidCube(1.0);
	glPopMatrix();
}

//All Ball Display
void BoidsDisplay()
{
	for (int i=0;i<BoidsNum;i++)
	{
		BallDisplay (i);
	}	
}

//Display the land
void LandDisplay(){
	glBegin(GL_LINES);
	glColor3f(0.0f, 0.5f, 0.0f);
	for (GLfloat x = -100; x < 100;x+=1.0f)
	        {glVertex3f(x, 0, -100); glVertex3f(x, 0,  100);}         
	for (GLfloat z = -150; z < 100;z+=1.0f)
	        {glVertex3f(-150, 0, z); glVertex3f( 100, 0, z);}          
    glEnd();
}

// 绘制边框
void SquareCaseDisplay() {
	glColor3f(0.0f, 0.5f, 0.0f);
	// 上
	glBegin(GL_LINES);
	for (GLfloat x = -SIDELEN; x < SIDELEN; x += STEPLEN) {
		glVertex3f(x, SIDELEN, -SIDELEN);
		glVertex3f(x, SIDELEN, SIDELEN);
	}

	for (GLfloat z = -SIDELEN; z < SIDELEN; z += STEPLEN) {
		glVertex3f(-SIDELEN, SIDELEN, z);
		glVertex3f(SIDELEN, SIDELEN, z);
	}
	glEnd();

	// 下
	glBegin(GL_LINES);
	for (GLfloat x = -SIDELEN; x < SIDELEN; x += STEPLEN) {
		glVertex3f(x, -SIDELEN, -SIDELEN);
		glVertex3f(x, -SIDELEN, SIDELEN);
	}

	for (GLfloat z = -SIDELEN; z < SIDELEN; z += STEPLEN) {
		glVertex3f(-SIDELEN, -SIDELEN, z);
		glVertex3f(SIDELEN, -SIDELEN, z);
	}
	glEnd();

	// 左
	glBegin(GL_LINES);
	for (GLfloat z = -SIDELEN; z < SIDELEN; z += STEPLEN) {
		glVertex3f(-SIDELEN, -SIDELEN, z);
		glVertex3f(-SIDELEN, SIDELEN, z);
	}

	for (GLfloat y = -SIDELEN; y < SIDELEN; y += STEPLEN) {
		glVertex3f(-SIDELEN, y, -SIDELEN);
		glVertex3f(-SIDELEN, y, SIDELEN);
	}
	glEnd();

	// 右
	glBegin(GL_LINES);
	for (GLfloat z = -SIDELEN; z < SIDELEN; z += STEPLEN) {
		glVertex3f(SIDELEN, -SIDELEN, z);
		glVertex3f(SIDELEN, SIDELEN, z);
	}

	for (GLfloat y = -SIDELEN; y < SIDELEN; y += STEPLEN) {
		glVertex3f(SIDELEN, y, -SIDELEN);
		glVertex3f(SIDELEN, y, SIDELEN);
	}
	glEnd();

	// 前
	glBegin(GL_LINES);
	for (GLfloat x = -SIDELEN; x < SIDELEN; x += STEPLEN) {
		glVertex3f(x, SIDELEN, SIDELEN);
		glVertex3f(x, -SIDELEN, SIDELEN);
	}

	for (GLfloat y = -SIDELEN; y < SIDELEN; y += STEPLEN) {
		glVertex3f(-SIDELEN, y, SIDELEN);
		glVertex3f(SIDELEN, y, SIDELEN);
	}
	glEnd();

	// 后
	glBegin(GL_LINES);
	for (GLfloat x = -SIDELEN; x < SIDELEN; x+= STEPLEN) {
		glVertex3f(x, SIDELEN, -SIDELEN);
		glVertex3f(x, -SIDELEN, -SIDELEN);
	}

	for (GLfloat y = -SIDELEN; y < SIDELEN; y += STEPLEN) {
		glVertex3f(-SIDELEN, y, -SIDELEN);
		glVertex3f(SIDELEN, y, -SIDELEN);
	}
	glEnd();
}










void processMenuEvents(int menu) {
	switch (menu)
	{
	case 1:
		bCubeMotion = true;
		break;
	case 2:
		bCubeMotion = false;
		break;
	case 3:
		for (int i = 0; i < BoidsNum; i++) {
			for (int j = 0; j < 3; j++) {
				Velocity[i][j] += 0.1;
			}
		}
		break;
	case 4:
		for (int i = 0; i < BoidsNum; i++) {
			for (int j = 0; j < 3; j++) {
				if (Velocity[i][j] - 0.1 >= 0) {
					Velocity[i][j] -= 0.1;
				}
			}
		}
		break;
	case 5:
		break;
	case 6:
		break;
	default:
		break;
	}
}

void createGLUTMenus() {

	int menu;

	// 创建菜单并告诉GLUT，processMenuEvents处理菜单事件。
	menu = glutCreateMenu(processMenuEvents);

	//给菜单增加条目
	glutAddMenuEntry("start cube", 1);
	glutAddMenuEntry("pause cube", 2);
	glutAddMenuEntry("increase speed", 3);
	glutAddMenuEntry("decrease speed", 4);

	// 把菜单和鼠标右键关联起来。
	glutAttachMenu(GLUT_RIGHT_BUTTON);
}








void display( void ) {
	glPushMatrix();

	// clear buffer
	glClearColor (0.0, 0.0, 0.0, 0.0);
	glClearDepth (1.0);
	glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);	
	
	// render state
	glEnable(GL_DEPTH_TEST);
	glShadeModel(GL_SMOOTH);
	
	// light source attributes
	GLfloat LightAmbient[]	= { 0.9f, 0.9f, 0.9f, 1.0f };
	GLfloat LightDiffuse[]	= { 0.9f, 0.9f, 0.9f, 1.0f };
	GLfloat LightSpecular[]	= { 0.0f, 0.0f, 0.0f, 1.0f };
	GLfloat LightPosition[] = { 5.0f, 5.0f, 5.0f, 1.0f };

	glEnable(GL_LIGHTING);
	glEnable(GL_LIGHT0);
	glLightfv(GL_LIGHT0, GL_AMBIENT , LightAmbient );
	glLightfv(GL_LIGHT0, GL_DIFFUSE , LightDiffuse );
	glLightfv(GL_LIGHT0, GL_SPECULAR, LightSpecular);
	glLightfv(GL_LIGHT0, GL_POSITION, LightPosition);

	// surface material attributes
	GLfloat material_Ka[]	= { 0.11f, 0.06f, 0.11f, 1.0f };
	GLfloat material_Kd[]	= { 0.43f, 0.47f, 0.54f, 1.0f };
	GLfloat material_Ks[]	= { 0.33f, 0.33f, 0.52f, 1.0f };
	GLfloat material_Ke[]	= { 0.1f , 0.0f , 0.1f , 1.0f };
	GLfloat material_Se		= 10;

	glMaterialfv(GL_FRONT, GL_AMBIENT	, material_Ka);
	glMaterialfv(GL_FRONT, GL_DIFFUSE	, material_Kd);
	glMaterialfv(GL_FRONT, GL_SPECULAR	, material_Ks);
	glMaterialfv(GL_FRONT, GL_EMISSION	, material_Ke);
	glMaterialf (GL_FRONT, GL_SHININESS	, material_Se);

	// modelview matrix
	glMatrixMode( GL_MODELVIEW );
	glLoadIdentity();
	gluLookAt (0.0f, 0.0f, 30.0f, 0.0f, 0.0f, 0.0f, 0.0f, 1.0f, 0.0f);

	// LandDisplay();
	SquareCaseDisplay();
	CubeMotion();
	CubeDisplay();

	BoidsMotion();
	BoidsDisplay();
	//glDisable(GL_LIGHT0);
	//glDisable(GL_LIGHTING);
	
	glPopMatrix();
	// swap back and front buffers
	glutSwapBuffers();
	
}

// update viewport and projection matrix when the window is resized
void reshape( int w, int h ) {
	// viewport

	glViewport(0, 0, (GLsizei) w, (GLsizei) h);

	// projection matrix

	glMatrixMode(GL_PROJECTION);
	glLoadIdentity ();
	gluPerspective(70.0, (GLfloat)w/(GLfloat)h, 1.0, 100.0);

	screenWidth  = w;
	screenHeight = h;
}


// keyboard input
void keyboard( unsigned char key, int x, int y ) {
	switch( key ) {
	case 0x1B: //VK_ESCAPE:
		exit(0);
		break;

	case 's':
		bCubeMotion = !bCubeMotion;
		break;

	case 'a': 
		StepSpeed += 0.01;
		break;

	case 'd': 
		StepSpeed -= 0.01;
		if(StepSpeed < 0) StepSpeed=0;
		break;

	case ' ':
		if (fabs(StepSpeed) < 0.000001) {
			StepSpeed = copy_speed;
		}
		else {
			copy_speed = StepSpeed;
			StepSpeed=0;
		}
		bCubeMotion = !bCubeMotion;
		break;

	default:
		break;
	}
}

#ifndef UseOGRE
int main( int argc, char** argv ) {
	// create GL window
	glutInit(&argc, argv);
	glutInitDisplayMode (GLUT_DOUBLE | GLUT_RGB |GLUT_DEPTH);
	glutInitWindowSize(1000, 600); 
	glutInitWindowPosition(100, 100);
	glutCreateWindow("Boids Demo Progrm for Course VR&Simulation!");

	// user initialization
	AllInit();
	
	// set callback functions
	glutDisplayFunc(display);
	glutIdleFunc(display);
	glutReshapeFunc(reshape);
	glutKeyboardFunc(keyboard);
	createGLUTMenus();
	//glutTimerFunc(16, timer, 0);
	
	// main loop
	glutMainLoop();

	return 0;
}
#endif

