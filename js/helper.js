$(document).ready(function () {
	
    //mapbox start
    var municipios = L.tileLayer('http://b.tiles.mapbox.com/v3/acaoeducativa.mapadosplanos/{z}/{x}/{y}.png', {
    });
    var estados = L.tileLayer('http://b.tiles.mapbox.com/v3/acaoeducativa.mapadosplanos-estados/{z}/{x}/{y}.png', {
    });
    
    var brasil = new L.LatLng(-13.3255, -51.1523);
    var map = L.map('map', {
	center: new L.LatLng(-13.3255, -51.1523),
	zoom: 4,
	maxZoom: 7,
	minZoom: 4,
	//maxBounds: [[-78.3105,-38.0654], [-26.8945,7.3625]],
	layers: [estados, municipios]
       });
    
    var baseMaps = {
    "Estados": estados,
    "Munícipios": municipios
    };

    L.control.layers(baseMaps, null,{ collapsed: false }).addTo(map);

    var info = L.control();

    info.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
	this.update();
	return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
	this._div.innerHTML = '<h4>Verde: Com Plano<br>Rosa: Sem Plano</h4>'
    };

    info.setPosition("bottomright");
    info.addTo(map);



    municipios.bringToFront();
    estados.bringToBack();

    //mapbox end
    
    //autosearchbox start
    $('#s').keyup(function(e) {
        clearTimeout($.data(this, 'timer'));
        if (e.keyCode == 13)
          search(true);
        else
          $(this).data('timer', setTimeout(search, 500));
    });
    
    function search(force) {
        var existingString = $("#s").val();
        if (!force && existingString.length < 3) return; //wasn't enter, not > 2 char
        $.ajax({
			url:"wp-admin/admin-ajax.php",
			type:'POST',
			data:'action=ae_search&s='+existingString,
			success:function(results) {
				$("#autocomplete").html(results);
				$("#autocomplete a").hover(function() {
				    map.setView([this.dataset.lat, this.dataset.lng], 6);
				});
				
				$("#autocomplete ul").hover(null, function() {
				    map.setView(brasil, 4);
				});
				
			}
		});
    }
    //autosearchbox end

});
