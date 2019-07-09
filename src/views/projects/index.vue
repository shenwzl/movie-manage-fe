<template>
  <div class="dashboard-container">
    <el-button type="primary" @click="createDialog = true">创建新项目</el-button>
    <el-table :data="projects">
      <el-table-column prop="id" label="项目编号" />
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
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleChangeProject(scope.row)">修改</el-button>
          <el-button type="text" @click="handleViewProject(scope.row)">查看</el-button>        
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新建项目" :visible.sync="createDialog">
      <el-form :model="newProject">
        <el-form-item label="项目名称" label-width="120px">
          <el-input v-model="newProject.name" autocomplete="off" />
        </el-form-item>
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
      'getAllStaffs'
    ]),
    handlePageChange(page) {
      this.page = page
      this.getProjects({ page: this.page, page_size: this.pageSize })
    },
    createProject() {
      this.createLoadin = true
      this.saveProjects(this.newProject).then(res => {
        this.createLoading = false
        this.$message.success('添加成功')
        this.createDialog = false
        this.getProjects({ page: this.page, page_size: this.pageSize })
      })
    },
    handleChangeProject(row) {
      window.location.href = `/#/edit/${row.id}`
    },
    handleViewProject(row) {
      window.location.href = `/#/detail/${row.id}`
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
      console.log(id, this.baseInfo)
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
