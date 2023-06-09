export function onRequest(context) {
    console.log(`Hello API ${context.params.post}`)
    return env.ASSETS.fetch(context.request);
}
  