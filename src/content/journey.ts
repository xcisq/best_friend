import type { PaperPreset } from '../components/paper-shape/geometry';

export interface MediaAsset {
  src: string;
  alt: string;
  caption?: string;
  poster?: string;
}

export interface PhotoWallAsset extends MediaAsset {
  id: string;
  frame: 'polaroid' | 'stamp' | 'torn' | 'postcard';
  wallNote?: string;
}

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  note: string;
  paperPreset: PaperPreset;
  color: string;
}

export interface DetailedTimelineEntry {
  id: string;
  date: string;
  title: string;
  note: string;
  railDetail: string;
  icon: string;
  tone: 'apricot' | 'mint' | 'sky' | 'pink' | 'butter' | 'lavender';
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
  detailedTimeline: DetailedTimelineEntry[];
  photoWall: PhotoWallAsset[];
  friends: FriendLetter[];
  closing: string;
}

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
  detailedTimeline: [
    {
      id: 'shijingshan-hike',
      date: '2025.11.01',
      title: '和晓朋去爬石景山',
      note: '一起往山上走，把北京的秋天和刚刚开始熟悉的日子都收进来了。',
      railDetail: '和晓朋爬石景山',
      icon: '△',
      tone: 'apricot',
    },
    {
      id: 'fortune-reading',
      date: '2025.11.06',
      title: '师傅给我算命理',
      note: '师傅的技能树到底还有多少！',
      railDetail: '师傅的命理小课堂',
      icon: '✦',
      tone: 'butter',
    },
    {
      id: 'escape-room-ktv',
      date: '2025.12.05',
      title: '第一次团建：密室逃脱',
      note: '第一次团建，密室逃脱之后，在ktv和东旭莫名嗨起来。',
      railDetail: '密室逃脱，再和东旭嗨唱',
      icon: '♫',
      tone: 'pink',
    },
    {
      id: 'beijing-first-snow',
      date: '2025.12.12',
      title: '北京初雪',
      note: '北京初雪，也是煜成离职的那天',
      railDetail: '北京初雪',
      icon: '❄',
      tone: 'sky',
    },
    {
      id: 'harry-potter-bar',
      date: '2026.01.30',
      title: '哈利波特酒吧！',
      note: '豆姐太会找地方了，也是来霍格沃茨喝上酒了',
      railDetail: '哈利波特酒吧',
      icon: '⚡',
      tone: 'lavender',
    },
    {
      id: 'spa-team-building',
      date: '2026.02.06',
      title: '第二次团建：水裹汤泉',
      note: '姑姑、博文、超超和我一起待到最晚！',
      railDetail: '水裹汤泉，待到最晚',
      icon: '♨',
      tone: 'mint',
    },
    {
      id: 'spring-festival-home',
      date: '2026.02.10',
      title: '回家过年啦～',
      note: '短暂回家的时光，竟然已经开始有点想念大家了ww。原来习惯彼此，是这样悄悄发生的。',
      railDetail: '回家过年，开始想念大家',
      icon: '⌂',
      tone: 'apricot',
    },
    {
      id: 'meet-tuantuan',
      date: '2026.03.17',
      title: '第一次看到团团',
      note: '第一次看到团团，当上了团团叔，团团的家人突然多了起来～',
      railDetail: '第一次见团团',
      icon: '♡',
      tone: 'mint',
    },
    {
      id: 'beijing-birthday',
      date: '2026.03.30',
      title: '在北京一起过的第一个生日',
      note: '在北京的第一个生日和大家一起过的～',
      railDetail: '一起过生日',
      icon: '✿',
      tone: 'pink',
    },
    {
      id: 'stranger-things-merch',
      date: '2026.04.18',
      title: '姑姑陪我找怪奇物语周边',
      note: '姑姑陪我去找怪奇物语周边。这一天的时间怎么可以过的这么快！。',
      railDetail: '和姑姑找怪奇物语周边',
      icon: '⌕',
      tone: 'lavender',
    },
    {
      id: 'stay-at-chaochao-home',
      date: '2026.05.07',
      title: '第一天来到超超家住',
      note: '第一天来到超超家住。超超真的好好🥺，原本的紧张很快就被照顾和安心接住了。',
      railDetail: '住进超超家',
      icon: '⌂',
      tone: 'butter',
    },
    {
      id: 'camping-road-trip',
      date: '2026.05.30',
      title: '最最最最开心的一天',
      note: '和最好的朋友一起自驾去百里山水画廊露营，真的好圆满的一天。每次想起这一天，还是会觉得特别开心特别幸福。',
      railDetail: '和最好的朋友自驾露营',
      icon: '☼',
      tone: 'mint',
    },
    {
      id: 'farewell-day',
      date: '2026.06.05',
      title: '真的到了说再见的时候',
      note: '这一天还是来了。不是把这一页合上，而是认真收好：以后翻到这里，还是会觉得认识你们真好。',
      railDetail: '把这一页认真收好',
      icon: '♡',
      tone: 'sky',
    },
  ],
  photoWall: [
    {
      id: 'wall-chaochao-01',
      src: '/media/family1.jpg',
      alt: '一起走过的回忆照片 01',
      caption: '被认真照顾的日子',
      frame: 'polaroid',
      wallNote: '日常的合照～',
    },
    {
      id: 'wall-dongxu-01',
      src: '/media/family02.jpg',
      alt: '一起走过的回忆照片 02',
      caption: '唱到很开心的夜晚',
      frame: 'stamp',
      wallNote: 'family',
    },
    {
      id: 'wall-wenjin-01',
      src: '/media/family03.jpg',
      alt: '一起走过的回忆照片 03',
      caption: '普通但舍不得删',
      frame: 'torn',
      wallNote: '你醒啦？',
    },
    {
      id: 'wall-xiaopeng-01',
      src: '/media/family04.jpg',
      alt: '一起走过的回忆照片 04',
      caption: '一起出发',
      frame: 'postcard',
      wallNote: '新工卡就位！',
    },
    {
      id: 'wall-shifu-01',
      src: '/media/family05.jpg',
      alt: '一起走过的回忆照片 05',
      caption: '师傅的小课堂',
      frame: 'polaroid',
      wallNote: 'amaze amaze amaze',
    },
    {
      id: 'wall-tianyue-01',
      src: '/media/family06.jpg',
      alt: '一起走过的回忆照片 06',
      caption: '短暂但有趣的相遇',
      frame: 'stamp',
      wallNote: '日常🏓',
    },
    {
      id: 'wall-dongxu-02',
      src: '/media/family07.jpg',
      alt: '一起走过的回忆照片 07',
      caption: '热闹地聚在一起',
      frame: 'postcard',
      wallNote: '睡昏了...',
    },
    {
      id: 'wall-chaochao-02',
      src: '/media/family08.jpg',
      alt: '一起走过的回忆照片 08',
      caption: '安心的小日常',
      frame: 'torn',
      wallNote: '卷腹八分钟！',
    },
    {
      id: 'wall-wenjin-02',
      src: '/media/family09.jpg',
      alt: '一起走过的回忆照片 09',
      caption: '把这一刻留下来',
      frame: 'stamp',
      wallNote: '肥姨妈太香了😍',
    },
    {
      id: 'wall-shifu-02',
      src: '/media/family10.jpg',
      alt: '一起走过的回忆照片 10',
      caption: '下次继续切磋',
      frame: 'polaroid',
      wallNote: '乒乓小子游走',
    },
    {
      id: 'wall-xiaopeng-02',
      src: '/media/family11.jpg',
      alt: '一起走过的回忆照片 11',
      caption: '大家一起',
      frame: 'torn',
      wallNote: '惬意～',
    },
    {
      id: 'wall-tianyue-02',
      src: '/media/family12.jpg',
      alt: '一起走过的回忆照片 12',
      caption: '留到很久以后',
      frame: 'postcard',
      wallNote: '在北京的第一个生日！',
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
      message: `写下这段文字的时候，我还正好坐在你旁边，让我来构思构思一下这封信的内容哈哈哈哈哈。

其实我们相处的时间确实不长，我最开始对你的最直观的感觉就是觉得你很友善，虽然说最开始还不够了解，但是能感觉到你是一个心底善良的人。我始终觉得虽然性格需要深刻接触才能了解，但是人的本性还是能从方方面面透露出来的。

还记得刚开始几天来你家住的时候，我其实很惶恐很紧张，我挺害怕就是你会觉得我麻烦你了，打扰到你的个人生活了，但确实和你接触之后完完全全打消了我的这种疑虑，感觉从小到大我还真的属于是第一次遇到你这么细致的人，而且你真的很好啊，感觉和你一起相处特别舒服，每天回来真的超级超级放松，真的感叹时间过得太快了，一开始总觉得会有点害怕，但是逐渐就真的变成相见恨晚了。

感觉能够和你这样的人做朋友我真觉得是我的福气，感觉你很会为人着想，人也是大大方方的，也非常地会照顾人，最让我震惊的是你真的是太全面了，你的屋子我真感觉是百宝箱了，什么都有，这个点真的太牛了！包括和大家一起出去玩，真的就是给人一种特别安稳的感觉，特别靠谱，感觉有你在，整个旅途都夯中夯！

最后也希望你能在未来的职业道路中顺顺利利，成焕的这突然一下确实是直观感受到职场的残酷了，但我相信你肯定会有自己的规划的，朝着自己的方向走，倒不说要一夜成为什么超级富翁，但我会永远祈福你顺顺利利，这是我最纯粹的祝愿。

只能说这波真成兄弟了，也真的感谢这段时间对我的照顾，以后必须得常联系，虽然同事关系马上要到尽头了，但是，真正能够交心的朋友，那可是一辈子的事情！`,
      photos: [
        {
          src: '/letters/dichao/chaochao01.jpeg',
          alt: '邸超的回忆照片：很有你们味道的一张照片',
          caption: '有点帅了～',
        },
        {
          src: '/letters/dichao/chaochao02.jpeg',
          alt: '邸超的回忆照片：一个会想笑的瞬间',
          caption: '健身启动！',
        },
      ],
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

不管怎么样，这段同事关系终究是要走到尾声了，我看到有帖子说，人这一生可能碰到的、能够真正交心的挚友可能不超过 10 个，但我真的已经把你纳入我最好的挚友的那个行列了，而且以后和温总以后说不定还得有深度合作呢🤝。此次虽然要短暂地分开，但还是那句话，朋友嘛，是一辈子的事！`,
      photos: [
        {
          src: '/letters/wenjin/wenjin01.png',
          alt: '温进的回忆照片：一张你喜欢的照片',
          caption: '记得给我涨薪',
        },
        {
          src: '/letters/wenjin/wenjin02.png',
          alt: '温进的回忆照片：一张日常随手拍',
          caption: '团团的家～',
        },
      ],
    },
    {
      id: 'dongxu',
      name: '东旭',
      nickname: '大姑姑',
      accent: '#7f9fc7',
      paperPreset: 'folded',
      greeting: '写给大姑姑',
      message: `哎呀，到给我的小棉袄写信了嗷。该说不说，感觉咱的关系也是有点混乱了，sister、姑姑、女儿、吗喽，一会儿又变霸霸了，这个我不认。

和你相熟确实感觉还挺奇妙的。刚开始第一次换位置的时候，看到座位表旁边是你，当时还有些抗拒，内心 OS 大概是：咦，这是谁，好陌生，不行，我得大胆一点提出换个位置。甚至到后面换了位置之后，我们也有很长一段时间没说过一句话。到后来我已经忘记了是如何突然就搭起话来了，大概是那次 KTV，哈哈哈。我刚去翻了一下聊天记录，除了换位置的第一条消息，居然是发的师傅的表情包，hhh。

接下来到感性小环节了。我觉得和你在一块玩耍、相处，真的超级放松，永远拥护小绿人。至少在我这里，是能感觉到你的真实和真诚的。至少在和你成为朋友的这段时间里，我真的超级开心。你总说我的话多，只是我在面对我的好朋友的时候，分享欲会更强一些，因为我喜欢和你分享我看到的一切事物，我想和你表达我的情绪，开心的、难过的，或许我更愿意去告诉你们。

但其实我觉得，这也是我本能地对待你的一种信任吧。因为和你相处，我能够放下防线，不需要有一切复杂的东西，我只需要展示最真实的我自己，不用有过多复杂的思考。人和人之间的任何事情都是互相的，缘分让我们能够坐在一起，并且有机会去沟通交流，互相真诚相待，成为很好很好的朋友，我觉得这就是上帝给我的一份很稀缺的礼物。虽然我可能是 E 人，但是我觉得能够真正交心的朋友并不多，但是姑姑你，是其中之一。

其实我一直都很讨厌“分别”这两个字，它像一根很细很细的刺，悄悄藏在所有热闹的缝隙里。那天我们一起出去玩，明明笑得很大声，阳光也刚刚好，可脑子里偏偏有个小小的声音在提醒我，没有多久就要分离了，下一次还能这样一起相聚又会是什么时候呢……

还有那天一起去看怪奇物语周边那天，我已经很久很久没有那么松弛地、毫无保留地和一个人聊起自己的人生了。印象很深刻，那天最明显的感受就是时间怎么可以过得这么快，聊完之后甚至有点恍惚，下一次还会有这样的一天吗？还会再遇到一个愿意倾听、我也愿意去诉说的时候吗？和人建立羁绊、去诉说往事，我觉得其实是一件很耗心力的事情，所以我也并不愿意轻易地和谁产生太深的联系……

好了，性感小环节结束！再写下去真得掉小珍珠了...人生的阶段就是这样一段一段的，我马上要迈入下一个阶段咯。但就像我们之前也探讨过，如果互相都把彼此当作真的好朋友，哪怕时间过得很久很久，哪怕联系得不多，终究是会把对方装在心里的。很开心能够认识你，就像我和温进也说了，朋友嘛，那是一辈子的事情！`,
      photos: [
        {
          src: '/letters/dongxu/dongxu01.jpeg',
          alt: '东旭的回忆照片：一张值得纪念的照片',
          caption: 'Demogorgon!',
        },
        {
          src: '/letters/dongxu/dongxu02.jpeg',
          alt: '东旭的回忆照片：一张有故事的照片',
          caption: '等你练出马甲线！',
        },
      ],
    },
    {
      id: 'xiaopeng',
      name: '晓朋',
      accent: '#d2aa5f',
      paperPreset: 'basic-paper',
      greeting: '写给晓朋',
      message: `你小子算是我来字节认识的最早的一那批人了，还记得刚刚来的时候，听到你的声音就感觉你特别呆萌可爱的一个人，现在感觉不一定哦哈哈哈。landing 的时候好多东西都是问你的，这里还是表示非常感谢呀。那个时候咱们正好也顺路，每天可以一起回家，你给我讲组里好多好多的故事，还玩到了你的 5080，你的电脑确实还是体验感太好了，但是我还是得说一下，你这个提前消费的观念我可不赞同啊，这每个月月光感觉真的会过得很难受的，总怕万一有什么地方需要超出消费一下对吧。

回想我这段实习，咱们一起经历的事还真不少，一起去爬山、吃饭，还有团建。你平时看起来话不多、性格内敛，但其实很多点还是和我想象的很不一样的，你也有自己的想法、自己的主见，对待朋友也很好，当然还有我不理解的特殊室友机制，到底和佳佳现在是什么关系，我真的很好奇！

我们的这段同事关系也是要靠近尾声啦，但不在这个公司也要是朋友。以后要是有机会去深圳一定要告诉我，必须得再出来聚一聚！也希望你之后的职业道路能够顺顺利利，找到自己喜欢并且适合的工作，到时候一定要记得攒钱哦，可不要再月光了。`,
      photos: [
        {
          src: '/letters/xiaopeng/xiaopeng01.jpeg',
          alt: '晓朋的回忆照片：一张普通但舍不得删的照片',
          caption: '石景山，开始修仙～',
        },
        {
          src: '/letters/xiaopeng/xiaopeng02.jpeg',
          alt: '晓朋的回忆照片：一张大家一起的照片',
          caption: '你这太有范了',
        },
      ],
    },
    {
      id: 'zhaobin',
      name: '沼斌',
      nickname: '师傅',
      accent: '#b58873',
      paperPreset: 'receipt',
      greeting: '写给师傅',
      message: `啊啊啊，在桌上突然看到乒乓球拍的那一刻，真的好惊喜，也是情感细腻了一波，当时是真的差点没忍住眼泪。新拍子手感超好，等我适应一下，下次可以继续打爆你了。

在这里实习的整段时间里，我最敬佩的人，毫无疑问就是师傅了。刚来的头两周，还带着一腔新鲜劲儿，激情满满地想大干一场，结果干着干着，慢慢就感觉到这里的技术氛围跟我想象的有些落差，那段时间其实挺迷茫的。但认真说，要不是你在，我可能早就悄悄提了离职了哈哈哈哈。是你让我觉得“哦，这里还有值得留下来的理由”。

真的很感谢师傅，教会了我好多东西，技术层面的、生活层面的，甚至连命理都懂，果然还是太全面了！刚开始的时候，我其实挺怕去找你问问题的，总担心你会觉得我太小白、问的东西太基础，会不耐烦。但是和你真正接触之后，这种顾虑完全被打消了。你讲解问题的时候从来不嫌烦，不管多小的细节都愿意认真解答，给人一种很踏实、很安心的感觉，更像是一个知心的哥哥，而不只是同事。这里不得不点名一下晓朋，晓朋给我讲东西，我真的很难听懂过。这次要离职了，还不知道下次得什么时候能听上师傅的周五小课堂了……

除了同事关系之外，那师傅当然得是我最好的球搭子了！每天上班最期待的就是晚上和师傅下去来两拍了。该说不说，咱俩从刚开始打球到现在，那可真是涨球了，现在每每局比赛那真是都奔着打死对方去的哈哈哈哈。虽然这波要去深圳了，但以后有机会那必须还得切磋切磋！我包要偷偷加练的，你可小心点。

最后，我是真的希望，在接下来这段时间，你能顺顺利利找到一份真正适合自己、让自己舒心的工作。我在这里待的这段时间，能明显感受到这里的环境对你来说有点憋屈，按照你的技术水平明明可以去一个更加专业的团队的。找一个钱多、氛围好的地方，好好干个几年，然后早点退休去享受生活！这是我最朴实也最真心的祝愿。`,
      photos: [
        {
          src: '/letters/shifu/shifu01.png',
          alt: '沼斌的回忆照片：一张师傅的照片',
          caption: '翻了好久才找到的一张合照',
        },
        {
          src: '/letters/shifu/shifu02.jpg',
          alt: '沼斌的回忆照片：一个值得记下来的瞬间',
          caption: '一个值得记下来的瞬间',
        },
      ],
    },
    {
      id: 'tianyue',
      name: '天岳',
      accent: '#a995c5',
      paperPreset: 'scalloped-edge',
      greeting: '写给天岳',
      message: `虽然我们只认识了简单两周，但也算是比较有缘分，正好碰上了我的离职期，就正好要把工作都交接给你了，但是真的相见恨晚啊，感觉你是个特别有趣的人，而且你真的知识面好广啊，真的超出了我的想象了哈哈哈哈，这个大文豪的称号必须给你！

只可惜只能在这里共事短短的两周，但希望以后有机会还能够在一起玩，如果去到了深圳一定要和我联系！`,
      photos: [
        {
          src: '/letters/tianyue/tianyue01.jpg',
          alt: '天岳的回忆照片：一张有故事的照片',
          caption: '指点江山！',
        },
        {
          src: '/letters/tianyue/tianyue02.jpg',
          alt: '天岳的回忆照片：一张想留到很久以后的照片',
          caption: '一群罗老师帅到扭曲',
        },
      ],
    },
  ],
  closing:
    '离职不是把这一页撕掉，只是把它夹进以后还会偶尔翻开的地方。谢谢你们，让我的第一段实习有了远超过“工作经历”的意义。',
};
