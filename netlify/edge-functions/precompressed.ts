import type { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  let acceptEncodingHeader = request.headers.get('Accept-Encoding') || '';
  // ignores quality
  let supportedEncodings = acceptEncodingHeader.split(',').map(v => v.trimStart());
  let supportsBr = supportedEncodings.includes('br');
  context.log("URL: " + request.url + ", acceptEncodingHeader: " + acceptEncodingHeader + ", supportsBr: " + supportsBr);
  if (supportsBr) {
    // ignores search query
    return context.rewrite(request.url + '.br');
  }
};
