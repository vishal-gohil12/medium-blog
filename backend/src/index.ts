import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { userRouter } from './routes/user';
import { blogRoute } from './routes/blog';

const app = new Hono();

app.use('/*', cors());

app.route("/api/user/", userRouter);
app.route("/api/blog", blogRoute);


export default app
