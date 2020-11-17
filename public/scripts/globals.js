if(window.location.protocol != 'https:') {
	location.href = location.href.replace("http://", "https://")
}
// if('serviceWorker' in navigator) {
// 	navigator.serviceWorker.register('sw.js', {scope: '/'})
// }