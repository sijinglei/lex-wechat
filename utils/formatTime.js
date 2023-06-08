//timestamp   时间戳
//option      格式（年月日  就输入YY-MM-DD   时分  就输入 hh-mm）
//功能如下注释
function formatDate(timestamp, option) {
  //   console.log("timestamp", timestamp);
  var date = new Date(timestamp);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = function () {
    return date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  };
  var minute = function () {
    return date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  };
  var second = function () {
    return date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  };
  const formatNumber = (n) => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  //获取 年月日
  if (option == "YY-MM-DD") return " " + year + "-" + formatNumber(month) + "-" +  formatNumber(day);
  if (option == "YY/MM/DD") return " " + year + "/" + formatNumber(month) + "/" +  formatNumber(day);
  //获取年月
  if (option == "YY-MM") return " " + year + "-" + formatNumber(month);
  //获取年
  if (option == "YY") return " " + year;
  //获取月
  if (option == "MM") return " " + formatNumber(month);
  //获取日
  if (option == "DD") return " " + formatNumber(day);
  //获取时
  if (option == "hh") return " " + hour();
  //获取昨天
  if (option == "yesterday") return " " + day - 1;
  //获取时分秒
  if (option == "hh-mm-ss")
    return " " + hour() + ":" + minute() + ":" + second();
  //获取时分
  if (option == "hh-mm") return " " + hour() + ":" + minute();
  //获取分秒
  if (option == "mm-ss") return minute() + ":" + second();
  //获取分
  if (option == "mm") return minute();
  //获取秒
  if (option == "ss") return second();
  //默认时分秒年月日
  return (
    year +
    "/" +
    month +
    "/" +
    day +
    " " +
    hour() +
    ":" +
    minute() +
    ":" +
    second()
  );
}
function leftTimer(year, month, day, hour, minute, second) {
  var leftTime =
    new Date(year, month - 1, day, hour, minute, second) - new Date(); //计算剩余的毫秒数
  leftTime = parseInt(leftTime)
  // console.log('leftTime',leftTime)
  if(leftTime<0){
    return '已过期'
  }
  var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
  console.log('daysdays',days)
  var hours = parseInt((leftTime / 1000 / 60 / 60) % 24, 10); //计算剩余的小时
  var minutes = parseInt((leftTime / 1000 / 60) % 60, 10); //计算剩余的分钟
  var seconds = parseInt((leftTime / 1000) % 60, 10); //计算剩余的秒数
  days = checkTime(days);
  hours = checkTime(hours);
  minutes = checkTime(minutes);
  seconds = checkTime(seconds);

  return days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
}
function checkTime(i) {
  //将0-9的数字前面加上0，例1变为01
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function formatCountDown(endTime) {
  var nowTime = new Date(); // 当前时间
  var endTime = new Date(endTime);
  // console.log("当前时间===", nowTime);
  // console.log("结束时间===", endTime);
  var strStartTime = formatDate(nowTime);
  var strEndTime = formatDate(endTime);
  if (strStartTime == strEndTime) {
    return "";
  } else {
    return cuntTime(endTime);
  }
}
function cuntTime(endTime) {
  var year = formatDate(endTime, "YY");
  var month = formatDate(endTime, "MM");
  var day = formatDate(endTime, "DD");
  var hour = formatDate(endTime, "hh");
  var minute = formatDate(endTime, "mm");
  var second = formatDate(endTime, "ss");
  // _endTime = getDate(year, month, day, hour, minute, second - 1);
  return leftTimer(year, month, day, hour, minute, second);
}

module.exports = {
  formatDate: formatDate,
  formatCountDown: formatCountDown,
};
