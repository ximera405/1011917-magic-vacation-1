import * as THREE from 'three';
import {getLatheDegrees} from '../latheGeometry.js';

class Floor extends THREE.Group {
  constructor(settings) {
    super();

    this.settings = settings;

    this.startDeg = 0;
    this.finishDeg = 90;

    this.constructChildren();
  }

  constructChildren() {
    this.addBase(this.settings);
  }

  setMaterial(options = {}) {
    // eslint-disable-next-line no-console
    console.log(options);
    const {color, ...other} = options;

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      side: THREE.DoubleSide,
      ...other
    });
  }

  addBase(settings) {
    const {start, length} = getLatheDegrees(this.startDeg, this.finishDeg);
    const base = new THREE.CircleGeometry(1350, 10, start, length);
    const baseMesh = new THREE.Mesh(base, this.setMaterial(settings));
    baseMesh.rotation.copy(new THREE.Euler(90 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
    this.add(baseMesh);
  }
}

export default Floor;
