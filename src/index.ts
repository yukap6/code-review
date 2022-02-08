import Koa from "koa";
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import fs from 'fs';
import actionComment from './actions/comment';
import actionMergeRequest from './actions/merge_request';
import actionPush from './actions/push';
import actionTagPush from './actions/tag_push';
import actionIssue from './actions/issue';
import actionBuild from './actions/build';
import actionPipeline from './actions/pipeline';
import actionWiki from './actions/wiki';

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
  // send message to dingTalk group asynchronous
  switch (object_kind) {
    case 'merge_request':
      actionMergeRequest(gitlabDataFromWebHook);
      break;
    case 'note':
      actionComment(gitlabDataFromWebHook);
      break;
    case 'push':
      actionPush(gitlabDataFromWebHook);
      break;
    case 'tag_push':
      actionTagPush(gitlabDataFromWebHook);
      break;
    case 'issue':
      actionIssue(gitlabDataFromWebHook);
      break;
    case 'build':
      actionBuild(gitlabDataFromWebHook);
      break;
    case 'pipeline':
      actionPipeline(gitlabDataFromWebHook);
      break;
    case 'wiki_page':
      actionWiki(gitlabDataFromWebHook);
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