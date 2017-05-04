

function AppViewModel() {

  var self = this;

  self.initialLocations = [
    {
      name: 'Theatro da Paz',
      lat: -1.4530,
      lng: -48.4937
    },
    {
      name: 'Mangal das Garças',
      lat: -1.4649,
      lng: -48.5055
    },
    {
      name: 'Ver-O-Peso',
      lat: -1.4524,
      lng: -48.5038
    },
    {
      name: 'Forte do Castelo',
      lat: -1.4543,
      lng: -48.5052
    },
    {
      name: 'Museu Emilio Goeldi',
      lat: -1.4527,
      lng: -48.4765
    },
    {
      name: 'Catedral Nossa Senhora de Belém',
      lat: -1.4561,
      lng: -48.5048
    },
    {
      name: 'Parque da Residência',
      lat: -1.4519,
      lng: -48.4734
    }
  ];




  self.filter = ko.observable("");
  self.locationList = ko.observableArray([]);

  self.filteredLocationList = ko.computed(function(){
    return ko.utils.arrayFilter(
      self.locationList(),function(location){
        return location().name.toUpperCase().includes(self.filter().toUpperCase())
      }
    )
  }

  );

//return location.name.toUpperCase().includes(self.filter().toUpperCase())
  self.initialLocations.forEach(function(location){
    self.locationList.push(ko.observable({
      name:location.name,
      lat:location.lat,
      lng:location.lng,
      marker:new google.maps.Marker({position:{lat:location.lat,lng:location.lng},map:map}),
      infoWindow: new google.maps.InfoWindow({content: location.name}),
      turnOffMarker: function(){this.marker.setMap(null)},
      bounceMarker: function(){

        marker=this.marker

        //close all infowidows
        self.locationList().forEach(function(location){location().infoWindow.close()})
        //open infowindow for selected marker
        this.infoWindow.open(map,marker)
        marker.setAnimation(google.maps.Animation.BOUNCE);
        turnOffAnimation=function(){marker.setAnimation(null)}
        setTimeout(turnOffAnimation,700);
        }

    }))

  });
  self.refreshMap = function (){
    self.locationList().forEach(function (location) {
      location().marker.setMap(null)
    });
    self.filteredLocationList().forEach(function (location) {
      location().marker.setMap(map)
    });

  }

  self.filterList = function (formElement){
    self.filter(formElement.keyword.value);
    self.refreshMap();

  };
}


function initApp() {
  var belem={lat: -1.455833, lng: -48.503889}
  map = new google.maps.Map(document.getElementById('map'), {
    center: belem,
    mapTypeId: 'terrain',
    draggable:true,
    zoom: 12
  });
ko.applyBindings(new AppViewModel());
}
