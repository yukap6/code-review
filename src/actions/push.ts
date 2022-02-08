import request from '../utils/request';

export default function comments(gitlabDataFromWebHook: any) {
  const {
    dingTalkUrl,
    ref,
    user_name: applyerName,
    commits,
    project: {
      name: projectName,
    },
  } = gitlabDataFromWebHook;
  // ##### is needed to break line into multiple
  const commitsStr = commits.map((item: any) => `> ##### [${String(item.id).substring(0, 8)}](${item.url})`).join('\n');
  const text = `${applyerName} pushed to branch ${ref.replace('refs/heads/', '')} at repository ${projectName} \n ${commitsStr}`;
  request(dingTalkUrl, text);
}
