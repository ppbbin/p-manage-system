<template>
  <div class="main" style="padding: 20px">
    <el-form :model="form" label-width="120">
      <h3>后台管理系统</h3>
      <el-form-item>
        <el-input v-model="form.username" placeholder="用户名" autofocus></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$http.post('api/permission/getMenu', this.form).then(res => {
        res = res.data
        if (res.code === 20000) {
          // 先清除侧边栏菜单，以免用户二次登录
          this.$store.commit('clearMenu')
          // tab分页初始化
          this.$store.commit('clearTabList')
          // 设置侧边栏菜单
          this.$store.commit('setMenu', res.data.menu)
          this.$store.commit('setToken', res.data.token)
          this.$store.commit('addMenu', this.$router)
          this.$router.push({ name: 'home' })
        } else {
          this.$message.warning(res.data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin: 0;
  padding: 0;
  height: 100vh;
  background: url('../../assets/images/login_bg.png') no-repeat;
  background-size: cover;
}

.el-form {
  background-color: #000;
  z-index: 1;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  padding: 0 45px 30px 45px;
  text-align: center;
  border-radius: 10px;
  opacity: 0.9;
  h3 {
    color: #fff;
    font-size: 28px;
    font-weight: 500;
    text-align: center;
    text-transform: uppercase;
    margin: 23px;
  }
  /deep/ .el-input__inner {
    height: 100%;
    outline: 0;
    background: none;
    font-size: 15px;
    color: #fff;
    text-align: center;
    margin-bottom: 10px;
    padding: 15px;
    box-sizing: border-box;
    border: 2.5px solid #2e86de;
    border-radius: 10px;
    transition: 0.5s;
    transition-property: width;
  }
  button {
    border: none;
    outline: none;
    font-size: 16px;
    color: #fff;
    background-color: #2e86de;
    padding: 15px 20px;
    cursor: pointer;
    border-radius: 10px;
  }
  button:hover {
    transform: scale(1.1);
  }
}
</style>
