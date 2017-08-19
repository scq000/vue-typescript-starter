const templates = {};

// 注册模版
const req = require.context('./', true, /^(.*\.(vue$))[^.]*$/igm);

req.keys().forEach((key) => {
  const theKey = key.replace('./', '').replace('.vue', '');
  templates['t-' + theKey] = req(key);
});

export default templates;
