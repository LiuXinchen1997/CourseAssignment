<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<jsp:useBean id="topUpAccountBean" class="com.oracle.ebp.domain.TopUpAccountBean" scope="request"/>
<c:url var="url" value="/user/topUpMoney" scope="request" />
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0; maximum-scale=1">
<meta name="description" content="">
<meta name="author" content="">
<title></title>
<!-- Reset CSS -->
<link href="/ebp_2/css/reset.css" rel="stylesheet" type="text/css">
<!-- Custom Fonts -->
<link href="/ebp_2/css/fonts.css" rel="stylesheet" type="text/css">
<!-- Bootstrap -->
<link href="/ebp_2/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">
<!-- Select2 -->
<link href="/ebp_2/assets/select2/css/select2.min.css" rel="stylesheet" type="text/css">
<!-- Font Awesome -->
<link href="/ebp_2/assets/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
<!-- Magnific Popup -->
<link href="/ebp_2/assets/magnific-popup/css/magnific-popup.css" rel="stylesheet" type="text/css">
<!-- Iconmoon -->
<link href="/ebp_2/assets/iconmoon/css/iconmoon.css" rel="stylesheet" type="text/css">
<!-- Custom Style -->
<link href="/ebp_2/css/custom.css" rel="stylesheet" type="text/css">
<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
      <script src="js/html5shiv.min.js"></script>
      <script src="js/respond.min.js"></script>
    <![endif]-->
<link rel="stylesheet" type="text/css" href ="/ebp_2/css/niceSelect.css"/> 
<link rel="stylesheet" type="text/css" href="/ebp_2/bootstrap/css/bootstrap.min.css">
<script src="/ebp_2/bootstrap/css/bootstrap-theme.min.css"></script>
<script type="text/javascript" src="/ebp_2/js/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="/ebp_2/js/jquery-ui-1.8.5.custom.min.js"></script>
<script src="/ebp_2/bootstrap/js/bootstrap.min.js"></script>
</head>
<body>
<div class="stars"></div>
<jsp:include page ="/user/header.jsp"/> 

<!-- Start Banner -->

<div class="inner-banner blog">
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <div class="content">
          <h1 style='font-family:Microsoft YaHei;font-size:70px'>艺术馆</h1>
          <p style='font-family:Microsoft YaHei;font-size:30px'>这是电影海报下载展示中心。</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- End Banner --> 

<!-- Start Campus Tour -->

<section class="campus-tour padding-lg" style='background-color:#313B3D'> 
  
  <!-- gallery filter -->
  <div class="container text-center">
    <div class="isotopeFilters">
      <ul class="gallery-filter clearfix">
        <li class="active">
        <a style='color:white;font-family:Microsoft YaHei;font-size:30px' href="" data-filter="*">全部</a></li>
        <li><a style='color:white;font-family:Microsoft YaHei;font-size:30px' href="" data-filter=".classes">科幻</a></li>
        <li><a style='color:white;font-family:Microsoft YaHei;font-size:30px' href="" data-filter=".Party">爱情</a></li>
        <li><a style='color:white;font-family:Microsoft YaHei;font-size:30px' href="" data-filter=".contest">动作</a></li>
        <li><a style='color:white;font-family:Microsoft YaHei;font-size:30px' href="" data-filter=".music">悬疑推理</a></li>
      </ul>
    </div>
  </div>
  <!-- end filter -->
  
  <ul class="gallery clearfix isotopeContainer">
    <li class="isotopeSelector contest">
      <div class="overlay">
        <h3>查看详情</h3>
        <p>查看详情</p>
        <a class="galleryItem" href="images/tour-lg1.jpg"><span class="icon-enlarge-icon"></span></a> <a href="#" class="more"><span class="icon-gallery-more-arrow"></span></a> </div>
      <figure><img src="images/tour1.jpg" class="img-responsive" alt=""></figure>
    </li>
    <li class="isotopeSelector Party contest music">
      <div class="overlay">
        <h3>查看详情</h3>
        <p>查看详情</p>
        <a class="galleryItem" href="images/tour-lg2.jpg"><span class="icon-enlarge-icon"></span></a> <a href="#" class="more"><span class="icon-gallery-more-arrow"></span></a> </div>
      <figure><img src="images/tour2.jpg" class="img-responsive" alt=""></figure>
    </li>
    <li class="isotopeSelector Party contest music">
      <div class="overlay">
        <h3>查看详情</h3>
        <p>查看详情</p>
        <a class="galleryItem" href="images/tour-lg3.jpg"><span class="icon-enlarge-icon"></span></a> <a href="#" class="more"><span class="icon-gallery-more-arrow"></span></a> </div>
      <figure><img src="images/tour3.jpg" class="img-responsive" alt=""></figure>
    </li>
    <li class="isotopeSelector Party music">
      <div class="overlay">
        <h3>查看详情</h3>
        <p>查看详情</p>
        <a class="galleryItem" href="images/tour-lg4.jpg"><span class="icon-enlarge-icon"></span></a> <a href="#" class="more"><span class="icon-gallery-more-arrow"></span></a> </div>
      <figure><img src="images/tour4.jpg" class="img-responsive" alt=""></figure>
    </li>
    <li class="isotopeSelector contest classes">
      <div class="overlay">
        <h3>查看详情</h3>
        <p>查看详情</p>
        <a class="galleryItem" href="images/tour-lg5.jpg"><span class="icon-enlarge-icon"></span></a> <a href="#" class="more"><span class="icon-gallery-more-arrow"></span></a> </div>
      <figure><img src="images/tour5.jpg" class="img-responsive" alt=""></figure>
    </li>
    <li class="isotopeSelector music contest classes">
      <div class="overlay">
        <h3>查看详情</h3>
        <p>查看详情</p>
        <a class="galleryItem" href="images/tour-lg6.jpg"><span class="icon-enlarge-icon"></span></a> <a href="#" class="more"><span class="icon-gallery-more-arrow"></span></a> </div>
      <figure><img src="images/tour6.jpg" class="img-responsive" alt=""></figure>
    </li>
    <li class="isotopeSelector Party music contest classes">
      <div class="overlay">
        <h3>查看详情</h3>
        <p>查看详情</p>
        <a class="galleryItem" href="images/tour-lg7.jpg"><span class="icon-enlarge-icon"></span></a> <a href="#" class="more"><span class="icon-gallery-more-arrow"></span></a> </div>
      <figure><img src="images/tour7.jpg" class="img-responsive" alt=""></figure>
    </li>
    <li class="isotopeSelector Party contest music contest classes">
      <div class="overlay">
        <h3>查看详情</h3>
        <p>查看详情</p>
        <a class="galleryItem" href="images/tour-lg8.jpg"><span class="icon-enlarge-icon"></span></a> <a href="#" class="more"><span class="icon-gallery-more-arrow"></span></a> </div>
      <figure><img src="images/tour8.jpg" class="img-responsive" alt=""></figure>
    </li>
    <li class="isotopeSelector Party music contest classes">
      <div class="overlay">
        <h3>查看详情</h3>
        <p>查看详情</p>
        <a class="galleryItem" href="images/tour-lg9.jpg"><span class="icon-enlarge-icon"></span></a> <a href="#" class="more"><span class="icon-gallery-more-arrow"></span></a> </div>
      <figure><img src="images/tour9.jpg" class="img-responsive" alt=""></figure>
    </li>
    <li class="isotopeSelector Party music contest classes">
      <div class="overlay">
        <h3>查看详情</h3>
        <p>查看详情</p>
        <a class="galleryItem" href="images/tour-lg10.jpg"><span class="icon-enlarge-icon"></span></a> <a href="#" class="more"><span class="icon-gallery-more-arrow"></span></a> </div>
      <figure><img src="images/tour10.jpg" class="img-responsive" alt=""></figure>
    </li>
    <li class="isotopeSelector contest classes">
      <div class="overlay">
        <h3>查看详情</h3>
        <p>查看详情</p>
        <a class="galleryItem" href="images/tour-lg4.jpg"><span class="icon-enlarge-icon"></span></a> <a href="#" class="more"><span class="icon-gallery-more-arrow"></span></a> </div>
      <figure><img src="images/tour4.jpg" class="img-responsive" alt=""></figure>
    </li>
    <li class="isotopeSelector music Party">
      <div class="overlay">
        <h3>查看详情</h3>
        <p>查看详情</p>
        <a class="galleryItem" href="images/tour-lg5.jpg"><span class="icon-enlarge-icon"></span></a> <a href="#" class="more"><span class="icon-gallery-more-arrow"></span></a> </div>
      <figure><img src="images/tour5.jpg" class="img-responsive" alt=""></figure>
    </li>
    <li class="isotopeSelector music Party classes">
      <div class="overlay">
        <h3>查看详情</h3>
        <p>查看详情</p>
        <a class="galleryItem" href="images/tour-lg6.jpg"><span class="icon-enlarge-icon"></span></a> <a href="#" class="more"><span class="icon-gallery-more-arrow"></span></a> </div>
      <figure><img src="images/tour6.jpg" class="img-responsive" alt=""></figure>
    </li>
    <li class="isotopeSelector Party classes">
      <div class="overlay">
        <h3>查看详情</h3>
        <p>查看详情</p>
        <a class="galleryItem" href="images/tour-lg3.jpg"><span class="icon-enlarge-icon"></span></a> <a href="#" class="more"><span class="icon-gallery-more-arrow"></span></a> </div>
      <figure><img src="images/tour3.jpg" class="img-responsive" alt=""></figure>
    </li>
    <li class="isotopeSelector classes">
      <div class="overlay">
        <h3>查看详情</h3>
        <p>查看详情</p>
        <a class="galleryItem" href="images/tour-lg7.jpg"><span class="icon-enlarge-icon"></span></a> <a href="#" class="more"><span class="icon-gallery-more-arrow"></span></a> </div>
      <figure><img src="images/tour7.jpg" class="img-responsive" alt=""></figure>
    </li>
  </ul>
  
</section>

<!-- End Campus Tour --> 

<jsp:include page ="/user/footer.jsp"/> 



<!-- jQuery (necessary for Bootstrap's JavaScript plugins) --> 
<script type="text/javascript" src="/ebp_2/js/jquery.min.js"></script> 
<!-- Bootsrap JS --> 
<script type="text/javascript" src="/ebp_2/assets/bootstrap/js/bootstrap.min.js"></script> 
<!-- Select2 JS --> 
<script type="text/javascript" src="/ebp_2/assets/select2/js/select2.min.js"></script> 
<!-- Magnific Popup JS --> 
<script type="text/javascript" src="/ebp_2/assets/magnific-popup/js/magnific-popup.min.js"></script> 
<!-- Isotop JS --> 
<script type="text/javascript" src="/ebp_2/assets/isotope/js/isotope.min.js"></script> 
<!-- Custom JS --> 
<script type="text/javascript" src="/ebp_2/js/custom.js"></script>
</body>
</html>

