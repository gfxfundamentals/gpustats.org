const platforms = [
  'windows10',
  'mac',
  'android',
  'ios',
  'linux',
  'other',
];
const browsers = [
  'firefox',
  'chrome',
  'safari',
  'other',
];
/*
const versions = [
  '87',
  '86',
//  '89',
];
const gpus = [
  'nvidia 2070',
//  'nvidia 2080ti',
//  'amd radeon 123',
  'mali 950',
];
*/

function r(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min | 0;
}

function randArray(num) {
  const arr = [];
  for (let i = 0; i < num; ++i) {
    arr.push(r(0, 400));
  }
  return arr;
}

/*
function randDoubleArray(num) {
  const arr = [];
  for (let i = 0; i < num; ++i) {
    arr.push([r(0, 400), 2 ** r(16)]);
  }
  return arr;
}
*/

function randFeature() {
  const arr = {};
  const num = r(2, 4);
  for (let i = 0; i < num; ++i) {
    arr[(2 ** r(16)).toString()] = randArray(12);
  }
  return arr;
}

function getWebGLData() {
  const features = [
    'ALIASED_LINE_WIDTH_RANGE',
    'ALIASED_POINT_SIZE_RANGE',
    'MAX_TEXTURE_SIZE',
    'MAX_VIEWPORT_DIMS',
    'MAX_VERTEX_ATTRIBS',
    'MAX_VERTEX_UNIFORM_VECTORS',
    'MAX_VARYING_VECTORS',
    'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
    'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
    'MAX_TEXTURE_IMAGE_UNITS',
    'MAX_FRAGMENT_UNIFORM_VECTORS',
    'MAX_CUBE_MAP_TEXTURE_SIZE',
    'MAX_RENDERBUFFER_SIZE',
  ];
  const extensions = [
    'ANGLE_instanced_arrays',
    'EXT_blend_minmax',
    'EXT_disjoint_timer_query',
    'EXT_frag_depth',
    'EXT_float_blend',
    'EXT_shader_texture_lod',
    'EXT_sRGB',
    'EXT_texture_compression_bptc',
    'EXT_texture_compression_rgtc',
    'EXT_texture_filter_anisotropic',
    'KHR_parallel_shader_compile',
    'OES_element_index_uint',
    'OES_fbo_render_mipmap',
    'OES_standard_derivatives',
    'OES_texture_float',
    'OES_texture_float_linear',
    'OES_texture_half_float',
    'OES_texture_half_float_linear',
    'OES_vertex_array_object',
    'WEBGL_color_buffer_float',
    'WEBGL_compressed_texture_astc',
    'WEBGL_compressed_texture_etc',
    'WEBGL_compressed_texture_etc1',
    'WEBGL_compressed_texture_pvrtc',
    'WEBGL_compressed_texture_s3tc',
    'WEBGL_compressed_texture_s3tc_srgb',
    'WEBGL_debug_renderer_info',
    'WEBGL_debug_shaders',
    'WEBGL_depth_texture',
    'WEBGL_draw_buffers',
    'WEBGL_lose_context',
    'WEBGL_multi_draw',
  ];

  return {
    availability: randArray(12),
    features: Object.fromEntries(features.map(feature => {
      return [feature, randFeature(12)];
    })),
    extensions: Object.fromEntries(extensions.map(extension => {
      return [extension, randArray(12)];
    })),
  };
}

function getWebGL2Data() {
  const features = [
    'MAX_TEXTURE_SIZE',
    'MAX_VIEWPORT_DIMS',
    'MAX_VERTEX_ATTRIBS',
    'MAX_VERTEX_UNIFORM_VECTORS',
    'MAX_VARYING_VECTORS',
    'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
    'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
    'MAX_TEXTURE_IMAGE_UNITS',
    'MAX_FRAGMENT_UNIFORM_VECTORS',
    'MAX_CUBE_MAP_TEXTURE_SIZE',
    'MAX_RENDERBUFFER_SIZE',
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
  const extensions = [
    'EXT_sRGB',
    'EXT_texture_compression_bptc',
    'EXT_texture_compression_rgtc',
    'KHR_parallel_shader_compile',
    'OES_texture_float_linear',
    'OES_texture_half_float_linear',
    'WEBGL_compressed_texture_astc',
    'WEBGL_compressed_texture_etc',
    'WEBGL_compressed_texture_etc1',
    'WEBGL_compressed_texture_pvrtc',
    'WEBGL_compressed_texture_s3tc',
    'WEBGL_compressed_texture_s3tc_srgb',
    'WEBGL_debug_renderer_info',
    'WEBGL_debug_shaders',
    'WEBGL_lose_context',
  ];

  return {
    availability: randArray(12),
    features: Object.fromEntries(features.map(feature => {
      return [feature, randFeature(12)];
    })),
    extensions: Object.fromEntries(extensions.map(extension => {
      return [extension, randArray(12)];
    })),
  };
}

function getWebGPUData() {
  const features = [
    'maxTextureDimension1D',
    'maxTextureDimension2D',
    'maxTextureDimension3D',
    'maxTextureArrayLayers',
    'maxBindGroups',
    'maxDynamicUniformBuffersPerPipelineLayout',
    'maxDynamicStorageBuffersPerPipelineLayout',
    'maxSampledTexturesPerShaderStage',
    'maxSamplersPerShaderStage',
    'maxStorageBuffersPerShaderStage',
    'maxStorageTexturesPerShaderStage',
    'maxUniformBuffersPerShaderStage',
    'maxUniformBufferBindingSize',
    'maxStorageBufferBindingSize',
    'maxVertexBuffers',
    'maxVertexAttributes',
    'maxVertexBufferArrayStride',
  ];
  const extensions = [
    'shader-float16',
    'texture-compression-bc',
    'depth-clamping',
  ];

  return {
    availability: randArray(12),
    features: Object.fromEntries(features.map(feature => {
      return [feature, randFeature(12)];
    })),
    extensions: Object.fromEntries(extensions.map(extension => {
      return [extension, randArray(12)];
    })),
  };
}

function getAPIData() {
  return {
    webgl: getWebGLData(),
    webgl2: getWebGL2Data(),
    webgpu: getWebGPUData(),
  };
}

const categories = [];
for (const platform of platforms) {
  for (const browser of browsers) {
//    for (const version of versions) {
//      for (const gpu of gpus) {
        const category = {
          platform,
          browser,
//          version,
//          gpu,
          count: randArray(12).map(v => v + 400),
          api: getAPIData(),
        };
        categories.push(category);
//      }
//    }
  }
}

/*
                                           +--just a count by month
                                           |
                                           V
safari, v14, iOS, ANGLE_instanced_arrays: [4, 14, 32, 44]
chrome, v88, MacOS, ANGLE_instanced_arrays: [9, 13, 53, 155]

                                           +--pair: count, value
                                           |
                                           V
safari, v14, iOS, MAX_RENDER_BUFFER: [[12, '32'], [123, '64']]
safari, v14, iOS, MAX_VIEWPORT_DIMS: [[12, '32, 32'], [123, '64, 32']]

*/
/*
const data = {
  categories: [
    {
      platform: 'windows',
      browser: 'firefox',
      version: '87',
      gpu: 'nvidia 2070',
      device: 'tablet',
      count: [?, ?, ?], // by (this is the total samples)
      api: {
        webgl: {
          features: {
            'MAX_TEXTURE_SIZE': {
              '2048': 120,
              '4096': 2000,
            },
          },
        },
      },
    }
  ],
}
*/

const sampleData = {
  startMonth: 1,
  categories,
};

//console.log(JSON.stringify(sampleData));

//console.log(JSON.stringify(data, null, 2).replace(/\[\s*\d+(?:,\s+\d+)*\s*\]/g, _ => _.replace(/[\n ]+/g, ' ')));
//console.log(JSON.stringify(data).length);
//console.log(JSON.stringify(data));


/*
  checked replacing all strings with ids
  to string so a string like 'WEBGL_debug_info'
  that appears 50 times is replaced by `AB`
  and a map of `AB` to `WEBGL_debug_info`

  This decreased the uncompressed size from
  25% but the gzipped size was only decreased
  5% so probably not worth it. a 1meg download
  becomes 0.95 meg.

{
  const comp = compress(data);
  console.log(JSON.stringify(comp).length);
  console.log(JSON.stringify(comp));
}
*/

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function getData() {
  const q = Object.fromEntries(new URLSearchParams(window.location.search).entries());

  let error;
  let data;
  let url;
  if (q.data === 'test') {
    url = 'test-data.json';
  } else if (q.data === 'error') {
    url = 'not-exist-data.json';
  } else if (q.data === 'sample') {
    await wait(1000);
    data = sampleData;
  } else if (!q.data) {
    url = 'data.json';
  } else {
    error = `unknown data parameter: ${q.data}`;
  }

  if (!error && !data) {
    try {
      const req = await fetch(url);
      data = await req.json();
    } catch (e) {
      error = `${url}: ${e}`;
    }
  }

  return {data, error};
}


