#PJ1 音乐可视化

## 使用方法
将需要播放的音频放入```public\media\```目录下。

在目录下先执行```npm install```，接下来使用```npm start```开始运行。

进入``` http://127.0.0.1:3000/ ```后，双击左侧列表即可播放音乐。

## 算法原理
使用Canvas进行音频数据的可视化，使用Node.js实现服务端，使用html+css实现前端。

通过Ajax从服务器端获取音频的二进制arraybuffer数据，调用用requestAnimationFrame()动画函数实时得到频域数据，用canvas可视化出来。
