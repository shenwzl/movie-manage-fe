<template>
  <div class="dashboard-container">
    <el-table>
      <el-table-column prop="sid" label="项目编号" />
      <el-table-column prop="name" label="项目名称" />
      <el-table-column prop="state" label="项目执行状态" width="150" />
      <el-table-column prop="sid" label="所属公司-一级" width="150" />
      <el-table-column prop="sid" label="所属公司-二级" width="150" />
      <el-table-column prop="contractAmount" label="项目合同金额" width="150" />
      <el-table-column prop="sid" label="项目成本金额" width="150" />
      <el-table-column prop="sid" label="项目预算金额" width="150" />
      <el-table-column prop="sid" label="制片" />
      <el-table-column prop="sid" label="导演" />
      <el-table-column prop="sid" label="拍摄开始时间" width="150" />
      <el-table-column prop="sid" label="拍摄周期" />
      <el-table-column prop="sid" label="成片时长" />
      <el-table-column prop="sid" label="前期制片费" width="150" />
      <el-table-column prop="sid" label="人工费" />
      <el-table-column prop="sid" label="器材费" />
      <el-table-column prop="sid" label="场地及搭景" width="150" />
      <el-table-column prop="sid" label="道具服装费" width="150" />
      <el-table-column prop="sid" label="演员费" />
      <el-table-column prop="sid" label="交通及膳宿费" width="150" />
      <el-table-column prop="sid" label="超时费" />
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
