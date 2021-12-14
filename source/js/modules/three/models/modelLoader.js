import * as THREE from 'three';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import ModelObject from './modelObject.js';

const onComplete = (obj3d, material, callback) => {
  if (material) {
    obj3d.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });
  }

  if (typeof callback === `function`) {
    callback.call(null, obj3d);
  }
};

const onGltfComplete = (gltf, material, callback) => {
  if (!gltf.scene) {
    return;
  }
  onComplete(gltf.scene, material, callback);
};

const LoaderByType = {
  gltf: GLTFLoader,
  obj: OBJLoader,
};

const LoadingFnByType = {
  gltf: onGltfComplete,
  obj: onComplete,
};

export const loadModel = (nameObj, material, callback) => {
  if (!nameObj) {
    return;
  }

  const modelObj = new ModelObject(nameObj).getObject();

  const Loader = LoaderByType[modelObj.type];
  const loadingFn = LoadingFnByType[modelObj.type];
  if (!Loader || !loadingFn) {
    return;
  }

  const loadManager = new THREE.LoadingManager();
  const loader = new Loader(loadManager);

  loader.load(modelObj.path, (model) => loadingFn(model, material, callback));
};
