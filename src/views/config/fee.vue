<template>
  <div class="app-container">
    <el-button type="primary" v-if="canEdit" @click="createFeeDialog = true">创建费用项</el-button>
    <el-table :data="fees">
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
      :visible.sync="createFeeDialog"
    >
      <el-form ref="createForm" :model="newFee" :rules="feeRules">
        <el-form-item prop="name" label="名称" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newFee.name" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="categoryType" label="类别" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-select v-model="newFee.categoryType" autocomplete="off">
                <el-option label="一级" :value="1" />
                <el-option label="二级" :value="2" />
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="parentCategoryId" v-if="newFee.categoryType === 2" label="父费用项" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-select v-model="newFee.parentCategoryId" autocomplete="off">
                <el-option 
                  v-for="fee in parentFees"
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
              <el-select v-model="newFee.stage" autocomplete="off">
                <el-option label="拍摄" :value="1" />
                <el-option label="后期" :value="2" />
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createFeeDialog = false">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="createFee">确 定</el-button>
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
      newFee: {
        name: '',
        stage: '',
        categoryType: '',
        parentCategoryId: ''
      },
      createFeeDialog: false,
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
    getParent(parentId, fees) {
      if (parentId) {
        const parentFee = fees.filter(fee => fee.id === parentId)
        return parentFee[0].name
      }
      return ''
    }
  },
  computed: {
    ...mapGetters(['fees', 'total', 'feeCategories']),
    parentFees() {
      return this.feeCategories.filter(fee => fee.categoryType === 1)
    },
    canEdit() {
      return hasPermission('fee_category', 'manage')
    }
  },
  beforeMount() {
    this.getFeeCategories({ state: 2, category_type: 1 }).then(res => {
      this.getFees({ page: this.page, pageSize: this.pageSize })
    })
  },
  methods: {
    ...mapActions([
      'getFees',
      'addFee',
      'deleteFee',
      'recoverFee',
      'getFeeCategories'
    ]),
    handleChange(row) {
      this.newFee = row
      this.isEdit = true
      this.createFeeDialog = true
    },
    setPermission() {
    },
    createFee() {
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.createLoading = true
          this.addFee(this.newFee).then(res => {
            this.getFees({ page: this.page, pageSize: this.pageSize })
            this.createFeeDialog = false
            this.createLoading = false
            this.newFee = {}
            this.$message.success(this.isEdit ? '更新成功' : '添加成功')
            this.isEdit = false
          })
        }
      })
    },
    handlePageChange(page) {
      this.page = page
      this.getFees({ page: this.page, pageSize: this.pageSize })
    },
    // getParent(parentId) {
    //   if (parentId) {
    //     const parentFee = this.fees.filter(fee => fee.id === parentId)
    //     console.log()
    //     return parentFee.name
    //   }
    //   return ''
    // },
    handleStateChange(row) {
      if (!row.state) {
        this.deleteFee(row.id).then(res => {
          this.$message.success('更新成功')
          this.getFees({ page: this.page, pageSize: this.pageSize })
        })
      } else {
        this.recoverFee(row.id).then(res => {
          this.$message.success('更新成功')
          this.getFees({ page: this.page, pageSize: this.pageSize })
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
