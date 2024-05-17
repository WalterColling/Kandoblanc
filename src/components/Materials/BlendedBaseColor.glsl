uniform sampler2D baseColorMap; // Texture uniform for baseColor
uniform sampler2D baseColorBWMap; // Texture uniform for baseColorBW
uniform float blend; // Uniform to control blend amount (0 to 1)

varying vec2 vUv;

void main() {
  vec4 baseColor = texture2D(baseColorMap, vUv);
  vec4 baseColorBW = texture2D(baseColorBWMap, vUv);

  // Blend based on blend value (linear blend)
  vec4 blendedColor = mix(baseColor, baseColorBW, blend);

  // Set the fragment color
  gl_FragColor = blendedColor;
}
