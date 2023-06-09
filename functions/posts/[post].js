

export function onRequest(context) {
    console.log(`Hello Raw Data ${context.params.post}`);
    return env.ASSETS.fetch(context.request);
}
  