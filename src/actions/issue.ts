import request from '../utils/request';
import userList from '../config/user_list';

export default function comments(gitlabDataFromWebHook: any) {
  const {
    dingTalkUrl,
    user: {
      name: applyerName,
    },
    project: {
      name: projectName,
    },
    object_attributes: {
      title,
      url: issueUrl,
      state: actionState,
    },
    assignee: {
      name: assigneeName,
      username: assignUsername,
    }
  } = gitlabDataFromWebHook;
  let assigneeStr = '';
  if (actionState === 'opened') {
    assigneeStr = `@${userList[assigneeName] || userList[assignUsername]}`;
    // if no assignee then @ the applyer him/her self
    if (!userList[assigneeName] && !userList[assignUsername]) {
      assigneeStr = '';
    }
  }
  // ##### is needed to break line into multiple
  const text = `${applyerName} open issue at repository ${projectName} \n`
    + `> ##### [${title}](${issueUrl}) \n`
    + `> ##### State: ${actionState} \n`
    + `> ##### Assignee: ${assigneeName} ${assigneeStr}`;
  request(dingTalkUrl, text);
}
