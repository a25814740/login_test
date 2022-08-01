<template>
    <div class="row vertical" data-width="20rem">
        <el-input v-model="loginForm.username" type="text" placeholder="使用者名稱" required />
        <el-input v-model="loginForm.password" type="password" placeholder="密碼" required />
        <el-button type="primary" native-type="submit" @click="handleLogin">登入</el-button>
        <el-button @click="removeCookie">清除</el-button>
    </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
    name: "login",
    data() {
        return {
            loginForm: {
                username: '',
                password: '',
                token: ''
            }
        }
    },
    methods: {
        handleLogin() {
            const token = 'mskfijaiwejaoiwer'; // token本身就是加密過的字串，隨意
            let username = this.loginForm.username;
            let password = this.loginForm.password;
            if( username != '' && password != '' ) {
                this.loginForm.token = token;
            } else {
                alert('帳號密碼不可為空')
            }

            Cookies.set('login', JSON.stringify(this.loginForm), {expires: 1});
            console.log(this.loginForm);
            if( Cookies.get('login') && this.loginForm.token ) {
                this.$router.push({name: 'home'})
            }
        },
        removeCookie() {
            Cookies.remove('login');
        }
    }
}

</script>
