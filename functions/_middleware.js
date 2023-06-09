export async function onRequest(context) {
  try {
    console.log("TRYING MIDDLEWARE PAGES");
    return await context.next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}

/*
 Docs on GA endpoint and example params

 https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide

v: 1
_v: j67
a: 751874410
t: pageview
_s: 1
dl: https://nfeld.com/contact.html
dr: https://google.com
ul: en-us
de: UTF-8
dt: Nikolay Feldman - Software Engineer
sd: 24-bit
sr: 1440x900
vp: 945x777
je: 0
_u: blabla~
jid: 
gjid: 
cid: 1837873423.1522911810
tid: UA-116530991-1
_gid: 1828045325.1524815793
gtm: u4d
z: 1379041260
*/
