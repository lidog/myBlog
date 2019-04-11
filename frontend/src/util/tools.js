/*
 * @Author lizhenhua
 * @version 2018/5/24
 * @description 基础类库方法
 */

import appFn from "./appFn.js"

let tools = {
  /**
   * 作者：lzh
   * 功能：深度克隆对象
   * 参数：obj （源对象）
   */
  cloneObj(obj) {
    var str, newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
      return;
    } else if (window.JSON) {
      str = JSON.stringify(obj), //序列化对象
        newobj = JSON.parse(str); //还原
    } else {
      for (var i in obj) {
        newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
      }
    }
    return newobj;
  },
  /**
   * 作者：lzh
   * 功能：格式化时间
   * 参数：fmt (定义时间格式的模板)
   * 参数：date (时间)
   */
  dateFmt(date, fmt) {
    if (!date) {
      date = new Date();
    } else {
      date = typeof date == 'string' ? new Date(date) : date
    }
    var fmt = fmt || "yyyy-MM-dd hh:mm"
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    //如果匹配了y，就拿年2018，有多少个y ，截取多少个字母 填充到 fmt 中

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  /**
   * 作者：lzh
   * 功能：ios 不支持 new Date("2016-05-31 08:00"); 做一下函数兼容
   * 参数：string, 2016-05-31 08:00 格式字符串。可以为空
   * 返回值：指定时间的时间对象
   */
  iosNewDate(str) {
    if (typeof str == 'number') {
      return new Date(str);
    }
    if (typeof str == 'string') {
      str = str.replace(/\-/g, '/');
      return new Date(str)
    } else {
      return new Date();
    }
  },
  /**
   * 作者：lzh
   * 功能：计算中英文输入的字数
   * 参数：val (要检测字数的字符串)
   */
  getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
      var a = val.charAt(i);
      if (a.match(/[^\x00-\xff]/ig) != null) {
        len += 2;
      }
      else {
        len += 1;
      }
    }
    return len;
  },
  /**
   * 作者：lzh
   * 功能：加上class
   * 参数：id 默认app，传入字符串代表是id，否则是dom
   * 返回值：
   */
  addClass(id = `app`, className) {
    let app = typeof id == 'string' ? document.getElementById(id) : id;
    if(app.className.split(" ").indexOf(className)==-1){
      app.className = app.className + ' ' + className;
    }
  },
  /**
   * 作者：lzh
   * 功能: 去掉class
   * 参数：id 默认app，传入字符串代表是id，否则是dom
   * 返回值：
   */
  removeClass(id = `app`, className) {
    let app = typeof id == 'string' ? document.getElementById(id) : id;
    if (className) {
      app.className = app.className.replace(' ' + className, '')
    }
  },
  /**
   * 作者：lzh
   * 功能：查询是否包含 某个class
   * 参数：
   * 返回值：
   */
  hasClass(id, className) {
    let app = document.getElementById(id);
    if (className) {
      if (app.className.indexOf(className) !== -1) {
        return true
      } else {
        return false
      }
    }
  },
  /**
   * 作者：lzh
   * 功能：移动端滚穿透 解决方法
   * 参数：
   * 返回值：
   * 参考来源：https://blog.csdn.net/luotianyi1205/article/details/78223083
   */
  noScrollAfter() {
    let scrollTop;
    let intTime = null;
    let int = 0;//窗口打开个数
    return {
      //防止滑动穿透
      star: function () {
        int++;
        scrollTop = document.scrollingElement.scrollTop;
        clearInterval(intTime);
        intTime = setInterval(function () {
          document.scrollingElement.scrollTop = scrollTop;
        }, 1)
      },
      end: function () {
        int--;
        document.scrollingElement.scrollTop = scrollTop;
        if (int == 0) { //没有窗口的时候才清除定时器
          clearInterval(intTime);
        }
      },
      /* 封装 打开某个窗口的时候，阻止滑动
      * rm:当前实例，
      * key控制弹窗的变量key
      */
      open: function (rm, key) {
        rm[key] = true;
        this.star();
      },
      close: function (rm, key) {
        rm[key] = false;
        this.end();
      },
    };
  },
  //防抖动函数
  debounce: function (fn, delay) {
    // 持久化一个定时器 timer
    let timer = null;
    // 闭包函数可以访问 timer
    return function () {
      // 通过 'this' 和 'arguments'
      // 获得函数的作用域和参数
      let context = this;
      let args = arguments;
      // 如果事件被触发，清除 timer 并重新开始计时
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
  },
  //节流
  throttle: function (action, delay, context) {
    var last = 0;
    return function () {
      var curr = +new Date()
      if (curr - last > delay) {
        action.apply(this, arguments)
        last = curr
      }
    }
  },
  //获取url中的参数
  getUrlParam(name, href) {
    var link = href || window.location.search
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = link.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  },
  //判断 对象 a,b 是否相等
  eq(a, b, aStack, bStack) {
    var toString = Object.prototype.toString;

    function isFunction(obj) {
      return toString.call(obj) === '[object Function]'
    }

    function eq(a, b, aStack, bStack) {

      // === 结果为 true 的区别出 +0 和 -0
      if (a === b) return a !== 0 || 1 / a === 1 / b;

      // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
      if (a == null || b == null) return false;

      // 判断 NaN
      if (a !== a) return b !== b;

      // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
      var type = typeof a;
      if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;

      // 更复杂的对象使用 deepEq 函数进行深度比较
      return deepEq(a, b, aStack, bStack);
    };

    function deepEq(a, b, aStack, bStack) {

      // a 和 b 的内部属性 [[class]] 相同时 返回 true
      var className = toString.call(a);
      if (className !== toString.call(b)) return false;

      switch (className) {
        case '[object RegExp]':
        case '[object String]':
          return '' + a === '' + b;
        case '[object Number]':
          if (+a !== +a) return +b !== +b;
          return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case '[object Date]':
        case '[object Boolean]':
          return +a === +b;
      }

      var areArrays = className === '[object Array]';
      // 不是数组
      if (!areArrays) {
        // 过滤掉两个函数的情况
        if (typeof a != 'object' || typeof b != 'object') return false;

        var aCtor = a.constructor,
          bCtor = b.constructor;
        // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
        if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
          return false;
        }
      }


      aStack = aStack || [];
      bStack = bStack || [];
      var length = aStack.length;

      // 检查是否有循环引用的部分
      while (length--) {
        if (aStack[length] === a) {
          return bStack[length] === b;
        }
      }

      aStack.push(a);
      bStack.push(b);

      // 数组判断
      if (areArrays) {

        length = a.length;
        if (length !== b.length) return false;

        while (length--) {
          if (!eq(a[length], b[length], aStack, bStack)) return false;
        }
      }
      // 对象判断
      else {

        var keys = Object.keys(a),
          key;
        length = keys.length;

        if (Object.keys(b).length !== length) return false;
        while (length--) {

          key = keys[length];
          if (!(b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack))) return false;
        }
      }

      aStack.pop();
      bStack.pop();
      return true;

    }


    return eq(a, b, aStack, bStack)

  },
  /**
   * 作者：lzh
   * 功能：通过类名获取元素对象
   * 参数：task 判断数据
   * 返回值：
   */
  getByClass(className, parent) {
    //定义函数getByClass()实现获取document或指定父元素下所有class为on的元素
    var oParent = parent ? document.getElementById(parent) : document
    var oCls = oParent.getElementsByTagName('*')//获取所有的标签元素
    var arr = [];
    for (i in oCls) {
//对遍历的标签元素与要查找的元素进行判断
      if (oCls[i].className == className) {
        arr.push(oCls[i])
      }
    }
    return arr
  },
  /**
   * 作者：lzh
   * 功能：找到指定className 的父元素
   * 参数：node 当前节点，
   * 返回值：
   */
  findParent(node, className="mobile-content"){
    let target = node;
    if (target && target.parentNode&&target.parentNode.nodeName!=='HTML') {
      if(target.parentNode.className.split(" ").indexOf(className)!==-1){
        return target.parentNode;
      } else {
        return findParent(target.parentNode,className)
      }
    } else {
      return document.getElementsByTagName('body')[0];
    }
  },
  /**
   * 作者：lzh
   * 功能：平台、设备和操作系统 ，返回ture或false,true表示是移动端，false表示不是移动端
   * 参数：
   * 返回值：bool
   */
  isMobile() {
    var mobileArry = ["iPhone", "iPad", "Android", "Windows Phone", "BB10; Touch", "BB10; Touch", "PlayBook", "Nokia"];
    var ua = navigator.userAgent;
    var res = mobileArry.filter(function (arr) {
      return ua.indexOf(arr) > 0;
    });
    return res.length > 0;
  },
  /**
   * 作者：lzh
   * 功能：解决移动端输入板挡住输入框bug
   * 参数：id,需要修复点击bug的父元素id；
   * 参数：pullClass,需要被提起的盒子class；
   * 参数：scrollContentClass,发生滚动的盒子class，默认mobile-content；
   * 参数：top,发生滚动的盒子class，默认mobile-content；
   * 说明：fixBug,只有在原生标签 加上fixBug="true" 自定义属性才弹起修复；
   * 返回值：
   */
  fixInputBug(id="app",pullClass="form-item",scrollContentClass="mobile-content",top=100){
    var mobileArr = ["iPhone", "iPad", "Android", "Windows Phone", "BB10; Touch", "BB10; Touch", "PlayBook", "Nokia"];
    var ua = navigator.userAgent;
    var res = mobileArr.filter(function (arr) {
      return ua.indexOf(arr) > 0;
    });
    var nodeObj = document.getElementById(id);
    if (res.length > 0) {
      nodeObj.onclick = function (ev) {
        var ev = ev || nodeObj.event;
        var target = ev.target || ev.srcElement;
        let content = findParent(target,pullClass);
        let father = findParent(target,scrollContentClass);
        let scrollTop = father.scrollTop;
        let model = document.createElement('div');
        model.id = "inputBugModel";
        if (target.nodeName.toLowerCase() == 'input' || target.nodeName.toLowerCase() == 'textarea') {
          if(target.type!=="radio"&&target.type!=="checkbox"&&target.getAttribute('fixBug')){
            addClass(content,"input-bug")
            addClass(father,"input-bug-oh")
            if(document.getElementById("inputBugModel")){
              father.removeChild(document.getElementById("inputBugModel"));
            }
            father.appendChild(model);
            father.scrollTop = top;
            target.onblur = function () {
              removeClass(content,"input-bug")
              removeClass(father,"input-bug-oh")
              father.removeChild(model);
              father.scrollTop = scrollTop;
            }
          }
        }
      }
      function addClass(node,className) {
        if(node.className.split(" ").indexOf(className)==-1){
          node.className = node.className + ' ' + className;
        }
      }
      function removeClass(node,className) {
        node.className = node.className.replace(" "+className, '');
      }
      function  findParent(node, className){
        let target = node;
        if (target && target.parentNode&&target.parentNode.nodeName!=='HTML') {
          if(target.parentNode.className.split(" ").indexOf(className)!==-1){
              return target.parentNode;
          } else {
            return findParent(target.parentNode,className)
          }
        } else {
          return document.getElementsByTagName('body')[0];
        }
      }
    };
  },
  /**
   * 作者：lzh
   * 功能：
   * 参数：获取窗口的尺寸 px
   * 返回值：
   */
  getViewport() {
    // 检查 document.compatMode 属性，以确定浏览器是否运行在混杂模式。
    // Safari3.1 之前的版本不支持这个属性，因此就会自动执行 else 语句
    if (document.compatMode == "BackCompat") {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      };
    } else {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      };
    }
  },
}

tools = Object.assign(tools, appFn);//合并 appFn.js 中的方法

export default tools
