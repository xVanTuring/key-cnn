export function read_features(
  data: Float32Array,
  frames = 60,
  hop_length = 30,
  zero_pad = false
) {
    let E1Hz = 41.20344461410875;
    let bins_per_semitone = 2;
    let octaves = 7;
    let bins_per_octave = 12 * bins_per_semitone;
    let window_length = 8192;
}
