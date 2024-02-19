

document.body.addEventListener('htmx:configRequest', function(evt) {
      evt.detail.headers = [];
  });

function parseParams(str) {
    var re = /([^&=]+)=?([^&]*)/g;
    var decode = function (str) {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    };
    var params = {}, e;
    if (str) {
        if (str.substr(0, 1) == '?') {
            str = str.substr(1);
        }
        while (e = re.exec(str)) {
            var k = encodeHTML(decode(e[1]));
            var v = encodeHTML(decode(e[2]));
            if (params[k] !== undefined) {
                if (!Array.isArray(params[k])) {
                    params[k] = [params[k]];
                }
                params[k].push(v);
            } else {
                params[k] = v;
            }
        }
    }
    return params;
}

function getQuery(url) {
  var question = url.indexOf("?")
  var hash = url.indexOf("#");
  if (hash == -1 && question == -1) return "";
  if (hash == -1) hash = url.length;
  return question == -1 || hash == question + 1 ? url.substring(hash) :
    url.substring(question + 1, hash);
}


function encodeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function params(request) {
  if (server.getHTTPMethod(request) == "GET") {
    return parseParams(getQuery(request.url));
  } else {
    return parseParams(request.requestBody);
  }
}


function init(path, response) {
    onGet(path, response);
    let content = response(null, {});
    let canvas = document.getElementById("demo-canvas");
    if (canvas) {
        canvas.innerHTML = content;
    }
}

/*
async function onGet(path, response) {
  console.log(path);
  console.log(response);

  const someUrl = `https://www.tikwm.com/api/?url=aaa&hd=1`;

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

  const fetchResponse = await fetch(someUrl, init);
  const results = await gatherResponse(fetchResponse);

  const newResponse = new Response(results, init);
  server.respondWith("GET", path, function (request) {
    let headers = {};
    let body = "What happen here";
    request.respond(200, { "Content-Type": "application/json" },
    JSON.stringify([{ id: 1, text: "Provide examples", done: true }]),);
  });
}
*/

function onPost(path, response) {
  server.respondWith("POST", path, function (request) {
    let headers = {};
    let body = response(request, params(request), headers);
    request.respond(200, { "Content-Type": "application/json" },
    JSON.stringify([{ id: 1, text: "Provide examples", done: true }]),);
  });
}


