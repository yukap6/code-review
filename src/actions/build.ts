import request from '../utils/request';

export default function comments(gitlabDataFromWebHook: any) {
  const {
    dingTalkUrl,
    ref,
    build_name: jobName,
    build_stage: jobStage,
    build_status: jobStatus,
    user: { 
      name: applyerName,
    },
    repository: {
      name: projectName,
      homepage: projectUrl,
    },
  } = gitlabDataFromWebHook;

  const text = `${applyerName} run build with branch ${ref.replace('refs/heads/', '')} at repository [${projectName}](${projectUrl}) \n`
    + `> ##### BuildName: ${jobName} \n`
    + `> ##### BuildStage: ${jobStage} \n`
    + `> ##### BuildStatus: ${jobStatus} \n`;
  request(dingTalkUrl, text);
}
