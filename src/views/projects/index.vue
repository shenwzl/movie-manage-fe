<template>
  <div class="dashboard-container">
    <el-form :model="searchInfo">
      <el-row>
        <el-col :span="5">
          <el-form-item label="项目编号">
            <el-input v-model="searchInfo.sid" style="width: 200px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-form-item label="项目名称">
            <el-input v-model="searchInfo.projectName" style="width: 200px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-form-item label="项目合同主体">
            <el-select v-model="searchInfo.contractId" clearable style="width: 180px;">
              <el-option
                v-for="item in contractSubjects"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="1">
          <el-form-item label="项目执行状态">
            <el-select v-model="searchInfo.state" clearable style="width: 180px;">
              <el-option
                v-for="item in projectState"
                :key="item.state"
                :value="item.state"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button v-if="canCreate" type="primary" @click="createDialog = true">创建新项目</el-button>
    <el-button type="primary" @click="handleSubmit">搜索</el-button>
    <el-table :data="projects">
      <el-table-column prop="sid" label="项目编号" />
      <el-table-column prop="name" label="项目名称" />
      <el-table-column prop="state" label="项目执行状态" width="150">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.state | getStateName(projectState) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="contractSubjectId" label="项目合同主体">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.contractSubjectId | getContractsName(contractSubjects)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="canChangeState || canViewLog || canEdit" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="canChangeState && scope.row.canEdit"
            type="text"
            style="margin-left: 10px;"
            @click="handleStateChange(scope.row)"
          >修改状态</el-button>
          <el-button
            v-if="canViewLog"
            type="text"
            style="margin-left: 34px;"
            @click="handleViewLog(scope.row)"
          >查看日志</el-button>
          <el-button
            v-if="canViewBaseInfo"
            type="text"
            @click="handleViewBase(scope.row)"
          >查看基本信息</el-button>
          <el-button
            v-if="canViewShootingInfo"
            type="text"
            @click="handleViewShooting(scope.row)"
          >查看拍摄费用</el-button>
          <el-button
            v-if="canViewLastInfo"
            type="text"
            @click="handleViewLast(scope.row)"
          >查看后期费用</el-button>
          <el-button
            v-if="canEditBaseInfo && scope.row.canEdit"
            type="text"
            @click="handleChangeBase(scope.row)"
          >编辑基本信息</el-button>
          <el-button
            v-if="canEditShootingInfo && scope.row.canEdit"
            type="text"
            @click="handleChangeShooting(scope.row)"
          >编辑拍摄费用</el-button>
          <el-button
            v-if="canEditLastInfo && scope.row.canEdit"
            type="text"
            @click="handleChangeLast(scope.row)"
          >编辑后期费用</el-button>
          <el-button
            v-if="scope.row.canGrantPermission"
            type="text"
            @click="handleViewUser(scope.row)"
          >分配查看权限</el-button>
          <el-button
            v-if="scope.row.canGrantPermission"
            type="text"
            @click="handleEditUser(scope.row)"
          >分配编辑权限</el-button>
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
    <el-dialog title="分配查看项目用户权限" :visible.sync="viewDialog">
      <el-form ref="viewForms" :model="viewUsers" :rules="userRules">
        <p style="margin-left: 90px;">
          <span style="font-weight: 700;">项目名称</span>
          <span style="margin-left: 10px;">{{ selectedPrjName }}</span>
        </p>
        <el-form-item label="用户" label-width="150px">
          <el-row>
            <el-col :span="24">
              <el-checkbox
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
              >全选</el-checkbox>
              <div style="margin: 15px 0;" />
              <el-row>
                <el-col v-for="user in allUsers" :key="user.id" :span="6">
                  <el-checkbox-group v-model="checkedUsers">
                    <el-checkbox :label="user.id" :disabled="user.id === creatorId">{{
                      user.name
                    }}</el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleViewUsers">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改状态" :visible.sync="changeStateDialog">
      <el-form ref="stateForm" :model="newState" :rules="projectRules">
        <el-row>
          <el-col :span="10">
            <el-form-item prop="state" label="状态" label-width="120px">
              <el-select v-model="newState.newState">
                <el-option
                  v-for="item in projectState"
                  :key="item.state"
                  :value="item.state"
                  :label="item.name"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeStateDialog = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="stateLoading"
          @click="handleChangeState"
        > 确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配编辑项目用户权限" :visible.sync="editDialog">
      <el-form ref="editForms" :model="editUsers" :rules="userRules">
        <p style="margin-left: 90px;">
          <span style="font-weight: 700;">项目名称</span>
          <span style="margin-left: 10px;">{{ selectedPrjName }}</span>
        </p>
        <el-form-item label="用户" label-width="150px">
          <el-row>
            <el-col :span="24">
              <el-checkbox
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
              >全选</el-checkbox>
              <div style="margin: 15px 0;" />
              <el-row>
                <el-col v-for="user in allUsers" :key="user.id" :span="6">
                  <el-checkbox-group v-model="checkedUsers">
                    <el-checkbox :label="user.id" :disabled="user.id === creatorId">{{
                      user.name
                    }}</el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleEditUsers">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePageChange" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { hasPermission } from '@/utils/auth'

export default {
  name: 'Dashboard',
  filters: {
    getContractsName(cId, contracts) {
      if (cId && contracts.length) {
        const contract = contracts.filter(ctr => ctr.id === cId)
        return contract[0].name
      }
      return ''
    },
    getStateName(state, states) {
      if (state && states.length) {
        const cur = states.filter(ctr => ctr.state === state)
        return cur[0].name
      }
      return ''
    }
  },
  data: function() {
    return {
      page: 1,
      pageSize: 10,
      createDialog: false,
      newProject: { name: '' },
      newState: { newState: '' },
      createLoading: false,
      stateLoading: false,
      changeStateDialog: false,
      searchInfo: {
        sid: '',
        projectName: '',
        contractId: '',
        state: ''
      },
      baseInfo: {
        name: '',
        contractSubjectId: 0,
        filmDuration: 3, // 单位：秒
        shootingStartAt: '',
        shootingDuration: '',
        projectMembers: [
          {
            id: 0,
            projectId: 0,
            memberType: '',
            staffId: 0
          }
        ]
      },
      projectRules: {
        name: [{ required: true, message: '名称不能为空' }],
        state: [{ required: true, message: '状态不能为空' }]
      },
      viewDialog: false,
      editDialog: false,
      allUsers: [],
      projectUsers: [],
      selectedPrjName: '',
      isIndeterminate: true,
      checkedUsers: [],
      checkAll: true,
      editUsers: {
        userIds: []
      },
      userRules: {
        userIds: [{ required: true, trigger: 'blur', mesage: '用户不能为空' }]
      },
      selectedPrjId: '',
      creatorId: ''
    }
  },
  computed: {
    ...mapGetters([
      'total',
      'projects',
      'contractSubjects',
      'memberTypes',
      'allStaffs',
      'projectState'
    ]),
    // 内部员工
    insideStaffs() {
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
      return (
        hasPermission('project_base_info', 'view') ||
        hasPermission('project_shooting_info', 'view') ||
        hasPermission('project_last_state_info', 'view')
      )
    },
    canEdit() {
      return (
        hasPermission('project_base_info', 'manage') ||
        hasPermission('project_shooting_info', 'manage') ||
        hasPermission('project_last_state_info', 'manage')
      )
    },
    canViewLog() {
      return (
        hasPermission('project_base_info_history', 'view') ||
        hasPermission('project_shooting_info_history', 'view') ||
        hasPermission('project_last_state_info_history', 'view')
      )
    },
    canEditBaseInfo() {
      return hasPermission('project_base_info', 'manage')
    },
    canEditShootingInfo() {
      return hasPermission('project_shooting_info', 'manage')
    },
    canEditLastInfo() {
      return hasPermission('project_last_state_info', 'manage')
    },
    canViewBaseInfo() {
      return hasPermission('project_base_info', 'view')
    },
    canViewShootingInfo() {
      return hasPermission('project_shooting_info', 'view')
    },
    canViewLastInfo() {
      return hasPermission('project_last_state_info', 'view')
    }
  },
  beforeMount() {
    this.getProjectState()
    this.getAllStaffs()
    this.getMemberTypes()
    this.getContractSubjects().then(res => {
      this.getProjects({ page: this.page, pageSize: this.pageSize, ...this.searchInfo })
    })
    this.getAllUsers().then(res => {
      console.log(res)
      this.allUsers = res.data
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
      'recoverProject',
      'getProjectState',
      'updateState',
      'getProjectUser',
      'getAllUsers',
      'editProjectUser'
    ]),
    handleCheckAllChange(val) {
      this.checkedUsers = val ? this.allUsers.map(permission => permission.id) : []
      this.isIndeterminate = false
    },
    handleViewUser(row) {
      this.creatorId = row.creatorId
      this.getProjectUser({ id: row.id, type: 1 }).then(res => {
        this.viewDialog = true
        this.selectedPrjName = row.name
        this.selectedPrjId = row.id
        this.checkedUsers = res.data.map(item => item.userId)
        this.checkedUsers.push(row.creatorId)
      })
    },
    handleEditUser(row) {
      this.creatorId = row.creatorId
      this.getProjectUser({ id: row.id, type: 2 }).then(res => {
        this.editDialog = true
        this.selectedPrjName = row.name
        this.selectedPrjId = row.id
        this.checkedUsers = res.data.map(item => item.userId)
        this.checkedUsers.push(row.creatorId)
      })
    },
    handleSubmit() {
      this.getProjects({ page: this.page, pageSize: this.pageSize, ...this.searchInfo })
    },
    handlePageChange(page) {
      this.page = page
      this.getProjects({ page: this.page, pageSize: this.pageSize, ...this.searchInfo })
    },
    createProject() {
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.createLoading = true
          this.saveProjects(this.newProject).then(res => {
            this.createLoading = false
            this.$message.success('添加成功')
            this.createDialog = false
            this.getProjects({ page: this.page, pageSize: this.pageSize })
          })
        }
      })
    },
    handleChangeBase(row) {
      window.location.href = `/#/edit/${row.id}/1`
    },
    handleViewBase(row) {
      window.location.href = `/#/detail/${row.id}/1`
    },
    handleChangeShooting(row) {
      window.location.href = `/#/edit/${row.id}/2`
    },
    handleViewShooting(row) {
      window.location.href = `/#/detail/${row.id}/2`
    },
    handleChangeLast(row) {
      window.location.href = `/#/edit/${row.id}/3`
    },
    handleViewLast(row) {
      window.location.href = `/#/detail/${row.id}/3`
    },
    handleViewLog(row) {
      window.location.href = `/#/log/${row.id}`
    },
    handleViewUsers() {
      this.editProjectUser({
        id: this.selectedPrjId,
        permissionType: 1,
        userIds: this.checkedUsers
      }).then(res => {
        this.$message.success('分配查看用户权限成功')
        this.viewDialog = false
      })
    },
    handleEditUsers() {
      this.editProjectUser({
        id: this.selectedPrjId,
        permissionType: 2,
        userIds: this.checkedUsers
      }).then(res => {
        this.$message.success('分配编辑用户权限成功')
        this.editDialog = false
      })
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
      this.changeStateDialog = true
      this.newState = {
        id: row.id,
        state: row.state
      }
    },
    handleChangeState() {
      this.stateLoading = true
      this.updateState(this.newState).then(res => {
        this.$message.success('更新成功')
        this.stateLoading = false
        this.changeStateDialog = false
        this.getProjects({ page: this.page, pageSize: this.pageSize })
      })
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
