<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Rating from 'primevue/rating';
// import IconField from 'primevue/iconfield';
// import InputText from 'primevue/inputtext';
// import InputIcon from 'primevue/inputicon';
import { computed, ref} from 'vue';

const props = defineProps({
    comments: {
        type: Object,
        required: true
    },
    eventLinked: {
        type: Boolean,
        required: true
    }
})

const filters = ref({
    username: '',
    text: '',
    rating: null
});

const filteredComments = computed(() => { // ADD ADVANCED FUNCTIONALITY TO SPECIFY CASE SENSIIVITY AND GREATER THAN, LESS THAN, AND EQUAL TO LATER
    try {
        if (props.comments.length == 0) {
            return [];
        } else if (filters.value.rating == null || filters.value.rating == '') {
            return props.comments.filter((obj) => 
            obj.username.includes(filters.value.username) && 
            obj.text.includes(filters.value.text))
        } else {
            return props.comments.filter((obj) => 
            obj.username.includes(filters.value.username) && 
            obj.text.includes(filters.value.text) &&
            obj.rating == filters.value.rating) // BASIC FUNCTIONALITY TO SEARCH FOR A SPECIFIC RATING
        }  
    } catch (error) {
        console.error("Failed to compute Filtered Comments: ", error)
        return []
    }
    
}); 
</script>



<template>
    <div v-if="props.eventLinked" class="row mt-2">
        <DataTable 
            :value="filteredComments" 
            table-style="min-width: 50rem" 
            removableSort 
            paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
            <template #empty> No comments found </template>
            <Column field="username" header="username" sortable>
                <template #header>
                    <input 
                        type="text" 
                        v-model="filters.username" 
                        placeholder="Search by Username"/>
                </template>
            </Column>
            <Column field="text">
                <template #header>
                    <input
                    type="text"
                    v-model="filters.text"
                    placeholder="Search by Comment"/>
                </template>
            </Column>
            <Column field="rating" header="rating" sortable>
                <template #body="slotProps">
                    <Rating :modelValue="slotProps.data.rating" readonly />
                </template>
                <template #header>
                    <input 
                        type="number" 
                        v-model="filters.rating" 
                        placeholder="Search by rating"/>
                </template>
            </Column>
        </DataTable>
    </div>


    <!-- Doesn't include rating section  -->
    <div v-if="!props.eventLinked"> 
        <DataTable 
            :value="filteredComments" 
            table-style="min-width: 50rem" 
            removableSort 
            paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
            <template #empty> No comments found </template>
            <Column field="username" header="username" sortable>
                <template #header>
                    <input 
                        type="text" 
                        v-model="filters.username" 
                        placeholder="Search by Username"/>
                </template>
            </Column>
            <Column field="text">
                <template #header>
                    <input
                    type="text"
                    v-model="filters.text"
                    placeholder="Search by Comment"/>
                </template>
            </Column>
        </DataTable>
    </div>
</template>