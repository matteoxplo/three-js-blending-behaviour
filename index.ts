import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { createMultiMaterialObject } from 'three/examples/jsm/utils/SceneUtils';

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth - 16, window.innerHeight - 50 - 16);
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
  ' https://raw.githubusercontent.com/matteoxplo/three-js-blending-behaviour/main/textures/paper.png '
);
const print1Texture = texLoader.load(
  ' https://raw.githubusercontent.com/matteoxplo/three-js-blending-behaviour/main/textures/print1.png '
);
const print2Texture = texLoader.load(
  ' https://raw.githubusercontent.com/matteoxplo/three-js-blending-behaviour/main/textures/print2.png '
);
const finishingTexture = texLoader.load(
  ' https://raw.githubusercontent.com/matteoxplo/three-js-blending-behaviour/main/textures/finishing.png '
);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const paperMaterial = new THREE.MeshStandardMaterial({
  //map: paperTexture
});
const print1Material = new THREE.MeshStandardMaterial({
  //map: print1Texture,
  blending: THREE.MultiplyBlending,
});
const print2Material = new THREE.MeshStandardMaterial({
  //map: print2Texture,
  blending: THREE.MultiplyBlending,
});
const finishingMaterial = new THREE.MeshStandardMaterial({
  color: 0x000000,
  //alphaMap: finishingTexture,
  blending: THREE.AdditiveBlending,
  //metalness: 0.5,
  //roughness: 0.5,
});

const mats = [paperMaterial, print1Material, print2Material, finishingMaterial];

const cubes = createMultiMaterialObject(geometry, mats);
scene.add(cubes);

for (let i = 1; i < cubes.children.length; i++) {
  cubes.children[i].visible = false;
}

camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

const animate = function () {
  requestAnimationFrame(animate);

  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

document.getElementById('addPaperTexture').addEventListener('click', () => {
  paperMaterial.map = paperTexture;
  paperMaterial.needsUpdate = true;
});
document.getElementById('addPrint1Texture').addEventListener('click', () => {
  print1Material.map = print1Texture;
  print1Material.needsUpdate = true;
});
document.getElementById('addPrint2Texture').addEventListener('click', () => {
  print2Material.map = print2Texture;
  print2Material.needsUpdate = true;
});
document.getElementById('addFinishingTexture').addEventListener('click', () => {
  finishingMaterial.alphaMap = finishingTexture;
  finishingMaterial.metalness = 0.5;
  finishingMaterial.roughness = 0.5;
  finishingMaterial.needsUpdate = true;
});

document.getElementById('print1').addEventListener('click', () => {
  cubes.children[1].visible = !cubes.children[1].visible;
});
document.getElementById('print2').addEventListener('click', () => {
  cubes.children[2].visible = !cubes.children[2].visible;
});
document.getElementById('finishing').addEventListener('click', () => {
  cubes.children[3].visible = !cubes.children[3].visible;
});

animate();
