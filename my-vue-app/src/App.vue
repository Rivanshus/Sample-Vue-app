<template>
  <div class="p-m-4">
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

