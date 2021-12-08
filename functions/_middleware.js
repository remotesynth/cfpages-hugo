class ElementHandler {
  element(element) {
    element.setInnerContent("Changed");
  }
}
const rewriter = new HTMLRewriter().on("h1", new ElementHandler());

export async function onRequest({ context }) {
  /* const res = await fetch(context.request);
  const contentType = res.headers.get("Content-Type");
  // If the response is HTML, it can be transformed with
  // HTMLRewriter -- otherwise, it should pass through
  if (contentType?.startsWith("text/html")) {
    return rewriter.transform(res);
  } else {
    return res;
  } */
  const response = await next();
  response.headers.set("X-Hello", "Hello from functions Middleware!");
  return response;
}
