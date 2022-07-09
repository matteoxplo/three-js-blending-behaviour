import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { createMultiMaterialObject } from 'three/examples/jsm/utils/SceneUtils';

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const pmremGenerator = new THREE.PMREMGenerator(renderer);
// const environment = new EnvironmentSceneAlt();
// const environment = new EnvironmentScene();
const environment = new RoomEnvironment();
// const environment = new DebugEnvironment();

const env = pmremGenerator.fromScene(environment, 0.04).texture;

scene.environment = env;
scene.background = env;

const texLoader = new THREE.TextureLoader();

const paperTexture = texLoader.load(
  ' textures/paper.png ',
  (onLoad) => {
    console.log('onLoad', onLoad);
    return onLoad;
  },
  (onProgress) => {
    console.log('onProgress', onProgress);
  },
  (onError) => {
    console.log('onError', onError);
  }
);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: paperTexture });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

const animate = function () {
  requestAnimationFrame(animate);

  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
