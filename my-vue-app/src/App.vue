<template>
  <div class="p-m-4 componentsContainer">
      <UserTable />
      <br>
      <hr/>
      <RoleForm />
      <br>
      <hr/>
      <TaskListTemp />
  </div>
</template>


<script setup>
import UserTable from './components/UserTable.vue'
import RoleForm from './components/RoleForm.vue';
import TaskListTemp from './components/TaskListTemp.vue';
</script>

<style scoped>
.componentsContainer{
  display: flex;
  flex-direction: column;
  gap: 22px;
}

hr {
  border: none;
  height: 2px;
  background-color: #ccc; /* or any color you prefer */
  width: 100%;
  margin: 20px 0;
}
</style>

