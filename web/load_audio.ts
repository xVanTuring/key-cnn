export async function load_audio(path: string) {
  const resp = await fetch(path);
  const aContext = new AudioContext();
  const originBuffer = await aContext.decodeAudioData(await resp.arrayBuffer());

  const monoContext = new OfflineAudioContext(
    1,
    originBuffer.length,
    originBuffer.sampleRate
  );
  const bufferSource = new AudioBufferSourceNode(monoContext, {
    buffer: originBuffer,
  });
  bufferSource.start(0);
  bufferSource.connect(monoContext.destination);

  const monoBuffer = await monoContext.startRendering();

  const resampleCtx = new OfflineAudioContext(
    1,
    monoBuffer.duration * 22050,
    22050
  );

  const resampleSource = new AudioBufferSourceNode(resampleCtx, {
    buffer: monoBuffer,
  });
  resampleSource.start(0);
  resampleSource.connect(resampleCtx.destination);
  const resampledBuffer = await resampleCtx.startRendering();
  return resampledBuffer.getChannelData(0);
}
