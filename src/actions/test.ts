import axios from 'axios';
// import gitlabDataFromWebHook from '../events_mock_data/merge_request';
// import gitlabDataFromWebHook from '../events_mock_data/comment';
// import gitlabDataFromWebHook from '../events_mock_data/normal_comment';
// import gitlabDataFromWebHook from '../events_mock_data/merge_request_closed';
// import gitlabDataFromWebHook from '../events_mock_data/merge_request_merged';
// import gitlabDataFromWebHook from '../events_mock_data/push';
// import gitlabDataFromWebHook from '../events_mock_data/tag_push';
// import gitlabDataFromWebHook from '../events_mock_data/issue';
// import gitlabDataFromWebHook from '../events_mock_data/build';
// import gitlabDataFromWebHook from '../events_mock_data/pipeline';
import gitlabDataFromWebHook from '../events_mock_data/wiki';

const crTestDingTalkGroupUrl = 'https://oapi.dingtalk.com/robot/send?access_token=ce934d72606e0fe43cfa015f628cbc1b95438f47f0d575c6336a95eea1490b96';
const localHook = `http://127.0.0.1:50001/code-review?dingTalkUrl=${encodeURIComponent(crTestDingTalkGroupUrl)}`;
// const localHook = `http://121.196.38.64:50001/code-review?dingTalkUrl=${encodeURIComponent(crTestDingTalkGroupUrl)}`;

axios.post(
  localHook,
  gitlabDataFromWebHook,
).then((res) => {
  console.log('Action successfully');
}).catch((e) => {
  console.error('error', e);
});
