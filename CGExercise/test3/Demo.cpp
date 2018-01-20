// Demo.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <GL/glut.h>              // glut.h includes gl.h and glu.h already
#include <windows.h>
#include <math.h>
#include <vector>

struct Point {
	float x, y;
	Point(float x, float y) {
		this->x = x;
		this->y = y;
	}
};

void draw_origin()
{
	glColor3f(1.0, 1.0, 1.0);

	glBegin(GL_LINES);

	glVertex3f(-1.0, 0.0, 0.0);
	glVertex3f( 1.0, 0.0, 0.0);

	glVertex3f( 0.0, -1.0, 0.0);
	glVertex3f( 0.0,  1.0, 0.0);

	glEnd();
}

void draw_polygon(std::vector<Point> points)
{
	glBegin(GL_QUADS);

	glNormal3f( 0.0F, 0.0F, 1.0F);

	for (Point p : points) {
		glVertex3f(p.x, p.y, 0.0f);
	}
	glEnd();
}

void display()
{
	glClear(GL_COLOR_BUFFER_BIT); // 清空颜色缓冲器
	std::vector<Point> points;
	points.push_back(Point(0.0f, 0.0f));
	points.push_back(Point(0.5f, 0.5f));
	points.push_back(Point(1.5f, 0.5f));
	points.push_back(Point(1.5f, 0.0f));

	glPushMatrix();
	glColor3f(1.0f, 1.0f, 0.0f); // 黄色
	glRotatef(90.0f, 0.0f, 0.0f, 1.0f);
	draw_polygon(points);
	glPopMatrix();

	glPushMatrix();
	glColor3f(0.0f, 1.0f, 0.0f); // 绿色
	glRotatef(180.0f, 0.0f, 0.0f, 1.0f);
	draw_polygon(points);
	glPopMatrix();

	glPushMatrix();
	glColor3f(1.0f, 0.0f, 0.0f); // 红色
	glRotatef(270.0f, 0.0f, 0.0f, 1.0f);
	draw_polygon(points);
	glPopMatrix();

	glColor3f(0.0, 0.0, 1.0); // 蓝色
	draw_polygon(points);
	
	glPushMatrix();
	glColor3f(0.0, 0.0, 1.0); // 蓝色
	glTranslatef(-1.5f, 0.0f, 0.0f);
	draw_polygon(points);
	glPopMatrix();
	
	glFlush();
}

void myinit()
{
	glClearColor(0.0, 0.0, 0.0, 0.0);  //Set the clear color to black

	// Specify the domain of the viewing window
	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	// The para are: (left, right, bottom, top)
	gluOrtho2D(-8.0, 8.0, -8.0, 8.0); 
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
	glutCreateWindow("Programming exercise 3!"); 

	//Specify the drawing function, called when the window is created or re-drew 
	glutDisplayFunc(display);

	myinit();		      //Invoke this function for initializaton	

	glutMainLoop();       // Enter the event processing loop

	return 0;             // ANSI C requires main() to return an int
}

