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
/* init */
/* ------------------------------------------------------------------------------ */
function init(){
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
