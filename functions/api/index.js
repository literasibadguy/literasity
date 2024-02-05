export function onRequest(context) {
    console.log(`Hello API ${context.params.post}`)

    const response = await fetch(context.request)


    const data = {
        name: "Thanks for testing our API",
      };

      const json = JSON.stringify(data, null, 2);

      return new Response(json, {
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
      });
}

export async function onRequestGet(context) {

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

