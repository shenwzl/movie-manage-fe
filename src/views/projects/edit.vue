<!--
 * @Description: file content
 * @version: v1.0.0
 * @Company: tujia
 * @Author: SHENZHI
 * @Date: 2019-07-01 19:00:11
 * @LastEditors: SHENZHI
 * @LastEditTime: 2019-08-10 12:14:32
 -->
<template>
  <div class="dashboard-container">
    <el-form v-if="step === '1'" ref="baseInfoForm" :model="baseInfo" :rules="baseInfoRules">
      <h3>基本信息</h3>
      <el-row>
        <el-col :span="10">
          <el-form-item prop="name" label="项目名称" label-width="120px">
            <el-input v-model="baseInfo.name" style="width: 180px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="contractSubjectId" label="合同主体" label-width="120px">
            <el-select v-model="baseInfo.contractSubjectId" autocomplete="off">
              <el-option v-for="contract in contractSubjects" :key="contract.id" :label="contract.name" :value="contract.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="filmDuration" label="成片时长" label-width="120px">
            <el-input-number v-model="baseInfo.filmDuration" controls-position="right" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="shootingStartAt" label="拍摄开始日期" label-width="120px">
            <el-date-picker v-model="baseInfo.shootingStartAt" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="shootingDuration" label="拍摄周期" label-width="120px">
            <el-input-number v-model="baseInfo.shootingDuration" controls-position="right" autocomplete="off" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="projectMembers" label="项目角色" label-width="120px">
        <div v-for="mType in memberTypes" :key="mType.type">
          <el-row>
            <el-col :span="20">{{ mType.name }}</el-col>
            <el-col :span="20" style="margin-bottom: 10px;" v-for="(pMember, i) in baseInfo.projectMembers" v-if="pMember.memberType === mType.type" :key="pMember.id">
              <el-col :span="6">
                <el-form-item :prop="'projectMembers.' + i + '.ascriptionType'" :rules="{ required: true, message: '员工类型不能为空' }">
                  <el-select v-model="pMember.ascriptionType">
                    <el-option :value="1" label="内部员工" />
                    <el-option :value="2" label="外部员工" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-if="pMember.ascriptionType === 1" :span="6">
                <el-form-item :prop="'projectMembers.' + i + '.staffId'" :rules="{ required: true, message: '员工不能为空' }">
                  <el-select v-model="pMember.staffId">
                    <el-option v-for="staff in insideStaffs" :key="staff.id" :value="staff.id" :label="staff.name" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-if="pMember.ascriptionType === 2" :span="6">
                <el-form-item :prop="'projectMembers.' + i + '.staffId'" :rules="{ required: true, message: '员工不能为空' }">
                  <el-select v-model="pMember.staffId">
                    <el-option v-for="staff in externalStaffs" :key="staff.id" :value="staff.id" :label="staff.name" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-button type="danger" size="small" style="margin-left: 20px;" @click="handleBaseDelete(i)">删除</el-button>
            </el-col>
            <el-col :span="10">
              <el-button type="text" @click="addMemberType(mType.type)">添加{{ mType.name }}</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
    </el-form>
    <el-form v-if="step === '2'" ref="shootingInfoForm" :model="feeInfo">
      <h3>拍摄费用</h3>
      <div v-for="(sInfo, i) in feeInfo.shootingInfo" :key="sInfo.key">
        <el-row style="margin-top: 20px;">
          <el-col :span="10">
            <el-form-item :prop="'shootingInfo.' + i + '.feeCategoryId'" :rules="{ required: true, message: '一级费用项必须为数字' }" label="一级费用" label-width="120px">
              <el-select v-model="sInfo.feeCategoryId" style="width: 180px;" autocomplete="off">
                <el-option v-for="fee in firstShootingFee" :key="fee.id" :value="fee.id" :label="fee.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :prop="'shootingInfo.' + i + '.feeChildCategoryId'" :rules="{ required: true, type: 'number', message: '二级费用项必须为数字' }" label="二级费用" label-width="120px">
              <el-select v-model="sInfo.feeChildCategoryId" style="width: 180px;" @blur="onBlur(sInfo.feeCategoryId)" width="200" autocomplete="off">
                <el-option v-for="fee in secondFees" :key="fee.id" :value="fee.id" :label="fee.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="danger" size="small" style="margin-left: 20px;" @click="handleShootingDelete(i)">删除</el-button>
          </el-col>
          <el-col :span="10">
            <el-form-item :prop="'shootingInfo.' + i + '.budgetAmount'" :rules="{ required: true, type: 'number', message: '预算金额必须为数字' }" label="预算金额" label-width="120px">
              <el-input-number v-model="sInfo.budgetAmount" controls-position="right" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
             <el-form-item :prop="'shootingInfo.' + i + '.realAmount'" :rules="{ required: true, type: 'number', message: '实际金额必须为数字' }" label="实际金额" label-width="120px">
              <el-input-number v-model="sInfo.realAmount" controls-position="right" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
             <el-form-item :prop="'shootingInfo.' + i + '.providerId'" :rules="{ required: sInfo.realAmount !== 0, message: '供应商不能为空' }" label="供应商" label-width="120px">
             <el-select v-model="sInfo.providerId" style="width: 180px;" width="200" autocomplete="off">
                <el-option v-for="provider in allProviders" :key="provider.id" :value="provider.id" :label="provider.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
             <el-form-item :prop="'shootingInfo.' + i + '.rankScore'" label="评分" label-width="120px">
              <el-input-number v-model="sInfo.rankScore" controls-position="right"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="remark" label="备注" label-width="120px">
              <el-input type="textarea" v-model="sInfo.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="divider"></div>
      </div>
    </el-form>
    <el-form v-if="step === '3'" ref="lastInfoForm" :model="feeInfo">
      <h3>后期费用</h3>
      <div v-for="(sInfo, i) in feeInfo.lastStateInfo" :key="sInfo.key">
        <el-row style="margin-top: 20px;">
          <el-col :span="10">
            <el-form-item :prop="'lastStateInfo.' + i + '.feeCategoryId'" :rules="{ required: true, type: 'number', message: '一级费用项必须为数字' }" label="一级费用" label-width="120px">
              <el-select v-model="sInfo.feeCategoryId" style="width: 180px;" autocomplete="off">
                <el-option v-for="fee in firstLastFee" :key="fee.id" :value="fee.id" :label="fee.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :prop="'lastStateInfo.' + i + '.feeChildCategoryId'" :rules="{ required: true, type: 'number', message: '二级费用项必须为数字' }" label="二级费用" label-width="120px">
              <el-select v-model="sInfo.feeChildCategoryId" @focus="onBlur(sInfo.feeCategoryId)" style="width: 180px;" autocomplete="off">
                <el-option v-for="fee in secondFees" :key="fee.id" :value="fee.id" :label="fee.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="danger" size="small" style="margin-left: 20px;" @click="handleLastDelete(i)">删除</el-button>
          </el-col>
          <el-col :span="10">
            <el-form-item :prop="'lastStateInfo.' + i + '.budgetAmount'" :rules="{ required: true, type: 'number', message: '预算金额必须为数字' }" label="预算金额" label-width="120px">
              <el-input-number v-model="sInfo.budgetAmount" controls-position="right" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
             <el-form-item :prop="'lastStateInfo.' + i + '.realAmount'" :rules="{ required: true, type: 'number', message: '实际金额必须为数字' }" label="实际金额" label-width="120px">
              <el-input-number v-model="sInfo.realAmount" controls-position="right" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
             <el-form-item :prop="'lastStateInfo.' + i + '.providerId'" :rules="{ required: sInfo.realAmount !== 0, message: '供应商不能为空' }" label="供应商" label-width="120px">
             <el-select v-model="sInfo.providerId" style="width: 180px;" width="200" autocomplete="off">
                <el-option v-for="provider in allProviders" :key="provider.id" :value="provider.id" :label="provider.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
             <el-form-item :prop="'lastStateInfo.' + i + '.rankScore'" label="评分" label-width="120px">
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
    <el-button class="save-button" v-if="step === '1'" type="primary" :loading="editLoading" @click="editProject">保存</el-button>
    <el-button class="add-button" v-if="step === '2'" @click="addShootingInfo">添加费用</el-button>
    <el-button class="save-button" v-if="step === '2'" type="primary" :loading="editLoading" @click="editShootingInfo">保存</el-button>
    <el-button class="add-button" v-if="step === '3'" @click="addLastInfo">添加费用</el-button>
    <el-button class="save-button" v-if="step === '3'" type="primary" :loading="editLoading" @click="editLastStateInfo">保存</el-button>
    <el-button v-if="canAddStaff && step === '1'" class="add-new" @click="createStaffDialog = true" type="primary">新增员工</el-button>
    <el-dialog
      title="新增员工"
      :visible.sync="createStaffDialog"
    >
      <el-form ref="createForm" :model="newStaff" :rules="staffRules">
        <el-form-item prop="name" label="姓名" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newStaff.name" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="cellphone" label="电话" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-input v-model="newStaff.cellphone" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="ascription" label="员工类型" label-width="200px">
          <el-row>
            <el-col :span="10">
              <el-select v-model="newStaff.ascription" autocomplete="off">
                <el-option label="内部员工" :value="1" />
                <el-option label="外部员工" :value="2" />
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createStaffDialog = false">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="createStaff">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { hasPermission } from '@/utils/auth'

export default {
  name: 'Dashboard',
  data: function() {
    return {
      createLoading: false,
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
      feeInfo: {
        shootingInfo: [],
        lastStateInfo: []
      },
      secondFees: [],
      baseInfoRules: {
        name: [{ required: true, message: '名称不能为空' }],
        contractSubjectId: [{ required: true, message: '合同主体不能为空' }],
        filmDuration: [{ required: true, message: '成片时长不能为空' }],
        shootingStartAt: [{ required: true, message: '拍摄开始日期不能为空' }],
        shootingDuration: [{ required: true, message: '拍摄周期不能为空' }],
        ascriptionType: [{ required: true, message: '员工类型不能为空' }],
        staffId: [{ required: true, message: '员工不能为空' }],
      },
      shootingInfoRules: {
        feeCategoryId: [{ required: true, message: '一级费用项不能为空' }],
        feeChildCategoryId: [{ required: true, message: '二级费用项不能为空' }],
        budgetAmount: [{ required: true, message: '预算金额不能为空' }],
        realAmount: [{ required: true, message: '实际金额为空' }],
        rankScore: [{ required: true, message: '评分不能为空' }]
      },
      newStaff: {
        name: '',
        cellphone: '',
        ascription: ''
      },
      staffRules: {
        name: [{ required: true, message: '名称不能为空' }],
        cellphone: [{ required: true, message: '电话不能为空' }],
        ascription: [{ required: true, message: '员工类型不能为空' }],
      },
      createStaffDialog: false,
    }
  },
  computed: {
    ...mapGetters([
      'contractSubjects',
      'memberTypes',
      'allStaffs',
      'feeCategories',
      'allProviders',
    ]),
    // 内部员工
    insideStaffs() {
      return this.allStaffs.filter(staff => staff.ascription === 1)
    },
    // 外部员工
    externalStaffs() {
      return this.allStaffs.filter(staff => staff.ascription === 2)
    },
    // 一级拍摄费用
    firstShootingFee() {
      return this.feeCategories.filter(fee => fee.categoryType === 1 && fee.stage === 1)
    },
    // 1级后期费用
    firstLastFee() {
      return this.feeCategories.filter(fee => fee.categoryType === 1 && fee.stage === 2)
    },
    pId() {
      return this.$route.params.projectId
    },
    step() {
      return this.$route.params.step
    },
    canAddStaff() {
      return hasPermission('staff', 'manage')
    }
  },
  beforeMount() {
    console.log(this.$route)
    this.getAllProviders()
    this.getFeeCategories().then(() => this.secondFees = this.feeCategories)
    this.getContractSubjects()
    this.getAllStaffs()
    this.getMemberTypes()
    this.getBaseInfo(this.pId).then(res => {
      res.data.projectMembers.forEach(pMember => {
        const { staffId } = pMember
        const staff = this.allStaffs.filter(aStaff => aStaff.id === staffId)
        pMember.ascriptionType = staff[0].ascription
      })
      this.baseInfo = res.data
    })
    this.getShootingInfo(this.pId).then(res => {
      this.feeInfo.shootingInfo = res.data.projectFees
    })
    this.getLastStateInfo(this.pId).then(res => {
      this.feeInfo.lastStateInfo = res.data.projectFees
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
      'saveLastStateInfo',
      'addStaff'
    ]),
    editProject() {
      this.$refs.baseInfoForm.validate(valid => {
        if (valid) {
          this.editLoading = true
          this.saveBaseInfo({
            baseInfo: this.baseInfo,
            pId: this.pId
          }).then(res => {
            this.editLoading = false
            this.$message.success('更新成功')
            window.location.href = '/#/'
          })
        }
      })
    },
    addMemberType(id) {
      this.baseInfo.projectMembers.push({
        projectId: this.pId,
        memberType: id,
        staffId: '',
        ascriptionType: 1
      })
    },
    editShootingInfo() {
      this.$refs.shootingInfoForm.validate(valid => {
        if (valid) {
          this.editLoading = true
          this.saveShootingInfo({
            shootingInfo: this.feeInfo.shootingInfo,
            pId: this.pId
          }).then(res => {
            this.editLoading = false
            this.$message.success('更新成功')
            window.location.href = '/#/'
          })
        }
      })
    },
    editLastStateInfo() {
      this.$refs.lastInfoForm.validate(valid => {
        if (valid) {
          this.editLoading = true
          this.saveLastStateInfo({
            lastStateInfo: this.feeInfo.lastStateInfo,
            pId: this.pId
          }).then(res => {
            this.$message.success('更新成功')
            this.editLoading = false
            window.location.href = '/#/'
          })
        }
      })
    },
    createStaff() {
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.createLoading = true
          this.addStaff(this.newStaff).then(res => {
            this.createStaffDialog = false
            this.createLoading = false
            this.$message.success('添加成功')
            this.newStaff = {}
            this.getAllStaffs()
          })
        }
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
    },
    addShootingInfo() {
      this.shootingInfo.push({})
    },
    addLastInfo() {
      this.lastStateInfo.push({})
    }
  },
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
.add-button {
  margin-top: 20px;
  margin-left: 20px;
}
.add-new {
  position: fixed;
  bottom: 40px;
  left: 230px;
}
</style>
