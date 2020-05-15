import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

import { TrackballControls } from 'three-trackballcontrols-ts';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.Renderer, controls: TrackballControls;

let robotParentMesh = new THREE.Mesh();

window.onload = main;

function main(): void {
  init();
  requestAnimationFrame(animate);
}

function init() {
  let height = Math.min(480, window.innerHeight);
  let width = Math.min(640, window.innerWidth);

  camera = new THREE.PerspectiveCamera(70, width / height, 0.001, 100);
  camera.position.z = 4;
  camera.position.y = 4;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  var helper = new THREE.GridHelper(1, 10);
  helper.scale.addScalar(10);
  scene.add(helper);

  scene.add(new THREE.AmbientLight(0x333333));

  let pointLight = new THREE.PointLight(0xffffff, 0.8);
  pointLight.position.x = 3;
  pointLight.position.y = 10;
  pointLight.position.z = 3;
  scene.add(pointLight);

  let light = new THREE.HemisphereLight(0x443333, 0x222233, 2);
  light.position.y = 3;
  scene.add(light);

  // Load robot

  let loader = new GLTFLoader();
  loader.load(
    'assets/models/robot.gltf',
    gtlf => {
      robotParentMesh.add(gtlf.scene);
    },
    undefined,
    error => {
      console.log("Error loading model", error);
    }
  );

  scene.add(robotParentMesh);

  let rendererParams: THREE.WebGLRendererParameters = { antialias: true };
  renderer = new THREE.WebGLRenderer(rendererParams);
  renderer.setSize(width, height);
  renderer.domElement.classList.add("canvas");

  document.body.appendChild(renderer.domElement);

  controls = new TrackballControls(camera, renderer.domElement);
}

let lastTime = undefined;

function animate(time: number) {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}