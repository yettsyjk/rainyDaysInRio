require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapToggle",
    "esri/widgets/BasemapGallery"
],
function(
    Map, MapView, BasemapToggle, BasemapGallery
){
    /* var required to hoist */
    var map = new Map({
        basemap: "topo-vector"
    });
    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [22.9068, 43.1729],
        zoom: 14
    });

    // var basemapToggle = new BasemapToggle({
    //     view: view,
    //     secondMap: "satellite"
    // });
    // view.ui.add(basemapToggle, "bottom-right");
    var BasemapGallery = new BasemapGallery({
        view: view,
        source: {
            portal: {
                url: "http://www.arcgis.com",
                useVectorBasemaps: true, //load tile
            },
        }
    });
    view.ui.add(BasemapGallery, "top-right");

});