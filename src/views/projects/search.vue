<!--
 * @Description: file content
 * @version: v1.0.0
 * @Author: SHENZHI
 * @Date: 2019-07-07 17:15:15
 * @LastEditors: SHENZHI
 * @LastEditTime: 2019-08-10 20:54:54
 -->
<template>
  <div class="app-container">
    <el-form :model="searchInfo">
      <el-row>
        <el-col :span="8">
          <el-form-item label="项目编号" label-width="120px">
            <el-input v-model="searchInfo.sid" style="width: 216px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称" label-width="120px">
            <el-input v-model="searchInfo.name" style="width: 216px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目执行状态" label-width="120px">
            <el-select v-model="searchInfo.states" clearable style="width: 216px;" multiple>
              <el-option
                v-for="item in projectState"
                :key="item.state"
                :value="item.state"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属公司" label-width="120px">
            <el-select v-model="searchInfo.companyId" clearable filterable style="width: 216px;">
              <el-option
                v-for="company in parentCompanys"
                :key="company.id"
                :value="company.id"
                :label="company.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属子公司" label-width="120px">
            <el-select
              v-model="searchInfo.childCompanyId"
              clearable
              filterable
              style="width: 216px;"
            >
              <el-option
                v-for="company in childCompanys"
                :key="company.id"
                :value="company.id"
                :label="company.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目合同主体" label-width="120px">
            <el-select
              v-model="searchInfo.contractSubjectId"
              clearable
              filterable
              style="width: 216px;"
            >
              <el-option
                v-for="contract in contractSubjects"
                :key="contract.id"
                :value="contract.id"
                :label="contract.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目合同金额(元)" label-width="120px">
            <el-input-number
              v-model="searchInfo.contractAmountStart"
              style="width: 100px"
              :controls="false"
              controls-position="right"
            />
            <el-input-number
              v-model="searchInfo.contractAmountEnd"
              style="width: 100px"
              :controls="false"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目回款金额(元)" label-width="120px">
            <el-input-number
              v-model="searchInfo.returnAmountStart"
              style="width: 100px"
              :controls="false"
              controls-position="right"
            />
            <el-input-number
              v-model="searchInfo.returnAmountEnd"
              style="width: 100px"
              :controls="false"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目成本金额(元)" label-width="120px">
            <el-input-number
              v-model="searchInfo.realCostStart"
              style="width: 100px"
              :controls="false"
              controls-position="right"
            />
            <el-input-number
              v-model="searchInfo.realCostEnd"
              style="width: 100px"
              :controls="false"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目预算金额(元)" label-width="120px">
            <el-input-number
              v-model="searchInfo.budgetCostStart"
              style="width: 100px"
              :controls="false"
              controls-position="right"
            />~
            <el-input-number
              v-model="searchInfo.budgetCostEnd"
              style="width: 100px"
              :controls="false"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拍摄预算(元)" label-width="120px">
            <el-input-number
              v-model="searchInfo.shootingBudgetCostStart"
              style="width: 100px"
              :controls="false"
              controls-position="right"
            />~
            <el-input-number
              v-model="searchInfo.shootingBudgetCostEnd"
              style="width: 100px"
              :controls="false"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="后期预算(元)" label-width="120px">
            <el-input-number
              v-model="searchInfo.lateStateBudgetCostStart"
              style="width: 100px"
              :controls="false"
              controls-position="right"
            />~
            <el-input-number
              v-model="searchInfo.lateStateBudgetCostEnd"
              style="width: 100px"
              :controls="false"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拍摄成本(元)" label-width="120px">
            <el-input-number
              v-model="searchInfo.shootingRealCostStart"
              style="width: 100px"
              :controls="false"
              controls-position="right"
            />~
            <el-input-number
              v-model="searchInfo.shootingRealCostEnd"
              style="width: 100px"
              :controls="false"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="后期成本(元)" label-width="120px">
            <el-input-number
              v-model="searchInfo.lateStateRealCostStart"
              style="width: 100px"
              :controls="false"
              controls-position="right"
            />~
            <el-input-number
              v-model="searchInfo.lateStateRealCostEnd"
              style="width: 100px"
              :controls="false"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成片时长(分)" label-width="120px">
            <el-input-number
              v-model="searchInfo.filmDurationMinuteStart"
              style="width: 100px"
              controls-position="right"
              autocomplete="off"
            />~
            <el-input-number
              v-model="searchInfo.filmDurationMinuteEnd"
              style="width: 100px"
              controls-position="right"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拍摄开始日期" label-width="120px">
            <el-date-picker
              v-model="searchInfo.shootingStartAtStart"
              style="width: 100px"
              autocomplete="off"
            />~
            <el-date-picker
              v-model="searchInfo.shootingStartAtEnd"
              style="width: 100px;"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拍摄周期(天)" label-width="120px">
            <el-input-number
              v-model="searchInfo.shootingDurationStart"
              style="width: 100px;"
              controls-position="right"
              autocomplete="off"
            />~
            <el-input-number
              v-model="searchInfo.shootingDurationEnd"
              style="width: 100px;"
              controls-position="right"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="导演" label-width="120px">
            <el-select
              v-model="searchInfo.directorList"
              filterable
              style="width: 216px;"
              collapse-tags
              multiple
            >
              <el-option
                v-for="staff in allStaffs"
                :key="staff.id"
                :value="staff.id"
                :label="staff.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="执行导演" label-width="120px">
            <el-select
              v-model="searchInfo.executiveDirecrotList"
              filterable
              style="width: 216px;"
              collapse-tags
              multiple
            >
              <el-option
                v-for="staff in allStaffs"
                :key="staff.id"
                :value="staff.id"
                :label="staff.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="制作人" label-width="120px">
            <el-select
              v-model="searchInfo.producerList"
              clearable
              filterable
              style="width: 216px;"
              collapse-tags
              multiple
            >
              <el-option
                v-for="staff in allStaffs"
                :key="staff.id"
                :value="staff.id"
                :label="staff.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目负责人" label-width="120px">
            <el-select
              v-model="searchInfo.projectLeaderList"
              clearable
              filterable
              style="width: 216px;"
              collapse-tags
              multiple
            >
              <el-option
                v-for="staff in allStaffs"
                :key="staff.id"
                :value="staff.id"
                :label="staff.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户对接人" label-width="120px">
            <el-select
              v-model="searchInfo.customerManagerList"
              clearable
              filterable
              style="width: 216px;"
              collapse-tags
              multiple
            >
              <el-option
                v-for="staff in allStaffs"
                :key="staff.id"
                :value="staff.id"
                :label="staff.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="文案" label-width="120px">
            <el-select
              v-model="searchInfo.copyWritingList"
              clearable
              filterable
              style="width: 216px;"
              collapse-tags
              multiple
            >
              <el-option
                v-for="staff in allStaffs"
                :key="staff.id"
                :value="staff.id"
                :label="staff.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="后期剪辑" label-width="120px">
            <el-select
              v-model="searchInfo.postEditingList"
              filterable
              style="width: 216px;"
              collapse-tags
              multiple
            >
              <el-option
                v-for="staff in allStaffs"
                :key="staff.id"
                :value="staff.id"
                :label="staff.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="后期合成" label-width="120px">
            <el-select
              v-model="searchInfo.compositingList"
              filterable
              style="width: 216px;"
              collapse-tags
              multiple
            >
              <el-option
                v-for="staff in allStaffs"
                :key="staff.id"
                :value="staff.id"
                :label="staff.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="美术" label-width="120px">
            <el-select
              v-model="searchInfo.artList"
              filterable
              style="width: 216px;"
              collapse-tags
              multiple
            >
              <el-option
                v-for="staff in allStaffs"
                :key="staff.id"
                :value="staff.id"
                :label="staff.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="音乐" label-width="120px">
            <el-select
              v-model="searchInfo.musicList"
              filterable
              style="width: 216px;"
              collapse-tags
              multiple
            >
              <el-option
                v-for="staff in allStaffs"
                :key="staff.id"
                :value="staff.id"
                :label="staff.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分镜" label-width="120px">
            <el-select
              v-model="searchInfo.storyBoardList"
              filterable
              style="width: 216px;"
              collapse-tags
              multiple
            >
              <el-option
                v-for="staff in allStaffs"
                :key="staff.id"
                :value="staff.id"
                :label="staff.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="一级费用" label-width="120px">
            <el-select
              v-model="selectedFirstLevelFee"
              clearable
              filterable
              style="width: 216px;"
              collapse-tags
              multiple
            >
              <el-option
                v-for="item in firstFees"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="二级费用" label-width="120px">
            <el-select
              v-model="selectedSecondLevelFee"
              clearable
              filterable
              style="width: 216px;"
              collapse-tags
              multiple
            >
              <el-option
                v-for="item in secondFees"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商" label-width="120px">
            <el-select
              v-model="searchInfo.providerList"
              clearable
              filterable
              style="width: 216px;"
              collapse-tags
              multiple
            >
              <el-option
                v-for="item in allProviders"
                v-if="item.state === 0"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-button @click="onReset">重置</el-button>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button :loading="downloadLoading" type="primary" @click="onExport">导出</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table style="margin-top: 20px;" :data="searchList" :span-method="arraySpanMethod">
      <el-table-column prop="sid" label="项目编号" />
      <el-table-column prop="name" label="项目名称">
        <template scope="scope">
          <a style="color: blue;" :href="'#/detail/' + scope.row.id">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="项目执行状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.state | getStateName(projectState) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="contractSubjectId" label="项目合同主体">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.contractSubjectId | getContractsName(contractSubjects)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="contractAmount" label="项目合同金额" />
      <el-table-column prop="realCost" label="项目实际总成本" />
      <el-table-column
        v-if="searchInfo.returnAmountStart || searchInfo.returnAmountEnd"
        prop="returnAmount"
        label="项目回款金额"
      />
      <el-table-column
        v-if="searchInfo.budgetCostStart || searchInfo.budgetCostEnd"
        prop="budgetCost"
        label="项目预算总成本"
      />
      <el-table-column
        v-if="searchInfo.shootingBudgetCostStart || searchInfo.shootingBudgetCostEnd"
        prop="shootingBudget"
        label="项目拍摄预算"
      />
      <el-table-column
        v-if="searchInfo.shootingRealCostStart || searchInfo.shootingRealCostEnd"
        prop="shootingCost"
        label="项目拍摄成本"
      />
      <el-table-column
        v-if="searchInfo.lateStateBudgetCostStart || searchInfo.lateStateBudgetCostEnd"
        prop="lateStateBudget"
        label="项目后期预算"
      />
      <el-table-column
        v-if="searchInfo.lateStateRealCostStart || searchInfo.lateStateRealCostEnd"
        prop="lateStateCost"
        label="项目后期成本"
      />
      <el-table-column
        v-if="searchInfo.filmDurationMinuteStart || searchInfo.filmDurationMinuteEnd"
        prop="filmDuration"
        label="成片时长"
      />
      <el-table-column
        v-if="searchInfo.shootingStartAtStart || searchInfo.shootingStartAtEnd"
        prop="shootingStartAt"
        label="拍摄时间"
      />
      <el-table-column
        v-if="searchInfo.shootingDurationStart || searchInfo.shootingDurationEnd"
        prop="shootingDuration"
        label="拍摄周期"
      />
      <el-table-column
        v-if="searchInfo.budgetCostStart || searchInfo.budgetCostEnd"
        prop="budgetCost"
        label="项目预算总成本"
      />
      <el-table-column
        v-if="searchInfo.shootingBudgetCostStart || searchInfo.shootingBudgetCostEnd"
        prop="shootingBudget"
        label="项目拍摄预算"
      />
      <el-table-column
        v-if="searchInfo.shootingRealCostStart || searchInfo.shootingRealCostEnd"
        prop="shootingCost"
        label="项目拍摄成本"
      />
      <el-table-column
        v-if="searchInfo.lateStateBudgetCostStart || searchInfo.lateStateBudgetCostEnd"
        prop="lateStateBudget"
        label="项目后期预算"
      />
      <el-table-column
        v-if="searchInfo.lateStateRealCostStart || searchInfo.lateStateRealCostEnd"
        prop="lateStateCost"
        label="项目后期成本"
      />
      <el-table-column
        v-if="searchInfo.filmDurationMinuteStart || searchInfo.filmDurationMinuteEnd"
        prop="filmDuration"
        label="成片时长"
      />
      <el-table-column
        v-if="searchInfo.shootingStartAtStart || searchInfo.shootingStartAtEnd"
        prop="shootingStartAt"
        label="拍摄时间"
      />
      <el-table-column
        v-if="searchInfo.shootingDurationStart || searchInfo.shootingDurationEnd"
        prop="shootingDuration"
        label="拍摄周期"
      />
      <el-table-column v-if="searchInfo.companyId" prop="companyId" label="客户所属公司">
        <template scope="scope">{{ scope.row.companyId | getCompanyName(allCompanys) }}</template>
      </el-table-column>
      <el-table-column
        v-if="searchInfo.childCompanyId"
        prop="shootingDuration"
        label="客户所属子公司"
      >
        <template scope="scope">{{
          scope.row.childCompanyId | getCompanyName(allCompanys)
        }}</template>
      </el-table-column>
      <el-table-column
        v-if="searchInfo.projectLeaderList.length > 0"
        prop="projectLeaderList"
        label="项目负责人"
      />
      <el-table-column
        v-if="searchInfo.customerManagerList.length > 0"
        prop="customerManagerList"
        label="客户对接人"
      />
      <el-table-column
        v-if="searchInfo.executiveDirecrotList.length > 0"
        prop="executiveDirecrotList"
        label="执行导演"
      />
      <el-table-column
        v-if="searchInfo.copyWritingList.length > 0"
        prop="copyWritingList"
        label="文案"
      />
      <el-table-column
        v-if="searchInfo.postEditingList.length > 0"
        prop="postEditingList"
        label="后期剪辑"
      />
      <el-table-column
        v-if="searchInfo.compositingList.length > 0"
        prop="compositingList"
        label="后期合成"
      />
      <el-table-column v-if="searchInfo.artList.length > 0" prop="artList" label="美术" />
      <el-table-column v-if="searchInfo.musicList.length > 0" prop="musicList" label="音乐" />
      <el-table-column
        v-if="searchInfo.storyBoardList.length > 0"
        prop="storyBoardList"
        label="分镜"
      />
      <el-table-column v-if="searchInfo.directorList.length > 0" prop="directorList" label="导演" />
      <el-table-column v-if="searchInfo.producerList.length > 0" prop="producerList" label="制片" />

      <el-table-column
        v-if="
          selectedFirstLevelFee.length > 0 ||
            selectedSecondLevelFee.length > 0 ||
            searchInfo.providerList.length > 0
        "
        label="一级费用"
      >
        <el-table-column prop="categoryId" label="费用名称">
          <template scope="scope">{{ scope.row.categoryId | getFeeName(feeCategories) }}</template>
        </el-table-column>
        <el-table-column prop="budgetAmount" label="预算金额" />
        <el-table-column prop="realAmount" label="实际金额" />
      </el-table-column>
      <el-table-column
        v-if="selectedSecondLevelFee.length > 0 || searchInfo.providerList.length > 0"
        label="二级费用"
        style="text-align: center;"
      >
        <el-table-column prop="childCategoryId" label="费用名称">
          <template scope="scope">{{
            scope.row.childCategoryId | getFeeName(feeCategories)
          }}</template>
        </el-table-column>
        <el-table-column prop="childBudgetAmount" label="预算金额" />
        <el-table-column prop="childRealAmount" label="实际金额" />
      </el-table-column>
      <el-table-column v-if="searchInfo.providerList.length > 0" label="供应商" prop="providerName">
        <!-- <template scope="scope">{{ scope.row.providerId | getProviderName(allProviders) }}</template> -->
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePageChange" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { flattenDeep, findIndex } from 'lodash'
import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

export default {
  filters: {
    getFeeName(id, allFees) {
      if (id) {
        const fee = allFees.filter(fee => fee.id === id)
        return fee[0].name
      }
      return ''
    },
    getProviderName(id, allProviders) {
      if (id) {
        const provider = allProviders.filter(provider => provider.id === id)
        return provider[0].name
      }
      return ''
    },
    getStateName(state, states) {
      if (state && states.length) {
        const cur = states.filter(ctr => ctr.state === state)
        return cur[0].name
      }
      return ''
    },
    getContractsName(cId, contracts) {
      if (cId && contracts.length) {
        const contract = contracts.filter(ctr => ctr.id === cId)
        return contract[0].name
      }
      return ''
    },
    getCompanyName(cId, companys) {
      console.log(cId, companys)
      if (cId && companys.length) {
        const company = companys.filter(cpy => cpy.id === cId)
        return company[0].name
      }
      return ''
    }
  },
  data: function() {
    return {
      searchInfo: {
        directorList: [],
        producerList: [],
        projectLeaderList: [],
        customerManagerList: [],
        executiveDirecrotList: [],
        copyWritingList: [],
        postEditingList: [],
        compositingList: [],
        artList: [],
        musicList: [],
        storyBoardList: [],
        page: 1,
        pageSize: 10,
        states: [],
        providerList: []
      },
      feeGroups: [],
      searchList: [],
      spanArr: [],
      pos: 0,
      selectedFirstLevelFee: [],
      selectedSecondLevelFee: [],
      downloadLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'allStaffs',
      'allProviders',
      'feeCategories',
      'allCompanys',
      'total',
      'projectState',
      'contracts',
      'contractSubjects'
    ]),
    firstFees() {
      return this.feeCategories.filter(fee => fee.categoryType === 1)
    },
    secondFees() {
      return this.feeCategories.filter(fee => fee.categoryType === 2)
    },
    parentCompanys() {
      return this.allCompanys.filter(company => company.companyType === 1)
    },
    childCompanys() {
      return this.allCompanys.filter(company => company.companyType === 2)
    }
  },
  beforeMount() {
    this.getProjectState()
    this.getAllStaffs()
    this.getAllProviders()
    this.getAllCompanys()
    this.getContractSubjects()
    this.getFeeCategories().then(res => {
      const firstFees = res[1].filter(fee => fee.categoryType === 1)
      this.feeGroups = firstFees.map(firstFee => {
        return {
          label: firstFee.name,
          id: firstFee.id,
          value: res[1].filter(fee => {
            if (fee.parentCategoryId === firstFee.id) {
              return {
                id: fee.id,
                name: fee.name
              }
            }
          })
        }
      })
    })
  },
  methods: {
    ...mapActions([
      'getAllStaffs',
      'getAllProviders',
      'getAllCompanys',
      'getFeeCategories',
      'getProjectState',
      'getContractSubjects',
      'searchProject',
      'exportProject',
      'getProjectState',
      'getContractSubjects'
    ]),
    handlePageChange(page) {
      this.searchInfo.page = page
      this.searchProject(this.searchInfo).then(lists => {
        const newList = lists.map(list => {
          if (list.projectDetailList) {
            const { projectDetailList } = list
            return projectDetailList.map(pDetail => {
              return pDetail.childFeeList.map(childFee =>
                this.buildProjectRespWithFee(list, pDetail, childFee)
              )
            })
          } else {
            return this.buildProjectRespWithoutFee(list)
          }
        })
        this.searchList = flattenDeep(newList)
        console.log(this.searchList)
        this.getSpanArr()
      })
    },
    buildProjectRespWithFee(list, pDetail, childFee) {
      return {
        id: list.id,
        sid: list.sid,
        name: list.name,
        contractSubjectId: list.contractSubjectId,
        companyId: list.companyId,
        childCompanyId: list.childCompanyId,
        state: list.state,
        contractAmount: list.contractAmount,
        returnAmount: list.returnAmount,
        realCost: list.realCost,
        budgetCost: list.budgetCost,
        shootingBudget: list.shootingBudget,
        lateStateBudget: list.lateStateBudget,
        shootingCost: list.shootingCost,
        lateStateCost: list.lateStateCost,
        filmDuration: list.filmDuration,
        shootingStartAt: list.shootingStartAt,
        shootingDuration: list.shootingDuration,
        projectLeaderList: list.projectLeaderList,
        customerManagerList: list.customerManagerList,
        executiveDirecrotList: list.executiveDirecrotList,
        copyWritingList: list.copyWritingList,
        postEditingList: list.postEditingList,
        compositingList: list.compositingList,
        artList: list.artList,
        musicList: list.musicList,
        storyBoardList: list.storyBoardList,
        directorList: list.directorList,
        producerList: list.producerList,
        categoryId: pDetail.categoryId,
        budgetAmount: pDetail.budgetAmount,
        realAmount: pDetail.realAmount,
        childCategoryId: childFee.categoryId,
        childBudgetAmount: childFee.budgetAmount,
        childRealAmount: childFee.realAmount,
        providerName: childFee.providerName
      }
    },
    buildProjectRespWithoutFee(list) {
      return {
        id: list.id,
        sid: list.sid,
        name: list.name,
        contractSubjectId: list.contractSubjectId,
        state: list.state,
        companyId: list.companyId,
        childCompanyId: list.childCompanyId,
        contractAmount: list.contractAmount,
        returnAmount: list.returnAmount,
        realCost: list.realCost,
        budgetCost: list.budgetCost,
        shootingBudget: list.shootingBudget,
        lateStateBudget: list.lateStateBudget,
        shootingCost: list.shootingCost,
        lateStateCost: list.lateStateCost,
        filmDuration: list.filmDuration,
        shootingStartAt: list.shootingStartAt,
        shootingDuration: list.shootingDuration,
        projectLeaderList: list.projectLeaderList,
        customerManagerList: list.customerManagerList,
        executiveDirecrotList: list.executiveDirecrotList,
        copyWritingList: list.copyWritingList,
        postEditingList: list.postEditingList,
        compositingList: list.compositingList,
        artList: list.artList,
        musicList: list.musicList,
        storyBoardList: list.storyBoardList,
        directorList: list.directorList,
        producerList: list.producerList,
        categoryId: '',
        budgetAmount: '',
        realAmount: '',
        childCategoryId: '',
        childBudgetAmount: '',
        childRealAmount: ''
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (
        columnIndex === 0 ||
        columnIndex === 1 ||
        columnIndex === 2 ||
        columnIndex === 3 ||
        columnIndex === 4 ||
        columnIndex === 5 ||
        columnIndex === 6
      ) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    getSpanArr() {
      this.spanArr = []
      this.searchList.forEach((item, i) => {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          if (
            item.name === this.searchList[i - 1].name &&
            item.categoryId &&
            item.categoryId === this.searchList[i - 1].categoryId
          ) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      })
    },
    formatFee() {
      const newFeeList = []
      this.selectedFirstLevelFee.forEach(fee => {
        newFeeList.push({
          categoryType: 1,
          categoryId: fee
        })
      })

      this.selectedSecondLevelFee.forEach(fee => {
        const parentFee = this.feeCategories.filter(category => category.id === fee)
        const parentFeeId = parentFee[0].parentCategoryId
        const index = findIndex(newFeeList, fee => fee.categoryId === parentFeeId)
        if (index === -1) {
          newFeeList.push({
            categoryType: 2,
            categoryId: parentFeeId,
            childFeeCategoryList: [fee]
          })
        } else {
          if (!newFeeList[index].childFeeCategoryList) {
            newFeeList[index].childFeeCategoryList = []
          }
          newFeeList[index].childFeeCategoryList.push(fee)
        }
      })

      this.searchInfo.feeList = newFeeList
    },
    /**
     * 将搜索的成片时长由分钟转换成秒
     */
    formatFilmDurationStart() {
      if (this.searchInfo.filmDurationMinuteStart !== undefined) {
        this.searchInfo.filmDurationStart = this.searchInfo.filmDurationMinuteStart * 60
      } else {
        delete this.searchInfo.filmDurationStart
      }
      if (this.searchInfo.filmDurationMinuteEnd !== undefined) {
        this.searchInfo.filmDurationEnd = this.searchInfo.filmDurationMinuteEnd * 60
      } else {
        delete this.searchInfo.filmDurationEnd
      }
    },
    onReset() {
      this.searchInfo = {
        directorList: [],
        producerList: [],
        projectLeaderList: [],
        customerManagerList: [],
        executiveDirecrotList: [],
        copyWritingList: [],
        postEditingList: [],
        compositingList: [],
        artList: [],
        musicList: [],
        storyBoardList: [],
        page: 1,
        pageSize: 10,
        states: []
      }
    },
    onSearch() {
      this.formatFee()
      this.formatFilmDurationStart()
      this.searchProject(this.searchInfo).then((lists = []) => {
        const newList = lists.map(list => {
          if (list.projectDetailList) {
            const { projectDetailList } = list
            return projectDetailList.map(pDetail => {
              return pDetail.childFeeList.map(childFee =>
                this.buildProjectRespWithFee(list, pDetail, childFee)
              )
            })
          } else {
            return this.buildProjectRespWithoutFee(list)
          }
        })
        this.searchList = flattenDeep(newList)
        this.getSpanArr()
      })
    },
    onExport() {
      const service = axios.create({
        baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
        timeout: 20000 // request timeout
      })
      service.interceptors.request.use(
        config => {
          if (store.getters.token) {
            config.headers['X-Token'] = getToken()
          }
          return config
        },
        error => {
          return Promise.reject(error)
        }
      )

      service
        .post('project_search/export', this.searchInfo, {
          responseType: 'blob'
        })
        .then(resp => {
          const url = window.URL.createObjectURL(resp.data)
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', 'projects.xlsx')

          document.body.appendChild(link)
          link.click()
        })
    }
  }
}
</script>

<style>
.el-pagination {
  text-align: right;
  margin-top: 20px;
}
.baseinfo-header-row {
  display: none;
}
</style>
