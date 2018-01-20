// Demo.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"

#include <GL/glut.h>              // glut.h includes gl.h and glu.h already
#include <windows.h>
#include <math.h>

#include <GL/glu.h>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>




bool GetTwoLineIntersection(float _a1, float _b1, float _c1, float _a2, float _b2, float _c2, float &x, float &y)
{
	//_a1x+_b1y=_c1;---(1)
	//_a2x+_b2y=_c2;---(2)
	//
	if (_c1 == 0 && _c2 == 0)
	{
		//2个未知数2个方程组成的齐次方程组求解
		//系数矩阵B
		//| _a1 _b1 |
		//| _a2 _b2 |
		float DB = _a1*_b2 - _a2*_b1;
		if (DB != 0)//有唯一零解
		{
			x = 0;
			y = 0;
			return true;
		}
		else//有无数解
		{
			x = 0;
			y = 0;
			return false;
		}
	}
	else
	{
		//2个未知数2个方程组成的非齐次方程组求解
		//系数矩阵B
		//| _a1 _b1 |
		//| _a2 _b2 |
		//
		float DB = _a1*_b2 - _a2*_b1;
		if (DB != 0)//有唯一解
		{
			float dD1 = _c1 * _b2 - _c2 * _b1;
			float dD2 = _a1 * _c2 - _a2 * _c1;
			x = dD1 / DB;
			y = dD2 / DB;
			return true;
		}
		else//有无数解或者无解
		{
			x = 0;
			y = 0;
			return false;
		}
	}
	return false;
}

bool CalNormalVector(float x1, float y1, float z1, float x2, float y2, float z2, float x3, float y3, float z3,
	float &dx, float &dy, float &dz)
{
	//float a1,a2,b1,b2,c1,c2;
	//
	float _a1 = x2 - x1; float _b1 = y2 - y1; float _c1 = z2 - z1;
	float _a2 = x3 - x1; float _b2 = y3 - y1; float _c2 = z3 - z1;
	float _a3 = x3 - x2; float _b3 = y3 - y2; float _c3 = z3 - z2;
	//_a1x+_b1y+_c1z=0;
	//_a2x+_b2y+_c2z=0;
	//_a3x+_b3y+_c3z=0;
	//3个未知数3个方程组成的齐次方程组求解
	//系数矩阵A
	//| _a1 _b1 _c1 |
	//| _a2 _b2 _c2 |
	//| _a3 _b3 _c3 |
	//如果行列式A的值不等于0，则有唯一解且为零解
	float DA = _a1*_b2*_c3 + _b1*_c2*_a3 + _a2*_b3*_c1 - _a3*_b2*_c1 - _a1*_b3*_c2 - _a2*_b1*_c3;
	if (DA != 0)
	{
		dx = 0.0f;
		dy = 0.0f;
		dz = 0.0f;
		return false;
	}
	//---------------------------------------------//
	//如果行列式A的值等于0，则有非零解
	//非零解即x!=0时有解或者y!=0时有解或者z!=0时有解
	float x = 0.0f, y = 0.0f, z = 0.0f;
	//若z!=0时有解,取z=-1
	//_a1x+_b1y=_c1;---(1)
	//_a2x+_b2y=_c2;---(2)
	//_a3x+_b3y=_c3;---(3)
	//任取2个方程即可，在此取(1)(2)
	x = 0.0f;y = 0.0f;
	bool flag3 = GetTwoLineIntersection(_a1, _b1, _c1, _a2, _b2, _c2, x, y);
	if (flag3)//假设成立
	{
		dx = -x;
		dy = -y;
		dz = 1.0f;
		return true;
	}
	//假设不成立，继续试验另一个假设
	//若x!=0时有解取x=-1，平面中两条直线求交点问题
	//_b1y+_c1z=_a1;---(1)
	//_b2y+_c2z=_a2;---(2)
	//_b3y+_c3z=_a3;---(3)
	//任取2个方程即可，在此取(1)(2)
	y = 0.0f;z = 0.0f;
	bool flag1 = GetTwoLineIntersection(_b1, _c1, _a1, _b2, _c2, _a2, y, z);
	if (flag1)//假设成立
	{
		dx = 1.0f;
		dy = -y;
		dz = -z;
		return true;
	}
	//假设不成立，继续试验另一个假设
	//若y!=0时有解取y=-1，平面中两条直线求交点问题
	//_a1x+_c1z=_b1;---(1)
	//_a2x+_c2z=_b2;---(2)
	//_a3x+_c3z=_b3;---(3)
	//任取2个方程即可，在此取(1)(2)
	x = 0.0f;z = 0.0f;
	bool flag2 = GetTwoLineIntersection(_a1, _c1, _b1, _a2, _c2, _b2, x, z);
	if (flag2)//假设成立
	{
		dx = -x;
		dy = 1.0f;
		dz = -z;
		return true;
	}

	//所有假设都不成立，求解失败
	return false;
}










static GLfloat spin = 0.0f;

void draw_origin()
{
	glColor3f(1.0, 0.0, 0.0);

	glBegin(GL_LINES);

	glVertex3f(-1.0, 0.0, 0.0);
	glVertex3f( 1.0, 0.0, 0.0);

	glVertex3f( 0.0, -1.0, 0.0);
	glVertex3f( 0.0,  1.0, 0.0);

	glEnd();
}

void draw_polygon()
{
	glBegin(GL_QUADS);

	glNormal3f(0.0F, 0.0F, 1.0F);
	glVertex3f(3.0f, 1.0f, 0.0f);
	glVertex3f(7.0f, 1.0f, 0.0f);
	glVertex3f(7.0f, 3.0f, 0.0f);
	glVertex3f(3.0f, 3.0f, 0.0f);
 
	glEnd();
}



struct Point {
	double x, y, z;
	float dx, dy, dz; // 记录顶点法向量的值
	Point(double xx, double yy, double zz) {
		this->x = xx;
		this->y = yy;
		this->z = zz;

		this->dx = 0;
		this->dy = 0;
		this->dz = 0;
	}

	Point() {}
};

struct Face {
	Point p1, p2, p3;
	Face(Point pp1, Point pp2, Point pp3) {
		p1.x = pp1.x;
		p1.y = pp1.y;
		p1.z = pp1.z;
		
		p2.x = pp1.x;
		p2.y = pp1.y;
		p2.z = pp1.z;

		p3.x = pp1.x;
		p3.y = pp1.y;
		p3.z = pp1.z;
	}
};

void draw_bunny()
{
	std::ifstream in("Bunny.off");
	std::string foo;
	int bar;

	in >> foo;

	int point_num;
	int face_num;
	in >> point_num >> face_num >> bar;

	// 读顶点
	std::vector<Point> points;
	for (int i = 1; i <= point_num; i++) {
		double x, y, z;
		in >> x >> y >> z;
		points.push_back(Point(x, y, z));
	}

	std::vector<Face> faces;
	// 绘制三角面

	std::vector<int> p1s;
	std::vector<int> p2s;
	std::vector<int> p3s;

	for (int i = 1; i <= face_num; i++) {
		int p1, p2, p3;
		in >> p1 >> p1 >> p2 >> p3;
		p1s.push_back(p1);
		p2s.push_back(p2);
		p3s.push_back(p3);

		float dx, dy, dz;
		bool flag = CalNormalVector(points[p1].x, points[p1].y, points[p1].z,
			points[p2].x, points[p2].y, points[p2].z,
			points[p3].x, points[p3].y, points[p3].z,
			dx, dy, dz);

		// glBegin(GL_TRIANGLES);
		if (flag) {
			// glNormal3f(dx, dy, dz);
			points[p1].dx += dx;
			points[p1].dy += dy;
			points[p1].dz += dz;

			points[p2].dx += dx;
			points[p2].dy += dy;
			points[p2].dz += dz;

			points[p3].dx += dx;
			points[p3].dy += dy;
			points[p3].dz += dz;
		}

		faces.push_back(Face(points[p1], points[p2], points[p3]));
	}

	for (int i = 1; i <= face_num; i++) {
		Face face = faces[i-1];
		glBegin(GL_TRIANGLES);
		Point p1 = points[p1s[i - 1]];
		Point p2 = points[p2s[i - 1]];
		Point p3 = points[p3s[i - 1]];

		glNormal3f(p1.dx, p1.dy, p1.dz);
		glVertex3f(p1.x, p1.y, p1.z);

		glNormal3f(p2.dx, p2.dy, p2.dz);
		glVertex3f(p2.x, p2.y, p2.z);

		glNormal3f(p3.dx, p3.dy, p3.dz);
		glVertex3f(p3.x, p3.y, p3.z);
		glEnd();
	}

	return;
}

void myspin()
{
	spin += 10.0f;
	if (spin >= 360.0f) {
		spin = -360.0f;
	}

	glutPostRedisplay();
}

void wait()
{
	for (int i = 1; i <= 100; i++) {
		for (int j = 1; j <= 200; j++) {
			for (int k = 1; k <= 1000; k++) {
				int a = i*i + j*j + k*k;
			}
		}
	}
}

void display()
{
	const float BILI = 0.06f;

	glMatrixMode(GL_MODELVIEW);

	glClear(GL_COLOR_BUFFER_BIT|GL_DEPTH_BUFFER_BIT);
	// wait();

	glColor3f(0.5f, 0.5f, 0.5f);
	
	glPushMatrix();
	glRotatef(-90.0f, 1, 0, 0);

	glPushMatrix();
	glScalef(BILI, BILI, BILI);
	glTranslatef(0.0f, 0.0f, -70.0f);
	// glRotatef(90.0f, 0.0f, 0.0f, 1.0f);
	draw_bunny(); // 读取并绘制兔子模型
	glPopMatrix();


	glColor3f(1.0f, 1.0f, 0.0f);

	glPushMatrix();
	glRotatef(spin, 0.0f, 0.0f, 1.0f);
	glTranslatef(8.0f, 0.0f, 7.5f);
	GLUquadric *star = gluNewQuadric();
	gluSphere(star, 1.0, 16, 16);
	glPopMatrix();

	glPopMatrix();

	glFlush();
}

GLfloat LightAmbient[] = { 0.5f, 0.5f, 0.5f, 1.0f }; //环境光参数，半亮白色
GLfloat LightDiffuse[] = { 1.0f, 0.0f, 0.0f, 1.0f }; //漫射光参数
GLfloat LightSpecular[] = { 1.0f, 1.0f, 1.0f, 1.0f };

GLfloat LightPosition[] = { 0.0f, 0.0f, 2.0f, 1.0f }; //光源位置
GLfloat Light2Position[] = { 2.0f, 0.0f, 0.0f, 1.0f }; //光源位置
GLfloat Light3Position[] = { 0.0f, 2.0f, 0.0f, 1.0f }; //光源位置

void myinit()
{
	glClearColor(0.0, 0.0, 0.0, 0.0);

	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();

	gluPerspective(45, 1.0, 0.1, 1000);
	gluLookAt(0.0, 30.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0);
	
	glLightfv(GL_LIGHT1, GL_AMBIENT, LightAmbient); //设置环境光
	glLightfv(GL_LIGHT1, GL_DIFFUSE, LightDiffuse); //设置漫射光
	glLightfv(GL_LIGHT1, GL_SPECULAR, LightSpecular); // 镜面反射光
	glLightfv(GL_LIGHT1, GL_POSITION, LightPosition); //设置光源位置
	
	glLightfv(GL_LIGHT2, GL_AMBIENT, LightAmbient); //设置环境光
	glLightfv(GL_LIGHT2, GL_DIFFUSE, LightDiffuse); //设置漫射光
	glLightfv(GL_LIGHT2, GL_SPECULAR, LightSpecular); // 镜面反射光
	glLightfv(GL_LIGHT2, GL_POSITION, Light2Position); //设置光源位置

	glLightfv(GL_LIGHT3, GL_AMBIENT, LightAmbient); //设置环境光
	glLightfv(GL_LIGHT3, GL_DIFFUSE, LightDiffuse); //设置漫射光
	glLightfv(GL_LIGHT3, GL_SPECULAR, LightSpecular); // 镜面反射光
	glLightfv(GL_LIGHT3, GL_POSITION, Light2Position); //设置光源位置

	glEnable(GL_LIGHT3);
	glEnable(GL_LIGHT2);
	glEnable(GL_LIGHT1); //启用一号光源
	glEnable(GL_FRONT_AND_BACK);
	glEnable(GL_LIGHTING); //开光

	glMatrixMode(GL_MODELVIEW);
}


int _tmain(int argc, _TCHAR* argv[])
{
	// Initialize GLUT function callings
	glutInit(&argc, (char **)argv);          

	// Set window size (width, height) in number of pixels  	
	glutInitWindowSize(800, 800);   

	// Specify window position, from the left and top of the screen, in numbers of pixels 
	glutInitWindowPosition(200, 100);        

	// Specify a window creation event 
	glutCreateWindow( "A bunny."); 

	//Specify the drawing function, called when the window is created or re-drew 
	glutDisplayFunc(display);         

	myinit();
	
	glutIdleFunc(myspin);
	glutMainLoop();

	return 0;
}
