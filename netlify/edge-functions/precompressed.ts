import type { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  let acceptEncodingHeader = request.headers.get('Accept-Encoding') || '';
  // ignores quality
  let supportedEncodings = acceptEncodingHeader.split(',').map(v => v.trimStart());
  if (supportedEncodings.includes('br')) {
    // ignores search query
    context.rewrite(request.url + '.br');
  }
};
