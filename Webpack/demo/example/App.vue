<template>
  <div>
    <div style="height:100%;position: absolute;left:0px;right:0px;" id="map-container2" ref="mapcontainer">
    </div>
  </div>
</template>

<script>

import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import TileLayer from '@arcgis/core/layers/TileLayer';
import Basemap from '@arcgis/core/Basemap';
//import { Map, MapView, TileLayer, Basemap } from './lib/main'
//import a from './lib/main'
//import a from './lib/arcgis-core.umd'
export default {
  name: 'home',
  components: {
  },
  data() {
    return {
    }
  },
  mounted() {
    //console.log(Map, MapView, TileLayer, Basemap)
    //console.log(a)
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      var baseLayer = new TileLayer({
        url: "https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer",
        maxScale: 1
      })

      var baseMap = new Basemap({
        baseLayers: [baseLayer]
      });

      var map = new Map({
        basemap: baseMap
      });

      var view = new MapView({
        container: "map-container2",
        map: map,
        zoom: 7,
        center: [113.305513, 23.101254]
      });
    }
  }
}
</script>

<style lang="less">
</style>
