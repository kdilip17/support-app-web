$(document).ready(function () {
//
	initGlobalMenus();
	//
		function initGlobalMenus() {
		
		var mobileMenuScreen = (window.innerWidth <= 1024) ? true : false;
		var smallScreen = (($(document).width()) <= 768) ? true : false;
		var superSmallScreen = (($(document).width()) <= 629) ? true : false;
					var siteHeader = $('.site-header'),
					mobileMenuScreen = (window.innerWidth <= 1024) ? true : false,
					navToggle = $('.nav-toggle > a', siteHeader);
				$('body > .site').removeClass('shifted');
				
				$('li.header-modal > a,li.share-toggle > a,.nav-toggle > a, .primary-navigation .nav-menu > li, .header-modal', siteHeader).removeClass('active hover');
				$('.nav-toggle > a, li.share-toggle > a, .nav-wrap > div > ul > li.menu-item-has-children > a, li.header-modal > a', siteHeader).off('click');
				$('.all-nav').removeClass('mobile-menu full-menu nav-init active');
				if (mobileMenuScreen && $('.all-nav').length) {
					$('.all-nav').addClass('mobile-menu').addClass('mobile-menu');
					if (navToggle.length) {
						navToggle.on('click', function (e) {
							e.preventDefault();
							if (!$('.all-nav', siteHeader).is('.active')) {
								$('.all-nav', siteHeader).addClass('active');
								$('body > .site').addClass('shifted');
							} else {
								$('.all-nav', siteHeader).removeClass('active nav-init');
								$('body > .site').removeClass('shifted');
							}
						});
					}
					$('.nav-wrap > div > ul > li.menu-item-has-children > a, li.header-modal > a').on('click', function (e) {
						e.preventDefault();
						var parentLI = $(this).parent('li');
						if (parentLI.hasClass('active')) {
							parentLI.toggleClass('active');
							parentLI.parents('.all-nav').toggleClass('nav-init');
						} else {
							parentLI.toggleClass('active');
							parentLI.parents('.all-nav').toggleClass('nav-init');
						}
					});
					$('li.share-toggle.share-on-mobile > a', siteHeader).on('click', function (e) {
						e.preventDefault();
						$(this).parent('li').toggleClass('active');
					});
				} else {
					if ($('.all-nav').length) {
						$('.all-nav').addClass('full-menu');
						$('.primary-navigation .nav-wrap > div > ul.nav-menu > li.no-follow > a, .footer .footer-nav .footer-nav-list > li.no-follow > a').click(function (e) {
							e.preventDefault();
						});
						var subMenuWidth = 0,
							extraWidth = 10,
							menuWidth = $('.primary-navigation .nav-menu', siteHeader).children('li').last().position().left + $('.primary-navigation .nav-wrap > div > ul > li', siteHeader).last().width(),
							isIE = navigator.userAgent.indexOf('Trident');
						$.each($('.primary-navigation .nav-wrap > div > ul > li > ul.sub-menu', siteHeader), function () {
							if ($('.full-menu').length > 0) {
								var leftPos = $(this).parent('li').position().left,
									rightPos = 0,
									liNum = $(this).children().not('.nav-first').length / 6 + 1;
								$(this).find('li.nav-first').last().siblings('.nav-first').css({
									breakAfter: 'auto',
									marginBottom: '0'
								});
								if (liNum > Math.floor(liNum)) liNum = Math.floor(liNum) + 1;
								subMenuWidth = 200 * liNum + (liNum - 1) * 20;
								rightPos = menuWidth - leftPos - $(this).parent('li').width();
								if (subMenuWidth + extraWidth >= rightPos) {
									var leftLi = 0 - subMenuWidth + menuWidth - leftPos - extraWidth;
									if (leftLi < 0) {
										if (isIE < 0)
											$(this).css({
												left: leftLi + 'px'
											});
										else
											$(this).css({
												left: leftLi + 'px',
												width: subMenuWidth + 'px'
											});
									}
								}
							}
						});
						$.each($('.nav-wrap > div > ul > li.menu-item', siteHeader), function () {
							$(this).on({
								click: function () {
									$('.nav-wrap > div > ul > li.menu-item', siteHeader).removeClass('on');
									$(this).toggleClass('on');
									if ($(this).closest('.primary-navigation').length && $('.all-nav').is('.full-menu')) {
										if ($('.menu-item-has-children.on.hover').length) {
											$(document).on('click', function (event) {
												var activeMenu = $('.menu-item-has-children.on');
												if (!$(event.target).closest(activeMenu).length) {
													activeMenu.removeClass("on");
												}
											});
											console.log("you shouldn't be seeing this 1");
										}
										console.log("you shouldn't be seeing this 2");
									}
								},
								mouseenter: function () {
									$('.full-menu .nav-wrap > div > ul > li.menu-item', siteHeader).removeClass('hover');
									$(this).addClass('hover');
								},
								mouseleave: function () {
									$(this).removeClass('hover');
								}
							});
						});
					}
					$('li.header-modal > a, li.share-toggle > a', siteHeader).on('click', function (e) {
						e.preventDefault();
						if ($('.all-nav').is('.full-menu') || !$('.all-nav').length) {
							$(this).parent('li').toggleClass('active');
							if ($('.header-modal.active').length) {
								$('.header-modal.active').on('click', function (event) {
									if (!$(event.target).closest('.header-modal.active .sub-menu').length && !$(event.target).closest('.header-modal.active > a').length) {
										$('.header-modal').removeClass("active");
									}
								});
							}
						}
					});
					var waitToBuildMenuModals = setTimeout(function () {
						$.each($('.modal-close', siteHeader), function () {
							$(this).on({
								click: function () {
									var thisMenu = $(this).closest('.header-modal');
									if (thisMenu.is('.active')) {
										thisMenu.removeClass('active');
									}
								}
							});
						});
					}, 500);
				}
				if ($('#header-login-modal', siteHeader).length) {
					$('#header-login-modal .sub-menu', siteHeader).appendTo($('.persistent-navigation li.menu-login'));
					$('#header-login-modal', siteHeader).remove();
				}
				if ($('#header-contact-modal', siteHeader).length) {
					$('#header-contact-modal .sub-menu', siteHeader).appendTo($('.persistent-navigation li.menu-contact'));
					$('#header-contact-modal', siteHeader).remove();
				}
				if ($('.header-language-holder ul li', siteHeader).length) {
					var langToggle = $('.languages-toggle ul');
					if ($('li.active', langToggle).length) {
						$('li.languages-toggle > a').text($('li.active', langToggle).attr('data-native-name'));
					}
					$('.header-language-holder .sub-menu', siteHeader).appendTo($('.persistent-navigation li.languages-toggle'));
					$('.header-language-holder', siteHeader).remove();
					$('li.lang-option > a,.lang_sel_click ul li ul li a').on('click', function (e) {
						e.preventDefault();
						if (($(this).parent('li').attr('class')).search('icl-') >= 0) {
							var redirectToUrl = $(this).attr('href');
							var langCookieVal = ($(this).parent('li').attr('class')).replace('icl-', '');
						} else {
							var redirectToUrl = $(this).attr('href');
							var langCookieVal = $(this).attr('class');
						}
					//	createCookie('aruba_locale', langCookieVal, 365);
						window.location.href = redirectToUrl;
					});
				}
				if ($('.header-social-holder', siteHeader).length) {
					$('.header-social-holder', siteHeader).appendTo($('li.share-toggle > .sub-menu'));
					if (typeof addthis == 'object') addthis.toolbox('.addthis_toolbox');
				}
}
	$(window).resize(function () {
					initGlobalMenus();
				});	
	});


