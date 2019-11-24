/**
* Name:登录日志组件
* Author:Chris Ja
* Date:2019/11/14
*/
<template>
    <!--最外层卡片，用于包裹视图容器-->
    <a-card :bordered="false">
        <a-row type="flex">
            <!--搜索框-->
            <a-col span="5">
                <a-form :form="form">
                    <a-form-item>
                        <a-input v-decorator="['account']" placeholder="请输入登录账号"></a-input>
                    </a-form-item>
                </a-form>
            </a-col>
            <!--开始时间插件-->
            <a-col span="4">
                <a-form :form="form">
                    <a-form-item>
                        <a-date-picker v-decorator="['beginTime']" placeholder="请选择开始时间"></a-date-picker>
                    </a-form-item>
                </a-form>
            </a-col>
            <!--结束时间插件-->
            <a-col span="4">
                <a-form :form="form">
                    <a-form-item>
                        <a-date-picker v-decorator="['endTime']" placeholder="请选择结束时间"></a-date-picker>
                    </a-form-item>
                </a-form>
            </a-col>
            <!--搜索按钮-->
            <a-col span="2">
                <a-button type="default" @click="onLoginLogSearch">
                    <a-icon type="search"></a-icon>
                    搜索
                </a-button>
            </a-col>
        </a-row>
        <!--表格部分-->
        <a-row>
            <a-col span="24">

            </a-col>
        </a-row>
    </a-card>
</template>

<script>
    import AFormItem from "ant-design-vue/es/form/FormItem";
    export default {
        name: "LoginLog",
        components: {AFormItem}
    }
</script>

<style scoped>

</style>