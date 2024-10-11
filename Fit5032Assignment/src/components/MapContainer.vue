<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const props = defineProps({
    locationFeature: {
        type: Object,
        default: null,
        required: false
    }
})

const access_token = 'pk.eyJ1IjoiMmdyZWVuIiwiYSI6ImNtMjM4c3ZrNzAzOWkya29oMXM4enJpZzMifQ.uRp3yfnvSM7NHlOfI_5kxg';

mapboxgl.accessToken = access_token;

const mapRef = ref(null);

const userInputs = ref({
    addressSearch: '',
    feature: null
});
const userErrors = ref({
    addressSearch: null
});
const mapboxSearchOutput = ref([]);


// const geojson = {
//   type: 'FeatureCollection',
//   features: [
    // {
    //   type: 'Feature',
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-77.032, 38.913]
    //   },
    //   properties: {
    //     title: 'Mapbox',
    //     description: 'Washington, D.C.'
    //   }
    // },
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [-122.414, 37.776]
//       },
//       properties: {
//         title: 'Mapbox',
//         description: 'San Francisco, California'
//       }
//     }
//   ]
// };

function clearSearchAddress() {
    userInputs.value = {
        addressSearch: '',
        feature: null
    };
    userErrors.value = {
        addressSearch: null
    };
    mapboxSearchOutput.value = [];
}

function validateSearchAddress() {
    if (userInputs.value.addressSearch === ''){
        userErrors.value.addressSearch = 'Insert an Address to Search';
    } else {
        userErrors.value.addressSearch = null
    }
}

async function submitAndSearchUserAddress() {
    validateSearchAddress()
    if (!userErrors.value.addressSearch){
        try {
            const response = await axios.get(`https://api.mapbox.com/search/geocode/v6/forward?q=${userInputs.value.addressSearch}&limit=10&access_token=${access_token}`)
            mapboxSearchOutput.value = response.data.features;
        } catch (error) {
            console.error("An error occured when searching", error)
        }
    }
    
}

function createBaseMap(){
    mapRef.value = new mapboxgl.Map({
        container: 'map', // container ID
        center: props.locationFeature.geometry.coordinates, // starting position [lng, lat]
        zoom: 12 // starting zoom
    });
    new mapboxgl.Marker().setLngLat(props.locationFeature.geometry.coordinates).addTo(mapRef.value)
}

function addMarkerAndFocus(feature){
    userInputs.value.feature = feature; // store the feature
    mapRef.value = new mapboxgl.Map({
        container: 'map', // container ID
        center: feature.geometry.coordinates, // focus is the second markers
        zoom: 12 // starting zoom
    });
    new mapboxgl.Marker().setLngLat(props.locationFeature.geometry.coordinates).addTo(mapRef.value)
    new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(mapRef.value)
    mapRef.value.on('style.load', function() {
        addRoute();
        // You might also want to add layers here if needed
    });
}

async function addRoute(){
    if (!userInputs.value.feature){return} // if there's no feature, do nothing 
    const feature = userInputs.value.feature
    // fetch a route from feature parameter to prop.feature
    try {
        const url = `https://api.mapbox.com/directions/v5/mapbox/cycling/${feature.geometry.coordinates[0]},${feature.geometry.coordinates[1]};${props.locationFeature.geometry.coordinates[0]},${props.locationFeature.geometry.coordinates[1]}?geometries=geojson&access_token=${access_token}`
        const query = await axios.get(url);
        const json = query.data;
        const data = json.routes[0];
        const route = data.geometry.coordinates;
        const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: route
            }
        };
        // if the route already exists on the map, we'll reset it using setData
        if (mapRef.value.getSource('route')) {
            mapRef.value.getSource('route').setData(geojson);
        } else {
            mapRef.value.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: geojson
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#3887be',
                    'line-width': 5,
                    'line-opacity': 0.75
                }
            });
            // add turn instructions here at the end
        }

    } catch (error) {
        console.error("Error occured when fetching route: ", error)
    }
}

onMounted(() => {
    // don't do anything if no location is given
    if(props.locationFeature != null){
        createBaseMap();
    }
});
</script>

<template>
    <div v-if="locationFeature!=null" class="mb-5">
        <div class="border border-black">
            <div class="border border-black">
                <div class="mx-2">
                    <h5>Interactive Map</h5>
                </div>
            </div>
            <div class="map-search-container">
                <label class="m-2">Search To Address: </label>
                <input type="text"
                    id="Address"
                    class="form-control mx-2"
                    v-model="userInputs.addressSearch"
                    style="max-width:90%;"
                    @blur="validateSearchAddress()"
                />
                <div v-if="userErrors.addressSearch" class="text-danger mx-2">{{ userErrors.addressSearch }}</div> 
                <button type="submit" 
                    class="btn btn-primary m-2"
                    @click="submitAndSearchUserAddress()">Submit</button>
                <button type="button" class="btn btn-secondary" @click="clearSearchAddress">Clear</button>
                <div v-if="mapboxSearchOutput.length!=0">
                    <DataTable
                        :value="mapboxSearchOutput"
                        table-style="min-width: 50rem" 
                        removableSort 
                        paginator :rows="5" :rowsPerPageOptions="[1, 5, 10]">
                        <Column field="properties.full_address" header="Address" sortable></Column>
                        <Column header="Select Address">
                            <template #body="rowData">
                                <button @click="addMarkerAndFocus(rowData.data)">Add Marker</button>
                            </template>
                        </Column>
                    </DataTable>
                </div>
                
            </div>
            
            <div id="map" class="map">

            </div>
        </div>
    </div>
    <div v-else></div>
</template>

<style>
.map {
    width: 100%;
    height: 400px;
    overflow: hidden; /* Prevents content overflow */
}
.map-search-container {
    background-color: darkgray;
}
</style>