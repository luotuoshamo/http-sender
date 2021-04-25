/**
 * ���ܣ�
 * GET ͬ��
 * GET �첽
 * POST ͬ��
 * POST �첽
 * �ϴ��ļ�
 */
let HttpUtil = new Object()
HttpUtil.getAsync = getAsync
HttpUtil.getSync = getSync
HttpUtil.postAsync = postAsync
HttpUtil.postSync = postSync
HttpUtil.uploadFile = uploadFile

const CONTENT_TYPE_FORM = "application/x-www-form-urlencoded"

/**
 * ��GETͬ������
 * @param param {object} ���� {name:'wjh', age: 10}
 */
function getSync(url, param) {
    // �����������
    if (!isBlank(param)) {
        let queryString = objectToQueryString(param)
        url += '?' + queryString
    }
    // ��������
    let httpRequest = new XMLHttpRequest()
    httpRequest.open("GET", url, false)
    // ������
    httpRequest.send()
    console.log(httpRequest)
    return {
        status: httpRequest.status,
        data: JSON.parse(httpRequest.response)
    }
}

/**
 * ��GET�첽����
 */
function getAsync(url, param, callBack) {
    // �����������
    if (!isBlank(param)) {
        let queryString = objectToQueryString(param)
        url += '?' + queryString
    }
    // ��������
    let httpRequest = new XMLHttpRequest()
    httpRequest.open("GET", url, true)
    // ������
    httpRequest.send()
    // �����������Ӧ���
    httpRequest.onload = function (res) {
        callBack(JSON.parse(res.currentTarget.response))
    }
}

/**
 * ��POSTͬ������
 * @param url
 * @param param {name:'wjh', gender:'male'}
 */
function postSync(url, param) {
    // ��������
    let httpRequest = new XMLHttpRequest()
    httpRequest.open("POST", url, false)
    // ��������ͷ
    httpRequest.setRequestHeader("content-type", CONTENT_TYPE_FORM)
    // ������
    if (isBlank(param)) httpRequest.send()
    else httpRequest.send(objectToQueryString(param))

    return {
        status: httpRequest.status,
        data: JSON.parse(httpRequest.response)
    }
}

/**
 * ��POST�첽����
 */
function postAsync(url, param, callback) {
    // ��������
    let httpRequest = new XMLHttpRequest()
    httpRequest.open("POST", url, true)
    // ��������ͷ
    httpRequest.setRequestHeader("content-type", CONTENT_TYPE_FORM)
    // ������
    if (isBlank(param)) httpRequest.send()
    else httpRequest.send(objectToQueryString(param))
    // �����������Ӧ���
    httpRequest.onload = function (res) {
        callback(JSON.parse(res.currentTarget.response))
    }
}

/**
 * ��Objectת��queryString
 *
 * ���磺��{name:wjh,gender:male} ת�� name=wjh&gender=male
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
 * ģ�Ⲣ��
 *
 * @url {string} ���Բ����Ľӿ�
 * @param {object}
 * @times ������
 * �����̨:
 *@RequestMapping("/test")
 public String wlogin(String fromTag, String sendTime, HttpServletRequest request) throws Exception {
        Thread.sleep(2_000);
        // ������յ������ʱ��
        SimpleDateFormat sdf = new SimpleDateFormat("hh:mm:ss");
        String receiveTime = sdf.format(new Date());
        // �ýӿڵڼ��α�����
        int calledTimes = ++i;
        // ����id
        String requestString = request.toString();
        String requestId = requestString.substring(requestString.indexOf('@'));
        System.out.println(
                "==ģ�Ⲣ��"
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
            fromTag: fromFlag,// ���������ĸ��豸
            sendTime: getTimeString(new Date()),// �ͻ��˺�ʱ��������
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
 * �ϴ��ļ���POST�첽��
 * �����file���ո��ļ��� uploadFile(MultipartFile file)��
 * @param data ���ӵ����� ��ʽ��{name:'wjh',age:10}
 */
function uploadFile(file, url, callback, data) {
    let formData = new FormData()
    formData.append("file", file)
    for (let k in data) {
        formData.append(k, data[k])
    }
    // ��������
    let httpRequest = new XMLHttpRequest()
    httpRequest.open("POST", url, true)
    // ������
    httpRequest.send(formData)
    // �����������Ӧ���
    httpRequest.onload = function (res) {
        callback(JSON.parse(res.currentTarget.response))
    }
}

/////////////httpUtil���ߺ���-start///////
/**
 * �жϱ����Ƿ�Ϊ��
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

/////////////httpUtil���ߺ���-end///////