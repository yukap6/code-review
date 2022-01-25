import Koa from "koa";
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import fs from 'fs';
import actionComment from './actions/comment';
import actionMergeRequest from './actions/merge_request';

interface ICtx {
  request: any;
  body?: any;
}

const app = new Koa();
const router = new Router();
// DingTalk group code review url
const defaultDingtalkUrl = 'https://oapi.dingtalk.com/robot/send?access_token=ae02abd824a4c628b97dd95a2ce3f2a67303cccfe38b6c3dd2aee2c6efb8c169';

router.post('/code-review', async (ctx: ICtx) => {
  const { dingTalkUrl } = ctx.request.query || {};
  const gitlabDataFromWebHook = { dingTalkUrl: dingTalkUrl || defaultDingtalkUrl, ...ctx.request.body, };
  fs.writeFile('log.txt', JSON.stringify(gitlabDataFromWebHook), () => {

  });
  const {
    object_kind,
  } = gitlabDataFromWebHook || {};
  // 异步调用钉钉的群通知消息
  switch (object_kind) {
    case 'merge_request':
      // 代码合并
      actionMergeRequest(gitlabDataFromWebHook);
      break;
    case 'note':
      actionComment(gitlabDataFromWebHook);
      // 评论
      break;
    default:
      // nothing
  }
  ctx.body = "hello code review";
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(50001);