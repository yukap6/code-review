import request from '../utils/request';

export default function comments(gitlabDataFromWebHook: any) {
  const {
    dingTalkUrl,
    object_attributes: {
      title: wikiPageTitle,
      url: wikiPageUrl,
    },
    user: { 
      name: applyerName,
    },
    project: {
      name: projectName,
    },
  } = gitlabDataFromWebHook;

  const text = `${applyerName} create a wiki page at repository ${projectName} \n`
    + `> [${wikiPageTitle}](${wikiPageUrl})`;
  request(dingTalkUrl, text);
}
