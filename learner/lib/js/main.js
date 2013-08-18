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
		activeCls = 'active';
	//bind interaction
	$sysmsg.on('click', function(e){
		$(this).toggleClass(activeCls);
	});
}
/* ------------------------------------------------------------------------------ */
/* init */
/* ------------------------------------------------------------------------------ */
function init(){
	//interaction demo
	initMenus();
	initSysMsg();	
	//debug
	displayDebugInfo('#debugInfo');
}
/* DOM.ready */
$(document).ready(function(){
	console.log('DOM Ready');
	initWebFontLoader();
	Platform.addDOMClass();
	init();	
});
