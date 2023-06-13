const BASE_URL = 'http://adapi.yafengsoft.cn' //线上地址

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return (
        [year, month, day].map(formatNumber).join('/') +
        ' ' + [hour, minute, second].map(formatNumber).join(':')
    )
}

function formatRichText(html) {
    if (html && html != '') {
        // .replace(
        //   /\<img/gi,
        //   '<img style="max-width:100%;height:auto;"'
        // )
        // .replace(
        //   /style\s*?=\s*?([‘"])[\s\S]*?\1/gi,
        //   'style="max-width:100%;height:auto;"'
        // )
        // .replace( '/.*?<img(.*?)src=\"(.*?)\"(.*?)>(.*?)$/i',"<img src=\"$2\" />")
        // .replace(/width=\"(.*)\"/gi, 'width="100%"')
        // .replace(/height=\"(.*)\"/gi, '')
        // replace( '/.*?<img(.*?)src=\"(.*?)\"(.*?)>(.*?)$/i',"<img src=\"$2\" style=\"max-width:100%;height:auto;\"/>")
        let newContent = html
            .replace(/style=\"(.*?)\"/g, '')
            .replace(/\<img/gi, '<img style="max-width:100%;height:auto;"')
            .replace(/&nbsp;/g, '\xa0')
            .replace(/<pre/gi, '<p')
            .replace(/<\/pre>/gi, '</p>')

        //  let newContent = html.replace( '/.*?<img(.*?)src=\"(.*?)\"(.*?)>(.*?)$/i',"<img src=\"$2\">")
        return newContent
    }
    return ''
}

function getDataByKey(key) {
    try {
        var value = wx.getStorageSync(key) || ''
        if (value) {
            return value
        }
    } catch (e) {
        return ''
    }
}

/**
 * 微信的request
 */

function request(
    url,
    data = {},
    method = 'GET',
    contentType = 'application/json;'
) {
    return new Promise(function(resolve, reject) {
        let strData = JSON.stringify(data)
        wx.request({
            url: BASE_URL + url,
            data: data,
            method: method,
            header: {
                'Content-Type': contentType,
                Authorization: getDataByKey('token'),
            },
            success: function(res) {
                console.log(
                    '==============================================================================================='
                )
                console.log('==    接口地址：' + url)
                console.log('==    接口参数：' + JSON.stringify(strData))
                console.log('==    请求类型：' + method)
                console.log('==    接口状态：' + res.statusCode)
                console.log(
                    '==============================================================================================='
                )
                if (res.statusCode == 200) {
                    //请求正常200
                    //AES解密返回的数据
                    var data = null
                    console.log(res)
                    try {
                        data = res.data
                        if (data.code == 0) {
                            //正常
                            resolve(data)
                        } else {
                            //错误
                            wx.showModal({
                                title: '提示',
                                confirmText: url == '/app/member/reg' ? '去注册' : '确定',
                                content: data.msg,
                                success(res) {
                                    if (res.confirm) {
                                        console.log('用户点击确定')
                                        if (data.code == 100 && url == '/app/member/reg') {
                                            wx.navigateTo({
                                                url: '/pages/register/register',
                                            })
                                        }
                                        wx.hideLoading()
                                    } else if (res.cancel) {
                                        console.log('用户点击取消')
                                            // if (data.msg == '文章不存在') {
                                            //   wx.navigateBack({
                                            //     delta: 1, //返回上一个页面
                                            //   })
                                            // }
                                    }
                                },
                            })
                            reject(data.msg)
                        }
                        // console.log('解密后的数据：' + daesData)
                        // daesData = JSON.parse(daesData)
                    } catch (error) {
                        console.log('==    数据解码失败')
                        reject('数据解码失败')
                    }
                } else if (res.statusCode == 401) {
                    //此处验证了token的登录失效，如果不需要，可以去掉。
                    //未登录，跳转登录界面
                    reject('登录已过期')
                    wx.showModal({
                        title: '提示',
                        content: '登录已过期，请立即登录，否则无法正常使用',
                        success(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')

                                wx.navigateTo({
                                    url: '/pages/login/login',
                                })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        },
                    })
                } else {
                    //请求失败
                    reject('请求失败：' + res.statusCode)
                }
            },
            fail: function(err) {
                //服务器连接异常
                console.log(
                    '==============================================================================================='
                )
                console.log('==    接口地址：' + url)
                console.log('==    接口参数：' + JSON.stringify(data))
                console.log('==    请求类型：' + method)
                console.log('==    服务器连接异常')
                console.log(
                    '==============================================================================================='
                )
                wx.showToast({
                    title: '服务器连接异常，请检查网络再试',
                    icon: 'none',
                    duration: 2000,
                })
                reject('服务器连接异常，请检查网络再试')
            },
        })
    })
}
/**
 * GET请求封装
 */
function get(url, data = {}) {
    return request(url, data, 'GET')
}

/**
 * POST请求封装
 */
function post(url, data = {}) {
    return request(url, data, 'POST', 'application/x-www-form-urlencoded')
}

function put(url, data = {}) {
    return request(url, data, 'PUT')
}

function delFunc(url, data = {}) {
    return request(url, data, 'DELETE')
}

// 移除未定义的数组
function removeEmptyArrayEle(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == undefined) {
            arr.splice(i, 1)
            i = i - 1
        }
    }
    return arr
}

function checkImgType(fileName) {
    //判断是否是图片
    //用文件名name后缀判断文件类型，可用size属性判断文件大小不能超过500k ， 前端直接判断的好处，免去服务器的压力。
    if (!/\.(jpg|jpeg|png|GIF|JPG|PNG)$/.test(fileName)) {
        return false
    } else {
        return true
    }
}
/* 打开文档
 * @param fileUrl: 文件地址
 * @param filetype: 文件类型
 */
function openDocument(fileUrl, filetype) {
    wx.showLoading({ title: '加载中...' })
    wx.downloadFile({
        url: fileUrl,
        success: res => {
            const filePath = res.tempFilePath
            wx.openDocument({
                filePath: filePath,
                fileType: filetype,
                success: function(res) {
                    // console.log("打开文档成功")
                    wx.hideLoading()
                },
                fail: function(res) {
                    wx.hideLoading()
                    wx.showToast({ title: '打开文档失败', icon: 'none', duration: 2000 })
                },
            })
        },
        fail: res => {
            wx.hideLoading()
            wx.showToast({ title: '打开文档失败', icon: 'none', duration: 2000 })
        },
    })
}

function isLogin() {
    const userInfo = getDataByKey('userinfo') || null
    if (!userInfo) {
        wx.showModal({
            title: '登录提示',
            content: '请先登录',
            confirmText: '登录',
            confirmColor: '#E32416',
            success(res) {
                if (res.confirm) {
                    wx.redirectTo({
                        url: '/pages/login/index',
                    })
                } else if (res.cancel) {
                    let page = getCurrentPages()
                    if (page.length == 1) {
                        wx.switchTab({
                            url: '/pages/index/index',
                        })
                    } else {
                        wx.navigateBack()
                    }
                }
            },
        })
        return false
    } else {
        return true
    }
}
module.exports = {
    formatTime: formatTime,
    checkImgType,
    request,
    get,
    post,
    put,
    delFunc,
    removeEmptyArrayEle,
    formatRichText,
    openDocument,
    getDataByKey,
    isLogin,
}