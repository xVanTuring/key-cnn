// import * as tf from "@tensorflow/tfjs";
// import "@tensorflow/tfjs-backend-webgpu";
import a2w from "audiobuffer-to-wav";
(window as any).process = null;

// async function load_model() {
//   const model = await tf.loadLayersModel("./models/deepspec_k16/model.json");
//   return model;
// }
async function load_audio() {
  const resp = await fetch("aminor.mp3");
  const aContext = new AudioContext();
  const originBuffer = await aContext.decodeAudioData(await resp.arrayBuffer());
  console.log(originBuffer);

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
  console.log(resampledBuffer);
  const buf = a2w(resampledBuffer);

  var blob = new Blob([buf]);
  saveBlob(blob, "test.wav");
}
load_audio();

const saveBlob = (function () {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.setAttribute("style", "display: none");

  return function (blob, fileName) {
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
})();
// def read_features(file, frames=60, hop_length=30, zero_pad=False):
// async function read_features() {
//   let E1Hz = 41.20344461410875;
//   let bins_per_semitone = 2;
//   let octaves = 7;
//   let bins_per_octave = 12 * bins_per_semitone;
//   let window_length = 8192;
// }
// load_audio();

// async function load_input() {
//   const resp = await fetch("data.json");
//   let start = performance.now();
//   const data = await resp.json();
//   console.log(performance.now() - start, "ms");
//   start = performance.now();
//   const tensors = tf.tensor4d(data);
//   console.log(performance.now() - start, "ms");
//   return tensors;
// }
// async function main() {
//   console.log("1...");
//   const model = await load_model();
//   console.log("2...");
//   const input_tensor = await load_input();
//   console.log("3...");
//   let start = performance.now();
//   const result = model.predict(input_tensor);
//   console.log(performance.now() - start, "ms");
//   console.log("4...");
//   if (Array.isArray(result)) {
//   } else {
//     const averaged = tf.mean(result, 0);
//     const index = tf.argMax(averaged);
//     const key = await index.data();
//     console.log("Key is ", key[0]);
//     // index.print();
//   }
// }
// tf.setBackend("webgpu").then(() => main());
// setInterval(() => {
//   console.log(".");
// }, 100);
