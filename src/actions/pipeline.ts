import request from '../utils/request';

export default function comments(gitlabDataFromWebHook: any) {
  const {
    dingTalkUrl,
    object_attributes: {
      ref,
    },
    user: { 
      name: applyerName,
    },
    project: {
      name: projectName,
      web_url: projectUrl,
    },
  } = gitlabDataFromWebHook;

  const text = `${applyerName} run pipeline with branch ${ref.replace('refs/heads/', '')} at repository [${projectName}](${projectUrl}) \n`;
  request(dingTalkUrl, text);
}
