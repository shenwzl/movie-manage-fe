<template>
  <div class="app-container">
    <el-table :data="permissions">
      <el-table-column prop="id" label="权限id" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="desc" label="描述" />
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
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
    ...mapGetters(['permissions', 'total'])
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
