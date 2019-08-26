<!--
 * @Description: file content
 * @version: v1.0.0
 * @Author: SHENZHI
 * @Date: 2019-07-01 19:00:11
 * @LastEditors: SHENZHI
 * @LastEditTime: 2019-08-11 12:13:10
 -->
<template>
  <div class="dashboard-container">
    <el-form v-if="step === '1'" ref="baseInfoForm" :model="baseInfo" :rules="baseInfoRules">
      <h3>基本信息</h3>
      <el-row style="border: 1px solid #EBEEF5;">
        <el-col :span="24">
          <span class="label-info">项目名称</span>
          <el-form-item class="item-info" prop="name">
            <el-input v-model="baseInfo.name" style="width: 180px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <span class="label-info">项目编号</span>
          <el-form-item class="item-info" prop="sid">
            <el-input v-model="baseInfo.sid" style="width: 180px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <span class="label-info">合同主体</span>
          <el-form-item class="item-info" prop="contractSubjectId">
            <el-select v-model="baseInfo.contractSubjectId" autocomplete="off">
              <el-option
                v-for="contract in contractSubjects"
                :key="contract.id"
                v-if="contract.state === 0"
                :label="contract.name"
                :value="contract.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <span class="label-info">成片时长</span>   
          <el-form-item prop="minute" class="item-info">
            <el-input-number
              style="width: 100px;" 
              :min="0"
              v-model="baseInfo.minute"
              controls-position="right"
              autocomplete="off"
            />
          </el-form-item>
          <span style="margin-right: 15px;">分</span>
          <el-form-item prop="second">
            <el-input-number
              style="width: 100px;"              
              :min="0"
              v-model="baseInfo.second"
              controls-position="right"
              autocomplete="off"
            />
          </el-form-item>
          <span>秒</span>
        </el-col>
        <el-col :span="24">
          <span class="label-info">拍摄开始日期</span>
          <el-form-item style="margin-left: 152px;" prop="shootingStartAt" class="item-info">
            <el-date-picker v-model="baseInfo.shootingStartAt" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <span class="label-info">拍摄周期</span>
          <el-form-item prop="shootingDuration" class="item-info">
            <el-input-number
              :min="1"
              v-model="baseInfo.shootingDuration"
              controls-position="right"
              autocomplete="off"
            />
            <span>天</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <span class="label-info">客户公司</span>
          <el-form-item prop="childCompanyId" class="item-info">
            <el-select v-model="baseInfo.childCompanyId">
              <el-option
                v-for="item in allCompanys"
                :key="item.id"
                :value="item.id"
                :label="item.name"
                v-if="item.companyType === 2 && item.state === 0"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <span class="label-info">项目合同金额</span>
          <el-form-item style="margin-left: 152px;" class="item-info" prop="contractAmount">
            <el-input-number v-model="baseInfo.contractAmount" style="width: 180px;" :min="0" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <span class="label-info">项目回款金额</span>
          <el-form-item style="margin-left: 152px;" class="item-info" prop="returnAmount">
            <el-input-number :min="0" v-model="baseInfo.returnAmount" style="width: 180px;" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col v-for="mType in memberTypes" :key="mType.type" :span="24">
          <span class="label-info" style="width: 500px;display: inline-block;">{{ mType.name }}</span>
          <el-button
            class="add-button"
            type="text"
            @click="addMemberType(mType.type)"
          >{{`添加${mType.name}`}}</el-button>
          <el-col
            :span="18"
            :offset="4"
            v-for="(pMember, i) in baseInfo.projectMembers"
            :key="pMember.id"
          >
            <el-col :span="6" style="margin-right: 20px;">
              <el-form-item
                v-if="pMember.memberType === mType.type"
                style="margin-left: 84px;"
                :prop="'projectMembers.' + i + '.ascriptionType'"
                :rules="{ required: true, message: '员工类型不能为空' }"
              >
                <el-select v-model="pMember.ascriptionType">
                  <el-option :value="1" label="内部员工" />
                  <el-option :value="2" label="外部员工" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                v-if="pMember.memberType === mType.type && pMember.ascriptionType === 1"
                :prop="'projectMembers.' + i + '.staffId'"
                :rules="{ required: true, message: '员工不能为空' }"
              >
                <el-select v-model="pMember.staffId">
                  <el-option
                    v-for="staff in insideStaffs"
                    v-if="staff.state === 0"
                    :key="staff.id"
                    :value="staff.id"
                    :label="staff.name"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="pMember.memberType === mType.type && pMember.ascriptionType === 2"
                :prop="'projectMembers.' + i + '.staffId'"
                :rules="{ required: true, message: '员工不能为空' }"
              >
                <el-select v-model="pMember.staffId">
                  <el-option
                    v-for="staff in externalStaffs"
                    v-if="staff.state === 0"
                    :key="staff.id"
                    :value="staff.id"
                    :label="staff.name"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-button
                v-if="pMember.memberType === mType.type"
                :key="pMember.id"
                class="delete-button"
                type="danger"
                size="small"
                style="margin-left: 20px;"
                @click="handleBaseDelete(i)"
              >删除</el-button>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
    <el-form v-if="step === '2'" ref="shootingInfoForm" :model="feeInfo">
      <h3>拍摄费用</h3>
      <el-table
        :data="feeInfo.shootingInfo"
        border
        :span-method="arraySpanMethod"
        empty-text="加载中..."
      >
        <el-table-column prop="feeCategoryId" label="一级费用">
          <template scope="scope">
            <div>{{scope.row.feeCategoryId | getFeeName(feeCategories)}}</div>
            <div>总预算金额：{{ scope.row.feeCategoryId | getBudget(feeInfo.shootingInfo) }}</div>
            <div>总金额：{{ scope.row.feeCategoryId | getRealAmount(feeInfo.shootingInfo) }}</div>
            <el-button type="text" @click="handleAddShooting(scope.row)">添加二级费用</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="feeChildCategoryId" label="二级费用">
          <template scope="scope">
            <el-form-item
              :prop="'shootingInfo.' + scope.$index + '.feeChildCategoryId'"
              :rules="{ required: true, message: '二级费用不能为空' }"
            >
              <el-select
                v-model="scope.row.feeChildCategoryId"
                style="width: 130px;"
                @focus="onBlur(scope.row.feeCategoryId)"
                width="200"
                autocomplete="off"
              >
                <el-option
                  v-for="fee in secondFees"
                  v-if="fee.state === 0"
                  :key="fee.id"
                  :value="fee.id"
                  :label="fee.name"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="providerId" label="供应商">
          <template scope="scope">
            <el-form-item
              :prop="'shootingInfo.' + scope.$index + '.providerId'"
              :rules="{ required: scope.row.realAmount !== 0, message: '供应商不能为空' }"
            >
              <el-select
                v-model="scope.row.providerId"
                style="width: 130px;"
                width="200"
                autocomplete="off"
              >
                <el-option
                  v-for="provider in allProviders"
                  v-if="provider.state === 0"
                  :key="provider.id"
                  :value="provider.id"
                  :label="provider.name"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="budgetAmount" label="预算金额">
          <template scope="scope">
            <el-form-item
              :prop="'shootingInfo.' + scope.$index + '.budgetAmount'"
              :rules="{ required: true, message: '预算金额不能为空' }"
            >
              <el-input-number
                v-model="scope.row.budgetAmount"
                controls-position="right"
                :min="0"
                autocomplete="off"
                style="width: 130px;"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="realAmount" label="实际金额">
          <template scope="scope">
            <el-form-item
              :prop="'shootingInfo.' + scope.$index + '.realAmount'"
              :rules="{ required: true, message: '实际金额不能为空' }"
            >
              <el-input-number
                style="width: 130px;"
                v-model="scope.row.realAmount"
                :min="0"
                controls-position="right"
                autocomplete="off"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
          <template scope="scope">
            <el-input type="textarea" v-model="scope.row.remark"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="rankScore" label="评分">
          <template scope="scope">
            <el-input-number
              style="width: 100px;"
              controls-position="right"
              v-model="scope.row.rankScore"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="70px">
          <template scope="scope">
            <el-button
              type="danger"
              size="small"
              @click="handleDeleteShooting(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-form v-if="step === '3'" ref="lastInfoForm" :model="feeInfo">
      <h3>后期费用</h3>
      <el-table
        :data="feeInfo.lastStateInfo"
        border
        :span-method="arrayLastMethod"
        empty-text="加载中..."
      >
        <el-table-column prop="feeCategoryId" label="一级费用">
          <template scope="scope">
            <div>{{scope.row.feeCategoryId | getFeeName(feeCategories)}}</div>
            <div>总预算金额：{{ scope.row.feeCategoryId | getBudget(feeInfo.lastStateInfo) }}</div>
            <div>总金额：{{ scope.row.feeCategoryId | getRealAmount(feeInfo.lastStateInfo) }}</div>
            <el-button type="text" @click="handleAddLast(scope.row)">添加二级费用</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="feeChildCategoryId" label="二级费用">
          <template scope="scope">
            <el-form-item
              :prop="'lastStateInfo.' + scope.$index + '.feeChildCategoryId'"
              :rules="{ required: true, message: '二级费用不能为空' }"
            >
              <el-select
                v-model="scope.row.feeChildCategoryId"
                style="width: 100px;"
                @focus="onBlur(scope.row.feeCategoryId)"
                width="200"
                autocomplete="off"
              >
                <el-option
                  v-for="fee in secondFees"
                  :key="fee.id"
                  :value="fee.id"
                  :label="fee.name"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="providerId" label="供应商">
          <template scope="scope">
            <el-form-item
              :prop="'lastStateInfo.' + scope.$index + '.providerId'"
              :rules="{ required: scope.row.realAmount !== 0, message: '供应商不能为空' }"
            >
              <el-select
                v-model="scope.row.providerId"
                style="width: 100px;"
                width="200"
                autocomplete="off"
              >
                <el-option
                  v-for="provider in allProviders"
                  :key="provider.id"
                  :value="provider.id"
                  :label="provider.name"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="budgetAmount" label="预算金额">
          <template scope="scope">
            <el-form-item
              :prop="'lastStateInfo.' + scope.$index + '.budgetAmount'"
              :rules="{ required: true, message: '预算金额不能为空' }"
            >
              <el-input-number
                :min="0"
                v-model="scope.row.budgetAmount"
                controls-position="right"
                autocomplete="off"
                style="width: 100px;"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="realAmount" label="实际金额">
          <template scope="scope">
            <el-form-item
              :prop="'lastStateInfo.' + scope.$index + '.realAmount'"
              :rules="{ required: true, message: '实际金额不能为空' }"
            >
              <el-input-number
                :min="0"
                style="width: 100px;"
                v-model="scope.row.realAmount"
                controls-position="right"
                autocomplete="off"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
          <template scope="scope">
            <el-input type="textarea" v-model="scope.row.remark"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="rankScore" label="评分">
          <template scope="scope">
            <el-input-number
              :min="0"
              :max="100"
              style="width: 100px;"
              controls-position="right"
              v-model="scope.row.rankScore"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              type="danger"
              size="small"
              @click="handleDeleteLast(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-button
      class="save-button"
      v-if="step === '1'"
      type="primary"
      :loading="editLoading"
      @click="editProject"
    >保存</el-button>
    <el-button class="add-button-info" v-if="step === '2'" @click="addShootingInfo">添加一级费用</el-button>
    <el-button
      class="save-button"
      v-if="step === '2'"
      type="primary"
      :loading="editLoading"
      @click="editShootingInfo"
    >保存</el-button>
    <el-button class="add-button-info" v-if="step === '3'" @click="addLastInfo">添加一级费用</el-button>
    <el-button
      class="save-button"
      v-if="step === '3'"
      type="primary"
      :loading="editLoading"
      @click="editLastStateInfo"
    >保存</el-button>
    <el-button
      v-if="canAddStaff && step === '1'"
      class="add-new"
      @click="createStaffDialog = true"
      type="primary"
    >新增员工</el-button>
    <el-dialog title="新增员工" :visible.sync="createStaffDialog">
      <el-form ref="createForm" :model="newStaff" :rules="staffRules">
        <el-form-item prop="name" label="姓名" label-width="200px">
          <el-row>
            <el-col :span="20">
              <el-input v-model="newStaff.name" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="cellphone" label="电话" label-width="200px">
          <el-row>
            <el-col :span="20">
              <el-input v-model="newStaff.cellphone" autocomplete="off" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="ascription" label="员工类型" label-width="200px">
          <el-row>
            <el-col :span="20">
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
    <el-dialog title="新增一级费用" v-if="step === '2'" :visible.sync="firstShootingFeeVisible">
      <el-select v-model="fisrtShootingFee">
        <el-option
          v-for="fee in firstShootingFee"
          :disabled="feeDisabled(feeInfo.shootingInfo, fee.id)"
          :key="fee.id"
          :value="fee.id"
          :label="fee.name"
        />
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="firstShootingFeeVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFirstShootingFee">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增一级费用" v-if="step === '3'" :visible.sync="firstLastFeeVisible">
      <el-select v-model="fisrtLastFee">
        <el-option
          v-for="fee in firstLastFee"
          :disabled="feeDisabled(feeInfo.lastStateInfo, fee.id)"
          :key="fee.id"
          :value="fee.id"
          :label="fee.name"
        />
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="firstLastFeeVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFirstLastFee">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { hasPermission } from "@/utils/auth";
import { find, reduce } from "lodash";

export default {
  name: "Dashboard",
  data: function() {
    return {
      createLoading: false,
      editLoading: false,
      baseInfo: {
        sid: "",
        name: "",
        contractSubjectId: 0,
        filmDuration: 3, // 单位：秒
        shootingStartAt: "",
        shootingDuration: "",
        contractAmount: 0,
        returnAmount: 0,
        childCompanyId: "",
        projectMembers: [
          {
            id: 0,
            projectId: 0,
            memberType: "",
            staffId: 0
          }
        ]
      },
      feeInfo: {
        shootingInfo: [],
        lastStateInfo: []
      },
      secondFees: [],
      baseInfoRules: {
        // sid: [{ required: true, message: "编号不能为空" }],
        // name: [{ required: true, message: "名称不能为空" }],
        // contractSubjectId: [{ required: true, message: "合同主体不能为空" }],
        // filmDuration: [{ required: true, message: "成片时长不能为空" }],
        // shootingStartAt: [{ required: true, message: "拍摄开始日期不能为空" }],
        // shootingDuration: [{ required: true, message: "拍摄周期不能为空" }],
        // contractAmount: [{ required: true, message: "项目合同金额不能为空" }],
        // returnAmount: [{ required: true, message: "项目回款金额不能为空" }],
        // ascriptionType: [{ required: true, message: "员工类型不能为空" }],
        // staffId: [{ required: true, message: "员工不能为空" }],
        // childCompanyId: [{ required: true, message: "客户公司不能为空" }]
      },
      shootingInfoRules: {
        feeCategoryId: [{ required: true, message: "一级费用项不能为空" }],
        feeChildCategoryId: [{ required: true, message: "二级费用项不能为空" }],
        budgetAmount: [{ required: true, message: "预算金额不能为空" }],
        realAmount: [{ required: true, message: "实际金额为空" }],
        rankScore: [{ required: true, message: "评分不能为空" }]
      },
      newStaff: {
        name: "",
        cellphone: "",
        ascription: ""
      },
      staffRules: {
        name: [{ required: true, message: "名称不能为空" }],
        cellphone: [{ required: true, message: "电话不能为空" }],
        ascription: [{ required: true, message: "员工类型不能为空" }]
      },
      createStaffDialog: false,
      shootingArr: [],
      lastArr: [],
      firstShootingFeeVisible: false,
      firstLastFeeVisible: false,
      fisrtShootingFee: "",
      fisrtLastFee: ""
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
    // 一级拍摄费用
    firstShootingFee() {
      return this.feeCategories.filter(
        fee => fee.categoryType === 1 && fee.stage === 1
      );
    },
    // 1级后期费用
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
    canAddStaff() {
      return hasPermission("staff", "manage");
    }
  },
  beforeMount() {
    this.getAllProviders();
    this.getAllCompanys();
    this.getFeeCategories().then(() => (this.secondFees = this.feeCategories));
    this.getContractSubjects();
    this.getAllStaffs();
    this.getMemberTypes();
    this.step === "1" &&
      this.getBaseInfo(this.pId).then(res => {
        res.data.projectMembers.forEach(pMember => {
          const { staffId } = pMember;
          const staff = this.allStaffs.filter(aStaff => aStaff.id === staffId);
          pMember.ascriptionType = staff[0].ascription;
        });
        res.data.minute = Math.floor(res.data.filmDuration / 60);
        res.data.second = res.data.filmDuration % 60;
        this.baseInfo = res.data;
      });
    this.step === "2" &&
      this.getShootingInfo(this.pId).then(res => {
        this.feeInfo.shootingInfo = res.data.projectFees;
        this.feeInfo.shootingInfo.sort(
          (a, b) => a.feeCategoryId - b.feeCategoryId
        );
        this.getSpanArr();
      });
    this.step === "3" &&
      this.getLastStateInfo(this.pId).then(res => {
        this.feeInfo.lastStateInfo = res.data.projectFees;
        this.feeInfo.lastStateInfo.sort(
          (a, b) => a.feeCategoryId - b.feeCategoryId
        );
        this.getLastArr();
      });
  },
  filters: {
    getFeeName(id, fees) {
      const fee = fees.filter(f => f.id === id);
      return fee[0].name;
    },
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
      "addStaff",
      "getAllCompanys"
    ]),
    onMinChange(val) {
      this.baseInfo.filmDuration =
        parseInt(val * 60) + parseInt(this.baseInfo.second);
    },
    onSecChange(val) {
      this.baseInfo.filmDuration =
        parseInt(this.baseInfo.minute) + parseInt(val);
    },
    feeDisabled(fees, id) {
      const hasFee = find(fees, fee => fee.feeCategoryId === id);
      if (hasFee) {
        return hasFee.length !== 0;
      } else {
        return false;
      }
    },
    handleDeleteShooting(index) {
      this.feeInfo.shootingInfo.splice(index, 1);
      this.feeInfo.shootingInfo.sort(
        (a, b) => a.feeCategoryId - b.feeCategoryId
      );
      this.feeInfo.shootingInfo.forEach((sInfo, i) => (sInfo.index = i));
      this.getSpanArr();
    },
    handleAddShooting(record) {
      this.feeInfo.shootingInfo.push({
        feeCategoryId: record.feeCategoryId,
        feeChildCategoryId: "",
        providerId: "",
        realAmount: 0,
        budgetAmount: 0,
        remark: "",
        rankScore: ""
      });
      this.feeInfo.shootingInfo.sort(
        (a, b) => a.feeCategoryId - b.feeCategoryId
      );
      this.feeInfo.shootingInfo.forEach((sInfo, i) => (sInfo.index = i));
      this.getSpanArr();
    },
    addFirstShootingFee() {
      this.feeInfo.shootingInfo.push({
        feeCategoryId: this.fisrtShootingFee,
        feeChildCategoryId: "",
        providerId: "",
        realAmount: 0,
        budgetAmount: 0,
        remark: "",
        rankScore: ""
      });
      this.feeInfo.shootingInfo.sort(
        (a, b) => a.feeCategoryId - b.feeCategoryId
      );
      this.getSpanArr();
      this.firstShootingFeeVisible = false
      this.fisrtShootingFee = ''
    },
    addFirstLastFee() {
      this.feeInfo.lastStateInfo.push({
        feeCategoryId: this.firstLastFee,
        feeChildCategoryId: "",
        providerId: "",
        realAmount: 0,
        budgetAmount: 0,
        remark: "",
        rankScore: ""
      });
      this.feeInfo.lastStateInfo.sort(
        (a, b) => a.feeCategoryId - b.feeCategoryId
      );
      this.getLastArr();
      this.firstLastFeeVisible = false;
      this.fisrtLastFee = ''
    },
    handleDeleteLast(index) {
      this.feeInfo.lastStateInfo.splice(index, 1);
      this.feeInfo.lastStateInfo.sort(
        (a, b) => a.feeCategoryId - b.feeCategoryId
      );
      this.getLastArr();
    },
    handleAddLast(record) {
      this.feeInfo.lastStateInfo.push({
        feeCategoryId: record.feeCategoryId,
        feeChildCategoryId: "",
        providerId: "",
        realAmount: 0,
        budgetAmount: 0,
        remark: "",
        rankScore: ""
      });
      this.feeInfo.lastStateInfo.sort(
        (a, b) => a.feeCategoryId - b.feeCategoryId
      );
      this.getLastArr();
    },
    editProject() {
      this.$refs.baseInfoForm.validate(valid => {
        if (valid) {
          this.editLoading = true;
          this.baseInfo.filmDuration =
            parseInt(this.baseInfo.minute * 60) +
            parseInt(this.baseInfo.second);
          const company = find(
            this.allCompanys,
            cpy => cpy.id === this.baseInfo.childCompanyId
          );
          if (company != undefined){
            this.baseInfo.companyId = company.parentCompanyId;
          }
          this.saveBaseInfo({
            baseInfo: this.baseInfo,
            pId: this.pId
          }).then(res => {
            this.editLoading = false;
            this.$message.success("更新成功");
            window.location.href = "/#/";
          });
        }
      });
    },
    addMemberType(id) {
      const projectMembers = this.baseInfo.projectMembers;
      projectMembers.push({
        projectId: this.pId,
        memberType: id,
        staffId: "",
        ascriptionType: 1
      });
      this.baseInfo.projectMembers = projectMembers;
    },
    editShootingInfo() {
      this.$refs.shootingInfoForm.validate(valid => {
        if (valid) {
          this.editLoading = true;
          this.saveShootingInfo({
            shootingInfo: this.feeInfo.shootingInfo,
            pId: this.pId
          }).then(res => {
            this.editLoading = false;
            this.$message.success("更新成功");
            window.location.href = "/#/";
          });
        }
      });
    },
    editLastStateInfo() {
      this.$refs.lastInfoForm.validate(valid => {
        if (valid) {
          this.editLoading = true;
          this.saveLastStateInfo({
            lastStateInfo: this.feeInfo.lastStateInfo,
            pId: this.pId
          }).then(res => {
            this.$message.success("更新成功");
            this.editLoading = false;
            window.location.href = "/#/";
          });
        }
      });
    },
    createStaff() {
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.createLoading = true;
          this.addStaff(this.newStaff).then(res => {
            this.createStaffDialog = false;
            this.createLoading = false;
            this.$message.success("添加成功");
            this.newStaff = {};
            this.getAllStaffs();
          });
        }
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
    },
    addShootingInfo() {
      this.firstShootingFeeVisible = true;
    },
    addLastInfo() {
      this.firstLastFeeVisible = true;
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 8) {
        const _row = this.shootingArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    arrayLastMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 8) {
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
      this.feeInfo.shootingInfo.forEach((item, i) => {
        if (i === 0) {
          this.shootingArr.push(1);
          this.pos = 0;
        } else {
          if (
            item.feeCategoryId ===
            this.feeInfo.shootingInfo[i - 1].feeCategoryId
          ) {
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
      this.feeInfo.lastStateInfo.forEach((item, i) => {
        if (i === 0) {
          this.lastArr.push(1);
          this.pos = 0;
        } else {
          if (
            item.feeCategoryId ===
            this.feeInfo.lastStateInfo[i - 1].feeCategoryId
          ) {
            this.lastArr[this.pos] += 1;
            this.lastArr.push(0);
          } else {
            this.lastArr.push(1);
            this.pos = i;
          }
        }
      });
    }
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
.add-button-info {
  margin-top: 20px;
  margin-left: 20px;
}
.add-new {
  position: fixed;
  bottom: 20px;
  left: 230px;
}
.el-col-24 {
  border-bottom: 1px solid #ebeef5;
  padding-top: 10px;
  min-height: 60px;
  position: relative;
}
.el-form-item__label {
  border-right: 1px solid #ebeef5;
  margin-right: 20px;
}
.el-form-item {
  display: inline-block;
}
.item-info {
  display: inline-block;
  margin-left: 183px;
}
.label-info {
  margin-right: 20px;
  margin-left: 20px;
}
.add-button {
  position: absolute;
  top: 20px;
  left: 20px;
  margin-bottom: 5px;
}
.delete-button {
  margin-top: 32px;
}
.delete-button:first-child {
  margin-top: 0;
}
</style>
