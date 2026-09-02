/* =========================================================
   1000VPS · 跳转逻辑（隐形即时跳转，无中间页）
   优先读当前页定义的 GO_KEY（go/<厂商>/index.html 方式），
   其次读 URL 参数 ?to=<key>（go/index.html?to=xxx 方式）。
   命中白名单 → 立即 location.replace，页面内容对用户不可见；
   未命中 → 仅在无效链接时显示一行错误提示。
   ========================================================= */
(function () {
  'use strict';

  var key = (typeof GO_KEY !== 'undefined' && GO_KEY) ||
    (new URLSearchParams(location.search).get('to') || '').replace(/[^a-z0-9_-]/gi, '');

  var item = (window.GO_LINKS || {})[key];
  if (item) {
    /* replace：不产生历史记录，用户后退键直接回到本站 */
    window.location.replace(item.url);
    return;
  }

  /* 仅无效链接才会看到这里的提示 */
  var home = (typeof GO_KEY !== 'undefined' && GO_KEY) ? '../../index.html' : '../index.html';
  document.body.innerHTML =
    '<div style="font-family:-apple-system,BlinkMacSystemFont,\'PingFang SC\',\'Microsoft YaHei\',sans-serif;' +
    'min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;">' +
    '<p style="font-size:14px;color:#64748b;">⚠️ ' + (key ? '「' + key + '」' : '') +
    '链接不存在或已失效，<a href="' + home + '" style="color:#2563eb;font-weight:700;">返回 1000VPS 首页</a>。</p></div>';
})();
