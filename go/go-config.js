/* =========================================================
   VPS1000 · 推广跳转链接统一配置
   -------------------------------------------------------
   ★ 所有对外跳转的真实链接集中在这里维护，页面无需改动。

   状态（2026-09-03）：11 家厂商联盟链接已全部配置完毕。

   使用说明：
   1. 换联盟账号 / 优惠码：只改对应条目的 url 即可；
   2. 新增厂商：在下面加一条 entry（key 自定义），
      然后复制 go/ 下任意厂商文件夹，改其中 GO_KEY 为同名 key；
      或者不建文件夹，直接用 /go/?to=<key> 链接；
   3. key 必须与 go/ 下的文件夹名一致（文件夹方式时）。
   ========================================================= */

var GO_LINKS = {
  dmit: {
    name: 'DMIT',
    url: 'https://www.dmit.io/aff.php?aff=27046'
  },
  bandwagonhost: {
    name: '搬瓦工 BandwagonHost',
    url: 'https://bandwagonhost.com/aff.php?aff=84130'
  },
  interserver: {
    name: 'InterServer',
    url: 'https://www.interserver.net/r/1189464'
  },
  vmiss: {
    name: 'VMISS',
    url: 'https://app.vmiss.com/aff.php?aff=6472'
  },
  racknerd: {
    name: 'RackNerd',
    url: 'https://my.racknerd.com/aff.php?aff=21106'
  },
  hostinger: {
    name: 'Hostinger',
    url: 'https://www.hostinger.com/hk?REFERRALCODE=IATRAOJIA57T'
  },
  spartanhost: {
    name: 'SpartanHost',
    url: 'https://billing.spartanhost.net/aff.php?aff=2871'
  },
  sharktech: {
    name: 'SharkTech',
    url: 'https://portal.sharktech.net/aff.php?aff=1776'
  },
  vultr: {
    name: 'Vultr',
    url: 'https://www.vultr.com/?ref=9921039'
  },
  cloudcone: {
    name: 'CloudCone',
    url: 'https://app.cloudcone.com/?ref=14535'
  },
  raksmart: {
    name: 'RAKsmart',
    url: 'https://billing.raksmart.com/whmcs/aff.php?aff=9727&aff_rtype=affiliateonetime'
  }
};
