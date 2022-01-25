import axios from 'axios';
import userList from '../config/user_list';

/**
 * 需求
 * 1. merge request 直接@ 对应的 assignee user
 * 2. 如果没有设置默认的 assignee user, 则不@
 */

export default function mergeRequest(gitlabDataFromWebHook: any) {
  const {
    dingTalkUrl,
    object_kind,
    user: {
      name: applyerName,
      username: applyerUsername,
    },
    assignee: { 
      name: assigneeName,
      username: assignUsername,
    },
    object_attributes: { 
      action,
      url: gitActionUrl,
      title,
      description,
      source_branch,
      target_branch,
      state: actionState,
    },
    project: {
      name: projectName,
    },
  } = gitlabDataFromWebHook;

  // if merge request no assignee, then @ applyer and notice him/her
  // only @assignee if mr is opened
  let assigneeStr = '';
  if (actionState === 'opened') {
    assigneeStr = `@${userList[assigneeName] || userList[assignUsername]}`;
    // if no assignee then @ the applyer him/her self
    if (!userList[assigneeName] && !userList[assignUsername]) {
      assigneeStr = `@${userList[applyerName] || userList[applyerUsername]} 要找谁帮你merge代码呢？记得选择Assignee哦`
    }
  }
  if (actionState === 'merged') {
    const {
      object_attributes: {
        // last_commit is exist this case
        last_commit: {
          author: {
            email: applyerEmail,
          },
        },
      },
    } = gitlabDataFromWebHook
    const lastCommitUsername = applyerEmail.replace('@mistong.com', '');
    if (lastCommitUsername !== applyerName) {
      // only @ user if this actions is not dispatched by him/her self
      assigneeStr = `@${userList[lastCommitUsername] || '佚名'}, you can move on now`;
    }
  }

  axios.post(
    dingTalkUrl,
    {
      "msgtype": "markdown",
      "at": {
        "atMobiles": Object.values(userList), // @ need to config 2 place, this is first place
        "atUserIds": [],
        "isAtAll": false
      },
      "markdown": {
        "title": object_kind,
        // @ need to config 2 place, this is second place
        "text": `#### CodeReview: ${applyerName} ${action} the ${object_kind} from ${source_branch} to ${target_branch} ${assigneeStr} \n `
          + `> [${title}](${gitActionUrl}) \n `
          + `> ###### [${description}](${gitActionUrl}) \n `
          + ` > ###### Status: ${actionState} \n `
          + `> Repository: ${projectName} \n `
        + `> ###### [${gitActionUrl}](${gitActionUrl})`
      },
    }
  ).then((res: any) => {
    console.log(res.data);
  });
}
