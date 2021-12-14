/* eslint-disable no-unused-expressions */
import * as THREE from 'three';

import {loadModel} from '../models/modelLoader.js';
import {colors, reflectivity} from '../../colorsAndReflection.js';
import Floor from '../objects/floor.js';
import Snowman from '../objects/snowman.js';
import Road from '../objects/road.js';
import Cylinders from '../objects/cylinders.js';

class Scene2Story extends THREE.Group {
  constructor() {
    super();

    this.wall;
    this.floor;

    this.constructChildren();
  }

  constructChildren() {
    this.addWallCornerUnit();
    this.addFloor();
    this.addSceneStatic();
    this.addSnowman();
    this.addRoad();
    this.addCylinders();
    this.addSuitcase();
  }

  setMaterial(options = {}) {
    const {color, side, ...other} = options;

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      side,
      ...other
    });
  }

  addWallCornerUnit() {
    loadModel(`wallCornerUnit`, this.setMaterial({color: colors.SkyLightBlue, side: THREE.DoubleSide, ...reflectivity.soft}), (mesh) => {
      const scale = 1;
      mesh.position.set(0, 0, 0);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      this.wall = mesh;
      this.add(mesh);
    });
  }

  addFloor() {
    const mesh = new Floor({color: colors.MountainBlue, ...reflectivity.soft});
    const scale = 1;
    mesh.position.set(0, 0, 0);
    mesh.scale.set(scale, scale, scale);
    mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
    this.add(mesh);
  }

  addSceneStatic() {
    loadModel(`scene2static`, null, (mesh) => {
      const scale = 1;
      mesh.position.set(0, 0, 0);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      this.add(mesh);
    });
  }

  addRoad() {
    const road = new Road();
    const scale = 1;

    road.scale.set(scale, scale, scale);
    road.position.set(0, 0, 0);
    road.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0));
    this.add(road);
  }

  addSnowman() {
    const snowman = new Snowman();
    const scale = 1;
    snowman.scale.set(scale, scale, scale);
    snowman.position.set(220, 115, 400);
    this.add(snowman);
  }

  addCylinders() {
    const cylinders = new Cylinders();
    const scale = 1;
    cylinders.scale.set(scale, scale, scale);
    cylinders.position.set(0, 50, 0);
    this.add(cylinders);
  }

  addSuitcase() {
    loadModel(`suitcase`, null, (mesh) => {
      const scale = 1;
      mesh.position.set(300, 0, 780);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 15 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      this.add(mesh);
    });
  }
}

export default Scene2Story;
