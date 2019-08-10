<template>
  <div class="app-container">
    <el-button type="primary" v-if="canEdit" @click="createProviderDialog = true; newProvider={};">创建新供应商</el-button>
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
      <el-table-column v-if="canEdit" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="handleChange(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="handleStateChange(scope.row)">{{ scope.row.state ? '恢复' : '禁用' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="isEdit ? '修改供应商信息' : '新增供应商'"
      :visible.sync="createProviderDialog"
    >
      <el-form ref="createForm" :model="newProvider" :rules="providerRules">
        <el-form-item prop="name" label="姓名" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newProvider.name" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="cellphone" label="电话" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newProvider.cellphone" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="bankName" label="银行名称" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newProvider.bankName" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="bankAccount" label="银行账号" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newProvider.bankAccount" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createProviderDialog = false">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="saveProvider">确 定</el-button>
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
import { hasPermission } from '@/utils/auth'

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
      createLoading: false,
      providerRules: {
        name: [{ required: true, message: '名称不能为空' }],
        cellphone: [{ required: true, message: '电话不能为空' }],
        bankName: [{ required: true, message: '银行名称不能为空' }],
        bankAccount: [{ required: true, message: '银行账号不能为空' }]
      }
    }
  },
  computed: {
    ...mapGetters(['providers', 'userTotal']),
    canEdit() {
      return hasPermission('provider', 'manage')
    }
  },
  beforeMount() {
    this.getProviders({ page: this.page, pageSize: this.pageSize })
  },
  methods: {
    ...mapActions([
      'getProviders',
      'addProvider',
      'updateProvider',
      'deleteProvider',
      'recoverProvider'
    ]),
    handleChange(row) {
      this.newProvider = row
      this.isEdit = true
      this.createProviderDialog = true
    },
    setPermission() {
    },
    saveProvider(){
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.createLoading = true
          if(this.isEdit){
            console.log(this.newProvider)
            this.editProvider()
          }else{
            this.createProvider()
          }
        }
      })
    },
    createProvider() {
      this.addProvider(this.newProvider).then(
        res => {
          this.$message.success('添加成功')
          this.resetPage()
        }
      )
    },
    editProvider() {
      this.updateProvider(this.newProvider).then(
        res => {
          this.$message.success('更新成功')
          this.resetPage()
        }
      )
    },
    resetPage() {
      this.createLoading = false
      this.createProviderDialog = false
      this.newProvider = {}
      this.isEdit = false
      this.getProviders({ page: this.page, pageSize: this.pageSize })
    },
    handlePageChange(page) {
      this.page = page
      this.getProviders({ page: this.page, pageSize: this.pageSize })
    },
    handleStateChange(row) {
      if (!row.state) {
        this.deleteProvider(row.id).then(res => {
          this.$message.success('更新成功')
          this.getProviders({ page: this.page, pageSize: this.pageSize })
        })
      } else {
        this.recoverProvider(row.id).then(res => {
          this.$message.success('更新成功')
          this.getProviders({ page: this.page, pageSize: this.pageSize })
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
