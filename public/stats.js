function arrayify(v) {
  return typeof v !== 'string' && v['0'] !== undefined ? Array.from(v) : v;
}

const commonWebGLFeatures = [
  'RENDERER',
  'VENDOR',
  'VERSION',
  'SHADING_LANGUAGE_VERSION',
  'ALIASED_LINE_WIDTH_RANGE',
  'ALIASED_POINT_SIZE_RANGE',
  'ALPHA_BITS',
  'BLUE_BITS',
  'DEPTH_BITS',
  'RED_BITS',
  'GREEN_BITS',
  'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
  'MAX_CUBE_MAP_TEXTURE_SIZE',
  'MAX_FRAGMENT_UNIFORM_VECTORS',
  'MAX_RENDERBUFFER_SIZE',
  'MAX_TEXTURE_IMAGE_UNITS',
  'MAX_TEXTURE_SIZE',
  'MAX_VARYING_VECTORS',
  'MAX_VERTEX_ATTRIBS',
  'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
  'MAX_VERTEX_UNIFORM_VECTORS',
  'MAX_VIEWPORT_DIMS',
  'SAMPLES',
  'STENCIL_BITS',
];

function getWebGLData() {
  return getGLData('webgl', commonWebGLFeatures);
}

function getWebGL2Data() {
  const features = [
    ...commonWebGLFeatures,
    'MAX_3D_TEXTURE_SIZE',
    'MAX_COLOR_ATTACHMENTS',
    'MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS',
    'MAX_COMBINED_UNIFORM_BLOCKS',
    'MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS',
    'MAX_DRAW_BUFFERS',
    'MAX_ELEMENT_INDEX',
    'MAX_ELEMENTS_INDICES',
    'MAX_ELEMENTS_VERTICES',
    'MAX_FRAGMENT_INPUT_COMPONENTS',
    'MAX_FRAGMENT_UNIFORM_BLOCKS',
    'MAX_FRAGMENT_UNIFORM_COMPONENTS',
    'MAX_FRAGMENT_UNIFORM_VECTORS',
    'MAX_PROGRAM_TEXEL_OFFSET',
    'MAX_SERVER_WAIT_TIMEOUT',
    'MAX_TEXTURE_LOD_BIAS',
    'MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS',
    'MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS',
    'MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS',
    'MAX_UNIFORM_BLOCK_SIZE',
    'MAX_UNIFORM_BUFFER_BINDINGS',
    'MAX_VARYING_COMPONENTS',
    'MAX_VERTEX_OUTPUT_COMPONENTS',
    'MAX_VERTEX_UNIFORM_BLOCKS',
    'MAX_VERTEX_UNIFORM_COMPONENTS',
    'MIN_PROGRAM_TEXEL_OFFSET',
  ];
  return getGLData('webgl2', features);
}

function getGLData(version, featureNames) {
  const gl = document.createElement('canvas').getContext(version);
  if (!gl) {
    return "not supported";
  }
  const precision = {};
  for (const shaderType of ['VERTEX_SHADER', 'FRAGMENT_SHADER']) {
    const types = {};
    for (const precisionType of ['LOW_FLOAT', 'MEDIUM_FLOAT', 'HIGH_FLOAT', 'LOW_INT', 'MEDIUM_INT', 'HIGH_INT']) {
      // this is not a normal JavaScript object so you can't iterate its keys
      const v = gl.getShaderPrecisionFormat(gl[shaderType], gl[precisionType]);
      types[precisionType] = [v.precision, v.rangeMax, v.rangeMin];
    }
    precision[shaderType] = types;
  }

  const features = {};
  for (const name of featureNames) {
    features[name] = arrayify(gl.getParameter(gl[name]));
  }

  {
    const ext = gl.getExtension('WEBGL_draw_buffers');
    features['MAX_DRAW_BUFFERS'] = ext ? gl.getParameter(ext.MAX_DRAW_BUFFERS_WEBGL) : 0;
  }

  {
    const ext = gl.getExtension('EXT_texture_filter_anisotropic');
    features['MAX_TEXTURE_MAX_ANISOTROPY'] = ext ? gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
  }

  {
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (ext) {
      features['UNMASKED_VENDOR_WEBGL'] = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL);
      features['UNMASKED_RENDERER_WEBGL'] = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
    }
  }

  if (gl.getError()) {
    throw new Error('gl error');
  }

  return {
    features,
    precision,
    extensions: gl.getSupportedExtensions(),
  };
}

function setLikeToObject(setLike) {
  return [...setLike.values()];
}

function mapLikeToObject(mapLike) {
  const properties = {};
  for (const v in mapLike) {
    properties[v] = mapLike[v];
  }
  return properties;
}

function getAdapterData(adapter) {
  return {
    extensions: setLikeToObject(adapter.features),
    features: mapLikeToObject(adapter.limits),
  };
}

function randomElement(a) {
  return a[Math.random() * a.length | 0];
}

async function getWebGPUData() {
  if (!navigator.gpu?.requestAdapter) {
    return 'not supported';
  }

  const preferences = [
    "low-power",
    "high-performance"
  ];

  const pref = randomElement(preferences);
  const adapter = await navigator.gpu.requestAdapter({powerPreference: pref});
  return adapter ? getAdapterData(adapter) : 'not supported';
}

function log(...args) {
  const elem = document.createElement('pre');
  elem.textContent = args.join(' ');
  document.body.appendChild(elem);
}

// TODO: We should only do this once per user so set a cookie
// or something (maybe that expires in 3 months) and skip all
// of this if the cookie exists.
//
// Further, we should only check a single API because each API
// requires a context and there is a context limit for the page
//
// This means we need to record api failed vs api was not checked
// so that we only count failed as part of the total machines.

async function main() {
  const webgpu = await getWebGPUData();
  const data = {
    apis: {
      webgl: getWebGLData(),
      webgl2: getWebGL2Data(),
      webgpu,
    },
    agent: {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      devicePixelRatio: window.devicePixelRatio,
      screen: {
        width: window.screen.width,
        height: window.screen.height,
      },
    },
  };
  log(JSON.stringify(data, null, 2));
  log('data length:', JSON.stringify(data).length);
}

main();