<template>
  <div>
    <h2>Users List</h2>
    <ProgressSpinner v-if="loading" class="custom-spinner" role="status" aria-live="polite" />
    <DataTable :value="users" showGridlines class="custom-table" v-else>
      <Column field="name" header="Name" class="column-spacing"  />
      <Column field="email" header="Email" class="column-spacing" />
      <Column field="company.name" header="Company Name" class="column-spacing" />
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ProgressSpinner from 'primevue/progressspinner'

const users = ref([])
const loading = ref(true)

// just like UseEffect in React, It will run once the content is loaded. 
onMounted(async () => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    // Checking response from API
    console.log("Response from API:" , res.data)
    users.value = res.data
  } catch (e) {
    console.error('API error:', e)
  } finally {
    loading.value = false
  }
})
</script>

<style>
.column-spacing{
  padding-left: 10px !important;
  padding-right: 10px !important;
}

.p-progressspinner-spin{  
  fill: transparent;
  color: red;
  width: 50px;
  height: 50px;
}

.custom-spinner .p-progress-spinner-circle {
  stroke: #42b983; /* any desired color */
}


.custom-table thead th {
  background-color: #034272;  /* Primary color */
  color: white;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.p-progressspinner-circle {
  stroke: #007ad9 !important;  /* or any color you want */
}
</style>