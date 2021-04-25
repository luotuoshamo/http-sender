/**
 * 功能：
 * GET 同步
 * GET 异步
 * POST 同步
 * POST 异步
 * 上传文件
 */
let HttpUtil = new Object()
HttpUtil.getAsync = getAsync
HttpUtil.getSync = getSync
HttpUtil.postAsync = postAsync
HttpUtil.postSync = postSync
HttpUtil.uploadFile = uploadFile

const CONTENT_TYPE_FORM = "application/x-www-form-urlencoded"

/**
 * 发GET同步请求
 * @param param {object} 例如 {name:'wjh', age: 10}
 */
function getSync(url, param) {
    // 处理请求参数
    if (!isBlank(param)) {
        let queryString = objectToQueryString(param)
        url += '?' + queryString
    }
    // 开启请求
    let httpRequest = new XMLHttpRequest()
    httpRequest.open("GET", url, false)
    // 发请求
    httpRequest.send()
    console.log(httpRequest)
    return {
        status: httpRequest.status,
        data: JSON.parse(httpRequest.response)
    }
}

/**
 * 发GET异步请求
 */
function getAsync(url, param, callBack) {
    // 处理请求参数
    if (!isBlank(param)) {
        let queryString = objectToQueryString(param)
        url += '?' + queryString
    }
    // 开启请求
    let httpRequest = new XMLHttpRequest()
    httpRequest.open("GET", url, true)
    // 发请求
    httpRequest.send()
    // 监听请求的响应结果
    httpRequest.onload = function (res) {
        callBack(JSON.parse(res.currentTarget.response))
    }
}

/**
 * 发POST同步请求
 * @param url
 * @param param {name:'wjh', gender:'male'}
 */
function postSync(url, param) {
    // 开启请求
    let httpRequest = new XMLHttpRequest()
    httpRequest.open("POST", url, false)
    // 设置请求头
    httpRequest.setRequestHeader("content-type", CONTENT_TYPE_FORM)
    // 发请求
    if (isBlank(param)) httpRequest.send()
    else httpRequest.send(objectToQueryString(param))

    return {
        status: httpRequest.status,
        data: JSON.parse(httpRequest.response)
    }
}

/**
 * 发POST异步请求
 */
function postAsync(url, param, callback) {
    // 开启请求
    let httpRequest = new XMLHttpRequest()
    httpRequest.open("POST", url, true)
    // 设置请求头
    httpRequest.setRequestHeader("content-type", CONTENT_TYPE_FORM)
    // 发请求
    if (isBlank(param)) httpRequest.send()
    else httpRequest.send(objectToQueryString(param))
    // 监听请求的响应结果
    httpRequest.onload = function (res) {
        callback(JSON.parse(res.currentTarget.response))
    }
}

/**
 * 将Object转成queryString
 *
 * 例如：将{name:wjh,gender:male} 转成 name=wjh&gender=male
 */
function objectToQueryString(obj) {
    if (isBlank(obj) || (typeof obj) != 'object') {
        return null
    }
    let queryString = ''
    for (let k in obj) {
        queryString += k + '=' + obj[k] + '&'
    }
    return queryString.substring(0, queryString.length - 1)
}

/**
 * 模拟并发
 *
 * @url {string} 测试并发的接口
 * @param {object}
 * @times 并发数
 * 建议后台:
 *@RequestMapping("/test")
 public String wlogin(String fromTag, String sendTime, HttpServletRequest request) throws Exception {
        Thread.sleep(2_000);
        // 服务端收到请求的时间
        SimpleDateFormat sdf = new SimpleDateFormat("hh:mm:ss");
        String receiveTime = sdf.format(new Date());
        // 该接口第几次被请求
        int calledTimes = ++i;
        // 请求id
        String requestString = request.toString();
        String requestId = requestString.substring(requestString.indexOf('@'));
        System.out.println(
                "==模拟并发"
                        + "from=" + fromTag
                        + ",sendTime=" + sendTime
                        + ",receiveTime=" + receiveTime
                        + ",calledTimes=" + calledTimes
                        + ",requestid=" + requestId
        );
        return "{name:'wjh',age:10,msg:'simulate concurence response data'}";
    }
 */
function simulateConcurence(url, fromFlag, times, callback) {
    for (let i = 0; i < times; i++) {
        let param = {
            fromTag: fromFlag,// 请求来自哪个设备
            sendTime: getTimeString(new Date()),// 客户端何时发出请求
        }
        postAsync(
            url,
            param,
            {'content-type': 'application/x-www-form-urlencoded'},
            callback
        )
    }
}

/**
 * 上传文件（POST异步）
 * 后端用file接收该文件（ uploadFile(MultipartFile file)）
 * @param data 附加的数据 格式：{name:'wjh',age:10}
 */
function uploadFile(file, url, callback, data) {
    let formData = new FormData()
    formData.append("file", file)
    for (let k in data) {
        formData.append(k, data[k])
    }
    // 开启请求
    let httpRequest = new XMLHttpRequest()
    httpRequest.open("POST", url, true)
    // 发请求
    httpRequest.send(formData)
    // 监听请求的响应结果
    httpRequest.onload = function (res) {
        callback(JSON.parse(res.currentTarget.response))
    }
}

/////////////httpUtil工具函数-start///////
/**
 * 判断变量是否为空
 *
 * @example  number     0-false, 1-false
 *           object     []-true, {}-true, {name:'wjh'}-false, [1,2,3]-false
 *           string     ''-true, '   '-true, 'wjh'-false
 *           undefined  false
 */
function isBlank(v) {
    let typeOfV = typeof v
    // string
    if (typeOfV === 'string') {
        return !(v && v.trim())
    }
    // object
    if (typeOfV === 'object') {
        let vString = JSON.stringify(v)
        return vString == '[]' || vString == '{}' || vString == 'null'
    }
    // number
    if (typeOfV === 'number') {
        return isBlank(v + '')
    }
    // undefined
    if (typeOfV === 'undefined') {
        return true
    }
    console.log('stringTool.isBlank:type of v is' + typeOfV +
        ' ,not in [string,number,object,undefined]')
}

/////////////httpUtil工具函数-end///////