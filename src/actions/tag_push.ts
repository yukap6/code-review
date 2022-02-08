import request from '../utils/request';

export default function comments(gitlabDataFromWebHook: any) {
  const {
    dingTalkUrl,
    ref,
    user_name: applyerName,
    project: {
      name: projectName,
      web_url: projectUrl,
    },
  } = gitlabDataFromWebHook;

  const text = `${applyerName} pushed tag ${ref.replace('refs/tags/', '')} at repository [${projectName}](${projectUrl}) \n`;
  request(dingTalkUrl, text);
}
