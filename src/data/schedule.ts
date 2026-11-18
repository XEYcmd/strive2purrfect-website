export interface TimelineItem {
  no: string;
  title: string;
  en: string;
  desc: string;
  time: string;
  tag: string;
  live?: boolean;
}

export interface FormatRow {
  project: string;
  qualifier: string[];
  final: string[];
  slots: string;
}

export interface Prize {
  rank: string;
  label: string;
  en: string;
  note: string;
  champion?: boolean;
  delay?: string;
}

export const timeline: TimelineItem[] = [
  {
    no: '01',
    title: '报名开放',
    en: 'Registration',
    desc: '填写报名表，提交游戏 ID、联系方式与参赛项目。报名成功后加入选手群，等待赛程安排。',
    time: '日期 · 待公布',
    tag: '筹备中',
    live: true,
  },
  {
    no: '02',
    title: '线上预选',
    en: 'Qualifier',
    desc: '在指定曲池中完成比赛曲目，按要求提交完整成绩录屏。按成绩排名晋级决赛，具体名额待公布。',
    time: '报名结束后',
    tag: '待公布',
  },
  {
    no: '03',
    title: '线上决赛',
    en: 'Final',
    desc: '直播对抗，裁判全程记录。具体对阵、选曲与 BO 流程将随规则一并公布。决赛计划进行直播，平台待定。',
    time: '预选结束后',
    tag: '待公布',
  },
  {
    no: '04',
    title: '结果与颁奖',
    en: 'Results',
    desc: '公布最终名次与奖项，发放奖品与纪念品。获奖者将通过报名时留下的联系方式收到通知。',
    time: '决赛结束后',
    tag: '待公布',
  },
];

export const formatRows: FormatRow[] = [
  {
    project: 'Phigros',
    qualifier: ['指定曲池', '完整成绩录屏'],
    final: ['直播对抗', 'BO 与选曲流程待公布'],
    slots: '待公布',
  },
  {
    project: 'Phira',
    qualifier: ['指定谱池', '完整成绩录屏'],
    final: ['直播对抗', '选曲 / Ban 流程待公布'],
    slots: '待公布',
  },
];

export const prizes: Prize[] = [
  {
    rank: '01',
    label: '冠军',
    en: 'Champion',
    note: '奖品待公布',
    champion: true,
  },
  {
    rank: '02',
    label: '亚军',
    en: 'Runner-up',
    note: '奖品待公布',
    delay: '.05s',
  },
  {
    rank: '03',
    label: '季军',
    en: 'Second Runner-up',
    note: '奖品待公布',
    delay: '.1s',
  },
  {
    rank: '04',
    label: '参与奖',
    en: 'Participation',
    note: '完赛纪念 · 待公布',
    delay: '.15s',
  },
];
