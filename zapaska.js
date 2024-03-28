import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const link = ['./rose/scene.gltf', './whiteRose/scene.gltf'];
var sceneMain = document.getElementById('sceneMain');
var axis = new THREE.Vector3 (0,1,0);
let count = 0;
let count2 = 0.0;
let loadModel;
  // let data = document.querySelector('#input').value;
  // loader.load(link[1], (gltf) =>{
  //   console.log(gltf);
  //   model = gltf.scene;
  //   model.scale.set(1, 1, 1, 1);
  //   model.position.set(0.1, -0.8, 0);
  //   scene.add(gltf.scene);
  // });
  // let count = document.querySelector('input').value;

document.getElementById('listAmoutFlowers').onchange = function() {
  let x;
  x = document.getElementById('listAmoutFlowers').value;
  if(x == 3){
    alert('fdfd');
  }
}


//Добавление цветов по кнопке
document.getElementById('plus').onclick = function() {
  if (check1.checked){
    loadModel = link[0];
  };
  if(check2.checked){
    loadModel = link[1];
  }
  loader.load(loadModel, (gltf) =>{
    let randomRotation = Math.floor(Math.random() * 10);
    model = gltf.scene;
    model.scale.set(1, 1, 1, 1);
    if (scene.children[3]) {
      model.position.set(0, -0.03, 0);
      model.rotateOnAxis (axis, randomRotation);
    };
    if (scene.children > scene.children[4]) {
      model.position.set(0, 0, 0);
      model.rotation.set(0, count * Math.PI / 5, Math.PI / 7);
      model.rotateOnAxis (axis, randomRotation);
    };
    if (scene.children > scene.children[14]) {
      model.rotation.set(0, count2 * Math.PI / 3, Math.PI / 4);
      model.rotateOnAxis (axis, randomRotation);
    };
    scene.add(gltf.scene);
  });
  count += 1;
  count2 += 0.4;
};
//Удаление цветов по кнопке
document.getElementById('minus').onclick = function() {
  scene.remove(scene.children.at(-1));
  count -= 1;
  count2 -= 0.4;
};
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);
scene.add( new THREE.GridHelper( 10,10) );
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.set(0, 2, 1)

const hlight = new THREE.AmbientLight (0x404040,100);
scene.add(hlight);

const directionalLight = new THREE.DirectionalLight(0xffffff,10);
directionalLight.position.set(0,10,0);
directionalLight.castShadow = true;
scene.add(directionalLight);
const light = new THREE.PointLight(0xc4c4c4,10);
light.position.set(0,300,500);
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( 900, 500);
sceneMain.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();

let model;

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera)
}
animate();