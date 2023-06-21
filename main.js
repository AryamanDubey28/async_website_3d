import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'


//For Three.js, we need a scene, a camera, and a renderer.

const scene = new THREE.Scene(); //A scene is a container for objects, cameras and lights

//Field of view -> amount of world thats visible based of a full 360 degree view, aspect ratio, view frustrum -> controls which objects are visible, relative to the camera itself
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //A camera is used to view the scene

//Renderer -> renders the scene to the screen
const renderer = new THREE.WebGLRenderer({
   canvas: document.querySelector('#bg'),


});
renderer.setPixelRatio(window.devicePixelRatio); //Allows for high resolution on retina displays
renderer.setSize(window.innerWidth, window.innerHeight); //Sets the size of the renderer
camera.position.setZ(30); //Sets the position of the camera
camera.position.setX(-3);

renderer.render(scene, camera); //Renders the scene and camera



const pointLight = new THREE.PointLight(0xffffff); //emits light in ALL directions
pointLight.position.set(20,20,20);

const ambientLight = new THREE.AmbientLight(0xffffff); //emits light in ALL direction
scene.add(pointLight, ambientLight);


const controls = new OrbitControls(camera, renderer.domElement); //lets user control Torus with mouse


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));


  star.position.set(x, y, z);
  scene.add(star);

}


Array(400).fill().forEach(addStar); //adds 400 stars to the scene, in random positions

const spaceTexture = new THREE.TextureLoader().load('black.jpg'); //makes a texture with a space background from the jpg installed
scene.background = spaceTexture; //sets the scenes background to the space texture

//Avatar
const asyncTexture = new THREE.TextureLoader().load('async-logo-color.JPEG');
const avatar = new THREE.Mesh(new THREE.BoxGeometry(3,3,3), new THREE.MeshBasicMaterial({map: asyncTexture}));


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  avatar.rotation.y += 0.01;
  avatar.rotation.z += 0.01;


  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002; 

}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();



