    google.maps.event.addDomListener(window, 'load', init);
    var map;
    var myIcon = { url:"/assets/ico/gmaplogo@2x.png", scaledSize:{width:48,height:56} };
    function init() {
        var mapOptions = {
            center: new google.maps.LatLng(35.972511,139.585093),
            zoom: 15,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
            },
            disableDoubleClickZoom: false,
            mapTypeControl: false,
            scaleControl: false,
            scrollwheel: false,
            panControl: false,
            streetViewControl: true,
            draggable : true,
            overviewMapControl: false,
            overviewMapControlOptions: {
                opened: false,
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{featureType: "landscape",stylers:[{saturation:-100},{lightness:65},{visibility:"on"}]},{featureType:"poi",stylers:[{saturation:-100},{lightness:51},{visibility:"simplified"}]},{featureType:"road.highway",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"road.arterial",stylers:[{saturation:-100},{lightness:30},{visibility:"on"}]},{featureType:"road.local",stylers:[{saturation:-100},{lightness:0},{visibility:"on"}]},{featureType:"transit",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"administrative.province",stylers:[{visibility:"off"}]/**/},{featureType:"administrative.locality",stylers:[{visibility:"off"}]},{featureType:"administrative.neighborhood",stylers:[{visibility:"on"}]/**/},{featureType:"water",elementType:"labels",stylers:[{visibility:"on"},{lightness:-25},{saturation:-100}]},{featureType:"water",elementType:"geometry",stylers:[{hue:"#ffff00"},{lightness:-25},{saturation:-97}]}],
        }
        var mapElement = document.getElementById('map');
        var map = new google.maps.Map(mapElement, mapOptions);
        var locations = [['MEANA', 'undefined', '048-773-7787', 'info@meana-studio.com', 'www.meana-studio.com', 35.972511, 139.585093, myIcon]
        ];
        for (i = 0; i < locations.length; i++) {
			if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
			if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
			if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
			if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
			if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
			marker = new google.maps.Marker({
				icon: markericon,
                position: new google.maps.LatLng(locations[i][5], locations[i][6]),
                map: map,
                title: locations[i][0],
                desc: description,
                tel: telephone,
                email: email,
                web: web
			});
		if (web.substring(0, 7) != "https://") {
			link = "https://" + web;
		} else {
			link = web;
		}
		bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web, link);
     }
	function bindInfoWindow(marker, map, title, desc, telephone, email, web, link) {
		var infoWindowVisible = (function () {
			var currentlyVisible = false;
			return function (visible) {
				if (visible !== undefined) {
					currentlyVisible = visible;
				}
				return currentlyVisible;
				};
			}());
			iw = new google.maps.InfoWindow();
			google.maps.event.addListener(marker, 'click', function() {
			if (infoWindowVisible()) {
				iw.close();
				infoWindowVisible(false);
			} else {
				var html= "<div id='map-detail'><h4>"+title+"</h4><p>"+telephone+"</p><p><a href='mailto:"+email+"' >"+email+"</a></p><p><a href='"+link+"'' >"+web+"</a></p></div>";
				iw = new google.maps.InfoWindow({content:html});
				iw.open(map,marker);
				infoWindowVisible(true);
			}
        });
		google.maps.event.addListener(iw, 'closeclick', function () {
			infoWindowVisible(false);
		});
	}
}