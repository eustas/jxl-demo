import type { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  // ignores quality
  if (request.get('Accept-Encoding').split(',').map(v => v.trimStart()).includes('br')) {
    // ignores search query
    context.rewrite(request.url + '.br');
  }
};
