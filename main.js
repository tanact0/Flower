import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const link = ['./rose/scene.gltf', './whiteRose/scene.gltf'];
var sceneMain = document.getElementById('sceneMain');
var axis = new THREE.Vector3 (0,1,0);
let count = 0;
let count2 = 0.0;
let loadModel;
let valueAmountFlowers;
let x; 

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);
scene.add( new THREE.GridHelper( 10,10) );
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.set(0, 2, 1);

const hlight = new THREE.AmbientLight (0x404040,100);
scene.add(hlight);

const directionalLight = new THREE.DirectionalLight(0xffffff,10);
directionalLight.position.set(0,10,0);
directionalLight.castShadow = true;
scene.add(directionalLight);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( 900, 500);
sceneMain.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();

let model;

document.getElementById('listAmountFlowers').onchange = function() {
  valueAmountFlowers = document.getElementById('listAmountFlowers').value;
  scene.children.length = 3;
};
//Добавление цветов по кнопке
document.getElementById('plus').onclick = function() {
  let randomRotation = Math.floor(Math.random() * 10);
  document.getElementById('minus').disabled = false;
  if (redRose.checked){
    loadModel = link[0];
    };
    if(whiteRose.checked){
    loadModel = link[1];
    };
  
  switch (Number(valueAmountFlowers)) {
    case 3:
      if (Number(scene.children.length) < 6) {
        loader.load(loadModel, (gltf) =>{
          x = 3;
          model = gltf.scene;
          model.scale.set(1, 1, 1, 1);
          model.position.set(0, 0, 0);
          model.rotation.set(0, count * Math.PI / 4, Math.PI / 14);
          model.rotateOnAxis (axis, randomRotation);
          count += 2.8;
          scene.add(gltf.scene);
        });
      };
    break
    case 5:
      if (Number(scene.children.length) < 8) {
        loader.load(loadModel, (gltf) =>{
          x = 5
          model = gltf.scene;
          model.scale.set(1, 1, 1, 1);
          model.position.set(0, 0, 0);
          model.rotation.set(0, count * Math.PI / 5, Math.PI / 14);
          model.rotateOnAxis (axis, randomRotation);
          count += 2;
          scene.add(gltf.scene);
        });
      }
    break
    case 7:
      if (Number(scene.children.length) < 10) {
        loader.load(loadModel, (gltf) =>{
          model = gltf.scene;
          model.scale.set(1, 1, 1, 1);
          model.position.set(0, 0, 0);
          if (Number(scene.children.length) == 3) {
            model.rotation.set(0, 0, 0);
          }
          else {
            model.rotation.set(0, count * Math.PI / 3, Math.PI / 10);
          }
          model.rotateOnAxis (axis, randomRotation);
          count += 1;
          scene.add(gltf.scene);
        });
      }
    };
};
//Удаление цветов по кнопке
document.getElementById('minus').onclick = function() {
  if (Number(scene.children.length) == 4) {
    scene.remove(scene.children.at(-1));
    document.getElementById('minus').disabled = true;
  }
  else {
    scene.remove(scene.children.at(-1));
  }
  switch (Number(valueAmountFlowers)) {
    case 3:
      count -= 2.8;
    break
    case 5:
      count -= 2;
    break
    case 7:
      count -= 1;
    break
  };
};

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera)
}
animate();