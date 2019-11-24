/**
* Name:职务添加
* Author:Chris Ja
* Date:2019/11/7
*/
<template>
    <!--屏幕边缘滑出浮层面板-->
    <a-drawer title="新增职务"
              :mask-closable="false"
              width="500"
              placement="right"
              :visible="showDutyAddComponent"
              @close="onClose()">
        <a-form :form="form">
            <a-form-item label="职务名称" v-bind="formItemLayout" :label-col="{span:6}" :wrapper-col="{span:16}">
                <a-input v-decorator="['dutyName',{rules:[{required:true,message:'职务名称不得为空'}]}]"/>
            </a-form-item>
            <a-form-item label="备注" v-bind="formItemLayout" :label-col="{span:6}" :wrapper-col="{span:16}">
                <a-input v-decorator="['remark']"/>
            </a-form-item>
        </a-form>
        <div class="form-button-layout">
            <a-button style="margin-right: 8px" @click="onClose">
                <a-icon type="close"></a-icon>
                取消
            </a-button>
            <a-button type="primary" @click="onDutyAddSubmit">
                <a-icon type="check"></a-icon>
                提交
            </a-button>
        </div>
    </a-drawer>

</template>

<script>
    const formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 16}
    };

    export default {

        name: "DutyAdd",
        props: {
            showDutyAddComponent: {
                default: false
            }
        },
        data() {
            return {
                form: this.$form.createForm(this),
                formItemLayout,
                Dutymanagement: {}
            }
        },
        //使用this.$form.createForm封装后的组件，可以直接通过this.form属性获取表单属性
        // beforeCreate(){
        //     this.form=this.$form.createForm(this)
        // },
        methods: {
            //右侧关闭按钮点击事件
            onClose() {
                this.$emit("close")
            },
            //职务添加保存事件
            onDutyAddSubmit() {
                //1.验证表单内容
                this.form.validateFields(error => {
                    console.log(error);
                    if (!error) {
                        //2.从表单中获取提交数据
                        let formValues = this.form.getFieldsValue(['dutyName', 'createTime', 'updateTime', 'remark']);
                        if (typeof formValues != 'undefined') {
                            console.log(formValues);
                            Object.keys(formValues).forEach(key => {
                                this.Dutymanagement[key] = formValues[key]
                            })
                        }
                        //3.提交数据到后台
                        this.$requet.post('Dutymanagement', this.Dutymanagement)
                            .then(response => {
                                if (response.data === 1) {
                                    this.$message.success("添加成功");
                                    //4.通知父组件（职务列表）,刷新数据
                                    this.$emit('refresh');
                                    //5.清空表单输入内容
                                } else {
                                    this.$message.error("添加失败");
                                }
                            })
                    }
                })
            }
        }
    }
</script>

<style lang="less">
</style>