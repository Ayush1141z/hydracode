import { Hono } from 'hono';
import { sentry } from '@sentry/hono/bun';
import * as Sentry from "@sentry/hono/bun";
import { HTTPException } from "hono/http-exception";
import sessions from "./routes/session";
import chat from "./routes/chat"; 

const app = new Hono();

app.use(
  sentry(app, {
    dsn: "https://51904727a8e1782d26c4074a96185930@o4511476990541824.ingest.us.sentry.io/4511476993490944",
    tracesSampleRate: 1.0,
    enableLogs: true,
    sendDefaultPii: true,
  }),
);

app.get("/debug-sentry", () => {
  // Send a log before throwing the error
  Sentry.logger.info('User triggered test error', {
    action: 'test_error_endpoint',
  });
  // Send a test metric before throwing the error
  Sentry.metrics.count('test_counter', 1);
  throw new Error("My first Sentry error!");
});


app.onError((error, c) => {
  if (error instanceof HTTPException) {
    Sentry.logger.warn("Handled HTTP error", {
      status: error.status,
      message: error.message || "Request fsiled",
      path: c.req.path,
      method: c.req.method,
    });

    return c.json({ 
      error: error.message || "Request failed",
    }, error.status);
  };
    
  Sentry.logger.error("Unhandled server error", {
    path: c.req.path,
    method: c.req.method,
    message: error instanceof Error ? error.message : "Unknown error",
  });
  
  return c.json({ error: "Internal server error" }, 500);
});

const routes = app.route("/sessions", sessions).route("/chat", chat);

export type AppType = typeof routes;

export default {port: 3000, fetch: app.fetch, idleTimeout: 255};