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
      message: `今天我将以最简单、最直白、不拖沓的方式给你写下这段话，希望能够稳稳地接住你。

从 10 月入职以来，感觉应该就是和你熟悉的时间最长了。我一直相信人与人之间是有磁场的，不是所有人靠近都会觉得舒服，但和你在一起聊天也好，瞎玩也好，搞点抽象也好，我好像可以不设防，可以完全自然地做自己，没有那么多人与人之间复杂的关系，而且很多点我们也都能 get 到，我真觉得我们在灵魂上就是注定的好朋友。你可别老说我性感了，我看你也好不到哪去。

时间确实过得很快啊，我这些天在脑子里回忆，发现这段实习竟然快过了大半年了。从刚来的时候，我还坐在 14 楼后面那个边边上，和你们都不坐在一起，到现在位置都换过两次了。当时刚来的时候，我们几个还总和燕子一起出去玩，那时候我才发现这里上班没有我想象中那么难熬。再到后来，师傅给我们算星盘，一个个新的实习生人来人往，包括我经历这么多段情感经历，虽说终究是没有找到合适的，仔细一想，真的过了好多事……

还记得当时寒假的时候，我就有点难受了。按照原定计划，其实到过年我就该差不多离职了，但是确实人和人之间产生了羁绊之后，一想到和大家分开心里真的会很不是滋味，断舍离对我来说真的是一个很难接受的人生命题……

chou why did，今天让我破格来夸一夸你吧，这真是发自内心的。我觉得你真的是一个非常真诚的人，我觉得在这个时代，碰到真诚的人真的不容易，至少我在大学里就感觉并没有碰上几个。而且你超级优秀，敢于去做自己喜欢的事情，本性也很善良，光从看你对团团宠的样子就能看得出来了，哈哈哈哈。

不管怎么样，这段同事关系终究是要走到尾声了，我看到有帖子说，人这一生可能碰到的、能够真正交心的挚友可能不超过 10 个，但我真的已经把你纳入我最好的挚友的那个行列了。此次虽然要短暂地分开，但还是那句话，朋友嘛，是一辈子的事！`,
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
