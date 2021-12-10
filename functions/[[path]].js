import LaunchDarkly from "launchdarkly-cloudflare-edge-sdk";

class ElementHandler {
  element(element) {
    element.setInnerContent("Changed");
  }
}

const rewriter = new HTMLRewriter().on("h1", new ElementHandler());
let ldClient;

export async function onRequest({ request, next }) {
  const res = await next();
  const contentType = res.headers.get("Content-Type");

  if (!ldClient) {
    ldClient = LaunchDarkly.init(MY_KV, "61409b046ca8d52601d179ef");
    await ldClient.waitForInitialization();
  }

  if (contentType?.startsWith("text/html")) {
    const headerText = await client.variation(
      "test-flag",
      { key: "cf_edge_headertext" },
      false
    );
    console.log(headerText);
    return rewriter.transform(res);
  } else {
    return res;
  }
}
