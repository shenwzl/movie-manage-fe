<template>
  <div class="app-container">
    <el-form :model="searchInfo">
      <el-row>
        <el-col :span="8">
          <el-form-item label="项目编号" label-width="120px">
            <el-input v-model="searchInfo.id" style="width: 180px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称" label-width="120px">
            <el-input v-model="searchInfo.name" style="width: 180px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目执行状态" label-width="120px">
            <el-input v-model="searchInfo.state" style="width: 180px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目合同金额" label-width="120px">
            <el-input-number style="width: 100px" controls-position="right" v-model="searchInfo.contractAmountStart"></el-input-number>
            ~
            <el-input-number style="width: 100px" controls-position="right" v-model="searchInfo.contractAmountEnd"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目成本金额" label-width="120px">
            <el-input-number style="width: 100px" controls-position="right" v-model="searchInfo.realCostStart"></el-input-number>
            ~
            <el-input-number style="width: 100px" controls-position="right" v-model="searchInfo.realCostEnd"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目预算金额" label-width="120px">
            <el-input-number style="width: 100px" controls-position="right" v-model="searchInfo.budgetCostStart"></el-input-number>
            ~
            <el-input-number style="width: 100px" controls-position="right" v-model="searchInfo.budgetCostEnd"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目编号" label-width="120px">
            <el-input v-model="searchInfo.projectId" style="width: 180px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目编号" label-width="120px">
            <el-input v-model="searchInfo.projectId" style="width: 180px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目编号" label-width="120px">
            <el-input v-model="searchInfo.projectId" style="width: 180px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目编号" label-width="120px">
            <el-input v-model="searchInfo.projectId" style="width: 180px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目编号" label-width="120px">
            <el-input v-model="searchInfo.projectId" style="width: 180px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目编号" label-width="120px">
            <el-input v-model="searchInfo.projectId" style="width: 180px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目编号" label-width="120px">
            <el-input v-model="searchInfo.projectId" style="width: 180px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目编号" label-width="120px">
            <el-input v-model="searchInfo.projectId" style="width: 180px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目编号" label-width="120px">
            <el-input v-model="searchInfo.projectId" style="width: 180px;" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      searchInfo: {}
    }
  }
}
</script>

