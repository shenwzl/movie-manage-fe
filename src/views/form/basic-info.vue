<template>
  <div class="app-container">
    <h3>项目基本信息</h3>
    <el-form ref="form" :model="basicInfo" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="项目编号">
            <el-input v-model="basicInfo.id" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input v-model="basicInfo.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成片时长">
            <el-input v-model="basicInfo.film_length" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目负责人">
            <el-input v-model="basicInfo.leader" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户对接人">
            <el-input v-model="basicInfo.docker" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拍摄周期">
            <el-input-number
              v-model="basicInfo.shooting_cycle"
              :step="0.5"
              :precision="1"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拍摄日期">
            <el-date-picker v-model="basicInfo.shooting_date" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文案">
            <el-input v-model="basicInfo.copywriting" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="导演">
            <el-input v-model="basicInfo.director" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="执行导演">
            <el-input v-model="basicInfo.executive_director" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="制片">
            <el-input v-model="basicInfo.production" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="后期剪辑">
            <el-input v-model="basicInfo.late_editing" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="后期合成">
            <el-input v-model="basicInfo.anaphase_synthesis" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="美术">
            <el-input v-model="basicInfo.fine_arts" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分镜">
            <el-input v-model="basicInfo.storyboard" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="音乐">
            <el-input v-model="basicInfo.music" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目合同金额">
            <el-input-number
              v-model="basicInfo.contract_amount"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目回款金额">
            <el-input-number
              v-model="basicInfo.payment_amount"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目预算总成本">
            <el-input v-model="budget_cost" disabled type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目拍摄预算">
            <el-input-number
              v-model="basicInfo.shooting_budget"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目后期预算">
            <el-input-number
              v-model="basicInfo.post_budget"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目实际总成本">
            <el-input v-model="actual_cost" disabled type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目拍摄成本">
            <el-input-number
              v-model="basicInfo.cost_of_shooting"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目后期成本">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import projectInfo from '../../../src/config/project'
export default {
  data() {
    return {
      basicInfo: projectInfo.basicInfo
    }
  },
  computed: {
    budget_cost() {
      const { shooting_budget, post_budget } = projectInfo.basicInfo
      return parseFloat(shooting_budget) + parseFloat(post_budget)
    },
    actual_cost() {
      const { cost_of_shooting, later_cost } = projectInfo.basicInfo
      return parseFloat(cost_of_shooting) + parseFloat(later_cost)
    }
  },
  methods: {
    onSubmit() {
      console.log(this.basicInfo)
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

