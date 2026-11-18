// 部署基路径：根域名为 ''，GitHub Pages 项目页为 '/仓库名'
// 由 astro.config.mjs 的 base 决定，Astro 会注入到 import.meta.env.BASE_URL。
export const BASE = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');

/** 站内绝对路径加上基路径：u('/event/') → '/repo/event/' */
export const u = (path: string): string => {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${p}`;
};

/** 站点绝对 URL（不含基路径），用于 canonical / OG / sitemap */
export const SITE_URL = import.meta.env.SITE || 'https://xeycmd.github.io';

/** 逻辑路径 → 完整绝对 URL */
export const abs = (path: string): string => new URL(u(path), SITE_URL).href;
