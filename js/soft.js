require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/MapImageLayer",
    "esri/layers/FeatureLayer",
    "esri/widgets/BasemapToggle",
    "esri/widgets/Legend",
    "esri/widgets/Home",
    "esri/widgets/Search",
    "esri/widgets/LayerList",
    "esri/Camera",
    "dojo/domReady!"
], 
function init(Map, SceneView, MapImageLayer, FeatureLayer,
    BasemapToggle, Legend, Home, Search, LayerList, Camera){
        var layersForMap = [];
        var configData = {}
        document.getElementById("appTitle").innerHTML = "3D Map";
        var newlayer = new MapImageLayer({
            url: "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer"
        });
        layersForMap.push(newlayer);
        var newlayer2 = new MapImageLayer({
            url: "https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/radar_base_reflectivity/MapServer"
        });
        layersForMap.push(newlayer2);
        var featureLayer1 = new FeatureLayer({
            url: "https://services.nationalmap.gov/arcgis/rest/services/structures/MapServer/0"
        });
        var map = new Map({
            basemap: "dark-gray",
            ground: "world-elevation",
            layers: layersForMap
        });
        var view = new SceneView({
            container: "viewDiv",
            map: map
        });
        var toggle = new BasemapToggle({
            vie: view,
            nextBasemap: "hybrid"
        });

        var searchWidget = new Search({
            view: view
        });

        var legend = new Legend({
            view: view
        });

        var homeWidget = new Home({
            view: view
        });

        var layerList = new LayerList({
            view: view
        });

        view.ui.add(toggle, "bottom-left");
        view.ui.add(searchWidget, {
            position:"top-right",
            index: 2
        });

        view.ui.add(layerList, {
            position: "top-left"
        });
        var cam = new Camera({
            heading: 15,
            tilt: 48,
            position: {
                "latitude": 19.5,
                "longitude": -95.3,
                "z": 1500000,
                "spatialReference": {"wkid": 3857}
            }
        });

        function toggleLayerList(){
            $(".esri-layer-list").toggleClass('visibility');
        };
        function toggleLegendList(){
            $(".esri-legend").toggleClass('visibility');
        };
        view.camera = cam;
        view.ui.add(legend, "bottom-right");
        view.ui.add(homeWidget, "right-right");
        $("#layerButton").click(toggleLayerList);
        $("#legendButton").click(toggleLegendList);
    });