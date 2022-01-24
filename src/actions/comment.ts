import axios from 'axios';
import userList from '../config/user_list';
import {
  upperCamelCaseToLowerCase,
  gitlabUserToDingTalkUser,
  getDingtalkUrlByRepositoryUrl,
} from '../utils/functions';

export default function comments(gitlabDataFromWebHook: any) {
  const {
    object_kind,
    user: {
      name: applyerName,
    },
    object_attributes: { 
      url: gitActionUrl,
      noteable_type: noteAbleType,
      note,
    },
    merge_request: {
      source_branch,
      target_branch,
    },
    project: {
      name: projectName,
    },
    repository: {
      url: repositoryUrl,
    },
  } = gitlabDataFromWebHook;
  
  // if note is 1, it means this mr is ready for next process, then @ master
  const noteDescription = String(note) === '1' ? `1 上一轮MR已完成 @${userList['jingweirong']}` : gitlabUserToDingTalkUser(note);
  axios.post(
    getDingtalkUrlByRepositoryUrl(repositoryUrl),
    {
      "msgtype": "markdown",
      "at": {
        "atMobiles": Object.values(userList), // @ need to config 2 place, this is first place
        "atUserIds": [],
        "isAtAll": false
      },
      "markdown": {
        "title": object_kind,
        // // @ need to config 2 place, this is second place
        "text": `#### CodeReview: ${applyerName} [commented](${gitActionUrl}) on ${upperCamelCaseToLowerCase(noteAbleType)} from ${source_branch} to ${target_branch} \n`
          + `> ${noteDescription} \n`
          + `> [${gitActionUrl}](${gitActionUrl}) \n`
        + `> Repository: ${projectName} \n`
      },
    }
  ).then((res: any) => {
    console.log(res.data);
  });
}
