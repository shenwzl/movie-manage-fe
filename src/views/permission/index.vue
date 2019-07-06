<template>
  <div class="app-container">
    <el-button type="primary" @click="createPermissionDialog = true">创建新权限</el-button>
    <el-table :data="roles">
      <el-table-column prop="id" label="角色id" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="desc" label="描述" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="handleChange(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="handleStateChange(scope.row)">{{ scope.row.state ? '恢复' : '禁用' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="isEdit ? '修改权限' : '新增权限'"
      :visible.sync="createPermissionDialog"
    >
      <el-form :model="newPermission">
        <el-form-item label="名称" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newPermission.name" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="描述" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newPermission.desc" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createPermissionDialog = false">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="createPermission">确 定</el-button>
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
      // Permissions: [
      //   {
      //     id: '1',
      //     name: '111',
      //     cellphone: '12345',
      //     ascription: 1,
      //     state: 1
      //   }
      // ],
      newPermission: {
        name: ''
      },
      createPermissionDialog: false,
      permissionDialog: false,
      permissionInfo: 0,
      page: 1,
      pageSize: 10,
      isEdit: false,
      createLoading: false
    }
  },
  computed: {
    ...mapGetters(['roles', 'userTotal'])
  },
  beforeMount() {
    this.getPermissions({ page: this.page, pageSize: this.pageSize })
  },
  methods: {
    ...mapActions([
      'getPermissions',
      'addPermission'
    ]),
    handleChange(row) {
      this.newPermission = row
      this.isEdit = true
      this.createPermissionDialog = true
    },
    setPermission() {
    },
    createPermission() {
      this.createLoading = true
      this.addPermission(this.newPermission).then(
        res => {
          this.createPermissionDialog = false
          this.getPermissions({ page: this.page, pageSize: this.pageSize })
          this.createLoading = false
          this.isEdit = false
          this.newPermission = {}
        }
      )
    },
    handlePageChange(page) {
      this.page = page
      this.getPermissions({ page: this.page, pageSize: this.pageSize })
    },
    handleStateChange(row) {}
  }
}
</script>

<style scoped>
.el-pagination {
  text-align: right;
  margin-top: 20px;
}
</style>
