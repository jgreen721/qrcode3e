import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  1,
  100,
  0.1
);

scene.add(camera);
camera.position.z = 40;
camera.rotation.set(-1.81, 1.23, 1.829);
camera.position.set(25, 12, -3.19);

let oc = new OrbitControls(camera, renderer.domElement);
oc.update();
let glbImage;
new GLTFLoader().load("frontendchallenge.glb", (img) => {
  console.log("img", img.scene);
  scene.add(img.scene);
  glbImage = img.scene;
});

onclick = () => {
  console.log(camera);
};

// let gridHelper = new THREE.GridHelper(20, 20);
// scene.add(gridHelper);

let ambientLight = new THREE.AmbientLight("", 0.3);
ambientLight.position.y = 5;
scene.add(ambientLight);

let spotLight = new THREE.SpotLight("", 0.3);
spotLight.position.y = 5;
scene.add(spotLight);

let boxGeo = new THREE.BoxGeometry(2, 2, 2);
let boxMaterial = new THREE.MeshStandardMaterial({ color: "green" });
let box = new THREE.Mesh(boxGeo, boxMaterial);
box.position.x = 3;
box.rotation.z = 2;
// scene.add(box);

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
const bloomPass = new UnrealBloomPass();
bloomPass.strength = 0.2;
new THREE.Vector2(window.innerWidth, window.innerHeight), 0.3, 0.1, 0.25;
composer.addPass(bloomPass);

function animation() {
  renderer.render(scene, camera);
  requestAnimationFrame(animation);
  // glbImage.rotation.y += 0.01;
  composer.render();
}

animation();

onresize = (e) => {
  renderer.setSize(innerWidth, innerHeight);
};
