<template>
  <div class="dashboard-container">
    <el-form>
      <el-row>
        <el-col :span="6">
          <el-form-item label="操作对象">
            <el-select v-model="targetType">
              <el-option
                v-for="target in targetArr"
                :key="target.id"
                :value="target.id"
                :label='target.label'
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="logs">
      <el-table-column prop="id" label="操作id" />
      <el-table-column prop="operatorId" label="操作人id" />
      <el-table-column prop="operatorName" label="操作人" />
      <el-table-column prop="operationInfo" label="操作记录">
        <template slot-scope="scope">
          <p v-for="(item, i) in scope.row.operationInfo.split(/\r\n|\n\r|\r|\\n|\n/g)" :key="i">
            {{item}}
          </p>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { hasPermission } from '@/utils/auth'
export default {
  name: 'Dashboard',
  data: function() {
    return {
      page: 1,
      pageSize: 10,
      targetType: '',
      targetArr: [],
      projects: []
    }
  },
  computed: {
    ...mapGetters([
      'total',
      'logs'
    ]),
    pId() {
      return this.$route.params.projectId
    },
    hasBaseHistoryView() {
      return hasPermission('project_base_info_history', 'view')
    },
    hasShootingHistoryView() {
      return hasPermission('project_shooting_info_history', 'view')
    },
    hasLastStateHistoryView() {
      return hasPermission('project_last_state_info_history', 'view')
    }
  },
  beforeMount() {
    if (this.hasBaseHistoryView) {
      this.targetArr.push({ id: 1, label: '基础信息' })
    }
    if (this.hasShootingHistoryView) {
      this.targetArr.push({ id: 2, label: '拍摄费用' })
    }
    if (this.hasLastStateHistoryView) {
      this.targetArr.push({ id: 3, label: '后期费用' })
    }
    // this.getLogs({ page: this.page, page_size: this.pageSize, target_id: this.pId, target_type: this.targetType })
    
  },
  methods: {
    ...mapActions([
      'getLogs',
      'getAllProjects'
    ]),
    handlePageChange(page) {
      this.page = page
      this.getLogs({ page: this.page, page_size: this.pageSize, target_id: this.pId, target_type: this.targetType })
    },
    onSearch() {
      this.getLogs({ page: 1, page_size: 10, target_id: this.pId, target_type: this.targetType })
    }
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
.el-pagination {
  text-align: right;
  margin-top: 20px;
}
</style>
