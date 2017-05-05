

function AppViewModel() {

  var self = this;

  self.initialLocations = [
    {
      name: 'Museum of the Moving Image',
      lat: 40.7563,
      lng: -73.9239
    },
    {
      name: 'Sweet Afton',
      lat: 40.7654,
      lng: -73.9191
    },
    {
      name: 'Seva Indian Cuisine',
      lat: 40.7654,
      lng: -73.9190
    },
    {
      name: 'Katch',
      lat: 40.7672,
      lng: -73.9201
    },
    {
      name: 'Matsu',
      lat: 40.7657,
      lng: -73.9184
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

        marker.setAnimation(google.maps.Animation.BOUNCE);
        turnOffAnimation=function(){marker.setAnimation(null)}
        setTimeout(turnOffAnimation,700);
        setWindowContent=this.infoWindow.setContent

        function getDemographics(location) {
          $.getJSON(
            "https://www.broadbandmap.gov/broadbandmap/demographic/2014/"+
            "coordinates?latitude="+location.lat+"&longitude="+
            location.lng+"&format=json", function(json) {
            console.log(json.Results);
            content="<h4>Area Demographics:</h4>"+
                    "<p>Education: High School Graduate: " +
                    json.Results.educationHighSchoolGraduate.toFixed(1)+"%</p>"+
                    "<p>Education: Bachelor's Degree or Greater: " +
                    json.Results.educationBachelorOrGreater.toFixed(1)+"%</p>"+
                    "<p>Education: High School Graduate: " +
                    json.Results.educationHighSchoolGraduate.toFixed(1)+"%</p>"+
                    "<p>Income Below Poverty: "+
                    json.Results.incomeBelowPoverty.toFixed(1)+"%</p>"+
                    "<p>Income less than $25,000: " +
                    json.Results.incomeLessThan25.toFixed(1)+"%</p>"+
                    "<p>Income Between $25,000 and $50,000: " +
                    json.Results.incomeBetween25to50.toFixed(1)+"%</p>"+
                    "<p>Income Between $50,000 and $100,000: " +
                    json.Results.incomeBetween50to100.toFixed(1)+"%</p>"+
                    "<p>Income Between $100,000 and $200,000: " +
                    json.Results.incomeBetween100to200.toFixed(1)+"%</p>"+
                    "<p>Income greated than $200,000: " +
                    json.Results.incomeGreater200.toFixed(1)+"%</p>"+
                    "<p>Median Income: $" +
                    json.Results.medianIncome.toFixed(1)+"</p>"



           }).fail(function(jqXHR, textStatus, errorThrown) { content="<p>Failed to Retrieve Demographics Information</p>"; })
           .always(function() { location.infoWindow.setContent(content) });;
        }

        getDemographics(this)

        this.infoWindow.open(map,marker)

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
  var astoria={lat: 40.7644, lng: -73.9235}
  map = new google.maps.Map(document.getElementById('map'), {
    center: astoria,
    mapTypeId: 'terrain',
    draggable:true,
    zoom: 14
  });
ko.applyBindings(new AppViewModel());
}
