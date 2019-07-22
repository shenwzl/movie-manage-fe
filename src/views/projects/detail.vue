<template>
  <div class="dashboard-container">
    <div class="base-info" v-if="step === '1'">
      <h3>基本信息</h3>
      <el-row>
        <el-col :span="8">
          <span>项目名称：</span>
          <span>{{ baseInfo.name }}</span>
        </el-col>
        <el-col :span="8">
          <span>合同主体：</span>
          <span>{{ baseInfo.contractSubjectId | getContractName(contractSubjects) }}</span>
        </el-col>
        <el-col :span="8">
          <span>成片时长：</span>
          <span>{{ baseInfo.filmDuration }}秒</span>
        </el-col>
        <el-col :span="8">
          <span>拍摄开始日期：</span>
          <span>{{ baseInfo.shootingStartAt }}</span>
        </el-col>
        <el-col :span="8">
          <span>拍摄周期：</span>
          <span>{{ baseInfo.shootingDuration }}天</span>
        </el-col>
        <el-col :span="16">
          <span>项目角色：</span>
          <div v-for="mType in memberTypes" :key="mType.type">
            <el-row class="role">
              <el-col :span="6">{{ mType.name }}</el-col>
              <el-col :span="18">
                <div v-for="(pMember) in baseInfo.projectMembers" v-if="pMember.memberType === mType.type" :key="pMember.id">{{ pMember.staffId | getStaff(allStaffs) }}</div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <div class="divider"></div>
    </div>
    <div class="shooting-info" v-if="step === '2'">
      <h3>拍摄费用</h3>
      <div v-for="sInfo in shootingInfo" :key="sInfo.key">
        <el-row >
          <el-col :span="8">一级费用: {{ sInfo.feeCategoryId | getFeeName(feeCategories) }}</el-col>
          <el-col :span="8">二级费用: {{ sInfo.feeChildCategoryId | getFeeName(feeCategories) }}</el-col>
          <el-col :span="8">预算金额: {{ sInfo.budgetAmount }}</el-col>
          <el-col :span="8">实际金额: {{ sInfo.realAmount }}</el-col>
          <el-col :span="8">评分: {{ sInfo.rankScore }}</el-col>
          <el-col :span="8">备注: {{ sInfo.remark }}</el-col>
        </el-row>
        <div class="divider"></div>
      </div>
    </div>
    <div class="last-info" v-if="step === '3'">
      <h3>后期费用</h3>
      <div v-for="sInfo in lastStateInfo" :key="sInfo.key">
        <el-row >
          <el-col :span="8">一级费用: {{ sInfo.feeCategoryId | getFeeName(feeCategories) }}</el-col>
          <el-col :span="8">二级费用: {{ sInfo.feeChildCategoryId | getFeeName(feeCategories) }}</el-col>
          <el-col :span="8">预算金额: {{ sInfo.budgetAmount }}</el-col>
          <el-col :span="8">实际金额: {{ sInfo.realAmount }}</el-col>
          <el-col :span="8">评分: {{ sInfo.rankScore }}</el-col>
          <el-col :span="8">备注: {{ sInfo.remark }}</el-col>
        </el-row>
        <div class="divider"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { hasPermission } from '@/utils/auth'
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
    },
    step() {
      return this.$route.params.step
    },
    canViewBaseInfo() {
      return hasPermission('project_base_info', 'view')
    },
    canViewShootingInfo() {
      return hasPermission('project_shooting_info', 'view')
    },
    canViewLastInfo() {
      return hasPermission('project_last_state_info', 'view')
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
  filters: {
    getContractName(id, contracts) {
      if (id) {
        const contract = contracts.filter(ctr => ctr.id === id)
        return contract[0].name
      }
      return ''
    },
    getStaff(id, staffs) {
      const staff = staffs.filter(stf => stf.id === id)
      return staff[0].name
    },
    getFeeName(id, fees) {
      const fee = fees.filter(f => f.id === id)
      return fee[0].name
    }
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
.el-col {
  line-height: 30px;
  font-size: 14px;
  color: #606266;
}
.role {
  margin-left: 80px;
  color: rgb(45, 39, 39);
  font-size: 14px;
}
.divider {
  display: block;
  height: 1px;
  width: 100%;
  margin: 24px 0;
}
</style>
