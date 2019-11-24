/**
* Name:登录组件
* Author:Chris Ja
* Date:2019/11/13
*/
<template>
    <div class="login-container">
        <div class="login-panel">
            <h2>用户登录</h2>
            <a-form ref="loginForm" :form="form">
                <a-form-item>
                    <a-input v-decorator="['account',{rules:[{required:true,message:'请输入用户名'}]}]"
                             placeholder="用户名"></a-input>
                </a-form-item>
                <a-form-item>
                    <a-input v-decorator="['password',{rules:[{required:true,message:'请输入密码'}]}]"
                             placeholder="密码"></a-input>
                </a-form-item>
                <a-form-item>
                    <a-checkbox v-decorator="['remember']">记住密码</a-checkbox>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" style="background-color: #5a37bc; width:100%" @click="onSubmit">登录
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script>
    import AFormItem from "ant-design-vue/es/form/FormItem";

    export default {
        name: "Login",
        data() {
            return {
                form:this.$form.createForm(this),
            }
        },
        components: {AFormItem},
        methods:{
            //登录事件
            onSubmit(){
                //1.验证表单内容
                this.form.validateFields(error => {
                    console.log(error);
                    if(!error){
                        //2.从表单中获取数据
                        let formValues = this.form.getFieldsValue(['account','password']);
                        if(typeof formValues != 'undefined'){
                            console.log(formValues);
                        }
                        //3.将数据传送至后台进行比较
                        this.$requet.get('LoginInfo',{params:formValues})
                            .then(response => {
                                console.log(response.data.length);
                                if(response.data.length === 1){
                                    this.$message.success("验证成功");
                                    this.$router.push({path:'/App'});
                                }else{
                                    this.$message.error("账号或密码错误");
                                }
                            })
                    }
                })
            }

        }
    }
</script>

<style lang="less">
    .login-container {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: #f0f0f0;
        background-image: url("../assets/img/background_01.png");
        background-repeat: no-repeat;
        background-position: top left;
        background-size: cover;
        min-height: 640px;
        min-width: 1120px;

        .login-panel {
            width: 30%;
            height: 40%;
            /*background-color: #007fe1;*/
            position: absolute;
            right: 5%;
            top: 25%;
            padding: 0 25px;

            > h2 {
                color: #5a37bc;
            }
        }
    }
</style>