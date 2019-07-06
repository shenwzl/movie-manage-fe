<template>
  <div class="app-container">
    <h3>项目制片明细</h3>
    <h4>前置费</h4>
    <el-form ref="form" :model="basicInfo" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="制片备用金">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="前期企划">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分镜脚本">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="试镜">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="前期筹备交通费">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="前期筹备餐饮">
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
    <h4>人工费</h4>
    <el-form ref="form" :model="basicInfo" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="监制">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="导演">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="执行导演">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="制片">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="制片助理">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="场务">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="摄影师">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="平面摄影师">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="灯光师">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录音师">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="美术指导">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="服装师">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="道具师">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="化妆师">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="特殊人员">
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
    <h4>器材费</h4>
    <el-form ref="form" :model="basicInfo" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="摄影器材">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="特殊器材">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="灯光器材">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录音器材">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其他">
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
    <h4>场地及撘景</h4>
    <el-form ref="form" :model="basicInfo" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="影棚租金">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="撘景">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="外景场地">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="取暖炉、电费、棚长劳务等">
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
    <h4>道具服装费</h4>
    <el-form ref="form" :model="basicInfo" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="道具费">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="服装费">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="化妆费">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="美术费">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="其他">
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
    <h4>交通及膳宿费</h4>
    <el-form ref="form" :model="basicInfo" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="租车费">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="器材车/道具车">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="飞机票/火车票">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="住宿费">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拍摄日伙食饮料">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拍摄日交通费">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="杂支">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="不可预见">
            <el-input-number
              v-model="basicInfo.later_cost"
              :precision="2"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="超时">
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

