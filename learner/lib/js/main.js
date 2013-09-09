/* ------------------------------------------------------------------------------ */
/* webfonts */
/* ------------------------------------------------------------------------------ */
WebFontConfig = {
	google: 		{ families: [
									'Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic,700italic:latin',
									'Montserrat:400,700:latin'
								] },
	loading: 		function() 					{ console.log( '[webfont] loading'); },
	active: 		function() 					{ console.log( '[webfont] active :)'); },
	inactive: 		function() 					{ console.log( '[webfont] inactive :('); },
	fontloading: 	function( familyName, fvd ) { console.log( '[webfont] loading:',  familyName, fvd ); },
	fontactive: 	function( familyName, fvd ) { console.log( '[webfont] active:',   familyName, fvd ); },
	fontinactive: 	function( familyName, fvd ) { console.log( '[webfont] inactive:', familyName, fvd ); }
};
/* ------------------------------------------------------------------------------ */
/* initMenus */
/* ------------------------------------------------------------------------------ */
function initMenus(){
	//vars
	var $container = $('#container'),
		//side menus
		$nav = $('#nav'),
		$menu = $('#menu'),
		$discussions = $('#discussions'),
		//trigger buttons
		$btnNav = $('#btnNav'),
		$btnMenu = $('#btnMenu'),
		$btnDiscussions = $('#btnDiscussions'),
		//state classes
		navActiveCls = 'navActive'
		menuActiveCls = 'menuActive',
		discussionsActiveCls = 'discussionsActive',
		activeCls = 'active',
		thisCls = '',
		otherCls = '';

	//handler
	function toggleMenus(e) {
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
		//update state class
		$container.removeClass(otherCls);
		//update state class on buttons
		if ($container.hasClass(thisCls)) {
			$container.removeClass(thisCls);
			$btn.removeClass(activeCls);
		} else {
			$container.addClass(thisCls);
			$btn.addClass(activeCls);
			if (id.indexOf('Menu') != -1) {
				$btnDiscussions.removeClass(activeCls);
				$btnNav.removeClass(activeCls);
			}
			else if (id.indexOf('Discussions') != -1) {
				$btnMenu.removeClass(activeCls);
				$btnNav.removeClass(activeCls);
			}
		};
	}

	//bind side menu interaction
	$.each([$btnNav, $btnMenu, $btnDiscussions], function(){
		$(this).on('click', toggleMenus);
	});

	//remove text label hints after first use
	$btnNav.one('click', function(){
		$('#popoverNav').fadeOut(300);
	});
	$btnMenu.one('click', function(){
		$('#popoverMenu').fadeOut(300);
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
/* initUtils */
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
	initMenus();
	//initSysMsg();
	initModals();
	//debug
	displayDebugInfo('#debugInfo');
}
/* DOM.ready */
$(document).ready(function(){
	console.log('DOM Ready');
	initWebFontLoader();
	Platform.addDOMClass();
	init();

	//alert($(window).height());
});
