/*
 * @Author lizhenhua
 * @version 2018/9/4
 * @description 此app 的全局方法
 */


export  default {
  /**
  * 作者：lzh
  * 功能：获取webview url 参数 DocId
  * 参数：
  * 返回值：
  */
  getDocId(){
    var docid = this.getParam("docid") ||  "docid:267C3D956F4A426F881212B3E22A2980" //1023
    // var docid = this.getParam("docid") ||  "docid:6CFE06297BBA4E1FBAA00BDE2809198F" //1023
    return docid
  },
  /**
  * 作者：lzh
  * 功能：审批意见 中为第一个item 加showTitle标签
  * 参数：arr 数组对象
  * 参数：key 需要判断的key
  * 参数：str 需要加的标签默认 showTitle
  * 返回值：原数组
  */
  showTitle(arr,key,str='showTitle'){
    let keys = [];
    arr.forEach(item=>{
      if(keys.indexOf(item[key])==-1){ keys.push(item[key]) }
    })
    keys.forEach(i=>{
      let index = arr.findIndex(item => item[key] == i)
      arr[index][str] = true;
    })
    return arr;
  },
  //获取url中的参数
  getParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = location.pathname.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  },
  /**
  * 作者：lzh
  * 功能：获得目标用户，用户的英文账号名，逗号分隔
  * 参数：hasSelectPerson 已选择人员对象数组
  * 返回值：目标字符串
  */
  personName(hasSelectPerson){
    if(hasSelectPerson.length>0){
      return hasSelectPerson.map(item=>{
          return item.id
        }).join(',')
    }else {
      return ''
    }
  },
  /**
  * 作者：lzh
  * 功能：判断当前文档状态
  * 参数：task 判断数据
  * 返回值：
  */
  getDocStatus (task){
    if(!task){
      return 'readOnly';//只读
    }else if(task.status == 'received'){
      return 'backlog'//待办
    }else{
      return 'complete'//已办
    }
  },
}

