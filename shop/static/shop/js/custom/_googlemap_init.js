// Init Google map
var THEMEREX_googlemap_init_obj = {};
var THEMEREX_googlemap_styles = {
	'default': [],
	'royal' : [
	{
		"featureType": "landscape",
		"stylers": [
			{ "hue": "#FF0700" },
			{ "saturation": -66 },
			{ "lightness": 44 },
			{ "gamma": 1 }
		]
	},
	{
		"featureType": "road.highway",
		"stylers": [
			{ "hue": "#FF1B00" },
			{ "saturation": 41.599999999999994 },
			{ "lightness": 61.39999999999998 },
			{ "gamma": 1 }
		]
	},
	{
		"featureType": "road.arterial",
		"stylers": [
			{ "hue": "#FF5E00" },
			{ "saturation": 30.864197530864146 },
			{ "lightness": 27.799999999999997 },
			{ "gamma": 1 }
		]
	},
	{
		"featureType": "road.local",
		"stylers": [
			{ "hue": "#FF5E00" },
			{ "saturation": 30.864197530864146 },
			{ "lightness": 28.599999999999994 },
			{ "gamma": 1 }
		]
	},
	{
		"featureType": "water",
		"stylers": [
			{ "hue": "#00FFF0" },
			{ "saturation": -88.6 },
			{ "lightness": 42.19999999999999 },
			{ "gamma": 1 }
		]
	},
	{
		"featureType": "poi",
		"stylers": [
			{ "hue": "#A7FF00" },
			{ "saturation": -14 },
			{ "lightness": 27.200000000000003 },
			{ "gamma": 1 }
		]
	}
	],
	'simple': [
				{
				  stylers: [
					{ hue: "#00ffe6" },
					{ saturation: -20 }
				  ]
				},{
				  featureType: "road",
				  elementType: "geometry",
				  stylers: [
					{ lightness: 100 },
					{ visibility: "simplified" }
				  ]
				},{
				  featureType: "road",
				  elementType: "labels",
				  stylers: [
					{ visibility: "off" }
				  ]
				}
			  ],
	'greyscale': [
					{
						"stylers": [
							{ "saturation": -100 }
						]
					}
				],
	'greyscale2': [
				{
				 "featureType": "landscape",
				 "stylers": [
				  { "hue": "#FF0300" },
				  { "saturation": -100 },
				  { "lightness": 20.4705882352941 },
				  { "gamma": 1 }
				 ]
				},
				{
				 "featureType": "road.highway",
				 "stylers": [
				  { "hue": "#FF0300" },
				  { "saturation": -100 },
				  { "lightness": 25.59999999999998 },
				  { "gamma": 1 }
				 ]
				},
				{
				 "featureType": "road.arterial",
				 "stylers": [
				  { "hue": "#FF0300" },
				  { "saturation": -100 },
				  { "lightness": -22 },
				  { "gamma": 1 }
				 ]
				},
				{
				 "featureType": "road.local",
				 "stylers": [
				  { "hue": "#FF0300" },
				  { "saturation": -100 },
				  { "lightness": 21.411764705882348 },
				  { "gamma": 1 }
				 ]
				},
				{
				 "featureType": "water",
				 "stylers": [
				  { "hue": "#FF0300" },
				  { "saturation": -100 },
				  { "lightness": 21.411764705882348 },
				  { "gamma": 1 }
				 ]
				},
				{
				 "featureType": "poi",
				 "stylers": [
				  { "hue": "#FF0300" },
				  { "saturation": -100 },
				  { "lightness": 4.941176470588232 },
				  { "gamma": 1 }
				 ]
				}
			   ],
	'style1': [{
					"featureType": "landscape",
					"stylers": [
						{ "hue": "#FF0300"	},
						{ "saturation": -100 },
						{ "lightness": 20.4705882352941 },
						{ "gamma": 1 }
					]
				},
				{
					"featureType": "road.highway",
					"stylers": [
						{ "hue": "#FF0300" },
						{ "saturation": -100 },
						{ "lightness": 25.59999999999998 },
						{ "gamma": 1 }
					]
				},
				{
					"featureType": "road.arterial",
					"stylers": [
						{ "hue": "#FF0300" },
						{ "saturation": -100 },
						{ "lightness": -22 },
						{ "gamma": 1 }
					]
				},
				{
					"featureType": "road.local",
					"stylers": [
						{ "hue": "#FF0300" },
						{ "saturation": -100 },
						{ "lightness": 21.411764705882348 },
						{ "gamma": 1 }
					]
				},
				{
					"featureType": "water",
					"stylers": [
						{ "hue": "#FF0300" },
						{ "saturation": -100 },
						{ "lightness": 21.411764705882348 },
						{ "gamma": 1 }
					]
				},
				{
					"featureType": "poi",
					"stylers": [
						{ "hue": "#FF0300" },
						{ "saturation": -100 },
						{ "lightness": 4.941176470588232 },
						{ "gamma": 1 }
					]
				}
			],
	'style2': [
		 {
		  "featureType": "landscape",
		  "stylers": [
		   {
		    "hue": "#007FFF"
		   },
		   {
		    "saturation": 100
		   },
		   {
		    "lightness": 156
		   },
		   {
		    "gamma": 1
		   }
		  ]
		 },
		 {
		  "featureType": "road.highway",
		  "stylers": [
		   {
		    "hue": "#FF7000"
		   },
		   {
		    "saturation": -83.6
		   },
		   {
		    "lightness": 48.80000000000001
		   },
		   {
		    "gamma": 1
		   }
		  ]
		 },
		 {
		  "featureType": "road.arterial",
		  "stylers": [
		   {
		    "hue": "#FF7000"
		   },
		   {
		    "saturation": -81.08108108108107
		   },
		   {
		    "lightness": -6.8392156862745
		   },
		   {
		    "gamma": 1
		   }
		  ]
		 },
		 {
		  "featureType": "road.local",
		  "stylers": [
		   {
		    "hue": "#FF9A00"
		   },
		   {
		    "saturation": 7.692307692307736
		   },
		   {
		    "lightness": 21.411764705882348
		   },
		   {
		    "gamma": 1
		   }
		  ]
		 },
		 {
		  "featureType": "water",
		  "stylers": [
		   {
		    "hue": "#0093FF"
		   },
		   {
		    "saturation": 16.39999999999999
		   },
		   {
		    "lightness": -6.400000000000006
		   },
		   {
		    "gamma": 1
		   }
		  ]
		 },
		 {
		  "featureType": "poi",
		  "stylers": [
		   {
		    "hue": "#00FF60"
		   },
		   {
		    "saturation": 17
		   },
		   {
		    "lightness": 44.599999999999994
		   },
		   {
		    "gamma": 1
		   }
		  ]
		 }
	],
	'style3':  [
 {
  "featureType": "landscape",
  "stylers": [
   {
    "hue": "#FFA800"
   },
   {
    "saturation": 17.799999999999997
   },
   {
    "lightness": 152.20000000000002
   },
   {
    "gamma": 1
   }
  ]
 },
 {
  "featureType": "road.highway",
  "stylers": [
   {
    "hue": "#007FFF"
   },
   {
    "saturation": -77.41935483870967
   },
   {
    "lightness": 47.19999999999999
   },
   {
    "gamma": 1
   }
  ]
 },
 {
  "featureType": "road.arterial",
  "stylers": [
   {
    "hue": "#FBFF00"
   },
   {
    "saturation": -78
   },
   {
    "lightness": 39.19999999999999
   },
   {
    "gamma": 1
   }
  ]
 },
 {
  "featureType": "road.local",
  "stylers": [
   {
    "hue": "#00FFFD"
   },
   {
    "saturation": 0
   },
   {
    "lightness": 0
   },
   {
    "gamma": 1
   }
  ]
 },
 {
  "featureType": "water",
  "stylers": [
   {
    "hue": "#007FFF"
   },
   {
    "saturation": -77.41935483870967
   },
   {
    "lightness": -14.599999999999994
   },
   {
    "gamma": 1
   }
  ]
 },
 {
  "featureType": "poi",
  "stylers": [
   {
    "hue": "#007FFF"
   },
   {
    "saturation": -77.41935483870967
   },
   {
    "lightness": 42.79999999999998
   },
   {
    "gamma": 1
   }
  ]
 }
]
}

function googlemap_init(dom_obj, coords, description, point) {
	"use strict";
	try {
		if (coords.latlng!=='') {
			var latlngStr = coords.latlng.split(',');
			var lat = parseFloat(latlngStr[0]);
			var lng = parseFloat(latlngStr[1]);
			var latlng = new google.maps.LatLng(lat, lng);
		} else
			var latlng = new google.maps.LatLng(0, 0);
		var id = dom_obj.id;
		THEMEREX_googlemap_init_obj[id] = {};
		THEMEREX_googlemap_init_obj[id].dom = dom_obj;
		THEMEREX_googlemap_init_obj[id].point = point;
		THEMEREX_googlemap_init_obj[id].description = description;
		THEMEREX_googlemap_init_obj[id].opt = {
			zoom: coords.zoom,
			center: latlng,
			scrollwheel: coords.scroll,
			scaleControl: false,
			disableDefaultUI: false,
				panControl: true,
				zoomControl: true,
				mapTypeControl: false,
				streetViewControl: false,
				overviewMapControl: false,
			styles: THEMEREX_googlemap_styles[coords.style ? coords.style : 'default'],
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var custom_map = new google.maps.Geocoder();
		custom_map.geocode(coords.latlng!=='' ? {'latLng': latlng} : {"address": coords.address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				THEMEREX_googlemap_init_obj[id].address = results[0].geometry.location;
				googlemap_create(id);
			} else
				alert(THEMEREX_GEOCODE_ERROR + ' ' + status);
		});

		jQuery(window).resize(function() {
			if (THEMEREX_googlemap_init_obj[id].map) THEMEREX_googlemap_init_obj[id].map.setCenter(THEMEREX_googlemap_init_obj[id].address);
		});

	} catch (e) {
		//alert(THEMEREX_GOOGLE_MAP_NOT_AVAIL);
	};
}

function googlemap_create(id) {
	"use strict";
	if (!THEMEREX_googlemap_init_obj[id].address) return false;
	THEMEREX_googlemap_init_obj[id].map = new google.maps.Map(THEMEREX_googlemap_init_obj[id].dom, THEMEREX_googlemap_init_obj[id].opt);
	THEMEREX_googlemap_init_obj[id].map.setCenter(THEMEREX_googlemap_init_obj[id].address);
	var marker = new google.maps.Marker({
		map: THEMEREX_googlemap_init_obj[id].map,
		icon: THEMEREX_googlemap_init_obj[id].point,
		position: THEMEREX_googlemap_init_obj[id].map.getCenter()
	});
	var infowindow = new google.maps.InfoWindow({
		content: THEMEREX_googlemap_init_obj[id].description
	});
	google.maps.event.addListener(marker, "click", function() {
		infowindow.open(THEMEREX_googlemap_init_obj[id].map, marker);
	});
}

function googlemap_refresh() {
	"use strict";
	for (id in THEMEREX_googlemap_init_obj) {
		googlemap_create(id);
	}
}

jQuery(window).ready(function() {
	jQuery('.sc_googlemap').each(function(){
		var map_address = jQuery(this).data('address');
		var map_latlng = jQuery(this).data('latlng');
	 	var map_id = jQuery(this).attr('id');
 		var map_zoom = jQuery(this).data('zoom') != '' ? jQuery(this).data('zoom') : 12;
 		var map_style = jQuery(this).data('style') != '' ? jQuery(this).data('style') : 'default';
 		var map_scroll = jQuery(this).data('scroll') == 'yes'? true : false;
		var map_descr = jQuery(this).data('description');
 		var map_point = jQuery(this).data('point');
		googlemap_init( jQuery('#'+map_id).get(0), {address: map_address , latlng: map_latlng, style: map_style, scroll:map_scroll, zoom: map_zoom}, map_descr, map_point);
	});
});
