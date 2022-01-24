// 测试群
export const defaultDingtalkUrl = 'https://oapi.dingtalk.com/robot/send?access_token=ce934d72606e0fe43cfa015f628cbc1b95438f47f0d575c6336a95eea1490b96';

// code review 正式群
// export const defaultDingtalkUrl = 'https://oapi.dingtalk.com/robot/send?access_token=ae02abd824a4c628b97dd95a2ce3f2a67303cccfe38b6c3dd2aee2c6efb8c169';

const projectDingtalkUrls: any = {
  // 默认B端CodeReview群消息
  // 需要指定特定群消息的以如下形式配置, key 为git仓库url，value为对应群消息机器人链接
  // 'repositoryUrl': 'dingtalkUrl' // 比如 'aaaurl': 'http://dingtalk.com'
};

export default projectDingtalkUrls;