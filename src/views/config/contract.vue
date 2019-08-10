<template>
  <div class="app-container">
    <el-button type="primary" v-if="canEdit" @click="createContractDialog = true;newContract= {}">创建新合同主体</el-button>
    <el-table :data="contracts">
      <el-table-column prop="id" label="合同id" />
      <el-table-column prop="name" label="名称" />
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
      :title="isEdit ? '修改合同主体' : '新增合同主体'"
      :visible.sync="createContractDialog"
    >
      <el-form ref="createForm" :model="newContract" :rules="contractRules">
        <el-form-item prop="name" label="名称" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newContract.name" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createContractDialog = false">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="saveContract">确 定</el-button>
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
      // Contracts: [
      //   {
      //     id: '1',
      //     name: '111',
      //     cellphone: '12345',
      //     ascription: 1,
      //     state: 1
      //   }
      // ],
      newContract: {
        name: ''
      },
      createContractDialog: false,
      permissionDialog: false,
      permissionInfo: 0,
      page: 1,
      pageSize: 10,
      isEdit: false,
      createLoading: false,
      contractRules: {
        name: [{ required: true, message: '名称不能为空' }]
      }
    }
  },
  computed: {
    ...mapGetters(['contracts', 'userTotal']),
    canEdit() {
      return hasPermission('contract_subject', 'manage')
    }
  },
  beforeMount() {
    this.getContracts({ page: this.page, pageSize: this.pageSize })
  },
  methods: {
    ...mapActions([
      'getContracts',
      'addContracts',
      'updateContract',
      'editContract',
      'deleteContract',
      'recoverContract'
    ]),
    handleChange(row) {
      this.newContract = row
      this.isEdit = true
      this.createContractDialog = true
    },
    setPermission() {
    },
    saveContract() {
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.createLoading = true
          if (this.isEdit){
            this.editContract()
          }else{
            this.createContract()
          }
        }
      })
    },
    createContract() {
      this.addContracts(this.newContract).then(
        res => {
          this.$message.success('添加成功')
          this.resetPage()
        }
      )
    },
    editContract() {
      this.updateContract(this.newContract).then(
        res => {
          this.$message.success('更新成功')
          this.resetPage()
        }
      )
    },
    resetPage() {
      this.createContractDialog = false
      this.createLoading = false
      this.isEdit = false
      this.newContract = {}
      this.getContracts({ page: this.page, pageSize: this.pageSize })
    },
    handlePageChange(page) {
      this.page = page
      this.getContracts({ page: this.page, pageSize: this.pageSize })
    },
    handleStateChange(row) {
      if (!row.state) {
        this.deleteContract(row.id).then(res => {
          this.$message.success('更新成功')
          this.getContracts({ page: this.page, pageSize: this.pageSize })
        })
      } else {
        this.recoverContract(row.id).then(res => {
          this.$message.success('更新成功')
          this.getContracts({ page: this.page, pageSize: this.pageSize })
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
