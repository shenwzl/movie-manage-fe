<template>
  <div class="app-container">
    <el-button type="primary" v-if="canEdit" @click="createCompanyDialog = true">创建费用项</el-button>
    <el-table :data="companys">
      <el-table-column prop="id" label="费用项id" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="type" label="类别">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.categoryType === 1 ? '一级' : '二级' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="parent" label="父费用项">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.parentCategoryId | getParent(feeCategories) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="stage" label="费用阶段">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.stage === 1 ? '拍摄' : '后期' }}</span>
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
          <el-button type="text" size="small" @click="handleStateChange(scope.row)">{{ scope.row.state ? '禁用' : '恢复' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="isEdit ? '编辑费用项' : '新增费用项'"
      :visible.sync="createCompanyDialog"
    >
      <el-form ref="createForm" :model="newCompany" :rules="feeRules">
        <el-form-item prop="name" label="名称" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newCompany.name" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="categoryType" label="类别" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-select v-model="newCompany.categoryType" autocomplete="off">
                <el-option label="一级" :value="1" />
                <el-option label="二级" :value="2" />
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="parentCategoryId" v-if="newCompany.categoryType === 2" label="父费用项" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-select v-model="newCompany.parentCategoryId" autocomplete="off">
                <el-option 
                  v-for="fee in parentCompanys"
                  :key="fee.id"
                  :label="fee.name"
                  :value="fee.id"
                />
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="stage" label="阶段" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-select v-model="newCompany.stage" autocomplete="off">
                <el-option label="拍摄" :value="1" />
                <el-option label="后期" :value="2" />
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createCompanyDialog = false">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="createCompany">确 定</el-button>
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
      feeRules: {
        name: [{ required: true, message: '名称不能为空' }],
        categoryType: [{ required: true, message: '类别不能为空' }],
        parentCategoryId: [{ required: true, message: '父费用项不能为空' }],
        stage: [{ required: true, message: '阶段不能为空' }]
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
    ...mapGetters(['companys', 'total', 'feeCategories']),
    parentCompanys() {
      return this.feeCategories.filter(fee => fee.categoryType === 1)
    },
    canEdit() {
      return hasPermission('fee_category', 'manage')
    }
  },
  beforeMount() {
    this.getCompanyCategories({ state: 2, category_type: 1 }).then(res => {
      this.getCompanys({ page: this.page, pageSize: this.pageSize })
    })
  },
  methods: {
    ...mapActions([
      'getCompanys',
      'addCompany',
      'deleteCompany',
      'recoverCompany',
      'getCompanyCategories'
    ]),
    handleChange(row) {
      this.newCompany = row
      this.isEdit = true
      this.createCompanyDialog = true
    },
    setPermission() {
    },
    createCompany() {
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.createLoading = true
          this.addCompany(this.newCompany).then(res => {
            this.getCompanys({ page: this.page, pageSize: this.pageSize })
            this.createCompanyDialog = false
            this.createLoading = false
            this.newCompany = {}
            this.$message.success(this.isEdit ? '更新成功' : '添加成功')
            this.isEdit = false
          })
        }
      })
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
