/* =========================================================
   1000VPS · 共享交互脚本
   导航开关 / FAQ 手风琴 / 智能 VPS 推荐 / 回到顶部
   ========================================================= */
(function () {
  'use strict';

  /* ---------------- 移动端导航 ---------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mainNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') mainNav.classList.remove('open');
    });
  }

  /* ---------------- FAQ 手风琴（同组互斥展开） ---------------- */
  document.querySelectorAll('.faq-list').forEach(function (group) {
    group.addEventListener('toggle', function (e) {
      if (e.target.tagName !== 'DETAILS' || !e.target.open) return;
      group.querySelectorAll('details[open]').forEach(function (d) {
        if (d !== e.target) d.removeAttribute('open');
      });
    }, true);
  });

  /* ---------------- 回到顶部 ---------------- */
  var backTop = document.querySelector('.back-top');
  if (backTop) {
    window.addEventListener('scroll', function () {
      backTop.classList.toggle('show', window.scrollY > 480);
    }, { passive: true });
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------- 智能 VPS 推荐选择器 ---------------- */
  var selectorForm = document.getElementById('vpsSelector');
  if (!selectorForm) return;

  // 厂商基础数据（与页面榜单一致，价格核对日期：2026-09-03）
  var P = {
    dmit: {
      name: 'DMIT', cls: 'logo-dmit', mark: 'D',
      price: '$10.90/月（Premium）起 · Tier 1 $36.90/年',
      scenes: ['tiktok', 'cn', 'hosting', 'dev', 'media', 'privacy'],
      budgets: ['b2', 'b3', 'b4'],
      regions: ['cn', 'both', 'global'],
      why: '洛杉矶/香港/东京多网络系列（Premium / Eyeball / Tier 1），线路与硬件一致性好；Tier 1 不含回国优化。'
    },
    bwh: {
      name: '搬瓦工', cls: 'logo-bwh', mark: 'BW',
      price: '$49.99/年 · CN2 GIA-E 20G $169.99/年',
      scenes: ['cn', 'hosting', 'media', 'privacy'],
      budgets: ['b2', 'b3', 'b4'],
      regions: ['cn', 'both'],
      why: '20 年老牌 KVM VPS，KiwiVM 面板 + 自动备份；香港/大阪/洛杉矶 CN2 GIA 系列适合回国与建站。'
    },
    interserver: {
      name: 'InterServer', cls: 'logo-is', mark: 'IS',
      price: '$3/月（1核2GB 40GB SSD 2TB流量）',
      scenes: ['dev', 'storage', 'crawler'],
      budgets: ['b1', 'b2'],
      regions: ['global', 'both'],
      why: '常年有货、价格锁定的便宜月付首选，另有 Storage VPS 1TB SATA $3/月可做备份。'
    },
    vmiss: {
      name: 'VMISS', cls: 'logo-vmiss', mark: 'V',
      price: '约 CAD $4–5/月起（优惠码 10%off / INTL30%OFF）',
      scenes: ['tiktok', 'cn', 'media', 'smtp'],
      budgets: ['b1', 'b2'],
      regions: ['cn', 'both'],
      why: '香港 BGP <50ms、日本 IIJ 流媒体解锁、英国双 ISP 住宅 IP + AS9929；注意标价为加拿大元。'
    },
    racknerd: {
      name: 'RackNerd', cls: 'logo-rn', mark: 'RN',
      price: '$21.99/年 常规特惠（闪购以库存为准）',
      scenes: ['dev', 'storage', 'privacy'],
      budgets: ['b1'],
      regions: ['global', 'both'],
      why: '年付特惠价低、美国 20+ 机房；库存波动大，下单前需确认结算页库存与续费价。'
    },
    hostinger: {
      name: 'Hostinger', cls: 'logo-hg', mark: 'H',
      price: 'VPS $6.49/月 起（续费 $11.99/月）',
      scenes: ['hosting'],
      budgets: ['b1', 'b2', 'b3'],
      regions: ['global', 'both'],
      why: '全球 10 个数据中心，WordPress 生态完善，适合不想折腾面板的普通海外网站。'
    },
    spartanhost: {
      name: 'SpartanHost', cls: 'logo-sh', mark: 'SH',
      price: '$5–6/月 起（E5 / Ryzen Premium KVM）',
      scenes: ['cn', 'privacy'],
      budgets: ['b3', 'b4'],
      regions: ['cn', 'both'],
      why: '西雅图/达拉斯 AS4837/CMIN2 线路与高防产品，适合回国备用与有防护需求的场景。'
    },
    sharktech: {
      name: 'SharkTech', cls: 'logo-st', mark: 'ST',
      price: '询价（官网无公开价目，联系销售）',
      scenes: ['privacy'],
      budgets: ['b3', 'b4'],
      regions: ['global', 'both'],
      why: '主打 DDoS 防护与高带宽，高防需求应先确认清洗容量、触发阈值和封堵策略。'
    },
    vultr: {
      name: 'Vultr', cls: 'logo-vultr', mark: 'VU',
      price: '$2.50/月（IPv6-only）· $3.50 起 · 高性能 $6/月',
      scenes: ['hosting', 'dev', 'crawler'],
      budgets: ['b1', 'b2'],
      regions: ['global', 'both'],
      why: '全球 30+ 数据中心、按小时计费，云生态（快照/防火墙/对象存储）完善；普通线路回国一般，适合海外建站与开发。'
    },
    cloudcone: {
      name: 'CloudCone', cls: 'logo-cc', mark: 'CC',
      price: 'SSD VPS $2.33/月（年付 $28）起',
      scenes: ['dev', 'storage'],
      budgets: ['b1'],
      regions: ['global', 'both'],
      why: '洛杉矶 Multacom 机房（SOC2），常规套餐随时可买：2核1GB/30GB SSD/4TB 流量，免费 Voxility DDoS 防护；不定期闪购更低。'
    },
    raksmart: {
      name: 'RAKsmart', cls: 'logo-rk', mark: 'RK',
      price: '$3.25/月 起 · 闪购低至 $1.49/月 · CN2 另计',
      scenes: ['cn', 'hosting'],
      budgets: ['b1', 'b2', 'b3'],
      regions: ['cn', 'both'],
      why: '面向华人用户的老牌商家，美国 CN2 / 香港 / 日本机房可选，中文站 + 支付宝付款，新用户首单 5 折、闪购低至 $1.49/月。'
    }
  };

  var SCENE_NAMES = {
    tiktok: '出海运营 · TikTok · 跨境电商',
    cn: '回国优化 · CN2 GIA · 低延迟',
    hosting: '建站托管 · WordPress · 企业官网',
    dev: '开发测试 · 便宜VPS · 性价比',
    smtp: '邮件营销 · 住宅IP · SMTP',
    crawler: '数据采集 · 爬虫 · 代理IP',
    media: '娱乐影音 · 流媒体解锁',
    storage: '存储备份 · 大硬盘 · 大流量',
    privacy: '隐私安全 · No KYC · 高防'
  };

  var BUDGET_NAMES = {
    b1: '$5/月以内（约 $10–40/年）',
    b2: '$5–10/月',
    b3: '$10–30/月',
    b4: '$30/月以上 / 不设限',
    any: '不限预算'
  };

  var REGION_NAMES = { cn: '中国大陆为主', global: '海外为主', both: '两地都要', any: '不限地区' };

  var resultBox = document.getElementById('selectorResult');
  var resultItems = document.getElementById('resultItems');
  var resultTitle = document.getElementById('resultTitle');
  var resultNote = document.getElementById('resultNote');
  var resetBtn = document.getElementById('selectorReset');

  selectorForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var scene = document.getElementById('selScene').value;
    var budget = document.getElementById('selBudget').value;
    var region = document.getElementById('selRegion').value;

    var scored = Object.keys(P).map(function (key) {
      var p = P[key];
      var score = 0;
      var reasons = [];
      if (scene !== 'any' && p.scenes.indexOf(scene) !== -1) { score += 5; reasons.push('匹配「' + SCENE_NAMES[scene] + '」场景'); }
      if (budget !== 'any') {
        if (p.budgets.indexOf(budget) !== -1) { score += 3; reasons.push('符合预算「' + BUDGET_NAMES[budget] + '」'); }
        else score -= 2;
      }
      if (region !== 'any') {
        if (p.regions.indexOf(region) !== -1) { score += 2; reasons.push('覆盖「' + REGION_NAMES[region] + '」访问需求'); }
      }
      if (reasons.length === 0) reasons.push('可作为同类需求的备选方案');
      return { key: key, score: score, reasons: reasons };
    }).sort(function (a, b) { return b.score - a.score; });

    var top = scored.filter(function (s) { return s.score > 0; }).slice(0, 3);
    if (!top.length) top = scored.slice(0, 3);

    resultTitle.textContent = '为你推荐：' + (scene !== 'any' ? SCENE_NAMES[scene] : '综合推荐') +
      (budget !== 'any' ? ' · ' + BUDGET_NAMES[budget] : '') +
      (region !== 'any' ? ' · ' + REGION_NAMES[region] : '');

    var sceneUrl = scene !== 'any' ? 'scenarios.html#scene' + sceneKey(scene) : 'scenarios.html';
    resultNote.innerHTML = '核对日期 2026-09-03，价格库存以商家结算页为准。' +
      (scene !== 'any' ? ' <a href="' + sceneUrl + '">查看该场景完整说明 →</a>' : '');

    resultItems.innerHTML = top.map(function (s, i) {
      var p = P[s.key];
      return '<div class="result-item">' +
        '<div class="ri-name"><span class="ri-dot ' + p.cls.replace('logo-', '') + '"></span>' +
        '<span>推荐 ' + (i + 1) + ' · ' + p.name + '</span></div>' +
        '<div class="ri-price">' + p.price + '</div>' +
        '<div class="ri-why">' + p.why + '<br>✓ ' + s.reasons.join('；') + '</div>' +
        '<a class="ri-btn" href="' + providerUrl(s.key) + '" target="_blank" rel="nofollow sponsored noopener">查看官网 ↗</a>' +
        '</div>';
    }).join('');

    resultBox.classList.add('show');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      document.getElementById('selScene').value = 'any';
      document.getElementById('selBudget').value = 'any';
      document.getElementById('selRegion').value = 'any';
      resultBox.classList.remove('show');
    });
  }

  function sceneKey(s) {
    var order = ['tiktok', 'cn', 'hosting', 'dev', 'smtp', 'crawler', 'media', 'storage', 'privacy'];
    return order.indexOf(s) + 1;
  }

  /* 站内中转跳转：真实推广链接统一维护在 go/go-config.js，
     这里只负责把内部厂商代号映射到 go/ 下的路径（隐藏联盟参数）。 */
  function providerUrl(key) {
    var slugs = {
      dmit: 'dmit',
      bwh: 'bandwagonhost',
      interserver: 'interserver',
      vmiss: 'vmiss',
      racknerd: 'racknerd',
      hostinger: 'hostinger',
      spartanhost: 'spartanhost',
      sharktech: 'sharktech',
      vultr: 'vultr',
      cloudcone: 'cloudcone',
      raksmart: 'raksmart'
    };
    return slugs[key] ? 'go/' + slugs[key] + '/' : '#';
  }
})();
