import axios from 'axios';
import gitlabDataFromWebHook from '../events_mock_data/merge_request';


const localHook = 'http://127.0.0.1:50001/code-review';
axios.post(
  localHook,
  gitlabDataFromWebHook,
).then((res) => {
  console.log(res.data);
}).catch((e) => {
  console.error(e);
});
