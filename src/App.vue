<template>
    <a-locale-provider :locale="zh_CN">
        <div id="app">
            <!--整体布局-->
            <a-layout id="components-layout-demo-custom-trigger" style="height: 100%">
                <!--侧边导航-->
                <a-layout-sider :trigger="null" collapsible v-model="collapsed">
                    <div class="logo">
                        Power System
                    </div>
                    <a-menu theme="dark" mode="inline" :inlineCollapsed="collapsed" :default-active="activeIndex"
                            @select="handleSelect" router style="margin-top: 50px">
                        <a-sub-menu key="system management">
                            <span slot="title"><a-icon type="setting"></a-icon><span>系统管理</span></span>
                        <a-menu-item key="1">
                            <a-icon type="project"></a-icon>
                            <span @click="skip('dept')">部门管理</span>
                        </a-menu-item>
                        <a-menu-item key="2">
                            <a-icon type="gold"></a-icon>
                            <span @click="skip('duty')">职务管理</span>
                        </a-menu-item>
                        <a-menu-item key="3">
                            <a-icon type="gold"></a-icon>
                            <span @click="skip('loginlog')">登录日志管理</span>
                        </a-menu-item>
                        </a-sub-menu>
                    </a-menu>
                </a-layout-sider>
                <!--头部内容-->
                <a-layout>
                    <a-layout-header style="background: #FFF; padding: 0">
                        <a-icon class="trigger"
                                :type="collapsed?'menu-unfold':'menu-fold'"
                                @click="toggleCollapsed">
                        </a-icon>
                    </a-layout-header>
                    <!--主操作区-->
                    <a-layout-content :style="{ margin:'10px 10px',padding:'0px',background:'#FFF',minHeight:'280px'}">
                        <router-view></router-view>
                    </a-layout-content>
                </a-layout>
            </a-layout>
        </div>
    </a-locale-provider>
</template>

<script>
    import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
    import ALayoutSider from "ant-design-vue/es/layout/Sider";


    export default {
        components: {ALayoutSider},
        data() {
            return {
                zh_CN,
                //侧边导航是否展开
                collapsed: false,

            }
        },
        computed: {
            activeIndex() {
                return this.$route.path.replace('/', '')
            }
        },
        methods: {
            toggleCollapsed() {
                this.collapsed = !this.collapsed
            },
            handleSelect(key, keyPath) {
                console.log(this);
                console.log(key, keyPath);
            },
            skip(a) {
                this.$router.push(a)
            }
        }
    }

</script>

<style lang="less">
    * {
        margin: 0;
        padding: 0;
    }

    html, body, #app {
        height: 100%;
    }

    /*#components-layout-demo-custom-trigger{
        width: 100%;
    }*/
    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }

    #components-layout-demo-custom-trigger .logo {
        height: 32px;
        font-size: 22px;
        line-height: 32px;
        color: white;
        text-align: center;
        padding-top: 15px;
        padding-right: 8px;
    }
</style>
