<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span>{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item>
            <div @click="resetPwdDialog = true">重置密码</div>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <div @click="logout">退出</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="重置密码" :visible.sync="resetPwdDialog">
      <el-form ref="passwordForm" :model="newPassword" :rules="passwordRules">
        <el-row>
          <el-col :span="10">
            <el-form-item prop="newPwd" label="新密码" label-width="120px">
              <el-input ref="newPwd" tabindex="1" name="newPwd" v-model="newPassword.newPwd" show-password autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetPwdDialog = false">取 消</el-button>
        <el-button type="primary" :loading="editLoading" @click="resetPwd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getName } from '@/utils/auth'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data: function() {
    const validatePassword = (rule, value, callback) => {
      console.log(value)
      if (value.length < 6) {
        callback(new Error('密码长度不能小于6'))
      } else {
        callback()
      }
    }
    return {
      resetPwdDialog: false,
      newPassword: {
        newPwd: ''
      },
      editLoading: false,
      passwordRules: {
        newPwd: [{ required: true, trigger: 'blur', validator: validatePassword }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
    ]),
    name() {
      return getName('name')
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    resetPwd() {
      this.$refs.passwordForm.validate(async valid => {
        if (valid) {
          this.editLoading = true
          await this.$store.dispatch('user/resetPwd', { password: this.newPassword.newPwd })
          this.editLoading = false
          this.resetPwdDialog = false
          this.newPwd = ''
          this.$message.success('更新成功')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
