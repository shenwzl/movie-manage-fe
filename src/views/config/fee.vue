<template>
  <div class="app-container">
    <el-button type="primary" @click="createFeeDialog = true">创建费用项</el-button>
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
          <span style="margin-left: 10px">{{ scope.row.parentCategoryId | getParent(fees) }}</span>
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
      <el-table-column label="操作">
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
      <el-form :model="newFee">
        <el-form-item label="名称" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newFee.name" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="类别" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-select v-model="newFee.type" autocomplete="off">
                <el-option label="一级" :value="1" />
                <el-option label="二级" :value="2" />
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item v-if="newFee.type === 2" label="父费用项" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newFee.parent" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="阶段" label-width="200px">
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
export default {
  data: function() {
    return {
      newFee: {
        name: '',
        stage: '',
        type: '',
        parent: ''
      },
      createFeeDialog: false,
      permissionDialog: false,
      permissionInfo: 0,
      page: 1,
      pageSize: 10,
      isEdit: false,
      createLoading: false
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
    ...mapGetters(['fees', 'total'])
  },
  beforeMount() {
    this.getFees({ page: this.page, pageSize: this.pageSize })
  },
  methods: {
    ...mapActions([
      'getFees',
      'addFee',
      'deleteFee',
      'recoverFee'
    ]),
    handleChange(row) {
      this.newFee = row
      this.isEdit = true
      this.createFeeDialog = true
    },
    setPermission() {
    },
    createFee() {
      this.createLoading = true
      this.addFee(this.newFee).then(res => {
        this.getFees({ page: this.page, pageSize: this.pageSize })
        this.createFeeDialog = false
        this.createLoading = false
        this.newFee = {}
        this.isEdit = false
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
