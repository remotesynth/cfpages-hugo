class ElementHandler {
  element(element) {
    element.setInnerContent("Changed");
  }
}
const rewriter = new HTMLRewriter().on("h1", new ElementHandler());

export default {
  async fetch() {
    const res = await fetch(request);
    const contentType = res.headers.get("Content-Type");
    // If the response is HTML, it can be transformed with
    // HTMLRewriter -- otherwise, it should pass through
    if (contentType?.startsWith("text/html")) {
      return rewriter.transform(res);
    } else {
      return res;
    }
  },
};
