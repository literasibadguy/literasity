
export async function onRequestGet(context) {
  console.log(`Hello ${context.request}`)

  const { searchParams } = new URL(context.request.url)
  const video_url = searchParams.get('video_url')

  const someUrl = `https://www.tikwm.com/api/?url=${video_url}&hd=1`;
  console.log(someUrl)

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
        "Content-Type": "application/json;charset=UTF-8",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0"
      },
  };

  const response = await fetch(someUrl, init);
  const results = await gatherResponse(response);
  return new Response(results, init);

}
