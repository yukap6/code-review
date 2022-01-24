import Koa from "koa";
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import actionComment from './actions/comment';
import actionMergeRequest from './actions/merge_request';

interface ICtx {
  request: any;
  body?: any;
}

const app = new Koa();
const router = new Router();

router.post('/code-review', async (ctx: ICtx) => {
  const gitlabDataFromWebHook = ctx.request.body;
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