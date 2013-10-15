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
	onWFComplete: 	function()	{},
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
		$container.hammer(opts).on('swipe',  onSwipe);
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
			$container.addClass(thisCls);
			$btn.addClass(activeCls);
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
		};
		onShowAssess = function(e){
			e.preventDefault();
			$courseMenu.find(allSelector).not(assessSelector).hide();
			$btnViewAssess.addClass(activeCls);
			$btnViewAll.removeClass(activeCls);
			//update scroller
			if (Scrollers && typeof(Scrollers.update)=='function') Scrollers.update('Nav');
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
		//update scroller
		//if (Scrollers && typeof(Scrollers.update)=='function') Scrollers.update('Subnav');
		//enable back button
		$btnBack.one('click', onHideSubNav);
		//hide/show assessment button
		if ($btnSubmitAssess.length) {
			$listItem.hasClass('assess') ? $btnSubmitAssess.show() : $btnSubmitAssess.hide();
		}

		console.log('[subNav] of "' + $trigger.text() + '" ACTIVE');
	}
	function onHideSubNav(e){
		e.preventDefault();
		var $trigger = $navList.find('.navList > li > a.link.current').removeClass(currentCls);
		$nav.removeClass(subNavActiveCls);

		console.log('[subNav] of "' + $trigger.text() + '" INACTIVE');
	}
	//bind interaction
	$.each($subNavLists, function(idx, ele){
		var $trigger = $(ele).parent('li').find('> a.link');
		$trigger.on('click', onShowSubNav);
	});
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
	//bind interaction
	$.each($btnModals, function(idx,ele){
		var $this = $(this),
			$target = $($this.attr('href')),
			isActive = $this.hasClass(activeCls);
		$this.bind('click', function(e){
			if (!isActive) {
				$this
					.addClass(activeCls)
					.removeClass(animCls);
				$target.modal('show');
				$target.one('hide.bs.modal', function() {
					$this.removeClass(activeCls);
				})
			} else {
				$this.removeClass(activeCls);
				$target.modal('hide');
			}
		});
	});
}
/* ------------------------------------------------------------------------------ */
/* init */
/* ------------------------------------------------------------------------------ */
function init(){
	//interaction demo
	Scrollers = new initScrollers();
	initMenus();
	initMenuFilter();
	initSubNav();
	initModals();

	//debug
	displayDebugInfo('#debugInfo');
	//alert($(window).height());
}
/* DOM.ready */
var Scrollers;
$(document).ready(function(){
	console.log('DOM Ready');
	initWebFontLoader();
	Platform.addDOMClass();
	init();
});
