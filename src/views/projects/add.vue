<template>
  <div class="app-container">
    <BasicInfo />
    <ProjectDetail />
    <ProjectLater />
  </div>
</template>

<script>
import BasicInfo from '../form/basic-info'
import ProjectDetail from '../form/project-detail'
import ProjectLater from '../form/project-later'
export default {
  components: { BasicInfo, ProjectDetail, ProjectLater }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

