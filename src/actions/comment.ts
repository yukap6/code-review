import request from '../utils/request';
import userList from '../config/user_list';
import {
  upperCamelCaseToLowerCase,
  gitlabUserToDingTalkUser,
} from '../utils/functions';

export default function comments(gitlabDataFromWebHook: any) {
  const {
    dingTalkUrl,
    user: {
      name: applyerName,
    },
    object_attributes: { 
      url: gitActionUrl,
      noteable_type: noteAbleType,
      note,
    },
    project: {
      name: projectName,
    },
  } = gitlabDataFromWebHook;
  
  const isMergeRequestComment = noteAbleType === 'MergeRequest'; // check is normal comment or MR comment
  let commentSuffixDes = '';
  if (isMergeRequestComment) {
    const {
      merge_request: {
        source_branch,
        target_branch,
      },
    } = gitlabDataFromWebHook;
    commentSuffixDes = `from ${source_branch} to ${target_branch}`;
  }

  // if note is 1, it means this mr is ready for next process, then @ master
  const noteDescription = String(note) === '1' ? `1 上一轮MR已完成 @${userList['jingweirong']}` : gitlabUserToDingTalkUser(note);
  const text = `${applyerName} [commented](${gitActionUrl}) on ${upperCamelCaseToLowerCase(noteAbleType)} ${commentSuffixDes} \n`
    + `> ${noteDescription} \n`
    + `> [${gitActionUrl}](${gitActionUrl}) \n`
    + `> Repository: ${projectName} \n`;
  request(dingTalkUrl, text);
}
