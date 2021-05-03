/**
 * ���ڹ���
 */
let DateUtil = new Object()

/**��ȡĳ���µ�����*/
DateUtil.daysOfMonth = function (year, month) {
    let date = new Date(year, month, 0)
    return date.getDate()
};

/**��ǰʱ��*/
DateUtil.currentDate = function () {
    return new Date()
}
/**��ǰ��*/
DateUtil.currentYear = function () {
    return new Date().getFullYear()
}
/**��ǰ��*/
DateUtil.currentMonth = function () {
    let month = new Date().getMonth() + 1
    return month < 10 ? "0" + month : month
}
/**��ǰ��*/
DateUtil.currentDay = function () {
    let day = new Date().getDate()
    return day < 10 ? "0" + day : day
}
////////////////////////////////////////////////
/**
 * ����
 */
let EncryptionUtil = new Object()
/**
 * ����md5����
 * @param str {String} Ҫ���ܵ��ַ���
 */
EncryptionUtil.doubleMd5 = function (str) {
    return str
}


////////////////////////////////////////////////
/**
 * �ַ�������
 */
let StringUtil = new Object()
/**
 * �ж��ַ����Ƿ�Ϊ��
 */
StringUtil.isBlank = function (s) {
    return !s || s.trim() == ""
}
////////////////////////////////////////////////
/**
 * �¼�
 */
let EventUtil = new Object()

/**
 * �س�
 * @param tagId ���س��ı�ǩ��id
 * @param func �س�ִ�еĺ���
 */
EventUtil.enter = function (tagId, func) {
    id(tagId).addEventListener('keyup', function (event) {
        if (event.keyCode == '13') func()
    })
}


////////////////////////////////////////////////

/**ͨ����ǩid��ȡ��ǩ*/
function id(id) {
    return document.getElementById(id)
}


function getRadioValue(radioTagName) {
    let radioTags = document.getElementsByName(radioTagName)
    for (let i = 0; i < radioTags.length; i++) {
        let radioTag = radioTags[i]
        if (radioTag.checked) return radioTag.defaultValue
    }
}