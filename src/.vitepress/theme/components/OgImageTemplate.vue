<script setup lang="ts">
defineProps<{ title: string, description?: string, dir?: string }>()
</script>

<template>
  <div
    style="display: flex; flex-direction: column; width: 1200px; height: 628px; background-color: white;"
  >
    <div style="display: flex; flex-direction: column; padding: 40px; flex-grow: 1; justify-content: center;">
      <div style="display: flex; font-size: 80px; font-weight: bold; color: #111827;">
        {{ title }}
      </div>
      <div v-if="description" style="display: flex; font-size: 40px; color: #4b5563; margin-top: 20px;">
        {{ description }}
      </div>
    </div>
    <div style="display: flex; height: 20px; background-color: #10b981; width: 100%;" />
  </div>
</template>
