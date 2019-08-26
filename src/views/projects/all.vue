<!--
 * @Description: file content
 * @version: v1.0.0
 * @Author: SHENZHI
 * @Date: 2019-07-01 19:00:18
 * @LastEditors: SHENZHI
 * @LastEditTime: 2019-08-11 00:19:25
 -->
<template>
  <div class="dashboard-container">
    <el-button type="primary" @click="exportProject">导出</el-button>
    <div class="base-info">
      <h3>基本信息</h3>
      <el-row>
        <el-col :span="12">
          <el-table
            row-class-name="info-table-row"
            header-row-class-name="baseinfo-header-row"
            size="mini"
            border
            :data="baseInfo"
          >
            <el-table-column prop="label"></el-table-column>
            <el-table-column prop="value"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="12">
        <div class="shooting-info">
          <h3>拍摄费用</h3>
          <el-table
            row-class-name="info-table-row"
            size="mini"
            :data="shootingInfo"
            border
            :span-method="arraySpanMethod"
          >
            <el-table-column prop="feeCategoryId" label="一级费用">
              <template scope="scope">
                <div>{{scope.row.feeCategoryId | getFeeName(feeCategories)}}</div>
                <div>总预算金额：{{ scope.row.feeCategoryId | getBudget(shootingInfo) }}</div>
                <div>总金额：{{ scope.row.feeCategoryId | getRealAmount(shootingInfo) }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="feeChildCategoryId" label="二级费用">
              <template scope="scope">{{scope.row.feeChildCategoryId | getFeeName(feeCategories)}}</template>
            </el-table-column>
            <el-table-column prop="providerId" label="供应商">
              <template scope="scope">{{scope.row.providerId | getProviderName(allProviders)}}</template>
            </el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="rankScore" label="评分"></el-table-column>
            <el-table-column prop="budgetAmount" label="预算金额"></el-table-column>
            <el-table-column prop="realAmount" label="实际金额"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="12" style="padding-left: 10px;">
        <div class="last-info">
          <h3>后期费用</h3>
          <el-table
            row-class-name="info-table-row"
            size="mini"
            :data="lastStateInfo"
            border
            :span-method="arraySpanMethod"
          >
            <el-table-column prop="feeCategoryId" label="一级费用">
              <template scope="scope">
                <div>{{scope.row.feeCategoryId | getFeeName(feeCategories)}}</div>
                <div>总预算金额：{{ scope.row.feeCategoryId | getBudget(lastStateInfo) }}</div>
                <div>总金额：{{ scope.row.feeCategoryId | getRealAmount(lastStateInfo) }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="feeChildCategoryId" label="二级费用">
              <template scope="scope">{{scope.row.feeChildCategoryId | getFeeName(feeCategories)}}</template>
            </el-table-column>
            <el-table-column prop="providerId" label="供应商">
              <template scope="scope">{{scope.row.providerId | getProviderName(allProviders)}}</template>
            </el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="rankScore" label="评分"></el-table-column>
            <el-table-column prop="budgetAmount" label="预算金额"></el-table-column>
            <el-table-column prop="realAmount" label="实际金额"></el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { hasPermission } from "@/utils/auth";
import { reduce } from "lodash";
import axios from "axios";
import store from "@/store";
import { getToken } from "@/utils/auth";

export default {
  name: "Dashboard",
  data: function() {
    return {
      editLoading: false,
      baseInfo: {
        name: "",
        contractSubjectId: 0,
        filmDuration: 3, // 单位：秒
        shootingStartAt: "",
        shootingDuration: "",
        projectMembers: [
          {
            id: 0,
            projectId: 0,
            memberType: "",
            staffId: 0
          }
        ]
      },
      shootingInfo: [],
      lastStateInfo: [],
      secondFees: [],
      shootingArr: [],
      lastArr: []
    };
  },
  computed: {
    ...mapGetters([
      "contractSubjects",
      "memberTypes",
      "allStaffs",
      "feeCategories",
      "allProviders",
      "allCompanys"
    ]),
    // 内部员工
    insideStaffs() {
      return this.allStaffs.filter(staff => staff.ascription === 1);
    },
    // 外部员工
    externalStaffs() {
      return this.allStaffs.filter(staff => staff.ascription === 2);
    },
    firstShootingFee() {
      return this.feeCategories.filter(
        fee => fee.categoryType === 1 && fee.stage === 1
      );
    },
    firstLastFee() {
      return this.feeCategories.filter(
        fee => fee.categoryType === 1 && fee.stage === 2
      );
    },
    pId() {
      return this.$route.params.projectId;
    },
    step() {
      return this.$route.params.step;
    },
    canViewBaseInfo() {
      return hasPermission("project_base_info", "view");
    },
    canViewShootingInfo() {
      return hasPermission("project_shooting_info", "view");
    },
    canViewLastInfo() {
      return hasPermission("project_last_state_info", "view");
    }
  },
  beforeMount() {
    this.getAllCompanys();
    this.getAllProviders();
    this.getFeeCategories();
    this.getContractSubjects();
    this.getAllStaffs();
    this.getMemberTypes();
    this.getBaseInfo(this.pId).then(res => {
      const data = res.data;
      const baseInfo = [
        { label: "项目编号", value: data.sid },
        { label: "项目名称", value: data.name },
        {
          label: "合同主体",
          value: this.getContractName(
            data.contractSubjectId,
            this.contractSubjects
          )
        },
        {
          label: "成片时长",
          value: data.filmDuration && `${data.filmDuration}秒`
        },
        { label: "拍摄开始日期", value: data.shootingStartAt },
        {
          label: "拍摄周期",
          value: data.shootingDuration && `${data.shootingDuration}天`
        },
        {
          label: "客户所属公司一级",
          value:
            data.childCompanyId &&
            this.getCompanyName(data.companyId, this.allCompanys)
        },
        {
          label: "客户所属公司一级",
          value:
            data.childCompanyId &&
            this.getCompanyName(data.childCompanyId, this.allCompanys)
        },
        { label: "项目合同金额", value: data.contractAmount },
        { label: "项目回款金额", value: data.returnAmount },
        { label: "项目预算总成本", value: data.budgetCost },
        { label: "项目实际总成本", value: data.realCost },
        { label: "项目拍摄预算", value: data.shootingBudget },
        { label: "项目后期预算", value: data.lateStateBudget },
        { label: "项目拍摄成本", value: data.shootingCost },
        { label: "项目后期成本", value: data.lateStateCost }
      ];
      const members = this.memberTypes.map(memberType => {
        const projectMember = data.projectMembers.filter(
          pMem => pMem.memberType === memberType.type
        );
        return {
          label: memberType.name,
          value: projectMember
            .map(pMember => this.getFeeName(pMember.staffId, this.allStaffs))
            .join(",")
        };
      });
      baseInfo.push(...members);
      this.baseInfo = baseInfo;
    });
    this.getShootingInfo(this.pId).then(res => {
      this.shootingInfo = res.data.projectFees;
      this.shootingInfo.sort((a, b) => a.feeCategoryId - b.feeCategoryId);
      this.getSpanArr();
    });
    this.getLastStateInfo(this.pId).then(res => {
      this.lastStateInfo = res.data.projectFees;
      this.lastStateInfo.sort((a, b) => a.feeCategoryId - b.feeCategoryId);
      this.getLastArr();
    });
  },
  filters: {
    getBudget(id, lists) {
      return reduce(
        lists,
        (sum, item) => {
          if (item.feeCategoryId === id) {
            return sum + item.budgetAmount;
          }
          return sum;
        },
        0
      );
    },
    getRealAmount(id, lists) {
      return reduce(
        lists,
        (sum, item) => {
          if (item.feeCategoryId === id) {
            return sum + item.realAmount;
          }
          return sum;
        },
        0
      );
    },
    getStaff(id, staffs) {
      const staff = staffs.filter(stf => stf.id === id);
      return staff[0].name;
    },
    getFeeName(id, fees) {
      const fee = fees.filter(f => f.id === id);
      return fee[0].name;
    },
    getProviderName(id, providers) {
      if (id) {
        const provider = providers.filter(f => f.id === id);
        return provider[0].name;
      }
      return "";
    }
  },
  methods: {
    ...mapActions([
      "getContractSubjects",
      "saveProjects",
      "getMemberTypes",
      "getAllStaffs",
      "getAllProviders",
      "getFeeCategories",
      "getBaseInfo",
      "saveBaseInfo",
      "getShootingInfo",
      "saveShootingInfo",
      "getLastStateInfo",
      "saveLastStateInfo",
      "getAllCompanys"
    ]),
    exportProject() {
      const service = axios.create({
        baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
        timeout: 20000 // request timeout
      });
      service.interceptors.request.use(
        config => {
          if (store.getters.token) {
            config.headers["X-Token"] = getToken();
          }
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );

      service
        .post(
          "projects/" + this.pId + "/export_detail",
          {},
          {
            responseType: "blob"
          }
        )
        .then(resp => {
          let url = window.URL.createObjectURL(resp.data);
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", "project_detail.xlsx");

          document.body.appendChild(link);
          link.click();
        });
    },
    getCompanyName(id, companys) {
      if (id) {
        const company = companys.filter(ctr => ctr.id === id);
        return company[0].name;
      }
      return "";
    },
    getFeeName(id, fees) {
      const fee = fees.filter(f => f.id === id);
      return fee[0].name;
    },
    getContractName(id, contracts) {
      if (id) {
        const contract = contracts.filter(ctr => ctr.id === id);
        return contract[0].name;
      }
      return "";
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.shootingArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    arrayLastMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.lastArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    getSpanArr() {
      this.shootingArr = [];
      this.shootingInfo.forEach((item, i) => {
        if (i === 0) {
          this.shootingArr.push(1);
          this.pos = 0;
        } else {
          if (item.feeCategoryId === this.shootingInfo[i - 1].feeCategoryId) {
            this.shootingArr[this.pos] += 1;
            this.shootingArr.push(0);
          } else {
            this.shootingArr.push(1);
            this.pos = i;
          }
        }
      });
    },
    getLastArr() {
      this.lastArr = [];
      this.lastStateInfo.forEach((item, i) => {
        if (i === 0) {
          this.lastArr.push(1);
          this.pos = 0;
        } else {
          if (item.feeCategoryId === this.lastStateInfo[i - 1].feeCategoryId) {
            this.lastArr[this.pos] += 1;
            this.lastArr.push(0);
          } else {
            this.lastArr.push(1);
            this.pos = i;
          }
        }
      });
      console.log(this.lastArr);
    },
    editProject() {
      this.editLoading = true;
      this.saveBaseInfo({
        baseInfo: this.baseInfo,
        pId: this.pId
      }).then(res => {
        this.editLoading = false;
        this.step++;
      });
    },
    addMemberType(id) {
      this.baseInfo.projectMembers.push({
        projectId: this.pId,
        memberType: id,
        staffId: 0,
        ascriptionType: 1
      });
    },
    editShootingInfo() {
      this.editLoading = true;
      this.saveShootingInfo({
        shootingInfo: this.shootingInfo,
        pId: this.pId
      }).then(res => {
        this.editLoading = false;
        this.step++;
      });
    },
    editLastStateInfo() {
      this.editLoading = true;
      this.saveLastStateInfo({
        lastStateInfo: this.lastStateInfo,
        pId: this.pId
      }).then(res => {
        this.$message.success("更新成功");
        this.editLoading = false;
      });
    },
    onBlur(id) {
      this.secondFees = this.feeCategories.filter(
        fee => fee.parentCategoryId === id
      );
    },
    handleBaseDelete(i) {
      this.$confirm("确定删除这条记录吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.baseInfo.projectMembers.splice(i, 1);
      });
    },
    handleShootingDelete(i) {
      this.$confirm("确定删除这条记录吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.shootingInfo.splice(i, 1);
      });
    },
    handleLastDelete(i) {
      this.$confirm("确定删除这条记录吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.lastStateInfo.splice(i, 1);
      });
    }
  },
  mounted() {
    this.secondFees = this.feeCategories;
  }
};
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
.el-table td {
  padding: 3px 0 !important;
  font-size: 12px !important;
}
</style>
