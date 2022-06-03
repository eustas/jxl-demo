import type { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
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
    let responseEtag = response.headers.get('ETag') || '';
    context.log("Response etag: " + responseEtag);
    if (etag.length >= 4 && responseEtag === etag) {
      console.log("Match; status: " + response.status);
    }
    if (response.status != 200) return response;
    let data = await response.arrayBuffer();
    var fixedHeaders = new Headers(response.headers);
    fixedHeaders.set('Content-Type', 'application/' + (url.endsWith('.js') ? 'javascript' : 'wasm'));
    fixedHeaders.set('Content-Encoding', 'br');
    return new Response(data, {headers: fixedHeaders});
  }
};
