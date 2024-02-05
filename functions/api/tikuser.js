export async function onRequestGet(context) {
  console.log(`Hello ${context.request.body}`)

  const { searchParams } = new URL(context.request.url)
  const name = searchParams['unique_id']
  console.log(name)

  const someHost = "https://www.tikwm.com/api/user/posts?unique_id=@fujiiian&hd=1";
  const url = someHost + "unique_id=@fujiiian&hd=1";

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

      },
  };

  const response = await fetch(url, init);
  const results = await gatherResponse(response);
  return new Response(results, init);

}
