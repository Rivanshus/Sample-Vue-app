<template>
    <div>
        <h2>Add Role</h2>
        <form @submit.prevent="submit" class="form-container">
            <div class="inputContainer">
                <label for="role">Role Name: </label>
                <InputText v-model="role" id="role"/>
            </div>
            
            <!-- displaying error message for the form validation -->
            <div v-if="error" class="error-text"> {{ error }} </div>
            
            <Button label="Add role" type="submit" class="custom-button"/>
            <Message v-if="success" severity="success" class="success-message">Role Added !</Message>
        </form>
        
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';

const role = ref('') 
const success = ref(false) 
const error = ref('') 
const roles = ref([]) // Array to store created roles

// logic for form submission
function submit(){
    error.value = '' 
    success.value = false

    // Role name must contains atleast 3 letters
    if(role.value.length < 3){
        error.value = 'Role name must contain at least 3 characters'
        return
    }

    console.log("Role added: ", role.value)
    // Add newly created role to the list 
    roles.value.push(role.value)
    console.log("Roles: ", roles.value) ;
    role.value = '' // clear input field
    success.value = true

    setTimeout(() => {
        success.value = false
    }, 1000)
}

</script>

<style scoped>
/* Style the input */
#role{
  width: 60%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  outline:none;
  transition: border 0.3s, box-shadow 0.3s;
}

#role:focus {
  border-color: #007ad9;
  box-shadow: 0 0 4px rgba(0, 122, 217, 0.5);
}

.error-text {
  color: #d32f2f;
  font-size: 13px;
  margin-top: 4px;
}

/* button styling */
.custom-button {
width:fit-content;
  margin-top: 10px;
  padding: 6px 16px;
  font-size: 14px;
  background-color: #007ad9;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
  
}

.custom-button:hover {
  background-color: #005fa3 !important;
  color: white !important;
}

.custom-button:focus{
    outline: none;
}

.success-message {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 300px;
  border: none;
  outline: none;
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Add space between elements */
}

</style>