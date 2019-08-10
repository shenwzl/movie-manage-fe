<template>
  <div class="app-container">
    <el-button type="primary" v-if="canEdit" @click="createRoleDialog = true">创建新角色</el-button>
    <el-table :data="roles">
      <el-table-column prop="id" label="角色id" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="createdAt" label="创建时间" />
      <el-table-column v-if="canEdit" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="handleChange(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="isEdit ? '修改角色' : '新增角色'"
      :visible.sync="createRoleDialog"
    >
      <el-form ref="createForm" :model="newRole" :rules="roleRules">
        <el-form-item prop="name" label="名称" label-width="150px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newRole.name" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="权限" label-width="150px">
          <el-row>
            <el-col :span="24">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedPermissions">
                <el-checkbox 
                  v-for="permission in allPermissions"
                  :label="permission.id"
                  :key="permission.id"
                >
                  {{ permission.desc }}
                </el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createRoleDialog = false">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="createRole">确 定</el-button>
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
      // Roles: [
      //   {
      //     id: '1',
      //     name: '111',
      //     cellphone: '12345',
      //     ascription: 1,
      //     state: 1
      //   }
      // ],
      newRole: {
        name: ''
      },
      createRoleDialog: false,
      permissionDialog: false,
      permissionInfo: 0,
      page: 1,
      pageSize: 10,
      isEdit: false,
      createLoading: false,
      isIndeterminate: true,
      checkedPermissions: [],
      checkAll: true,
      roleRules: {
        name: [{ required: true, message: '名称不能为空' }]
      }
    }
  },
  computed: {
    ...mapGetters(['roles', 'total', 'allPermissions']),
    canEdit() {
      return hasPermission('role', 'manage')
    }
  },
  beforeMount() {
    this.getRoles({ page: this.page, pageSize: this.pageSize })
    this.getAllPermissions()
  },
  methods: {
    ...mapActions([
      'getRoles',
      'addRole',
      'getAllPermissions',
      'getRolePermission',
      'updatePermission'
    ]),
    handleChange(row) {
      this.getRolePermission(row.id).then(res => {
        this.newRole = row
        this.isEdit = true
        this.createRoleDialog = true
        this.checkedPermissions = res.data.map(item => item.id)
      })
    },
    setPermission() {
    },
    createRole() {
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.createLoading = true
          if (this.isEdit) {
            this.updatePermission({ checkedPermissions: this.checkedPermissions, id: this.newRole.id }).then(res => {
              this.createRoleDialog = false
              this.getRoles({ page: this.page, pageSize: this.pageSize })
              this.createLoading = false
              this.isEdit = false
              this.newRole = {}
              this.$message.success('更新成功')
            })
          } else {
            this.addRole(this.newRole).then(
              res => {
                this.updatePermission({ checkedPermissions: this.checkedPermissions, id: res.data }).then(res => {
                  this.createRoleDialog = false
                  this.getRoles({ page: this.page, pageSize: this.pageSize })
                  this.createLoading = false
                  this.isEdit = false
                  this.$message.success('添加成功')
                  this.newRole = {}
                })
              }
            )
          }
        }
      })
    },
    handlePageChange(page) {
      this.page = page
      this.getRoles({ page: this.page, pageSize: this.pageSize })
    },
    handleStateChange(row) {},
    handleCheckAllChange(val) {
      this.checkedPermissions = val ? this.allPermissions.map(permission => permission.id) : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allPermissions.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.allPermissions.length;
    }
  }
}
</script>

<style scoped>
.el-pagination {
  text-align: right;
  margin-top: 20px;
}
.el-checkbox {
  width: 200px;
}
</style>
