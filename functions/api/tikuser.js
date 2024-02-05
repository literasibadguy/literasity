export async function onRequestGet(context) {
  console.log(`Hello ${context.request.body}`)

  const { searchParams } = new URL(context.request.url)
  const name = searchParams.get('unique_id')
  console.log(name)

  const someUrl = `https://www.tikwm.com/api/user/posts?unique_id=${name}&hd=1`;

  async function gatherResponse(response) {
      const { headers } = response;
      const contentType = headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        return JSON.stringify(await response.json());
      }
      return response.text();
    }

  const init = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0"
      },
  };

  const response = await fetch(someUrl, init);
  const results = await gatherResponse(response);
  return new Response(results, init);

}
