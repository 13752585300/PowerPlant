/**
 * Name:后台数据访问
 * Author:Chris Ja
 * Date:2019/11/7
 */

import axios from 'axios'

const request=axios.create({
    //配置接口的地址
    baseURL:'http://localhost:8080'
});

export default request