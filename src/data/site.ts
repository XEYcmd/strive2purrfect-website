export interface NavItem {
  href: string;
  label: string;
  index?: string;
}

export interface FooterLink {
  href?: string;
  label: string;
  muted?: boolean;
}

export const site = {
  name: '猫二杯',
  en: 'STRIVE "2" PURRFFECT',
  tagline: '校园民间音游比赛 · Phigros × Phira',
  nav: [
    { href: '/', label: '首页', index: '01' },
    { href: '/event/', label: '赛事', index: '02' },
    { href: '/schedule/', label: '赛程', index: '03' },
    { href: '/rules/', label: '规则', index: '04' },
    { href: '/register/', label: '报名', index: '05' },
    { href: '/faq/', label: 'FAQ', index: '06' },
  ] satisfies NavItem[],
  footerEvent: [
    { href: '/event/', label: '赛事介绍' },
    { href: '/schedule/', label: '赛程与奖项' },
    { href: '/rules/', label: '比赛规则' },
  ] satisfies FooterLink[],
  footerJoin: [
    { href: '/register/', label: '报名信息' },
    { href: '/faq/', label: '常见问题' },
    { label: '联系组委会 · 待公布', muted: true },
  ] satisfies FooterLink[],
  footerFollow: [
    { label: 'QQ 群 · 待公布', muted: true },
    { label: 'Bilibili · 待公布', muted: true },
  ] satisfies FooterLink[],
  disclaimer:
    '本站为玩家自发组织的民间赛事网站，与 Phigros、Phira 官方无隶属关系。相关游戏名称、商标及素材版权归各自权利人所有。站内赛事日期、赛制与奖品信息以最终公告为准。',
  copyright: '© 2026 猫二杯赛事组 · 保留所有权利',
};
