<template>
  <div class="app-container">
    <el-button type="primary" @click="createUserDialog = true">创建用户</el-button>
    <el-table :data="users">
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="name" label="用户名" />
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.state === 0 ? '正常' : '禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="handleStateChange(scope.row)">{{ scope.row.state ? '恢复' : '禁用' }}</el-button>
          <el-button type="text" size="small" @click="resetPwdDialog(scope.row)">重置密码</el-button>
          <el-button type="text" size="small" @click="handleRoleChange(scope.row)">修改角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="创建用户" :visible.sync="createUserDialog">
      <el-form :model="newUser">
        <el-form-item label="邮箱" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newUser.email" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="密码" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newUser.password" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createUserDialog = false">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="createUser">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="重置密码" :visible.sync="resetDialog">
      <el-form :model="resetPwdModel">
        <el-form-item label="新密码" label-width="120px">
          <el-input v-model="resetPwdModel.password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetDialog = false">取 消</el-button>
        <el-button type="primary" :loading="resetLoading" @click="setPassword">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="绑定角色" :visible.sync="bindRoleDialog">
      <el-form>
        <el-form-item label="新角色" label-width="120px">
          <el-select multiple v-model="newRole" autocomplete="off">
            <el-option v-for="role in allRoles" :key="role.id" :label="role.name" :value="role.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bindRoleDialog = false">取 消</el-button>
        <el-button type="primary" :loading="bindRoleLoading" @click="bindRole">确 定</el-button>
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
// import 
export default {
  data: function() {
    return {
      newUser: {
        email: '',
        password: ''
      },
      resetPwdModel: {
        userId: '',
        password: ''
      },
      createUserDialog: false,
      resetDialog: false,
      permissionInfo: 0,
      page: 1,
      pageSize: 10,
      createLoading: false,
      resetLoading: false,
      userRole: '',
      bindRoleDialog: false,
      newRole: [],
      bindRoleLoading: false,
      choosenUser: 0
    }
  },
  computed: {
    ...mapGetters(['users', 'total', 'allRoles'])
  },
  beforeMount() {
    this.getAllUser({ page: this.page, pageSize: this.pageSize })
    this.getAllRoles().then(res => this.allRoles)
  },
  methods: {
    ...mapActions([
      'getAllUser',
      'addUser',
      'resetPwd',
      'deleteUser',
      'recoverUser',
      'getAllRoles',
      'getRoleByUser',
      'updateRole'
    ]),
    handleDelete(row) {
      console.log(row)
    },
    setPermission() {
    },
    createUser() {
      this.createLoading = true
      this.addUser(this.newUser).then(res => {
        this.createUserDialog = false
        this.getAllUser({ page: this.page, pageSize: this.pageSize })
        this.newUser = {}
      }).finally(() => this.createLoading = false)
    },
    handlePageChange(page) {
      this.page = page
      this.getAllUser({ page: this.page, pageSize: this.pageSize })
    },
    resetPwdDialog(row) {
      this.resetDialog = true
      this.resetPwdModel = { userId: row.id, password: '' }
    },
    setPassword() {
      this.resetLoading = true
      this.resetPwd(this.resetPwdModel).then(res => {
        this.$message.success('更新成功')
        this.resetDialog = false
      }).finally(() => this.resetLoading = false)
    },
    handleStateChange(row) {
      if (!row.state) {
        this.deleteUser(row.id).then(res => {
          this.$message.success('更新成功')
          this.getAllUser({ page: this.page, pageSize: this.pageSize })
        })
      } else {
        this.recoverUser(row.id).then(res => {
          this.$message.success('更新成功')
          this.getAllUser({ page: this.page, pageSize: this.pageSize })
        })
      }
    },
    handleRoleChange(row) {
      this.choosenUser = row.id
      this.getRoleByUser(row.id).then(res => {
        this.newRole = res.data
        this.bindRoleDialog = true
      })
    },
    bindRole() {
      this.bindRoleLoading = true
      this.updateRole({ role: this.newRole, id: this.choosenUser }).then(
        res => {
          this.bindRoleLoading = false
          this.bindRoleDialog = false
          this.getAllUser({ page: this.page, pageSize: this.pageSize })
          this.newRole = []
        }
      )
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
