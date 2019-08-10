<template>
  <el-select v-model="model" :multiple="model === 0 ? false : true">
    <el-option :value="0" label="全部"></el-option>
    <el-option v-for="list in lists" :key="list.id" :value="list.id" :label="list.name"></el-option>
  </el-select>
</template>

<script>
export default {
  props: ['model', 'lists'],
  methods: {
    onChange
  }
}
</script>

