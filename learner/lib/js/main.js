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
		$nav = $('#nav'),
		$menu = $('#menu'),
		$btnNav = $('#btnNav'),
		$btnMenu = $('#btnMenu'),
		navActiveCls = 'navActive'
		menuActiveCls = 'menuActive',
		activeCls = 'activated',
		thisCls = '', 
		otherCls = '';
	//handler
	function toggleMenus(e) {
		var $btn = $(this),
			id = $btn.attr('id');
		if ( id.indexOf('Nav') != -1 ) {
			thisCls = navActiveCls;
			otherCls = menuActiveCls;
		}
		else if ( id.indexOf('Menu') != -1  ) {
			thisCls = menuActiveCls;
			otherCls = navActiveCls;
		}
		$container.removeClass(otherCls);
		if ($container.hasClass(thisCls)) {
			$container.removeClass(thisCls);
			$btn.removeClass(activeCls);
		} else {
			$container.addClass(thisCls);
			$btn.addClass(activeCls);
		};
	}
	//bind interaction
	$.each([$btnNav, $btnMenu], function(){
		$(this).on('click', toggleMenus);	
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
/* initDiscussions */
/* ------------------------------------------------------------------------------ */
function initDiscussions(){
	//vars
	var $container = $('#container'),
		$btnTrigger = $('#btnDiscussions'),
		$menu = $('#menu'),
		$discussions = $('#discussions'),
		activeCls = 'active',
		containerActiveCls = 'discussionsActive';
	//handler
	function toggleDiscussions(e){
		e.preventDefault();
		var $this = $(this);
		if ($this.hasClass(activeCls)) {
			$this.removeClass(activeCls);
			$menu.show(0);
			$discussions.hide(0);
			$container.removeClass(containerActiveCls);
		} else {
			$this.addClass(activeCls);
			$menu.hide(0);
			$discussions.show(0);
			$container.addClass(containerActiveCls);
		}
	}
	//bind interaction
	$btnTrigger.on('click', toggleDiscussions);
}
/* ------------------------------------------------------------------------------ */
/* init */
/* ------------------------------------------------------------------------------ */
function init(){
	//interaction demo
	initMenus();
	initSysMsg();
	initModals();
	initDiscussions();	
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
