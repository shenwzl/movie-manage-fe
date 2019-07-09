<template>
  <div class="dashboard-container">
    <el-form v-if="step === 1" :model="baseInfo">
      <el-row>
        <el-col :span="10">
          <el-form-item label="项目名称" label-width="120px">
            <el-input v-model="baseInfo.name" style="width: 180px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="合同主体" label-width="120px">
            <el-select v-model="baseInfo.contractSubjectId" autocomplete="off">
              <el-option v-for="contract in contractSubjects" :key="contract.id" :label="contract.name" :value="contract.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="成片时长" label-width="120px">
            <el-input-number v-model="baseInfo.filmDuration" controls-position="right" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="拍摄开始日期" label-width="120px">
            <el-date-picker v-model="baseInfo.shootingStartAt" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="拍摄周期" label-width="120px">
            <el-input-number v-model="baseInfo.shootingDuration" controls-position="right" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="项目角色" label-width="120px">
        <div v-for="mType in memberTypes" :key="mType.type">
          <el-row>
            <el-col :span="20">{{ mType.name }}</el-col>
            <el-col :span="20" style="margin-bottom: 10px;" v-for="(pMember, i) in baseInfo.projectMembers" v-if="pMember.memberType === mType.type" :key="pMember.id">
              <el-select v-model="pMember.ascriptionType">
                <el-option :value="1" label="内部员工" />
                <el-option :value="2" label="外部员工" />
              </el-select>
              <el-select v-if="pMember.ascriptionType === 1" v-model="pMember.staffId">
                <el-option v-for="staff in insideStaffs" :key="staff.id" :value="staff.id" :label="staff.name" />
              </el-select>
              <el-select v-if="pMember.ascriptionType === 2" v-model="pMember.staffId">
                <el-option v-for="staff in externalStaffs" :key="staff.id" :value="staff.id" :label="staff.name" />
              </el-select>
              <el-button type="danger" size="small" style="margin-left: 20px;" @click="handleBaseDelete(i)">删除</el-button>
            </el-col>
            <el-col :span="10">
              <el-button type="text" @click="addMemberType(mType.type)">添加{{ mType.name }}</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
    </el-form>
    <el-form v-if="step === 2" :model="shootingInfo">
      <div v-for="(sInfo, i) in shootingInfo" :key="sInfo.key">
        <el-row style="margin-top: 20px;">
          <el-col :span="10">
            <el-form-item label="一级费用" label-width="120px">
              <el-select v-model="sInfo.feeCategoryId" style="width: 180px;" autocomplete="off">
                <el-option v-for="fee in firstShootingFee" :key="fee.id" :value="fee.id" :label="fee.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="二级费用" label-width="120px">
              <el-select v-model="sInfo.feeChildCategoryId" style="width: 180px;" @blur="onBlur(sInfo.feeCategoryId)" width="200" autocomplete="off">
                <el-option v-for="fee in secondFees" :key="fee.id" :value="fee.id" :label="fee.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="danger" size="small" style="margin-left: 20px;" @click="handleShootingDelete(i)">删除</el-button>
          </el-col>
          <el-col :span="10">
            <el-form-item label="预算金额" label-width="120px">
              <el-input-number v-model="sInfo.budgetAmount" controls-position="right" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
             <el-form-item label="实际金额" label-width="120px">
              <el-input-number v-model="sInfo.realAmount" controls-position="right" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
             <el-form-item label="评分" label-width="120px">
              <el-input-number v-model="sInfo.rankScore" controls-position="right"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="备注" label-width="120px">
              <el-input type="textarea" v-model="sInfo.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="divider"></div>
      </div>
    </el-form>
    <el-form v-if="step === 3" :model="lastStateInfo">
      <div v-for="(sInfo, i) in lastStateInfo" :key="sInfo.key">
        <el-row style="margin-top: 20px;">
          <el-col :span="10">
            <el-form-item label="一级费用" label-width="120px">
              <el-select v-model="sInfo.feeCategoryId" style="width: 180px;" autocomplete="off">
                <el-option v-for="fee in firstLastFee" :key="fee.id" :value="fee.id" :label="fee.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="二级费用" label-width="120px">
              <el-select v-model="sInfo.feeChildCategoryId" @focus="onBlur(sInfo.feeCategoryId)" style="width: 180px;" autocomplete="off">
                <el-option v-for="fee in secondFees" :key="fee.id" :value="fee.id" :label="fee.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="danger" size="small" style="margin-left: 20px;" @click="handleLastDelete(i)">删除</el-button>
          </el-col>
          <el-col :span="10">
            <el-form-item label="预算金额" label-width="120px">
              <el-input-number v-model="sInfo.budgetAmount" controls-position="right" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
             <el-form-item label="实际金额" label-width="120px">
              <el-input-number v-model="sInfo.realAmount" controls-position="right" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
             <el-form-item label="评分" label-width="120px">
              <el-input-number v-model="sInfo.rankScore" controls-position="right"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="备注" label-width="120px">
              <el-input type="textarea" v-model="sInfo.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="divider"></div>
      </div>
    </el-form>
    <el-button class="save-button" v-if="step === 1" type="primary" :loading="editLoading" @click="editProject">保存并下一步</el-button>
    <el-button class="save-button" v-if="step === 2" type="primary" :loading="editLoading" @click="editShootingInfo">保存并下一步</el-button>
    <el-button class="save-button" v-if="step === 3" type="primary" :loading="editLoading" @click="editLastStateInfo">保存</el-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Dashboard',
  data: function() {
    return {
      editLoading: false,
      baseInfo: {
        name: '',
        contractSubjectId: 0,
        filmDuration: 3, // 单位：秒
        shootingStartAt: '',
        shootingDuration: '',
        projectMembers: [{
          id: 0,
          projectId: 0,
          memberType: '',
          staffId: 0
        }]
      },
      shootingInfo: [],
      lastStateInfo: [],
      step: 2,
      secondFees: []
    }
  },
  computed: {
    ...mapGetters([
      'contractSubjects',
      'memberTypes',
      'allStaffs',
      'feeCategories',
      'allProviders'
    ]),
    // 内部员工
    insideStaffs() {
      return this.allStaffs.filter(staff => staff.ascription === 1)
    },
    // 外部员工
    externalStaffs() {
      return this.allStaffs.filter(staff => staff.ascription === 2)
    },
    firstShootingFee() {
      return this.feeCategories.filter(fee => fee.categoryType === 1 && fee.stage === 1)
    },
    firstLastFee() {
      return this.feeCategories.filter(fee => fee.categoryType === 1 && fee.stage === 2)
    },
    pId() {
      return this.$route.params.projectId
    }
  },
  beforeMount() {
    this.getAllProviders()
    this.getFeeCategories()
    this.getContractSubjects()
    this.getAllStaffs()
    this.getMemberTypes()
    this.getBaseInfo(this.pId).then(res => {
      this.baseInfo = res.data
    })
    this.getShootingInfo(this.pId).then(res => {
      this.shootingInfo = res.data.projectFees
    })
    this.getLastStateInfo(this.pId).then(res => {
      this.lastStateInfo = res.data.projectFees
    })
  },
  methods: {
    ...mapActions([
      'getContractSubjects',
      'saveProjects',
      'getMemberTypes',
      'getAllStaffs',
      'getAllProviders',
      'getFeeCategories',
      'getBaseInfo',
      'saveBaseInfo',
      'getShootingInfo',
      'saveShootingInfo',
      'getLastStateInfo',
      'saveLastStateInfo'
    ]),
    editProject() {
      this.editLoading = true
      this.saveBaseInfo({
        baseInfo: this.baseInfo,
        pId: this.pId
      }).then(res => {
        this.editLoading = false
        this.step++
      })
    },
    addMemberType(id) {
      this.baseInfo.projectMembers.push({
        projectId: this.pId,
        memberType: id,
        staffId: 0,
        ascriptionType: 1
      })
    },
    editShootingInfo() {
      this.editLoading = true
      this.saveShootingInfo({
        shootingInfo: this.shootingInfo,
        pId: this.pId
      }).then(res => {
        this.editLoading = false
        this.step++
      })
    },
    editLastStateInfo() {
      this.editLoading = true
      this.saveLastStateInfo({
        lastStateInfo: this.lastStateInfo,
        pId: this.pId
      }).then(res => {
        this.$message.success('更新成功')
        this.editLoading = false
      })
    },
    onBlur(id) {
      this.secondFees = this.feeCategories.filter(fee => fee.parentCategoryId === id)
    },
    handleBaseDelete(i) {
      this.$confirm('确定删除这条记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.baseInfo.projectMembers.splice(i, 1)
      })
    },
    handleShootingDelete(i) {
      this.$confirm('确定删除这条记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.shootingInfo.splice(i, 1)
      })
    },
    handleLastDelete(i) {
      this.$confirm('确定删除这条记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.lastStateInfo.splice(i, 1)
      })
    }
  },
  mounted() {
    this.secondFees = this.feeCategories
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.divider {
  border-bottom: solid 1px #eee;
}
.save-button {
  float: right;
  margin-bottom: 20px;
  margin-right: 20px;
  margin-top: 20px;
}
</style>
