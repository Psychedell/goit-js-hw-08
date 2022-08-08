import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

const onPlayCurrentTime = function ({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
  //   console.log(seconds);
};

const currentTime = localStorage.getItem('videoplayer-current-time');
player.setCurrentTime(currentTime);

player.on('timeupdate', throttle(onPlayCurrentTime, 1000));
