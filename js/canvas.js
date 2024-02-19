
var server = sinon.fakeServer.create();
server.fakeHTTPMethods = true;
server.getHTTPMethod = function (xhr) {
    return xhr.requestHeaders['X-HTTP-Method-Override'] || xhr.method;
}
server.autoRespond = true;
server.autoRespondAfter = 80;
server.xhr.useFilters = true;
server.xhr.addFilter(function (method, url, async, username, password) {
    return url === "/" || url.indexOf("http") === 0;
})

// Request handling

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
    var question = url.indexOf("?");
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
function headers(request) {
    return request.getAllResponseHeaders().split("\r\n").filter(h => h.toLowerCase().startsWith("hx-")).map(h => h.split(": ")).reduce((acc, v) => ({ ...acc, [v[0]]: v[1] }), {})
}

function init(path, response) {
    onGet(path, response);
    let content = response(null, {});
    let canvas = document.getElementById("demo-canvas");
    if (canvas) {
        canvas.innerHTML = content;
        pushActivityChip("Initial State", "init", demoInitialStateTemplate(content));
    }
}

function onGet(path, response) {
    server.respondWith("GET", path, function (request) {
        let headers = {};
        let body = response(request, params(request), headers);
    request.respond(200, { "Content-Type": "application/json" },
    JSON.stringify([{ id: 1, text: "Provide examples", done: true }]),);
    });
}


function onPut(path, response) {
    server.respondWith("PUT", path, function (request) {
        let headers = {};
        let body = response(request, params(request), headers);
        request.respond(200, headers, body);
    });
}

function onPost(path, response) {
    server.respondWith("POST", path, function (request) {
        let headers = {};
        let body = response(request, params(request), headers);
        request.respond(200, headers, body);
    });
}


function pushActivityChip(name, id, content) {
    document.getElementById("demo-timeline").insertAdjacentHTML("afterbegin", `<li id="${id}-link"><a onclick="showTimelineEntry('${id}')" style="cursor: pointer">${name}</a></li>`);
    if (content.length > 750) {
        content = content.substr(0, 750) + "...";
    }
    var contentDiv = `<div id="${id}">${content}</div>`;
    document.getElementById("demo-current-request").insertAdjacentHTML("afterbegin", contentDiv);
    showTimelineEntry(id);
    //Prism.highlightAll();
}

function showTimelineEntry(id) {
    var children = document.getElementById("demo-current-request").children;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child.id == id) {
            child.classList.remove('hide');
        } else {
            child.classList.add('hide');
        }
    }
    var children = document.getElementById("demo-timeline").children;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child.id == id + "-link") {
            child.classList.add('active');
        } else {
            child.classList.remove('active');
        }
    }
}

function escapeHtml(string) {
  var pre = document.createElement('pre');
  var text = document.createTextNode(string);
  pre.appendChild(text);
  return pre.innerHTML;
}

function demoInitialStateTemplate(html) {
    return `<span class="activity initial">
            <b>HTML</b>
            <pre class="language-html"><code class="language-html">${escapeHtml(html)}</code></pre>
</span>`
}

onGet(/\/tikwm.com.*/, function (request, params) {
    console.log('Is there any search here');
});

onPost(/\/contact.*/, function (request, params) {
  console.log('Contact the feature');
});

/*
htmx.defineExtension('client-side-templates', {
    transformResponse : function(text, xhr, elt) {
      var nunjucksTemplate = htmx.closest(elt, "[nunjucks-template]");
        if (nunjucksTemplate) {
            let json = JSON.parse(text)
            var data = {
              contents: json.contents
            };

            var templateName = nunjucksTemplate.getAttribute('nunjucks-template');
            var template = htmx.find('#' + templateName);
            console.log(templateName,data);
            return nunjucks.renderString(template.innerHTML, data);
        }
        return text;
    }
});
*/

let innerGridItem = ` {% for block in contents %}
              <is-land on:visible import="js/throbber.js">
                     <a>
                     <div class="block-grid-item" hx-trigger="revealed" hx-swap="afterend">
                        <div class="block-content-inner">
                        <div class="block-image-ratio">
                         <div class="block-image-inner block-image-css">
                           <throb-ber>
                           <img class="block-image" src="{{ block.image.thumb.url }}" loading="lazy" decoding="async" />
                           </throb-ber>
                         </div>
                         </div>
                          <p>{{ block.title }}</p>
                        </div>
                     </div>
                     </a>
              </is-land>
          {% endfor %}`

htmx.defineExtension('client-side-templates', {
  transformResponse: function(text, xhr, elt) {
      var nunjucksTemplate = htmx.closest(elt, "[nunjucks-template]");
             if (nunjucksTemplate) {
                 var data = JSON.parse(text);
                 var templateName = nunjucksTemplate.getAttribute('nunjucks-template');
                 var template = htmx.find('#' + templateName);
                 if (template) {
                    console.log(templateName,data);
                     template.innerHTML = innerGridItem;
                     return nunjucks.renderString(template.innerHTML, data);
                 } else {
                   console.log(data);
                   console.log("No template here");
                     return nunjucks.render(templateName, data);
                 }
             }
            return text;
  }
});

 function rowsTemplate(page, blocks) {
      var txt = "";
      var trigger_attributes = "";

      for (var i = 0; i < blocks.length; i++) {
        var c = blocks[i];

        if (i == (blocks.length - 1)) {
         trigger_attributes = ` hx-get="/contacts/?page=${page + 1}" hx-trigger="revealed" hx-swap="afterend"`
        }

        txt += `<div class="block-grid-item"` + trigger_attributes +"></div>" + c.name + "</td><td>" + c.email + "</td><td>" + c.id + "</td></tr>\n";
      }
      return txt;
 }







