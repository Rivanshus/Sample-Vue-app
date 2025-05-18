<template>
    <div>
        <h2>Task List</h2>
        <Button label="Add Task" icon="pi pi-plus" @click="showDialog = true" class="custom-button" />
        
        <!-- Tasks table -->
         <DataTable :value="tasks" tableStyle="min-width: 50rem" showGridlines class="custom-table">
            <Column field="title" header="Title" class="column-spacing" />
            <Column field="description" header="Description" class="column-spacing"  />
            <Column field="priority" header="Priority" bodyClass="text-center" class="column-spacing" />
            <Column field="status" header="Status" bodyClass="text-center" class="column-spacing" />
            <!-- <Column header="Actions" :body="actionTemplate" bodyStyle="text-align:center" /> -->
                <Column header="Actions" bodyClass="text-center" class="column-spacing">
                    <template #body="slotProps">
                        <Button 
                            icon="pi pi-pencil" 
                            class="editDeleteBtn" 
                            @click="editTask(slotProps.data, slotProps.index, slotProps)" 
                        />
                        <Button 
                            icon="pi pi-trash" 
                            class="editDeleteBtn" 
                            @click="deleteTask(slotProps.index)" 
                        />
                    </template>
                </Column>
        </DataTable>

         <Dialog header="Task" v-model:visible="showDialog" modal >
            <div class="dialog-content">
                <label>Title: </label>
                <InputText v-model="task.title" required class="InputBox" />
                <label>Description: </label>
                <InputText v-model="task.description" class="InputBox" />
                <label>Priority: </label>
                <Dropdown v-model="task.priority" :options="priorities" />
                <label>Status: </label>
                <Dropdown v-model="task.status" :options="statuses" />
                <Button label="Save" @click="saveTask" class="custom-button" />
            </div>
         </Dialog>
    
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import {h} from 'vue' ;

// To-do task items 
const tasks = ref([
    {title: 'Buy Groceries', description: 'Need to buy tomatoes and cauliflower', priority: 'Medium', status: 'Pending'}
]) ;

// Defining Dropdown options 
const priorities = ['Low', 'Medium', 'High']
const statuses = ['Pending', 'Done']

const showDialog = ref(false)
const task = ref({title: '', description: '', priority: 'Medium', status: 'Pending'})
const editingIndex = ref(null)


// creating function to save a task upon edit or create a new one
function saveTask(){
    if(!task.value.title){
        return alert('Title is required')
    }
    else if(editingIndex.value !== null){           // If existing task is going to be edited
        tasks.value[editingIndex.value] = task.value
    }
    else{
        tasks.value.push(task.value) 
    }

    // resetting the properties once the task is saved
    showDialog.value = false
    task.value = {title:'', description:'', priority:'Low', status:'Pending'}
    editingIndex.value = null 
}

// edit task 
function editTask(rowData, index, slotProps){
    console.log("SlotProps: " ,slotProps) ;
    task.value = {...rowData}
    editingIndex.value = index
    showDialog.value = true
}

// delete a task
function deleteTask(index){
    tasks.value.splice(index,1) 
}

// A custom template for edit and delete a task
const actionTemplate = (rowData, {rowIndex}) =>{
    return h('div', [
        h('Button' , {
            icon: 'pi pi-pencil',
            onClick: () =>  editTask(rowData,rowIndex)
        }),
        h('Button' , {
            icon: 'pi pi-trash',
            onClick: () =>  deleteTask(rowIndex)
        }),
    ]
    )
}

</script>

<style scoped>

.column-spacing{
  padding-left: 10px !important;
  padding-right: 10px !important;
}

.InputBox{
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  outline:none;
  transition: border 0.3s, box-shadow 0.3s;
}

.InputBox:focus {
  border-color: #007ad9;
  box-shadow: 0 0 4px rgba(0, 122, 217, 0.5);
}

.editDeleteBtn{
    margin: 0px 10px;
}


.custom-button {
  width:fit-content;
  margin: 10px 0px ;
  padding: 6px 16px;
  font-size: 14px;
  background-color: #007ad9;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
  text-align: center;
  align-self: center;
}

.custom-button:hover {
  background-color: #005fa3 !important;
  color: white !important;
}

.custom-button:focus{
    outline: none;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding:20px 30px;
  width: 500px;
  background-color: rgb(65, 63, 63);
  color: white;
}
</style>