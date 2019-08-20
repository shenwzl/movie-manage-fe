<template>
  <div class="app-container">
    <el-button type="primary" v-if="canEdit" @click="createCompanyDialog = true">创建客户公司</el-button>
    <el-table :data="companys">
      <el-table-column prop="id" label="客户公司id" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="companyType" label="类别">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.companyType === 1 ? '一级' : '二级' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="parent" label="父公司">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.parentCompanyId | getParent(allCompanys) }}</span>
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
      :title="isEdit ? '编辑客户公司' : '新增客户公司'"
      :visible.sync="createCompanyDialog"
    >
      <el-form ref="createForm" :model="newCompany" :rules="companyRules">
        <el-form-item prop="name" label="名称" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newCompany.name" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="companyType" label="类别" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-select v-model="newCompany.companyType" autocomplete="off">
                <el-option label="一级" :value="1" />
                <el-option label="二级" :value="2" />
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="parentCompanyId" v-if="newCompany.companyType === 2" label="父公司" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-select v-model="newCompany.parentCompanyId" autocomplete="off">
                <el-option 
                  v-for="company in parentCompanys"
                  :key="company.id"
                  :label="company.name"
                  :value="company.id"
                />
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createCompanyDialog = false">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="saveCompany">确 定</el-button>
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
      newCompany: {
        name: '',
        stage: '',
        categoryType: '',
        parentCategoryId: ''
      },
      createCompanyDialog: false,
      permissionDialog: false,
      permissionInfo: 0,
      page: 1,
      pageSize: 10,
      isEdit: false,
      createLoading: false,
      companyRules: {
        name: [{ required: true, message: '名称不能为空' }],
        companyType: [{ required: true, message: '类别不能为空' }],
        parentCampanyId: [{ required: true, message: '父公司不能为空' }],
      }
    }
  },
  filters: {
    getParent(parentId, companys) {
      if (parentId) {
        const parentCompany = companys.filter(fee => fee.id === parentId)
        return parentCompany[0].name
      }
      return ''
    }
  },
  computed: {
    ...mapGetters(['companys', 'total', 'allCompanys']),
    parentCompanys() {
      return this.allCompanys.filter(company => company.companyType === 1)
    },
    canEdit() {
      return hasPermission('customer_company', 'manage')
    }
  },
  beforeMount() {
    this.getAllCompanys()
    this.getCompanys({ page: this.page, pageSize: this.pageSize })
  },
  methods: {
    ...mapActions([
      'getCompanys',
      'addCompany',
      'updateCompany',
      'deleteCompany',
      'recoverCompany',
      'getAllCompanys'
    ]),
    handleChange(row) {
      this.newCompany = row
      this.isEdit = true
      this.createCompanyDialog = true
    },
    saveCompany() {
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.createLoading = true
          if (this.isEdit){
            this.editCompany()
          }else {
            this.createCompany()
          }
        }
      })
    },
    createCompany() {
      this.addCompany(this.newCompany).then(res => {
        this.$message.success('添加成功')
        this.resetPage()
      })
    },
    editCompany() {
      this.updateCompany(this.newCompany).then(res => {
        this.$message.success('更新成功')
        this.resetPage()
      })
    },
    resetPage() {
      this.createCompanyDialog = false
      this.createLoading = false
      this.newCompany = {}
      this.isEdit = false
      this.getCompanys({ page: this.page, pageSize: this.pageSize })
    },
    handlePageChange(page) {
      this.page = page
      this.getCompanys({ page: this.page, pageSize: this.pageSize })
    },
    handleStateChange(row) {
      if (!row.state) {
        this.deleteCompany(row.id).then(res => {
          this.$message.success('更新成功')
          this.getCompanys({ page: this.page, pageSize: this.pageSize })
        })
      } else {
        this.recoverCompany(row.id).then(res => {
          this.$message.success('更新成功')
          this.getCompanys({ page: this.page, pageSize: this.pageSize })
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
