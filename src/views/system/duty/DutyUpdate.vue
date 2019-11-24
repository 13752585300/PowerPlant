/**
* Name:职务修改
* Author:Chris Ja
* Date:2019/11/11
*/
<template>
    <div>
    <!--编辑对话模态框-->
    <a-modal
            title="修改当前数据"
            :visible="showDutyUpdateComponent"
            @ok="handleOk"
            @cancel="handleCancel"
            okText="提交"
            :confirmLoading="confirmLoading"
            width="800px">
        <a-form :form="form" layout="inline">
            <a-form-item label="职务名称" style="margin-left: 80px">
                <a-input id="zwmc" v-decorator="['dutyName',{rules:[{required:true,message:'请输入职务名称'}]}]"/>
            </a-form-item>

            <a-form-item label="备注" style="margin-left: 57px;">
                <a-input id="bz" v-decorator="['remark']"/>
            </a-form-item>
            <!--隐藏域(必要)-->
            <a-form-item>
                <a-input type="hidden" v-decorator="['dutyId']"/>
            </a-form-item>
        </a-form>
    </a-modal>
        {{updateValuecomponent}}
    </div>
</template>
<script>

    export default {
        name: "DutyUpdate",
        props:{
            showDutyUpdateComponent:{
                default:false
            },
            updateValuecomponent:{}
        },

        created(){
            setTimeout(() => {
                this.showModal()
            }, 0)

        },

        data(){
            return{
                //注册表单，进行赋值
                form: this.$form.createForm(this),
                //visible: false,
                confirmLoading: false,
            }
        },
        methods:{
            //职务修改模态框事件
            showModal() {
                //this.visible = true;
                //[1].延时获取表格中数据显示到表格中
                setTimeout(() => {
                    this.form.setFieldsValue({
                        dutyId: this.updateValuecomponent.dutyId,
                        dutyName: this.updateValuecomponent.dutyName,
                        remark: this.updateValuecomponent.remark
                    })
                },3000)
            },
            handleOk() {
                //[2].验证表单数据是赤正确
                this.form.validateFields(error=> {
                    if (!error) {
                        //[3].从表单中获取提交数据
                        this.Dutymanagement = this.form.getFieldsValue(['dutyName', 'remark', 'dutyId']);
                        if (typeof this.Dutymanagement != 'undefined') {
                            console.log(this.Dutymanagement);

                        }
                        //[4]提交数据到后台
                        this.$requet.put('Dutymanagement', this.Dutymanagement)
                            .then(response => {
                                console.log(response);
                                console.log(response.data);
                                if (response.data === 1) {
                                    this.$message.success("修改成功");
                                    //[5].刷新数据
                                    //从后端回去数据
                                    this.$emit('refresh');
                                } else {
                                    this.$message.error("修改失败");
                                }
                            });
                        this.confirmLoading = true;
                        setTimeout(() => {
                            this.showDutyUpdateComponent = false;
                            this.confirmLoading = false;
                        }, 0);
                    }
                })
            },
            fetchData() {
                this.$requet.get('Dutymanagement')
                    .then(response => {
                        this.dutyList = response.data;
                    })
            },
            handleCancel() {
                this.$emit("close");
                //this.$refs['form'].resetFields();
            },

        }
    }
</script>

<style scoped>

</style>