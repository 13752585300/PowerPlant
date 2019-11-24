/**
* Name:职务管理
* Author:Chris Ja
* Date:2019/11/7
*/
<template>
    <!--最外层卡片，用于包裹视图容器-->
    <a-card :bordered="false">
        <a-row type="flex">
            <!--搜索框-->
            <a-col span="5" style="margin-top: -16px;margin-right: 1%">
                <a-form :form="form">
                    <a-form-item>
                        <a-input v-decorator="['keyword']" placeholder="请输入职务名称"/>
                    </a-form-item>
                </a-form>
            </a-col>
            <!--开始时间插件-->
            <a-col span="4" style="margin-top: -16px">
                <a-form :form="form">
                    <a-form-item>
                        <a-date-picker v-decorator="['beginTime']" placeholder="请选择开始时间"></a-date-picker>
                    </a-form-item>
                </a-form>
            </a-col>
            <!--结束时间插件-->
            <a-col span="4" style="margin-top: -16px;">
                <a-form :form="form">
                    <a-form-item>
                        <a-date-picker v-decorator="['endTime']" use24Houplaceholder="请选择结束时间"></a-date-picker>
                    </a-form-item>
                </a-form>
            </a-col>
            <!--搜索按钮-->
            <a-col span="2" style="margin-top: -12px;float: right">
                <a-button type="default" @click="onDutySearch">
                    <a-icon type="search"></a-icon>
                    搜索
                </a-button>
                <br/>
            </a-col>

            <!--右侧添加按钮-->
            <a-col span="2" style="margin-top: -12px;margin-right: 1%">
                <a-button type="primary" @click="onShowDutyAddComponent">
                    <a-icon type="plus"></a-icon>
                    添加
                </a-button>
            </a-col>
            <!--上传按钮-->
            <!--<a-col span="2" style="margin-top: -12px;margin-right: 1%">
                <a-upload
                        name="file"
                        :multiple="true"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :headers="headers"
                        @change="handleChange">
                    <a-button>
                        <a-icon type="upload"/>
                        上传
                    </a-button>
                </a-upload>
            </a-col>-->
        </a-row>
        <!--表格-->
        <a-row>
            <a-col span="24">
                <!--antd的表格，用于展示数据。columns:绑定需要展示数据列,dataSource:绑定显示的数据源,pagination:分页显示,rowKey:表格行key的值-->
                <a-table :columns="columns"
                         :dataSource="dutyList"
                         :pagination="pagination"
                         :rowKey="Dutymanagement=>Dutymanagement.dutyId">
                    <template slot="action" slot-scope="text,record">
                        <a-button-group>
                            <a-button size="small" @click="showModal(record)">
                                <a-icon type="edit"></a-icon>
                                编辑
                            </a-button>
                            <a-button size="small" type="danger" @click="dutyDelete(record)">
                                <a-icon type="delete"></a-icon>
                                删除
                            </a-button>
                        </a-button-group>
                    </template>
                </a-table>
            </a-col>
        </a-row>

        <!--编辑对话模态框-->
        <a-modal
                title="修改当前数据"
                :visible="visible"
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

        <!--职务添加组件-->
        <DutyAdd :show-duty-add-component="dutyAdd.showComponent"
                 @close="onCloseDutyAddComponent"
                 @refresh="onDutySuccess"></DutyAdd>

        <!--&lt;!&ndash;职务修改组件&ndash;&gt;
        <duty-update :show-duty-update-component="dutyUpdate.showComponent"
                     :updateValuecomponent="this.updateValue"
                     @close="handleCancel"
                     @refresh="DutyUpdateSuccess">

        </duty-update>-->


    </a-card>
</template>

<script>
    import DutyAdd from "./DutyAdd"
    /*import DutyUpdate from "./DutyUpdate"*/
    import AFormItem from "ant-design-vue/es/form/FormItem";



    //定义在数据表格中需要显示的列

    const columns = [
        {
            title: '职务名称',
            dataIndex: 'dutyName',
            width: '15%'
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            width: '20%'
        }, {
            title: '更新时间',
            dataIndex: 'updateTime',
            width: '20%'
        }, {
            title: '备注',
            dataIndex: 'remark',
            width: '25%'
        }, {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: {
                customRender: 'action'
            }
        }
    ];
    export default {
        name: "Duty",
        //created()会在组件渲染之前执行
        created() {
            //从后台请求数据列表
            this.fetchData();
            debugger

        },
        components: {
            AFormItem,
            DutyAdd,
            /*DutyUpdate*/
        },
        data() {
            return {
                headers: {
                    authorization: 'authorization-text',
                },
                //注册表单，进行赋值
                form: this.$form.createForm(this),
                dutyList: [],
                columns,

                //职务添加组件
                dutyAdd: {
                    showComponent: false
                },
                /* //职务修改组件
                 dutyUpdate: {
                     showComponent: false
                 },*/
                Dutymanagement: {},
                //将搜索框中的数据存入对象中
                formValues: {},
                /*updateValue:{}*/

                //模态框
                visible: false,
                confirmLoading: false,

                //分页设置
                pagination: {
                    pageSizeOptions: ['10', '20', '30', '40', '50'],
                    defaultCurrent: 1,
                    defaultPageSize: 10,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    showTotal: (total, range) => `显示${range[0]}~${range[1]}条记录，共${total}条记录`
                },
            }
        },

        methods: {
            handleChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    this.$message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    this.$message.error(`${info.file.name} file upload failed.`);
                }
            },
            //职务修改模态框事件
            showModal(record) {
                this.visible = true;
                //[1].延时获取表格中数据显示到表格中
                setTimeout(() => {
                    this.form.setFieldsValue({
                        dutyId: record.dutyId,
                        dutyName: record.dutyName,
                        remark: record.remark
                    })
                })
            },
            handleOk() {
                //[2].验证表单数据是赤正确
                this.form.validateFields(error => {
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
                                    this.fetchData();
                                } else {
                                    this.$message.error("修改失败");
                                }
                            });
                        this.confirmLoading = true;
                        setTimeout(() => {
                            this.visible = false;
                            this.confirmLoading = false;
                        }, 0)
                    }
                })
            },
            handleCancel() {
                this.visible = false
            },

            //职务删除按钮点击事件
            dutyDelete(record) {
                this.$requet.delete(`Dutymanagement/${record.dutyId}`)
                    .then(response => {
                        if (response.data === 1) {
                            this.$message.success("删除成功");
                            this.dutyList = response.data;
                            this.fetchData();
                        } else {
                            this.$message.error("删除失败");
                        }
                    })
            },

            //职务添加按钮点击事件
            onShowDutyAddComponent() {
                //通过修改data中dutyAdd.showDutyAdd的值来控制a-drawer的显示与隐藏
                this.dutyAdd.showComponent = true
            },
            //关闭职务添加组件
            onCloseDutyAddComponent() {
                this.dutyAdd.showComponent = false
            },
            //职务添加成功回调事件
            onDutySuccess() {
                this.fetchData();
                this.dutyAdd.showComponent = false;
            },
            /*//关闭职务修改组件
            handleCancel(){
                this.dutyUpdate.showComponent = false;
            },
            DutyUpdateSuccess(){
                this.fetchData();
                this.dutyUpdate.showComponent = false;
            },

            showModal(record){
                this.dutyUpdate.showComponent = true;
                console.log(this.dutyUpdate.showComponent);
                this.updateValue = record;
                console.log(this.updateValue)
            },*/

            //职务精确查询点击事件
            onDutySearch() {
                //[1]从表单获取输入数据
                // var beginTimes = this.form.getFieldsValue(['beginTime']);
                // console.log(beginTimes);
                // console.log(this.$moment.format('2019-11-16'));
                let formValues = this.form.getFieldsValue(['keyword','beginTime','endTime']);
                if (typeof formValues != 'undefined') {
                    console.log(formValues);
                }
                //[2].提交数据到后台进行查询
                this.$requet.get('Dutymanagement', {params: formValues})
                    .then(response => {
                        console.log(response.data.length);
                        if (response.data.length === 1) {
                            this.dutyList = response.data;
                            this.$message.success("查询成功");
                        } else {
                            this.fetchData();
                        }
                    })
            },
            //从后端回去数据
            fetchData() {
                this.$requet.get('Dutymanagement')
                    .then(response => {
                        this.dutyList = response.data;
                    })
            },
        }
    }
</script>

<style scoped>

</style>