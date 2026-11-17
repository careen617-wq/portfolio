# 任馨芸 Xinyun Ren · 个人作品集网站

影视配乐 & 声音设计个人主页，「一作品一页」结构（6 部作品）。纯 HTML / CSS / JavaScript，双击 index.html 即可预览。

> 🔒 所有作品页的播放器画面中央带 XINYUN REN 水印（半透明、不遮挡播放）。

## 🗂 作品结构与文件对应

| 作品页 | 播放文件 | 封面 |
|---|---|---|
| works/panghuang.html · 彷徨之刃 · Film Scoring | video/panghuang-zhiren.mp4 | images/poster-panghuang.jpg |
| works/hand-in-hand.html · Hand in Hand | video/hand-in-hand.mp4 | images/poster-hand-in-hand.jpg |
| works/rose.html · Pilgrimage of the Celestial Rose（国风游戏纯音乐） | audio/celestial-rose.wav | images/rose-cover.jpg（已替换为你的封面图） |
| works/poulette.html · Poulette's Chair（治愈风动画） | video/poulettes-chair.mp4 | images/poster-poulette.jpg |
| works/mario-trailer.html · Mario Trailer（游戏预告片配乐） | video/mario-trailer.mp4 | images/poster-mario.jpg |
| works/batman-trailer.html · Batman Trailer（电影预告片配乐） | video/batman-trailer.mp4 | images/poster-batman.jpg |

## 🎬 放入完整作品

播放器不限时长，**直接同名覆盖**对应文件即可：

- 五个视频作品：用 H.264 + AAC 的 MP4 覆盖 video/ 下同名文件（分辨率随意，建议 720p 以上）
- Rose：用完整音频覆盖 audio/celestial-rose.wav（若用 mp3/m4a，把 index 同名处及 rose.html 中 src 后缀同步修改）
- 封面帧 images/poster-*.jpg 可选：可随时换成影片截图（16:9 效果最佳）
- 若想改文件名：同步修改对应作品页 <video>/<audio> 的 src 与首页卡片缩略图路径

各作品页的文字（作品说明、角色、风格等）在对应 works/*.html 中直接编辑，Poulette's Chair 页的文案为示意稿，可按实际情况润色。

## 🖼 其他可个性化

- 头像：index.html 中 <div class="avatar">馨</div> 可替换为照片
- 网盘链接：全文搜索 pan.baidu.com 批量替换
- 技能百分比：搜索 --w: 调整

## 🚀 部署上线

整个文件夹拖入 Vercel / Netlify 或推送 GitHub 开启 Pages。完整视频较大时可压缩（1080p H.264 CRF 23 约每分钟 20–60MB），或改用 Bilibili / Vimeo 外链嵌入。
