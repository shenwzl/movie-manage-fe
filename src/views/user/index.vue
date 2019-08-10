<template>
  <div class="app-container">
    <el-button v-if="canEdit" type="primary" @click="createUserDialog = true">创建用户</el-button>
    <el-table :data="users">
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="name" label="用户名" />
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.state === 0 ? '正常' : '禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="canEdit || canGrant">
        <template slot-scope="scope">
          <el-button v-if="canEdit" size="small" type="text" @click="handleStateChange(scope.row)">{{ scope.row.state ? '恢复' : '禁用' }}</el-button>
          <el-button v-if="canEdit" type="text" size="small" @click="resetPwdDialog(scope.row)">重置密码</el-button>
          <el-button v-if="canGrant" type="text" size="small" @click="handleRoleChange(scope.row)">修改角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="创建用户" :visible.sync="createUserDialog">
      <el-form ref="createForm" :model="newUser" :rules="newUserRules">
        <el-form-item prop="email" label="邮箱" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newUser.email" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="name" label="用户名" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newUser.name" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="cellphone" label="电话" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newUser.cellphone" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="password" label="密码" label-width="200px">
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
      <el-form ref="resetForm" :model="resetPwdModel" :rules="resetRules">
        <el-form-item prop="password" label="新密码" label-width="120px">
          <el-input v-model="resetPwdModel.password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetDialog = false">取 消</el-button>
        <el-button type="primary" :loading="resetLoading" @click="setPassword">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="绑定角色" :visible.sync="bindRoleDialog">
      <el-form ref="bindForm" :rules="bindRules">
        <el-form-item prop="role" label="新角色" label-width="120px">
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
import { hasPermission } from '@/utils/auth'
// import 
export default {
  data: function() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度不能小于6'))
      } else {
        callback()
      }
    }
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
      choosenUser: 0,
      newUserRules: {
        email: [{ required: true, trigger: 'blur', type: 'email', message: '邮箱格式错误' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        name: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        cellphone: [{ required: true, trigger: 'blur', message: '电话不能为空' }]
      },
      resetRules: {
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      bindRules: {
        role: [{ required: true, message: '绑定角色不能为空' }]
      }
    }
  },
  computed: {
    ...mapGetters(['users', 'total', 'allRoles']),
    canEdit() {
      return hasPermission('user', 'manage')
    },
    canGrant() {
      return hasPermission('role', 'grant')
    }
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
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.createLoading = true
          this.addUser(this.newUser).then(res => {
            this.createUserDialog = false
            this.getAllUser({ page: this.page, pageSize: this.pageSize })
            this.$message.success('创建成功')
            this.newUser = {}
          }).finally(() => this.createLoading = false)
        }
      })
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
      this.$ref.resetForm.validate(valid => {
        if (valid) {
          this.resetLoading = true
          this.resetPwd(this.resetPwdModel).then(res => {
            this.$message.success('更新成功')
            this.resetDialog = false
          }).finally(() => this.resetLoading = false)
        }
      })
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
      this.$refs.bindForm.validate(valid => {
        if (valid) {
          this.bindRoleLoading = true
          this.updateRole({ role: this.newRole, id: this.choosenUser }).then(
            res => {
              this.bindRoleLoading = false
              this.bindRoleDialog = false
              this.$message.success('绑定成功')
              this.getAllUser({ page: this.page, pageSize: this.pageSize })
              this.newRole = []
            }
          )
        }
      })
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
