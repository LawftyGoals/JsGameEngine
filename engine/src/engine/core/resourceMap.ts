class MapEntry<T> {
  mData: T;
  mRefCount: number;

  constructor(data: T) {
    this.mData = data;
    this.mRefCount = 1;
  }

  decreaseRef() {
    this.mRefCount--;
  }
  increaseRef() {
    this.mRefCount++;
  }

  setData(data: T) {
    this.mData = data;
  }
  getData() {
    return this.mData;
  }

  canRemove() {
    return this.mRefCount === 0;
  }
}

// MAP MANIPULATION

const mMap = new Map();

export function has(path: string) {
  return mMap.has(path);
}

function getEntry(path: string) {
  const entry = mMap.get(path);

  if (!entry) {
    throw new Error("Entry not found at path: " + path);
  }
  return entry;
}

export function get(path: string) {
  if (!has(path)) {
    throw new Error("Error [" + path + "]: not loaded");
  }
  return getEntry(path).getData();
}

export function set(key: string, value: any) {
  getEntry(key).setData(value);
}

export function loadRequested(path: string) {
  mMap.set(path, new MapEntry(null));
}

export function increaseRef(path: string) {
  getEntry(path).increaseRef();
}

export function unload(path: string) {
  const entry = getEntry(path);
  entry.decreaseRef();

  if (entry.canRemove()) {
    mMap.delete(path);
  }
  return entry.canRemove();
}

// OUTSTANDING PROMISES

const mOutstandingPromises: Promise<void>[] = [];

export function pushPromise(promise: Promise<void>) {
  mOutstandingPromises.push(promise);
}

// generic loading function,
// Step 1: fetch from server
// Step 2: decodeResource on the loaded package
// Step 3: parseResource on the decodedResource
// Step 4: store result into the map
// Push the promised operation into an array

export function loadDecodeParse(
  path: string,
  decodeResource: (data: Response) => any,
  parseResourse: (data: any) => any
) {
  if (!has(path)) {
    loadRequested(path);
    const fetchPromise = fetch(path)
      .then((response) => decodeResource(response))
      .then((data) => parseResourse(data))
      .then((data) => {
        return set(path, data);
      })
      .catch((error) => {
        throw error;
      });

    pushPromise(fetchPromise);

    return fetchPromise;
  } else {
    increaseRef(path);
    return null;
  }
}

export async function waitOnPromises() {
  console.log("Waiting on promises...");
  console.log(mOutstandingPromises);
  await Promise.all(mOutstandingPromises);
  console.log("All promises resolved");
  mOutstandingPromises.length = 0;
}
