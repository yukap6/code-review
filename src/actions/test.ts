import axios from 'axios';
// import gitlabDataFromWebHook from '../events_mock_data/merge_request';
// import gitlabDataFromWebHook from '../events_mock_data/comment';
import gitlabDataFromWebHook from '../events_mock_data/normal_comment';


const localHook = 'http://127.0.0.1:50001/code-review';
// const localHook = 'http://121.196.38.64:50001/code-review';
axios.post(
  localHook,
  gitlabDataFromWebHook,
).then((res) => {
  console.log(res.data);
}).catch((e) => {
  console.error(e);
});
