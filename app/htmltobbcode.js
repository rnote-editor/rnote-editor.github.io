//Adapted from http://skeena.net/htmltobb/

function decodeHtmlEntity(str) {
	str = decodeURIComponent(str).replace(/&quot;/g, '"');
	str = str.replace(/&nbsp;/g, ' ');
	return str.replace(/&#(\d+);/g, function(match, dec) {
		return String.fromCharCode(dec);
	});
};


var htmltobbcode = function(html) {
	html = decodeHtmlEntity(html);
	html = html.replace(/<pre(.*?)>(.*?)<\/pre>/gmi, "[code]$2[/code]");

	//console.info(html)
	// Map headers to [size] blocks
	html = html.replace(/<h1(.*?)>(.*?)<\/h1>/gi, "\n\n[size=xx-large]$2[\/size]\n");
	html = html.replace(/<h2(.*?)>(.*?)<\/h2>/gi, "\n\n[size=x-large]$2[\/size]\n");
	html = html.replace(/<h3(.*?)>(.*?)<\/h3>/gi, "\n\n[size=large]$2[\/size]\n");
	html = html.replace(/<h4(.*?)>(.*?)<\/h4>/gi, "\n\n[size=medium]$2[\/size]\n");
	html = html.replace(/<h5(.*?)>(.*?)<\/h5>/gi, "\n\n[size=small]$2[\/size]\n");
	html = html.replace(/<h6(.*?)>(.*?)<\/h6>/gi, "\n\n[size=x-small]$2[\/size]\n");
	html = html.replace(/<h7(.*?)>(.*?)<\/h7>/gi, "\n\n[size=xx-small]$2[\/size]\n");
	

	//html = html.replace(/<h[1-7](.*?)>(.*?)<\/h[1-7]>/, "\n[h]$2[/h]\n");

	//paragraph handling:
	//- if a paragraph opens on the same line as another one closes, insert an extra blank line
	//- opening tag becomes two line breaks
	//- closing tags are just removed
	// html += html.replace(/<\/p><p/<\/p>\n<p/gi;
	// html += html.replace(/<p[^>]*>/\n\n/gi;
	// html += html.replace(/<\/p>//gi;
	html = html.replace(/<\/p><p[^>]*>/gi, "\n\n");
	html = html.replace(/<p[^>]*>/gi, "\n\n");
	html = html.replace(/<\/p>/, "");

	html = html.replace(/<br(.*?)>/gi, "\n\n");
	html = html.replace(/<textarea(.*?)>(.*?)<\/textarea>/gmi, "\[code]$2\[\/code]");
	html = html.replace(/<b>/gi, "[b]");
	html = html.replace(/<i>/gi, "[i]");
	html = html.replace(/<u>/gi, "[u]");
	html = html.replace(/<\/b>/gi, "[/b]");
	html = html.replace(/<\/i>/gi, "[/i]");
	html = html.replace(/<\/u>/gi, "[/u]");
	html = html.replace(/<em>/gi, "[b]");
	html = html.replace(/<\/em>/gi, "[/b]");
	html = html.replace(/<strong>/gi, "[b]");
	html = html.replace(/<\/strong>/gi, "[/b]");
	html = html.replace(/<cite>/gi, "[i]");
	html = html.replace(/<\/cite>/gi, "[/i]");
	html = html.replace(/<font color="(.*?)">(.*?)<\/font>/gmi, "[color=$1]$2[/color]");
	html = html.replace(/<font color=(.*?)>(.*?)<\/font>/gmi, "[color=$1]$2[/color]");
	html = html.replace(/<link(.*?)>/gi, "");
	html = html.replace(/<li(.*?)>(.*?)<\/li>/gi, "[*]$2");
	html = html.replace(/<ul(.*?)>/gi, "[list]");
	html = html.replace(/<\/ul>/gi, "[/list]");
	html = html.replace(/<div>/gi, "\n");
	html = html.replace(/<\/div>/gi, "\n");
	html = html.replace(/<td(.*?)>/gi, " ");
	html = html.replace(/<tr(.*?)>/gi, "\n");

	html = html.replace(/<img(.*?)src="(.*?)"(.*?)>/gi, "[img]$2[/img]");
	html = html.replace(/<a(.*?)href="(.*?)"(.*?)>(.*?)<\/a>/gi, "[url=$2]$4[/url]");

	html = html.replace(/<head>(.*?)<\/head>/gmi, "");
	html = html.replace(/<object>(.*?)<\/object>/gmi, "");
	html = html.replace(/<script(.*?)>(.*?)<\/script>/gmi, "");
	html = html.replace(/<style(.*?)>(.*?)<\/style>/gmi, "");
	html = html.replace(/<title>(.*?)<\/title>/gmi, "");
	html = html.replace(/<!--(.*?)-->/gmi, "\n");

	html = html.replace(/\/\//gi, "/");
	html = html.replace(/http:\//gi, "http://");

	html = html.replace(/<(?:[^>'"]*|(['"]).*?\1)*>/gmi, "");
	html = html.replace(/\r\r/gi, ""); 
	html = html.replace(/\[img]\//gi, "[img]");
	html = html.replace(/\[url=\//gi, "[url=");

	html = html.replace(/(\S)\n/gi, "$1 ");

	return html;
}