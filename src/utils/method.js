// 深度拷贝
const extend = (...args) => {
  var cloneObj = Object.assign.apply(this, args);
  return JSON.parse(JSON.stringify(cloneObj));
}

const getUrlParam = () => {
   var param, url = location.hash, theRequest = {};
   var index = url.indexOf("?")
   if (index != -1) {
      var str = url.substr(index + 1);
      var strs = str.split("&");
      for(var i = 0, len = strs.length; i < len; i ++) {
     param = strs[i].split("=");
         theRequest[param[0]]=decodeURIComponent(param[1]);
      }
   }
   return theRequest;
};

export {
  extend,
  getUrlParam
}
