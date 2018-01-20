// Experiment_Frame_OneView.cpp : implementation of the CExperiment_Frame_OneView class
//

#include "stdafx.h"
#include "Experiment_Frame_One.h"

#include "Experiment_Frame_OneDoc.h"
#include "Experiment_Frame_OneView.h"
#include "SettingDlg.h"
#include "InputDialog.h"
#include <cmath>

#ifdef _DEBUG
#define new DEBUG_NEW
#undef THIS_FILE
static char THIS_FILE[] = __FILE__;
#endif

/////////////////////////////////////////////////////////////////////////////
// CExperiment_Frame_OneView

IMPLEMENT_DYNCREATE(CExperiment_Frame_OneView, CView)

BEGIN_MESSAGE_MAP(CExperiment_Frame_OneView, CView)
	//{{AFX_MSG_MAP(CExperiment_Frame_OneView)
	ON_COMMAND(IDM_SETTING, OnSetting)
	ON_COMMAND(IDM_INPUT, OnInput)
	//}}AFX_MSG_MAP
	// Standard printing commands
	ON_COMMAND(ID_FILE_PRINT, CView::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_DIRECT, CView::OnFilePrint)
	ON_COMMAND(ID_FILE_PRINT_PREVIEW, CView::OnFilePrintPreview)
END_MESSAGE_MAP()

/////////////////////////////////////////////////////////////////////////////
// CExperiment_Frame_OneView construction/destruction

CExperiment_Frame_OneView::CExperiment_Frame_OneView()
{
	// TODO: add construction code here
	m_bGridOn     = true;
	m_iMarginSize = 20;
	m_iPointSize  = 20;
	m_iActive_Algorithm = 0;

	m_PointColor  = RGB(255, 0, 0); 

	X0 = Y0 = 0;  
	X1 = Y1 = 10;

}

CExperiment_Frame_OneView::~CExperiment_Frame_OneView()
{
}

BOOL CExperiment_Frame_OneView::PreCreateWindow(CREATESTRUCT& cs)
{
	// TODO: Modify the Window class or styles here by modifying
	//  the CREATESTRUCT cs

	return CView::PreCreateWindow(cs);
}

/////////////////////////////////////////////////////////////////////////////
// CExperiment_Frame_OneView drawing

void CExperiment_Frame_OneView::OnDraw(CDC* pDC)
{
	CExperiment_Frame_OneDoc* pDoc = GetDocument();
	ASSERT_VALID(pDoc);
	// TODO: add draw code for native data here
	if( this->m_bGridOn )
	{
		this->DrawGrid(pDC);
	}

	switch( this->m_iActive_Algorithm) {
	case 0: //DDA
		DDA(X0,Y0,X1,Y1);
		break;
	case 1: //Mid_Bresenham
		Mid_Bresenham(X0,Y0,X1,Y1);
		break;
	default:
		break;
	}
	CView::OnDraw(pDC);
}

/////////////////////////////////////////////////////////////////////////////
// CExperiment_Frame_OneView printing

BOOL CExperiment_Frame_OneView::OnPreparePrinting(CPrintInfo* pInfo)
{
	// default preparation
	return DoPreparePrinting(pInfo);
}

void CExperiment_Frame_OneView::OnBeginPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: add extra initialization before printing
}

void CExperiment_Frame_OneView::OnEndPrinting(CDC* /*pDC*/, CPrintInfo* /*pInfo*/)
{
	// TODO: add cleanup after printing
}

/////////////////////////////////////////////////////////////////////////////
// CExperiment_Frame_OneView diagnostics

#ifdef _DEBUG
void CExperiment_Frame_OneView::AssertValid() const
{
	CView::AssertValid();
}

void CExperiment_Frame_OneView::Dump(CDumpContext& dc) const
{
	CView::Dump(dc);
}

CExperiment_Frame_OneDoc* CExperiment_Frame_OneView::GetDocument() // non-debug version is inline
{
	ASSERT(m_pDocument->IsKindOf(RUNTIME_CLASS(CExperiment_Frame_OneDoc)));
	return (CExperiment_Frame_OneDoc*)m_pDocument;
}
#endif //_DEBUG

/////////////////////////////////////////////////////////////////////////////
// CExperiment_Frame_OneView message handlers

void CExperiment_Frame_OneView::DrawGrid(CDC *pDC)
{
	CRect ClientRect;
	GetClientRect( &ClientRect );

	CPen  *pNewPen = new CPen;
	pNewPen->CreatePen(PS_DOT, 1, RGB(256,0,0));
	CPen *pOldPen = pDC->SelectObject(pNewPen);

	int x0 = ClientRect.left   + m_iMarginSize; 
	int x1 = x0 + (ClientRect.right -ClientRect.left - 2*m_iMarginSize)/m_iPointSize * m_iPointSize;
	int y0 = ClientRect.bottom - m_iMarginSize;
	int y1 = y0 - (ClientRect.bottom - ClientRect.top - 2*m_iMarginSize)/m_iPointSize * m_iPointSize;
	int x,  y;
	//Draw horizontal lines
	for ( y = y0; y >= y1; y -= m_iPointSize)
	{
		pDC->MoveTo(x0, y);
		pDC->LineTo(x1, y);
	}

	//Draw vertical lines
	for ( x = x0; x <= x1; x += m_iPointSize)
	{
		pDC->MoveTo(x, y0);
		pDC->LineTo(x, y1);
	}


	pDC->SelectObject(pOldPen);
	pNewPen->DeleteObject();
	return;
}

void CExperiment_Frame_OneView::DrawPixel(int X, int Y)
{
	CDC *pDC= GetDC();
	CBrush *pNewBrush = new CBrush;
	pNewBrush->CreateSolidBrush(m_PointColor);
	CBrush *pOldBrush = pDC->SelectObject(pNewBrush);

	CPen *pNewPen = new CPen;
	pNewPen->CreatePen(PS_NULL, 1, RGB(255,0,0));
	CPen *pOldPen = pDC->SelectObject(pNewPen);

	CRect ClientRect;
	GetClientRect( &ClientRect );

	int x0 = ClientRect.left   + m_iMarginSize; 
	int y0 = ClientRect.bottom - m_iMarginSize;

	CRect Point;
	Point.left   = x0 + X*m_iPointSize;
	Point.right  = Point.left + m_iPointSize;
	
	Point.bottom = y0 - Y*m_iPointSize;
	Point.top    = Point.bottom - m_iPointSize;

	pDC->Rectangle(&Point);
	
	pDC->SelectObject(pOldBrush);
	pNewBrush->DeleteObject();

	pDC->SelectObject(pOldPen);
	pOldPen->DeleteObject();

}

void CExperiment_Frame_OneView::OnSetting() 
{
	CSettingDlg SettingDialog(m_iPointSize,
		                      m_PointColor,
							  m_iActive_Algorithm,
							  m_bGridOn
							  );
	if ( SettingDialog.DoModal() == IDOK )
	{
		this->m_bGridOn           = SettingDialog.m_bGridOn;
		this->m_PointColor        = SettingDialog.m_Point_Color;
		this->m_iPointSize        = SettingDialog.m_Point_Size;
		this->m_iActive_Algorithm = SettingDialog.m_iActive_Algorithm;
		this->Invalidate();		
	}
}

void CExperiment_Frame_OneView::OnInput() 
{
	CInputDialog InputDialog(X0, Y0, X1, Y1);

	if ( InputDialog.DoModal() == IDOK)
	{
		X0 = InputDialog.m_X0;
		X1 = InputDialog.m_X1;
		Y0 = InputDialog.m_Y0;
		Y1 = InputDialog.m_Y1;
		Invalidate();
	}	
}

#include <conio.h>
int int_abs(int a) {
	return a >= 0 ? a : -a;
}
//-------------------------算法实现------------------------------//
//绘制像素的函数DrawPixel(x, y);
void CExperiment_Frame_OneView::DDA(int X0, int Y0, int X1, int Y1)
{
	//----------请实现DDA算法------------//
	float k, b;
	k = float((Y1 - Y0)) / float(X1 - X0);
	b = float(X1 * Y0 - X0 * Y1) / float(X1 - X0);

	if (fabs(k) <= 1) {
		int x;
		float y;
		x = X0;
		y = Y0;
		while (x <= X1) {
			DrawPixel(x, round(y));
			x++;
			y += k;
		}
	}
	else {
		float x;
		int y;
		x = X0;
		y = Y0;
		while (y <= Y1) {
			DrawPixel(x, round(y));
			y++;
			x += 1 / k;
		}
	}

	return;
}


void CExperiment_Frame_OneView::Mid_Bresenham(int x0, int y0, int x1, int y1)
{
	// AllocConsole();
	//-------实现Mid-Bresenham画线算法-------//
	if (x1 < x0) {
		int temp = x1;
		x1 = x0;
		x0 = temp;
		temp = y1;
		y1 = y0;
		y0 = temp;
	}

	int dx = x1 - x0;
	int dy = y1 - y0;


	bool y_flag = false; // 用于判断|k|与1的关系
	if (int_abs(y1 - y0) > int_abs(x1 - x0)) {
		y_flag = true;
	}

	if (y_flag) {
		int temp = dx;
		dx = dy;
		dy = temp;
	}



	int twoD1 = -2 * dy;
	int twoD2 = 2 * dx - 2 * dy;

	int dd = 1;
	
	int D = dx - 2 * dy;

	bool flag = false;
	if ((y1 - y0)*(x1 - x0) < 0) { // 若k<0，则flag为true
		flag = true;
	}
	
	if (flag) {
		D = -dx - 2 * dy;
		dd = -1;
		twoD2 = -2 * dx - 2 * dy;
	}

	int x = x0;
	int y = y0;
	if (!y_flag && !flag) { // 0 < k <= 1的情况
		while (x <= x1) {
			DrawPixel(x, y);

			if (D >= 0) {
				D += twoD1;
			}
			else {
				y += dd;
				D += twoD2;
			}

			x++;
		}
	}
	else if(!y_flag && flag) { // -1 < k < 0的情况
		while (x <= x1) {
			DrawPixel(x, y);

			if (D >= 0) {
				y += dd;
				D += twoD2;
			}
			else {
				D += twoD1;
			}

			x++;
		}
	}
	else if (y_flag && !flag) { // 1 < k 的情况
		while (y <= y1) {
			DrawPixel(x, y);

			if (D >= 0) {
				D += twoD1;
			}
			else {
				x += dd;
				D += twoD2;
			}

			y++;
		}
	}
	else if (y_flag && flag) { // k < -1 的情况
		y = y0;
		dd = 1;
		dx = x1 - x0;
		dy = y1 - y0;
		twoD1 = -2 * dx;
		twoD2 = -2 * dx - 2 * dy;
		D = -2 * dx - dy;
		while (y >= y1) {
			_cprintf("%d %d\n", x, y);
			DrawPixel(x, y);

			_cprintf("D: %d\n", D);
			if (D >= 0) {
				D += twoD1;
			}
			else {
				x += dd;
				D += twoD2;
			}

			y--;
		}
	}
}


/*
// 参考书上的代码
void CExperiment_Frame_OneView::Mid_Bresenham(int X0, int Y0, int X1, int Y1)
{
	//-------请实现Mid_Bresenham算法-------//
	AllocConsole();

	int dX = abs(X1 - X0);
	int dY = abs(Y1 - Y0);
	int X = X0, Y = Y0;
	int twoDX = 2 * dX;
	int twoDY = 2 * dY;
	int D = 2 * dY - dX; // D>=0则yi+1 = yi + 1

	int s1, s2, interchange = 0; // interchange == 1表示直线斜率大于45度
	if (X1 - X0 >= 0) {
		s1 = 1;
	}
	else {
		s1 = -1;
	}
	if (Y1 - Y0 >= 0) {
		s2 = 1;
	}
	else {
		s2 = -1;
	}

	if (dY > dX) {
		int temp = dX;
		dX = dY;
		dY = temp;
		interchange = 1;
	}

	for (int i = 0; i <= dX; i++) {
		DrawPixel(X, Y);
		if (D > 0) {
			if (interchange) { X += s1; }
			else {
				Y += s2;
				D -= twoDX;
			}
		}

		if (interchange) { Y += s2; }
		else { X += s1; }

		D += twoDY;
	}
}
*/
