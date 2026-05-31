import type { PaperPreset } from '../components/paper-shape/geometry';

export interface MediaAsset {
  src: string;
  alt: string;
  caption?: string;
  poster?: string;
}

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  note: string;
  paperPreset: PaperPreset;
  color: string;
}

export interface FriendLetter {
  id: string;
  name: string;
  nickname?: string;
  accent: string;
  paperPreset: PaperPreset;
  greeting: string;
  message: string;
  photos: MediaAsset[];
  video?: MediaAsset;
}

export interface JourneyConfig {
  hero: {
    title: string;
    startDate: string;
    endDate: string;
    intro: string;
  };
  timeline: TimelineEntry[];
  friends: FriendLetter[];
  closing: string;
}

const placeholderPhotos = (name: string, labels: string[]): MediaAsset[] =>
  labels.map((label) => ({
    src: '',
    alt: `${name}的回忆照片：${label}`,
    caption: label,
  }));

export const journey: JourneyConfig = {
  hero: {
    title: '这 239 天，幸好和你们一起',
    startDate: '2025.10.10',
    endDate: '2026.06.05',
    intro:
      '第一段实习快要写到最后一页了。比起做过什么，我更想记住的是：刚好在这里遇见了你们。',
  },
  timeline: [
    {
      id: 'arrival',
      date: '2025.10.10',
      title: '第一次坐到你们身边',
      note: '那时候还不知道，普通的一次入职，会变成后来舍不得翻过去的一页。',
      paperPreset: 'receipt',
      color: 'apricot',
    },
    {
      id: 'familiar',
      date: '慢慢发生',
      title: '慢慢熟悉',
      note: '从礼貌打招呼，到可以顺手接住彼此的话。很多重要的事，好像都没有一个明确的开始。',
      paperPreset: 'basic-paper',
      color: 'cloud',
    },
    {
      id: 'ordinary',
      date: '一些日常',
      title: '忙碌里的小事',
      note: '一起吃饭、吐槽、赶进度，还有那些当时只觉得普通，回头看却很舍不得的小事。',
      paperPreset: 'stitched',
      color: 'mint',
    },
    {
      id: 'countdown',
      date: '临近告别',
      title: '开始数剩下的日子',
      note: '离开这件事逐渐有了日期。于是想把散落的片段收好，也把没认真说过的话留下来。',
      paperPreset: 'torn',
      color: 'pink',
    },
    {
      id: 'letters',
      date: '2026.06.05',
      title: '把想说的话写下来',
      note: '下面有六封信。不是总结，只是想认真告诉你们：认识你们真的很好。',
      paperPreset: 'receipt',
      color: 'sky',
    },
  ],
  friends: [
    {
      id: 'dichao',
      name: '邸超',
      nickname: '男妈妈',
      accent: '#d98565',
      paperPreset: 'torn',
      greeting: '写给男妈妈',
      message:
        '这里留给邸超。可以写下你最想感谢他的事、最容易想起的一个瞬间，或者只有你们看得懂的一句玩笑。真实一点就很好，不需要把它写成一封标准答案。',
      photos: placeholderPhotos('邸超', ['放一张很有你们味道的照片', '放一个会想笑的瞬间', '再留一张合照']),
    },
    {
      id: 'wenjin',
      name: '温进',
      nickname: '小姑姑',
      accent: '#8aaf9e',
      paperPreset: 'stitched',
      greeting: '写给小姑姑',
      message:
        '这里留给温进。可以写某次聊天、某种照顾，或者她在这段实习里让你觉得安心的地方。长短都没有关系，像你平时说话那样写就够了。',
      photos: placeholderPhotos('温进', ['放一张你喜欢的照片', '放一张日常随手拍']),
    },
    {
      id: 'dongxu',
      name: '东旭',
      nickname: '大姑姑',
      accent: '#7f9fc7',
      paperPreset: 'folded',
      greeting: '写给大姑姑',
      message:
        '这里留给东旭。可以记录一个你会一直记得的小片段，也可以写下平时没机会认真讲出口的话。这封信可以很安静，也可以继续保留你们之间的玩笑。',
      photos: placeholderPhotos('东旭', ['放一张值得纪念的照片', '放一张有故事的照片', '放一张合照']),
      video: {
        src: '',
        alt: '东旭的回忆视频',
        caption: '这里可以放一段短视频',
      },
    },
    {
      id: 'xiaopeng',
      name: '晓朋',
      accent: '#d2aa5f',
      paperPreset: 'basic-paper',
      greeting: '写给晓朋',
      message:
        '这里留给晓朋。写下一件很小但很具体的事会很好：一句话、一顿饭、一段一起忙碌的时间。越具体，过很久以后重新读的时候越有温度。',
      photos: placeholderPhotos('晓朋', ['放一张普通但舍不得删的照片', '放一张大家一起的照片']),
    },
    {
      id: 'zhaobin',
      name: '沼斌',
      nickname: '师傅',
      accent: '#b58873',
      paperPreset: 'receipt',
      greeting: '写给师傅',
      message:
        '这里留给沼斌。可以写下他教会你的东西，也可以写某件与工作无关、但你一直记得的小事。师傅这个称呼本身，应该就已经装着很多故事了。',
      photos: placeholderPhotos('沼斌', ['放一张师傅的照片', '放一个值得记下来的瞬间', '放一张大家的合照']),
    },
    {
      id: 'tianyue',
      name: '天岳',
      accent: '#a995c5',
      paperPreset: 'scalloped-edge',
      greeting: '写给天岳',
      message:
        '这里留给天岳。可以写你们之间最鲜明的一段记忆，也可以只写一句你很希望他以后还能记得的话。把正式留给工作，把真诚留在这里。',
      photos: placeholderPhotos('天岳', ['放一张有故事的照片', '放一张想留到很久以后的照片']),
      video: {
        src: '',
        alt: '天岳的回忆视频',
        caption: '这里可以放一段短视频',
      },
    },
  ],
  closing:
    '离职不是把这一页撕掉，只是把它夹进以后还会偶尔翻开的地方。谢谢你们，让我的第一段实习有了远超过“工作经历”的意义。',
};
