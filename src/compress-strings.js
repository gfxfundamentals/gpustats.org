const code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$@';
function genId(num) {
  let id = ''
  do {
    id += code[num & 0x3F];
    num = num >> 6;
  } while(num);
  return id;
}

export default function compress(src) {
  let count = 0;
  const keyToIdMap = {};

  function getId(key) {
    let id = keyToIdMap[key];
    if (!id) {
      id = genId(count++);
      keyToIdMap[key] = id;
    }
    return id;
  }

  function mapIds(obj) {
    if (typeof obj === 'string') {
      return getId(obj);
    }
    if (typeof obj === 'number') {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map(v => mapIds(v))
    }
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
      newObj[getId(key)] = mapIds(value);
    }
    return newObj;
  }

  const data =mapIds(src);
  return {
    ids: Object.fromEntries(Object.entries(keyToIdMap).map(([k,v]) => [v,k])),
    data,
  };
}

