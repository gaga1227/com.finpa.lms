/* ------------------------------------------------------------------------------ */
/* webfonts */
/* ------------------------------------------------------------------------------ */
WebFontConfig = {
	google: {
		families: [
			'Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic,700italic:latin',
			'Montserrat:400,700:latin'
		]
	},
	loading: 		function() { console.log('[WF] loading'); 	WebFontUtils.onWFLoading(); },
	active: 		function() { console.log('[WF] active'); 	WebFontUtils.onWFActive(); 	 WebFontUtils.onWFComplete(); },
	inactive: 		function() { console.log('[WF] inactive'); 	WebFontUtils.onWFInactive(); WebFontUtils.onWFComplete(); },
	fontloading: 	function( familyName, fvd ) { console.log( '[WF] ' + familyName, fvd, 'loading' ); },
	fontactive: 	function( familyName, fvd ) { console.log( '[WF] ' + familyName, fvd, 'active' ); },
	fontinactive: 	function( familyName, fvd ) { console.log( '[WF] ' + familyName, fvd, 'inactive' ); },
	timeout: 		5000
};
WebFontUtils = {
	onWFLoading: 	function()	{},
	onWFComplete: 	function()	{
						//start adapting course content frame size
						adaptCourseContent();
					},
	onWFActive: 	function()	{},
	onWFInactive: 	function()	{}
}
/* ------------------------------------------------------------------------------ */
/* initMenus */
/* ------------------------------------------------------------------------------ */
function initMenus(){
	//vars
	var $window = $(window),
		$container = $('#container'),
		$content = $('#content'),
		//side menus
		$nav = $('#nav'),
		$menu = $('#menu'),
		$discussions = $('#discussions'),
		//trigger buttons
		$btnNav = $('#btnNav'),
		$btnMenu = $('#btnMenu'),
		$btnDiscussions = $('#btnDiscussions'),
		$btnDiscussionsMenu = $('#btnDiscussionsMenu'),
		$popoverNav = $('#popoverNav'),
		$popoverMenu = $('#popoverMenu'),
		//state classes
		navActiveCls = 'navActive'
		menuActiveCls = 'menuActive',
		discussionsActiveCls = 'discussionsActive',
		activeCls = 'active',
		thisCls = '',
		otherCls = '',
		lastActive = '',
		//statics
		speed = 300,
		//function
		shouldNavShownByDefault = function(){
			var result;
			if (Modernizr.mediaqueries) {
				result = Modernizr.mq('only screen and (min-width:1280px) and (max-width:1679px)');
			} else {
				result = $window.width() >= 1280 && $window.width() <= 1679;
			}
			return result;
		},
		shouldMenuShownByDefault = function(){
			var result;
			if (Modernizr.mediaqueries) {
				result = Modernizr.mq('only screen and (min-width:1680px)');
			} else {
				result = $window.width() >= 1680;
			}
			return result;
		};

	//functions
	function initGestures() {
		//check if touch events available
		if (!Modernizr.touch) { return 'not on touch device'; }
		//vars
		var opts = {
			swipe_velocity:		0.5,
			prevent_default: 	false
		};
		//handler
		function onSwipe(e){
			//vars
			var dir = e.gesture.direction,
				dirIsLeft = false;
			//alert('swipe: ' + dir);
			//exit
			if (dir != 'left' && dir != 'right') return false;
			//update
			dirIsLeft = (dir == 'left') ? true : false;
			//update menus state
			//if left menu is open, close
			if ($container.hasClass(navActiveCls)) {
				if (dirIsLeft) {
					$btnNav.trigger('click');
					if (shouldNavShownByDefault()) {
						lastActive == 'Discussions' ? $btnDiscussions.trigger('click') : $btnMenu.trigger('click');
					}
				} else {

				}
			}
			//if right menus are open, close
			else if ($container.hasClass(menuActiveCls) || $container.hasClass(discussionsActiveCls)) {
				if (dirIsLeft) {

				} else {
					if ($container.hasClass(menuActiveCls)) {
						$btnMenu.trigger('click');
					} else {
						$btnDiscussions.trigger('click');
					}
					if (shouldNavShownByDefault()) {
						//make Nav active
						$container.addClass(navActiveCls);
						$btnNav.addClass(activeCls);
					}
				}
			}
			//if NO menu is open, open
			else {
				if (dirIsLeft) {
					lastActive == 'Discussions' ? $btnDiscussions.trigger('click') : $btnMenu.trigger('click');
				} else {
					$btnNav.trigger('click');
				}
			}
		}
		//bind gestures with hammer
		$(container).hammer(opts).on('swipe', onSwipe);
	}

	//button handler
	function toggleMenus(e) {
		e.preventDefault();
		var $btn = $(this),
			id = $btn.attr('id');
		//determine state classes
		if ( id.indexOf('Nav') != -1 ) {
			thisCls = navActiveCls;
			otherCls = menuActiveCls + ' ' + discussionsActiveCls;
		}
		else if ( id.indexOf('Menu') != -1  ) {
			thisCls = menuActiveCls;
			otherCls = navActiveCls + ' ' + discussionsActiveCls;
		}
		else if ( id.indexOf('Discussions') != -1  ) {
			thisCls = discussionsActiveCls;
			otherCls = navActiveCls + ' ' + menuActiveCls;
		}
		//apply state classes
		$container.removeClass(otherCls);
		//if btn clicked is already active
		if ($container.hasClass(thisCls)) {
			//if btn is NOT 'btnNav' and 'nav' is NOT shown by default
			if ( !(id.indexOf('Nav') != -1 && shouldNavShownByDefault()) ) {
				//toggle button and state
				$container.removeClass(thisCls);
				$btn.removeClass(activeCls);
			}
			//if btn is NOT 'btnNav' and 'nav' IS shown by default
			if ( id.indexOf('Nav') == -1 && shouldNavShownByDefault() ){
				//toggle button and state
				$container.removeClass(thisCls);
				$btn.removeClass(activeCls);
				//also make Nav active
				$container.addClass(navActiveCls);
				$btnNav.addClass(activeCls);
				//lastActive = 'Nav';
			}
		} else {
			//add active state if this btn is NOT 'menu' or 'menu' is NOT shown by default
			if (id.indexOf('Menu') < 0 || !shouldMenuShownByDefault()) {
				$container.addClass(thisCls);
				$btn.addClass(activeCls);
			}
			//update other buttons to inactive
			if (id.indexOf('Menu') != -1) {
				$btnDiscussions.removeClass(activeCls);
				$btnNav.removeClass(activeCls);
				lastActive = 'Menu';
			}
			else if (id.indexOf('Discussions') != -1) {
				$btnMenu.removeClass(activeCls);
				$btnNav.removeClass(activeCls);
				lastActive = 'Discussions';
			}
			else if (id.indexOf('Nav') != -1) {
				$btnMenu.removeClass(activeCls);
				$btnDiscussions.removeClass(activeCls);
				//lastActive = 'Nav';
			}
		};
	}

	//resize handler
	function onWindowResize(e) {
		//if nav should shown by default and other menus NOT active
		if ( shouldNavShownByDefault() && !$container.hasClass(menuActiveCls) && !$container.hasClass(discussionsActiveCls) ) {
			//make Nav active
			$container.addClass(navActiveCls);
			$btnNav.addClass(activeCls);
			//lastActive = 'Nav';
		} else {
			//remove Nav active
			$container.removeClass(navActiveCls);
			$btnNav.removeClass(activeCls);
		}
	}

	//bind side menu interaction
	$.each([$btnNav, $btnMenu, $btnDiscussions, $popoverNav, $popoverMenu], function(e){
		$(this).on('click', toggleMenus);
	});
	//delegate shadow 'btnDiscussions' button
	$btnDiscussionsMenu.on('click', function(e){
		e.preventDefault();
		$btnDiscussions.trigger('click');
	});

	//remove text label hints after use
	$.each([$btnNav, $popoverNav], function(e){
		$(this).on('click', function(){
			$popoverNav.fadeOut(speed);
		});
	});
	$.each([$btnMenu, $popoverMenu], function(e){
		$(this).on('click', function(){
			$popoverMenu.fadeOut(speed);
		});
	});

	//update 'navActive' state
	$window.on('resize.menus', onWindowResize);

	//init
	onWindowResize();
	initGestures();
}
/* ------------------------------------------------------------------------------ */
/* initMenuFilter */
/* ------------------------------------------------------------------------------ */
function initMenuFilter(){
	//vars
	var $courseMenu = $('#navList'),
		$btnViewAll = $('#btnViewAll'),
		$btnViewAssess = $('#btnViewAssess'),
		allSelector = '.navList > li.core',
		assessSelector = '.navList .assess',
		activeCls = 'active',
		//handlers
		onShowAll = function(e){
			e.preventDefault();
			$courseMenu.find(allSelector).show();
			$btnViewAll.addClass(activeCls);
			$btnViewAssess.removeClass(activeCls);
			//update scroller
			if (Scrollers && typeof(Scrollers.update)=='function') Scrollers.update('Nav');
			//update scrollHint
			if (ScrollHint.update && !ScrollHint.disabled) ScrollHint.update();
		};
		onShowAssess = function(e){
			e.preventDefault();
			$courseMenu.find(allSelector).not(assessSelector).hide();
			$btnViewAssess.addClass(activeCls);
			$btnViewAll.removeClass(activeCls);
			//update scroller
			if (Scrollers && typeof(Scrollers.update)=='function') Scrollers.update('Nav');
			//update scrollHint
			if (ScrollHint.update && !ScrollHint.disabled) ScrollHint.update();
		};
	//bind button behaviour
	$btnViewAll.on('click', onShowAll);
	$btnViewAssess.on('click', onShowAssess);
	//show all on init
	$btnViewAll.trigger('click');
}
/* ------------------------------------------------------------------------------ */
/* initSubNav */
/* ------------------------------------------------------------------------------ */
function initSubNav(){
	//vars
	var $nav = $('#nav'),
		$navList = $('#navList'),
		$subNavLists = $navList.find('.subNavList'),
		$subNavHost = $('#subNavList > .navList'),
		$btnBack = $('#btnSubNav'),
		$btnSubmitAssess = $('#btnSubmitAssess'),
		subNavActiveCls = 'subNavActive',
		currentCls = 'current';
	//handlers
	function onShowSubNav(e){
		e.preventDefault();
		var $trigger = $(this).addClass(currentCls),
			$listItem = $trigger.parent('li'),
			$subNavList = $listItem.find('> .subNavList');
		//update DOM
		$subNavHost.empty().html($subNavList.html());
		$nav.addClass(subNavActiveCls);
		//enable back button
		$btnBack.one('click', onHideSubNav);
		//hide/show assessment button
		if ($btnSubmitAssess.length) {
			$listItem.hasClass('assess') ? $btnSubmitAssess.show() : $btnSubmitAssess.hide();
		}
		//update scrollHint
		if (ScrollHint.update && !ScrollHint.disabled) ScrollHint.update();

		console.log('[subNav] of "' + $trigger.text() + '" ACTIVE');
	}
	function onHideSubNav(e){
		e.preventDefault();
		var $trigger = $navList.find('.navList > li > a.link.current').removeClass(currentCls);
		//update DOM
		$nav.removeClass(subNavActiveCls);
		//update scrollHint
		if (ScrollHint.update && !ScrollHint.disabled) ScrollHint.update();

		console.log('[subNav] of "' + $trigger.text() + '" INACTIVE');
	}
	//bind interaction
	$.each($subNavLists, function(idx, ele){
		var $trigger = $(ele).parent('li').find('> a.link');
		$trigger.on('click', onShowSubNav);
	});
}
/* ------------------------------------------------------------------------------ */
/* initScrollHint */
/* ------------------------------------------------------------------------------ */
function initScrollHint(){
	//vars
	var scrollHint = { visible:false, disabled:true },
		$nav = $('#nav'),
		$navScrollHint = $('#navScrollHint'),
		updateEvent = (Platform.iOS || Platform.android) ? 'orientationchange' : 'resize.scrollhint',
		inactiveCls = 'inactive',
		disabledCls = 'disabled';
	//exit
	if (!Scrollers.scrollerNav || !$navScrollHint.length) return 'no target scrollers';

	/* ------------------------------------------------------------------------------ */
	//handlers
	function onScrollEnd(e){
		//disable if not already
		if (!scrollHint.disabled) {
			scrollHint.disable();
		};
		//unbind all events, once off action
		//Scrollers.scrollerNav.off('scrollEnd', onScrollEnd);
		//Scrollers.scrollerSubnav.off('scrollEnd', onScrollEnd);
	}
	//bind disable function to first scroll
	Scrollers.scrollerNav.on('scrollEnd', onScrollEnd);
	Scrollers.scrollerSubnav.on('scrollEnd', onScrollEnd);

	/* ------------------------------------------------------------------------------ */
	//APIs
	scrollHint.update = function(){
		//alert('ScrollHint update');
		setTimeout(function(){
			//vars
			var token 				= scrollHint.token 		= $nav.hasClass('subNavActive') ? 'Subnav' : 'Nav',
				scroller 			= scrollHint.scroller 	= Scrollers['scroller' + token],
				hasVerticalScroll 	= scrollHint.visible 	= scroller.hasVerticalScroll;
			//toggle $ScrollHint depend on target scroller
			if (hasVerticalScroll) {
				//alert(token + ' show hint');
				$navScrollHint.removeClass(inactiveCls);
			} else {
				//alert(token + ' hide hint');
				$navScrollHint.addClass(inactiveCls);
			}
		}, 300);
	}
	scrollHint.disable = function(){
		//alert('ScrollHint disable');
		if (scrollHint.disabled) return 'already disabled';
		$navScrollHint.addClass(disabledCls);
		scrollHint.disabled = true;
		$(window).off(updateEvent, scrollHint.update);
	}
	scrollHint.enable = function(){
		//alert('ScrollHint enable');
		if (!scrollHint.disabled) return 'already enabled';
		$navScrollHint.removeClass(disabledCls);
		scrollHint.disabled = false;
		$(window).on(updateEvent, scrollHint.update);
	}

	//init
	scrollHint.enable();
	//scrollHint.update();

	//return API to DOM
	return scrollHint;
}
/* ------------------------------------------------------------------------------ */
/* initSysMsg */
/* ------------------------------------------------------------------------------ */
function initSysMsg(){
	//vars
	var $sysmsg = $('#sysmsg'),
		activeCls = 'active',
		animCls = 'animatedloop';
	//bind interaction
	$sysmsg.on('click', function(e){
		$(this)
			.toggleClass(activeCls)
			.removeClass(animCls);
	});
}
/* ------------------------------------------------------------------------------ */
/* initModals */
/* ------------------------------------------------------------------------------ */
function initModals(){
	//vars
	var $btnModals = $('.btnModal'),
		activeCls = 'active',
		animCls = 'animatedloop attnloop';
	//go through modal buttons
	$.each($btnModals, function(idx,ele){
		//bind btn behaviors
		$(ele).bind('click', function(e){
			e.preventDefault();
			//vars
			var $btn = $(this),
				$modal = $($btn.attr('data-target')),
				url = $btn.attr('data-remote'),
				isActive = $btn.hasClass(activeCls);
			//init BS modal
			$modal.modal({ remote: url, show:false });
			if (!isActive) {
				$btn
					.addClass(activeCls)
					.removeClass(animCls);
				$modal.modal('show');
				$modal.one('hide.bs.modal', function(e) {
					$btn.removeClass(activeCls);
					//remove existing modal data
					$(this).removeData('bs.modal');
				})
			} else {
				$btn.removeClass(activeCls);
				$modal.modal('hide');
			}
		});
	});
}
/* ------------------------------------------------------------------------------ */
/* adaptCourseContent */
/* ------------------------------------------------------------------------------ */
function adaptCourseContent(){
	//vars
	var $content = $('#content'),
		$sysmsg = $('#sysmsg'),
		$coursecontentWrapper = $('#coursecontentWrapper'),
		delay = Platform.android ? 600 : 100,
		activeCls = 'adapted';
	//exit
	if (!$content.length || !$coursecontentWrapper.length) return false;
	//handler
	function update(e){
		setTimeout(function(e){
			var frameH = $content.height() - ( $sysmsg.length ? $sysmsg.outerHeight() : 0 );
			$coursecontentWrapper
				.height(frameH)
				.addClass(activeCls);
		}, delay);
	}
	//bind resize handler
	$(window).on('resize.adaptCourseContent', update);
	//init
	update();
}
/* ------------------------------------------------------------------------------ */
/* init */
/* ------------------------------------------------------------------------------ */
function init(){
	//interaction demo
	Scrollers = new initScrollers();
	ScrollHint = new initScrollHint();
	initMenus();
	initMenuFilter();
	initSubNav();
	initModals();

	//debug
	displayDebugInfo('#debugInfo');
	//alert($(window).height());
}
/* DOM.ready */
var Scrollers, ScrollHint;
$(document).ready(function(){
	console.log('DOM Ready');
	initWebFontLoader();
	Platform.addDOMClass();
	init();
});
