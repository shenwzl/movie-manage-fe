<template>
  <div class="app-container">
    <el-button type="primary" @click="createProviderDialog = true">创建新供应商</el-button>
    <el-table :data="providers">
      <el-table-column prop="id" label="供应商id" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="cellphone" label="电话" />
      <el-table-column prop="bankName" label="银行名称" />
      <el-table-column prop="bankAccount" label="银行账号" />
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.state === 0 ? '正常' : '禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="handleChange(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="permissionDialog = true">{{ scope.row.state ? '禁用' : '恢复' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="isEdit ? '修改供应商信息' : '新增供应商'"
      :visible.sync="createProviderDialog"
    >
      <el-form :model="newProvider">
        <el-form-item label="姓名" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newProvider.name" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="电话" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newProvider.cellphone" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="银行名称" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newProvider.bankName" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="银行账号" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newProvider.bankAccount" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createProviderDialog = false">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="createProvider">确 定</el-button>
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
      // providers: [
      //   {
      //     id: '1',
      //     name: '111',
      //     cellphone: '12345',
      //     bankName: '北京银行',
      //     bankAccount: '12312321312',
      //     state: 1
      //   }
      // ],
      newProvider: {
        name: '',
        cellphone: '',
        bankName: '',
        bankAccount: ''
      },
      createProviderDialog: false,
      permissionDialog: false,
      permissionInfo: 0,
      page: 1,
      pageSize: 10,
      isEdit: false,
      createLoading: false
    }
  },
  computed: {
    ...mapGetters(['providers', 'userTotal'])
  },
  beforeMount() {
    console.log(this.userTotal, this.users)
    this.getProviders({ page: this.page, pageSize: this.pageSize })
  },
  methods: {
    ...mapActions([
      'getProviders',
      'addProvider'
    ]),
    handleChange(row) {
      this.newProvider = row
      this.isEdit = true
      this.createProviderDialog = true
    },
    setPermission() {
    },
    createProvider() {
      this.createLoading = true
      this.addProvider(this.newProvider).then(
        res => {
          this.createLoading = false
          this.createProviderDialog = false
          this.getProviders({ page: this.page, pageSize: this.pageSize })
          this.newProvider = {}
          this.isEdit = false
        }
      )
    },
    handlePageChange(page) {
      this.page = page
      this.getProviders({ page: this.page, pageSize: this.pageSize })
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
