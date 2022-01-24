import axios from 'axios';
import userList from '../config/user_list';
import { getDingtalkUrlByRepositoryUrl } from '../utils/functions';

/**
 * 需求
 * 1. merge request 直接@ 对应的 assignee user
 * 2. 如果没有设置默认的 assignee user, 则不@
 */

export default function mergeRequest(gitlabDataFromWebHook: any) {
  const {
    object_kind,
    user: {
      name: applyerName,
    },
    assignee: { 
      name: assigneeName,
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
    repository: {
      url: repositoryUrl,
    },
  } = gitlabDataFromWebHook;

  // if merge request no assignee, then @ applyer and notice him/her
  let assigneeStr = `@${userList[assigneeName]}`
  if (!userList[assigneeName]) {
    assigneeStr = `@${userList[applyerName]} 要找谁帮你merge代码呢？记得选择Assignee哦`
  }

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