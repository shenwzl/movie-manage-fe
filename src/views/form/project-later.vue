<template>
  <div class="app-container">
    <h3>项目明细表-后期</h3>
    <h4>素材</h4>
    <el-form ref="form" :model="basicInfo" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="音乐素材">
            <el-input v-model="basicInfo.id" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="视频素材">
            <el-input v-model="basicInfo.name" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <h4>外包委托制作</h4>
    <el-form ref="form" :model="basicInfo" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="配音费">
            <el-input v-model="basicInfo.film_length" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="调色制作费">
            <el-input v-model="basicInfo.leader" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="动画制作费">
            <el-input v-model="basicInfo.docker" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="剪辑制作费">
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
          <el-form-item label="合成制作费">
            <el-date-picker v-model="basicInfo.shooting_date" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分镜">
            <el-input v-model="basicInfo.copywriting" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其他">
            <el-input v-model="basicInfo.director" />
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

