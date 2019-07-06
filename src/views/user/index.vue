<template>
  <div class="app-container">
    <el-button type="primary" @click="createUserDialog = true">创建用户</el-button>
    <el-table :data="users">
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="name" label="用户名" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="handleDelete(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="permissionDialog = true">设置权限</el-button>
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
        <el-button type="primary" @click="createUser">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="设置用户权限" :visible.sync="permissionDialog">
      <el-form :model="permissionInfo">
        <el-form-item label="权限" label-width="120px">
          <el-input v-model="permissionInfo" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="permissionDialog = false">取 消</el-button>
        <el-button type="primary" @click="setPermission">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      layout="prev, pager, next"
      :total="userTotal"
      @current-change="handlePageChange"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: function() {
    return {
      newUser: {
        email: '',
        password: ''
      },
      createUserDialog: false,
      permissionDialog: false,
      permissionInfo: 0,
      page: 1,
      pageSize: 10
    }
  },
  computed: {
    ...mapGetters(['users', 'userTotal'])
  },
  beforeMount() {
    console.log(this.userTotal, this.users)
    this.getAllUser({ page: this.page, pageSize: this.pageSize })
  },
  methods: {
    ...mapActions([
      'getAllUser',
      'addUser'
    ]),
    handleDelete(row) {
      console.log(row)
    },
    setPermission() {
    },
    createUser() {
      this.createUserDialog = false
      this.addUser(this.newUser)
    },
    handlePageChange(page) {
      this.page = page
      this.getAllUser({ page: this.page, pageSize: this.pageSize })
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
