import * as tf from "@tensorflow/tfjs";

export async function load_model(
  path: string = "./models/deepspec_k16/model.json"
) {
  const model = await tf.loadLayersModel(path);
  return model;
}
