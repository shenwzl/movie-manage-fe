<!--
 * @Description: file content
 * @version: v1.0.0
 * @Company: tujia
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
            <el-input v-model="searchInfo.id" style="width: 216px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称" label-width="120px">
            <el-input v-model="searchInfo.name" style="width: 216px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目执行状态" label-width="120px">
            <el-select
              v-model="searchInfo.states"
              @change="onStateChange"
              style="width: 216px;"
              multiple
            >
              <el-option :value="0" label="全部"></el-option>
              <el-option :value="1" label="正常"></el-option>
              <el-option :value="2" label="禁用"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属公司" label-width="120px">
            <el-select filterable v-model="searchInfo.companyId" style="width: 216px;">
              <el-option
                v-for="company in parentCompanys"
                :key="company.id"
                :value="company.id"
                :label="company.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属子公司" label-width="120px">
            <el-select filterable v-model="searchInfo.companyChildId" style="width: 216px;">
              <el-option
                v-for="company in childCompanys"
                :key="company.id"
                :value="company.id"
                :label="company.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目合同金额(元)" label-width="120px">
            <el-input-number
              style="width: 100px"
              controls-position="right"
              v-model="searchInfo.contractAmountStart"
            ></el-input-number>~
            <el-input-number
              style="width: 100px"
              controls-position="right"
              v-model="searchInfo.contractAmountEnd"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目成本金额(元)" label-width="120px">
            <el-input-number
              style="width: 100px"
              controls-position="right"
              v-model="searchInfo.realCostStart"
            ></el-input-number>~
            <el-input-number
              style="width: 100px"
              controls-position="right"
              v-model="searchInfo.realCostEnd"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目预算金额(元)" label-width="120px">
            <el-input-number
              style="width: 100px"
              controls-position="right"
              v-model="searchInfo.budgetCostStart"
            ></el-input-number>~
            <el-input-number
              style="width: 100px"
              controls-position="right"
              v-model="searchInfo.budgetCostEnd"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成片时长(分)" label-width="120px">
            <el-input-number
              style="width: 100px"
              v-model="searchInfo.filmDurationMinuteStart"
              controls-position="right"
              autocomplete="off"
            />~
            <el-input-number
              style="width: 100px"
              v-model="searchInfo.filmDurationMinuteEnd"
              controls-position="right"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拍摄开始日期" label-width="120px">
            <el-date-picker
              style="width: 100px"
              v-model="searchInfo.shootingStartAtStart"
              autocomplete="off"
            />~
            <el-date-picker
              style="width: 100px;"
              v-model="searchInfo.shootingStartAtEnd"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拍摄周期(天)" label-width="120px">
            <el-input-number
              style="width: 100px;"
              v-model="searchInfo.shootingDurationStart"
              controls-position="right"
              autocomplete="off"
            />~
            <el-input-number
              style="width: 100px;"
              v-model="searchInfo.shootingDurationEnd"
              controls-position="right"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="导演" label-width="120px">
            <el-select
              filterable
              style="width: 216px;"
              v-model="searchInfo.directorList"
              collapse-tags
              @change="onDirectorChange"
              multiple
            >
              <el-option :value="0" label="全部"></el-option>
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
              filterable
              style="width: 216px;"
              v-model="searchInfo.producerList"
              collapse-tags
              @change="onProducerChange"
              multiple
            >
              <el-option :value="0" label="全部"></el-option>
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
              filterable
              style="width: 216px;"
              v-model="selectedFirstLevelFee"
              collapse-tags
              @change="onFeeChange"
              multiple
            >
              <el-option :value="0" label="全部"></el-option>
              <el-option
                v-for="item in firstFees"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="二级费用" label-width="120px">
            <el-select
              filterable
              style="width: 216px;"
              v-model="selectedSecondLevelFee"
              collapse-tags
              @change="onFeeChange"
              multiple
            >
              <el-option :value="0" label="全部"></el-option>
              <el-option
                v-for="item in secondFees"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-button @click="onSearch" type="primary">查询</el-button>
          <el-button @click="onExport" type="primary">导出</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table style="margin-top: 20px;" :data="searchList" :span-method="arraySpanMethod">
      <el-table-column prop="id" label="项目id" />
      <el-table-column prop="name" label="项目名称">
        <template scope="scope">
          <a style="color: blue;" :href="'#/detail/' + scope.row.id">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="项目执行状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.state | getStateName(projectState) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="项目合同主体">
        <template slot-scope="scope">
          <span
            style="margin-left: 10px"
          >{{ scope.row.contractSubjectId | getContractsName(contractSubjects) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="一级费用">
        <el-table-column prop="categoryId" label="费用名称">
          <template scope="scope">{{ scope.row.categoryId | getFeeName(feeCategories) }}</template>
        </el-table-column>
        <el-table-column prop="budgetAmount" label="预算金额"></el-table-column>
        <el-table-column prop="realAmount" label="实际金额"></el-table-column>
      </el-table-column>
      <el-table-column label="二级费用" style="text-align: center;">
        <el-table-column prop="childCategoryId" label="费用名称">
          <template scope="scope">{{ scope.row.childCategoryId | getFeeName(feeCategories) }}</template>
        </el-table-column>
        <el-table-column prop="childBudgetAmount" label="预算金额"></el-table-column>
        <el-table-column prop="childRealAmount" label="实际金额"></el-table-column>
      </el-table-column>
      <el-table-column label="供应商" prop="provider">
        <template scope="scope">{{ scope.row.providerId | getProviderName(allProviders) }}</template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePageChange" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { flattenDeep, findIndex } from "lodash";
import axios from "axios";
import store from "@/store";
import { getToken } from "@/utils/auth";

export default {
  data: function() {
    return {
      searchInfo: {
        directorList: [],
        producerList: [],
        page: 1,
        pageSize: 10,
        states: []
      },
      feeGroups: [],
      searchList: [],
      spanArr: [],
      pos: 0,
      selectedFirstLevelFee: [],
      selectedSecondLevelFee: []
    };
  },
  computed: {
    ...mapGetters([
      "allStaffs",
      "allProviders",
      "feeCategories",
      "allCompanys",
      "total",
      "projectState",
      "contractSubjects"
    ]),
    firstFees() {
      return this.feeCategories.filter(fee => fee.categoryType === 1);
    },
    secondFees() {
      return this.feeCategories.filter(fee => fee.categoryType === 2);
    },
    parentCompanys() {
      return this.allCompanys.filter(company => company.companyType === 1);
    },
    childCompanys() {
      return this.allCompanys.filter(company => company.companyType === 2);
    }
  },
  filters: {
    getFeeName(id, allFees) {
      if (id) {
        let fee = allFees.filter(fee => fee.id === id);
        return fee[0].name;
      }
      return "";
    },
    getProviderName(id, allProviders) {
      if (id) {
        let provider = allProviders.filter(provider => provider.id === id);
        return provider[0].name;
      }
      return "";
    },
    getStateName(state, states) {
      if (state && states.length) {
        const cur = states.filter(ctr => ctr.state === state);
        return cur[0].name;
      }
      return "";
    },
    getContractsName(cId, contracts) {
      if (cId && contracts.length) {
        const contract = contracts.filter(ctr => ctr.id === cId)
        return contract[0].name
      }
      return ''
    },
  },
  beforeMount() {
    this.getProjectState();
    this.getAllStaffs();
    this.getAllProviders();
    this.getAllCompanys();
    this.getContractSubjects()
    this.getFeeCategories().then(res => {
      const firstFees = res[1].filter(fee => fee.categoryType === 1);
      this.feeGroups = firstFees.map(firstFee => {
        return {
          label: firstFee.name,
          id: firstFee.id,
          value: res[1].filter(fee => {
            if (fee.parentCategoryId === firstFee.id) {
              return {
                id: fee.id,
                name: fee.name
              };
            }
          })
        };
      });
    });
  },
  methods: {
    ...mapActions([
      "getAllStaffs",
      "getAllProviders",
      "getAllCompanys",
      "getFeeCategories",
      "searchProject",
      "exportProject"
    ]),
    onStateChange(val) {
      if (val.includes(0)) {
        this.searchInfo.states = [1, 2];
      }
    },
    onDirectorChange(val) {
      if (val.includes(0)) {
        this.searchInfo.directorList = this.allStaffs.map(staff => staff.id);
      }
    },
    onProducerChange(val) {
      if (val.includes(0)) {
        this.searchInfo.producerList = this.allStaffs.map(staff => staff.id);
      }
    },
    onFeeChange(val) {
      if (val.includes(0)) {
        this.searchInfo.feeList = this.feeCategories.map(fee => fee.id);
      }
    },
    handlePageChange(page) {
      this.searchInfo.page = page;
      this.searchProject(this.searchInfo);
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (
        columnIndex === 0 ||
        columnIndex === 1 ||
        columnIndex === 2 ||
        columnIndex === 3 ||
        columnIndex === 4
      ) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    getSpanArr() {
      this.spanArr = [];
      this.searchList.forEach((item, i) => {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          if (
            item.name === this.searchList[i - 1].name &&
            item.categoryId &&
            item.categoryId === this.searchList[i - 1].categoryId
          ) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      });
      console.log(this.spanArr);
    },
    formatFee() {
      const newFeeList = [];

      this.selectedFirstLevelFee.forEach(fee => {
        newFeeList.push({
          categoryType: 1,
          categoryId: fee
        });
      });

      this.selectedSecondLevelFee.forEach(fee => {
        const parentFee = this.feeCategories.filter(
          category => category.id === fee
        );
        const parentFeeId = parentFee[0].parentCategoryId;
        const index = findIndex(
          newFeeList,
          fee => fee.categoryId === parentFeeId
        );
        if (index === -1) {
          newFeeList.push({
            categoryType: 2,
            categoryId: parentFeeId,
            childFeeCategoryList: [fee]
          });
        } else {
          if (!newFeeList[index].childFeeCategoryList) {
            newFeeList[index].childFeeCategoryList = [];
          }
          newFeeList[index].childFeeCategoryList.push(fee);
        }
      });

      this.searchInfo.feeList = newFeeList;
    },
    /**
     * 将搜索的成片时长由分钟转换成秒
     */
    formatFilmDurationStart() {
      if (this.searchInfo.filmDurationMinuteStart !== undefined) {
        this.searchInfo.filmDurationStart =
          this.searchInfo.filmDurationMinuteStart * 60;
      }
      if (this.searchInfo.filmDurationMinuteEnd !== undefined) {
        this.searchInfo.filmDurationEnd =
          this.searchInfo.filmDurationMinuteEnd * 60;
      }
    },
    onSearch() {
      this.formatFee();
      this.formatFilmDurationStart();
      this.searchProject(this.searchInfo).then((lists = []) => {
        const newList = lists.map(list => {
          if (list.projectDetailList) {
            let { projectDetailList } = list;
            return projectDetailList.map(pDetail => {
              return pDetail.childFeeList.map(childFee => ({
                id: list.id,
                name: list.name,
                categoryId: pDetail.categoryId,
                budgetAmount: pDetail.budgetAmount,
                realAmount: pDetail.realAmount,
                childCategoryId: childFee.categoryId,
                childBudgetAmount: childFee.budgetAmount,
                childRealAmount: childFee.realAmount
              }));
            });
          } else {
            return {
              id: list.id,
              name: list.name,
              categoryId: "",
              budgetAmount: "",
              realAmount: "",
              childCategoryId: "",
              childBudgetAmount: "",
              childRealAmount: ""
            };
          }
        });
        this.searchList = flattenDeep(newList);
        this.getSpanArr();
      });
    },
    onExport() {
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
        .post("project_search/export", this.searchInfo, {
          responseType: "blob"
        })
        .then(resp => {
          let url = window.URL.createObjectURL(resp.data);
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", "projects.xlsx");

          document.body.appendChild(link);
          link.click();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-pagination {
  text-align: right;
  margin-top: 20px;
}
</style>

