import userList from '../config/user_list';
import projects, { defaultDingtalkUrl } from '../config/projects';

export function getDingtalkUrlByRepositoryUrl(url = '') {
  return projects[url] || defaultDingtalkUrl;
}

export function upperCamelCaseToLowerCase(str = '') {
  const reg = /([A-Z])/g;
  return str.replace(reg, (match: string) => {
    return ` ${match.toLocaleLowerCase()}`;
  }).replace(/^ /, ''); // 去掉开头的空格
}

export function gitlabUserToDingTalkUser(str = '') {
  const reg = /\@[^\s]*/g;
  return str.replace(reg, (match: string) => {
    return `@${userList[match.replace('@', '')]}`;
  });
}