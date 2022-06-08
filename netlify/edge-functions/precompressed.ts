import type { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  let t0 = Date.now();
  let url = request.url;
  let acceptEncodingHeader = request.headers.get('Accept-Encoding') || '';
  // ignores quality
  let supportedEncodings = acceptEncodingHeader.split(',').map(v => v.trimStart());
  let etag = request.headers.get('If-None-Match') || '';
  let supportsBr = supportedEncodings.includes('br');
  context.log("URL: " + url + "; acceptEncodingHeader: " + acceptEncodingHeader + "; supportsBr: " + supportsBr + "; etag: " + etag);
  if (supportsBr) {
    // ignores search query
    let response = await context.rewrite(url + '.br');
    let t1 = Date.now();
    if (response.status == 404) {
      return;
    }
    let responseEtag = response.headers.get('ETag') || '';
    context.log("Response etag: " + responseEtag);
    if (etag.length >= 4 && responseEtag === etag) {
      console.log("Match; status: " + response.status);
    }
    if (response.status != 200) return response;
    let data = await response.arrayBuffer();
    let fixedHeaders = new Headers(response.headers);
    let contentEncoding = 'text/html; charset=UTF-8';
    if (url.endsWith('.js')) {
      contentEncoding = 'application/javascript';
    } else if (url.endsWith('.wasm')) {
      contentEncoding = 'application/wasm';
    }
    fixedHeaders.set('Content-Type', contentEncoding);
    fixedHeaders.set('Content-Encoding', 'br');
    let t2 = Date.now();
    console.log("Timing: " + (t1 - t0) + " " + (t2 - t1));
    return new Response(data, {headers: fixedHeaders});
  }
};
