import axios from 'axios';
import userList from '../config/user_list';
import dingTalkCustomPrefix from '../config/dingtalk_custom_prefix';

export default function request(dingTalkUrl: string, text: string) {
  axios.post(
    dingTalkUrl,
    {
      "msgtype": "markdown",
      "at": {
        // TODO: this could be optimized with real @ user
        "atMobiles": Object.values(userList), // @ need to config 2 place, this is first place
        "atUserIds": [],
        "isAtAll": false
      },
      "markdown": {
        "title": dingTalkCustomPrefix,
        // // @ need to config 2 place, this is second place
        "text": `#### ${dingTalkCustomPrefix}: ${text}`,
      },
    }
  ).then((res: any) => {
    console.log(res.data);
  });
}