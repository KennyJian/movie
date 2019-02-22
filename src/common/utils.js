// 存储localStorage

export const SetStore = (name, content) => {
  if(!name) return;
  if( typeof content !== 'string' ) {
    content = Json.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

// 获取localstorage

export const getStore = name => {
  if(!name) return;
  return window.localStorage,getItem(name);
}

// 删除localstorage

export const removeStore = name => {
  if(!name) return;
  window.localStorage.removeStore(name);
}

/**
   * 存储cookie
   * @param {key} 存储的键值
   * @param {val} 存储的值
   * @param {time} 存储的时间
   */

  export const setCookie = (key, val, time) => {
    var date = new Date(); //获取当前时间
    var expiresDays = time; //将date设置为n天以后的时间
    date.setTime(date.getTime() + expiresDays*24*3600*1000); //格式化为cookie识别的时间
    document.cookie = key + "=" + val + ";expires=" + date.toGMTString(); //设置cookie
  }

    /**
   * 从cookie中取出存储的值
   * @param {*} date
   * @param {*} fmt
   */
  export const getCookie = (key) => {
    /*获取cookie参数*/
    var getCookie = document.cookie.replace(/[ ]/g, ""); //获取cookie，并且将获得的cookie格式化，去掉空格字符
    var arrCookie = getCookie.split(";") //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
    var tips; //声明变量tips
    for (var i = 0; i < arrCookie.length; i++) { //使用for循环查找cookie中的tips变量
      var arr = arrCookie[i].split("="); //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
      if (key == arr[0]) { //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
        tips = arr[1]; //将cookie的值赋给变量tips
        break; //终止for循环遍历
      }
    }
    return tips;
  }

  /**
   * 时间戳转化
   */
  export function formatDate(date, fmt) {
    // console.log(date,fmt)
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  };

  //时间戳转化
  export function dateFtt(str,time){
      var date=new Date(time*1000);
      var o = {
        "y+" : date.getFullYear(),                //年
        "o+" : date.getMonth() + 1,               //月
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
      };
      if(/(y+)/.test(str))
        str=str.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
      for(var k in o)
        if(new RegExp("("+ k +")").test(str))
          str = str.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      return str;
  }

  function padLeftZero(str) {
    return ('00' + str).substr(str.length);
  };

    /**
   * 获取style样式
   */
  export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
      target = element.scrollTop;
    } else if (element.currentStyle) {
      target = element.currentStyle[attr];
    } else {
      target = document.defaultView.getComputedStyle(element, null)[attr];
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
  }
