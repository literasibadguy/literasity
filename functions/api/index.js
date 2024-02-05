export function onRequest(context) {
    console.log(`Hello API ${context.params.post}`)

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


