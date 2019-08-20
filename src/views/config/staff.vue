<template>
  <div class="app-container">
    <el-button type="primary" v-if="canEdit" @click="createStaffDialog = true; newStaff = {}">创建新员工</el-button>
    <el-table :data="staffs">
      <el-table-column prop="id" label="员工id" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="cellphone" label="电话" />
      <el-table-column prop="ascription" label="员工类型">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.ascription === 1 ? '内部员工' : '外部员工' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.state === 0 ? '正常' : '禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="canEdit" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="handleChange(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="handleStateChange(scope.row)">{{ scope.row.state ? '恢复' : '禁用' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="isEdit ? '修改员工信息' : '新增员工'"
      :visible.sync="createStaffDialog"
    >
      <el-form ref="createForm" :model="newStaff" :rules="staffRules">
        <el-form-item prop="name" label="姓名" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newStaff.name" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="cellphone" label="电话" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newStaff.cellphone" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="ascription" label="员工类型" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-select v-model="newStaff.ascription" autocomplete="off">
                <el-option label="内部员工" :value="1" />
                <el-option label="外部员工" :value="2" />
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createStaffDialog = false">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="saveStaff">确 定</el-button>
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
import { mapActions, mapGetters } from 'vuex'
import { hasPermission } from '@/utils/auth'
export default {
  data: function() {
    return {
      newStaff: {
        name: '',
        cellphone: '',
        ascription: ''
      },
      createStaffDialog: false,
      permissionDialog: false,
      permissionInfo: 0,
      page: 1,
      pageSize: 10,
      isEdit: false,
      createLoading: false,
      staffRules: {
        name: [{ required: true, message: '名称不能为空' }],
        cellphone: [{ required: true, message: '电话不能为空' }],
        ascription: [{ required: true, message: '员工类型不能为空' }],
      }
    }
  },
  computed: {
    ...mapGetters(['staffs', 'total']),
    canEdit() {
      return hasPermission('staff', 'manage')
    }
  },
  beforeMount() {
    this.getStaffs({ page: this.page, pageSize: this.pageSize })
  },
  methods: {
    ...mapActions([
      'getStaffs',
      'addStaff',
      'updateStaff',
      'deleteStaff',
      'recoverStaff'
    ]),
    handleChange(row) {
      this.newStaff = row
      this.isEdit = true
      this.createStaffDialog = true
    },
    setPermission() {
    },
    saveStaff(){
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.createLoading = true
          if (this.isEdit){
            this.editStaff()
          }else{
            this.createStaff()
          }
        }
      })
    },
    createStaff() {
      this.addStaff(this.newStaff).then(res => {
        this.$message.success('添加成功')
        this.resetPage()
      })
    },
    editStaff() {
      this.updateStaff(this.newStaff).then(res => {
        this.$message.success('更新成功')
        this.resetPage()
      })
    },
    resetPage() {
      this.createStaffDialog = false
      this.createLoading = false
      this.isEdit = false
      this.newStaff = {}
      this.getStaffs({ page: this.page, pageSize: this.pageSize })
    },
    handlePageChange(page) {
      this.page = page
      this.getStaffs({ page: this.page, pageSize: this.pageSize })
    },
    handleStateChange(row) {
      if (!row.state) {
        this.deleteStaff(row.id).then(res => {
          this.$message.success('更新成功')
          this.getStaffs({ page: this.page, pageSize: this.pageSize })
        })
      } else {
        this.recoverStaff(row.id).then(res => {
          this.$message.success('更新成功')
          this.getStaffs({ page: this.page, pageSize: this.pageSize })
        })
      }
    }
  }
}
</script>

<style scoped>
.el-pagination {
  text-align: right;
  margin-top: 20px;
}
</style>
