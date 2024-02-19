
function init(path, response) {
    onGet(path, response);
    let content = response(null, {});
    let canvas = document.getElementById("demo-canvas");
    if (canvas) {
    }
}

async function onGet(path, response) {
  console.log(path);
  console.log(response);

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

  const newResponse = new Response(results, init);

  return newResponse;
}

function onPost(path, response) {
  console.log(path);
  console.log(response);
}

await onGet(/\/contact.*/, function(request, params) {
  console.log(`params: ${params}`);
});

onPost(/\/contact.*/, function(request, params) {
  console.log(`params: ${params}`);
});

