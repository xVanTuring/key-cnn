import "@tensorflow/tfjs-backend-webgpu";
(window as any).process = null;

// async function load_input() {
//   const resp = await fetch("data.json");
//   let start = performance.now();
//   const data = await resp.json();
//   console.log(performance.now() - start, "ms");
//   start = performance.now();
//   const tensors = tf.tensor4d(data);
//   console.log(performance.now() - start, "ms");
//   return tensors;
//
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
