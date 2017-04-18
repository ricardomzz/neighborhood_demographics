var initial_locations = [
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
]

var Location=function(data){
  this.name = data.name;
  this.lat = data.lat;
  this.lng = data.lng;
}

var markers=[]
var ViewModel = function(){
  var self=this;


  this.locationList = ko.observableArray([])
  this.markers = []
  initial_locations.forEach(function(locationItem){
    self.locationList.push(new Location(locationItem)),
    markers.push({lat:locationItem.lat,lng:locationItem.lng})

  })
}

ko.applyBindings(new ViewModel());
