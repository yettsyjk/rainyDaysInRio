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
            
        })
    }
)