
      require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/Graphic"
],
function(
    Map, MapView, FeatureLayer, GraphicsLayer, Graphic
){
    var map = new Map({
        basemap: "topo-vector"
    });
    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.80543, 34.02700],
        zoom: 12
    });
    /*Challenge */
    var sql = "TRL_NAME like '%Canyon%'";

    view.when(function(){
        queryFeatureLayerView(view.center, 1500, "intersects")
    });
    view.on("click", function(event){
        queryFeatureLayer(event.mapPoint, 1500, "intersects")
        queryFeatureLayerView(event.mapPoint, 1500, "intersects", sql)
    });

    var featureLayer = new FeatureLayer({
        url:"https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
    });

    var graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    function addGraphics(result){
        graphicsLayer.removeAll();
        result.features.forEach(function(feature){
            var g = new Graphic({
                geometry: feature.geometry,
                attributes: feature.attributes,
                symbol: {
                    type: "simple-marker",
                    color: [0,0,0],
                    outline: {
                        width: 2,
                        color: [0,255,255, 0.6],
                    },
                    size: "25px"
                },
                popupTemplate: {
                    title: "{TRL_NAME}",
                    content: "This is {PARK_NAME} trail located in {CITY_JUR}."
                }
            });
            graphicsLayer.add(g);
        });
    }
    /*query to the server */
    function queryFeatureLayer(point, distance, spatialRelationship, sqlExpression){
        var query = {
            geometry: point,
            distance: distance,
            spatialRelationship: spatialRelationship,
            outFields: ["*"],
            returnGeometry: true,
            where: sqlExpression
        };
        featureLayer.queryFeatures(query).then(function(result){
            addGraphics(result);
        });
    }

    /*client-side query */
    function queryFeatureLayerView(point, distance, spatialRelationship, sqlExpression){
        if (!map.findLayerById(featureLayer.id)){
            featureLayer.outFields = ["*"];
            map.add(featureLayer, 0);
        }

        var query = {
            geometry: point,
            distance: distance,
            spatialRelationship: spatialRelationship,
            outFields: ["*"],
            returnGeometry: true,
            where: sqlExpression
        };
        /* wait for the layerView to be ready and then query features */
        view.whenLayerView(featureLayer).then(function(featureLayerView){
            if (featureLayerView.updating){
                var handle = featureLayerView.watch("updating", function(isUpdating){
                    if (!isUpdating){
                        featureLayerView.queryFeatures(query).then(function(result){
                            addGraphics(result)
                        });
                        handle.remove();
                    }
                });
            } else {
                featureLayerView.queryFeatures(query).then(function(result){
                    addGraphics(result);
                });
            }
        });
    }
});