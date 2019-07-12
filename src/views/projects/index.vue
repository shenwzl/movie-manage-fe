<template>
  <div class="dashboard-container">
    <el-button v-if="canCreate" type="primary" @click="createDialog = true">创建新项目</el-button>
    <el-table :data="projects">
      <el-table-column prop="id" label="项目编号">
        <template slot-scope="scope">
          <a v-if="canView" style="color: #409EFF;" :href="'/#/detail/' + scope.row.id">{{ scope.row.id }}</a>
          <span v-else>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="项目名称" />
      <el-table-column prop="state" label="项目执行状态" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.state === 0 ? '正常' : '禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="contractSubjectId" label="项目合同主体">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.contractSubjectId | getContractsName(contractSubjects) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="canChangeState || canView || canEdit" label="操作">
        <template slot-scope="scope">
          <el-button type="text" v-if="canEdit" @click="handleChangeProject(scope.row)">修改</el-button>
          <el-button type="text" v-if="canChangeState" @click="handleStateChange(scope.row)">{{ scope.row.state === 0 ? '禁用' : '恢复' }}</el-button>
          <el-button type="text" v-if="canViewLog" @click="handleViewLog(scope.row)">查看日志</el-button>        
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新建项目" :visible.sync="createDialog">
      <el-form ref="createForm" :model="newProject" :rules="projectRules">
        <el-row>
          <el-col :span="10">
            <el-form-item prop="name" label="项目名称" label-width="120px">
              <el-input v-model="newProject.name" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createDialog = false">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="createProject">确 定</el-button>
      </div>
    </el-dialog>
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
      createDialog: false,
      newProject: { name: '' },
      createLoading: false,
      editDialog: false,
      editLoading: false,
      baseInfo: {
        name: '',
        contractSubjectId: 0,
        filmDuration: 3, // 单位：秒
        shootingStartAt: '',
        shootingDuration: '',
        projectMembers: [{
          id: 0,
          projectId: 0,
          memberType: '',
          staffId: 0
        }]
      },
      projectName: {
        name: [{ required: true, message: '名称不能为空' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'total',
      'projects',
      'contractSubjects',
      'memberTypes',
      'allStaffs'
    ]),
    // 内部员工
    insideStaffs() {
      console.log(this.allStaffs.filter(staff => staff.ascription === 1))
      return this.allStaffs.filter(staff => staff.ascription === 1)
    },
    // 外部员工
    externalStaffs() {
      return this.allStaffs.filter(staff => staff.ascription === 2)
    },
    canCreate() {
      return hasPermission('project', 'manage')
    },
    canChangeState() {
      return hasPermission('project_state', 'manage')
    },
    canView() {
      return hasPermission('project_base_info', 'view') || hasPermission('project_shooting_info', 'view') || hasPermission('project_last_state_info', 'view')
    },
    canEdit() {
      return hasPermission('project_base_info', 'manage') || hasPermission('project_shooting_info', 'manage') || hasPermission('project_last_state_info', 'manage')      
    },
    canViewLog() {
      return hasPermission('project_base_info_history', 'view') || hasPermission('project_shooting_info_history', 'view') || hasPermission('project_last_state_info_history', 'view')
    }
  },
  filters: {
    getContractsName(cId, contracts) {
      if (cId && contracts.length) {
        const contract = contracts.filter(ctr => ctr.id === cId)
        return contract[0].name
      }
      return ''
    }
  },
  beforeMount() {
    this.getAllStaffs()
    this.getMemberTypes()
    this.getContractSubjects().then(res => {
      this.getProjects({ page: this.page, page_size: this.pageSize })
    })
  },
  methods: {
    ...mapActions([
      'getProjects',
      'getContractSubjects',
      'saveProjects',
      'getMemberTypes',
      'getAllStaffs',
      'deleteProject',
      'recoverProject'
    ]),
    handlePageChange(page) {
      this.page = page
      this.getProjects({ page: this.page, page_size: this.pageSize })
    },
    createProject() {
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.createLoading = true
          this.saveProjects(this.newProject).then(res => {
            this.createLoading = false
            this.$message.success('添加成功')
            this.createDialog = false
            this.getProjects({ page: this.page, page_size: this.pageSize })
          })
        }
      })
    },
    handleChangeProject(row) {
      window.location.href = `/#/edit/${row.id}`
    },
    handleViewLog(row) {
      window.location.href = `/#/log/${row.id}`
    },
    editProject() {
    },
    addMemberType(id) {
      this.baseInfo.projectMembers.push({
        id: 0,
        projectId: 0,
        memberType: id,
        staffId: 0,
        ascriptionType: 1
      })
    },
    handleStateChange(row) {
      if (!row.state) {
        this.deleteProject(row.id).then(res => {
          this.$message.success('更新成功')
          this.getProjects({ page: this.page, page_size: this.pageSize })
        })
      } else {
        this.recoverProject(row.id).then(res => {
          this.$message.success('更新成功')
          this.getProjects({ page: this.page, page_size: this.pageSize })
        })
      }
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
