<template>
  <div class="login-form">
    <Form ref="formLogin" :model="formLogin" :rules="ruleForm">
      <Form-item>
        <div class="form-title">
          <h1>后台登录</h1>
        </div>
      </Form-item>
      <Form-item v-if="loginMsg.code!=''">
        <div class="form-msg">
          <Alert :type="loginMsg.code=='200'?'success':'error'" show-icon closable>
            {{loginMsg.msg}}
          </Alert>
        </div>
      </Form-item>
      <Form-item prop="username">
        <Input type="text" v-model="formLogin.username" placeholder="Username">
        <Icon size="20" type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item prop="password">
        <Input type="password" v-model="formLogin.password" placeholder="Password">
        <Icon size="20" type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item prop="checkcode">
        <Input type="text" v-model="formLogin.checkcode" placeholder="验证码">
        <Icon size="20" type="image" slot="prepend"></Icon>
        <img id="captcha" :src="captchaSrc" slot="append" @click="changeCaptcha" />
        </Input>
      </Form-item>
      <Form-item>
        <Row type="flex" justify="start">
          <Col span="12">
          <Button type="success" @click="handleSubmit('formLogin')">登录</Button>
          </Col>
          <Col span="12" push="8">
          <Button @click="handleReset('formLogin')">重置</Button>
          </Col>
        </Row>
  
      </Form-item>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginMsg: {
        code: '',
        msg: ''
      },
      formLogin: {
        username: '',
        password: '',
        checkcode: ''
      },
      ruleForm: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ],
        checkcode: [
          { required: true, message: '请填写验证码!', trigger: 'blur' },
          { type: 'string', len: 5, message: '验证码错误！', trigger: 'blur' }
        ]
      },
      captchaSrc: 'http://localhost:80/images/kaptcha.jpg',
      control: false
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          //提交登录信息
          this.$store.dispatch('LoginSystem', this.formLogin).then(() => {
            this.loginMsg.code = 200;
            this.loginMsg.msg = '登录成功';
            setTimeout(() => {
              this.$router.push('/system/main');
            }, 1500);
          }).catch(error => {
            this.loginMsg.code = -1;
            this.loginMsg.msg =error.response?'登录失败! ':'登录失败! '+error; 
          })
        } else {
          console.log('error submit!');
          return false;
        }
      })
    },
    handleReset(name) {
      this.loginMsg = {
        code: '',
        msg: ''
      }
      this.$refs[name].resetFields();
    },
    changeCaptcha() {
      if (this.control) {
        clearTimeout(this.control);
      }
      this.control = setTimeout(() => {
        document.getElementById('captcha').src = this.captchaSrc + '?t=' + new Date().getTime();
      }, 600)
    }

  }
}
</script>
<style scoped>
.login-form {
  width: 400px;
  margin: 0 auto;
  margin-top: 200px;
  border: solid 1px rgba(45, 140, 240, .2);
  padding: 30px;
}

.form-title {
  text-align: center;
}

#captcha {
  height: 20px;
  width: 120px;
}
</style>
