import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  AxesHelper,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  BoxGeometry,
  SphereGeometry,
  PointLight
} from "three";

const app = document.querySelector("#app");
console.log(app);

function init() {
  // 建立場景
  const scene = new Scene();

  // 座標器
  const axes = new AxesHelper(20);
  scene.add(axes);

  const planeGeometry = new PlaneGeometry(60, 20);
  const planeMaterial = new MeshBasicMaterial({ color: 0xcccccc });
  const plane = new Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;

  scene.add(plane);

  const cubeGeometry = new BoxGeometry(6, 6, 6);
  const cubeMaterial = new MeshBasicMaterial({
    color: "#4CB5AE",
    wireframe: true,
  });
  const cube = new Mesh(cubeGeometry, cubeMaterial);

  cube.position.x = 3;
  cube.position.y = 3;
  cube.position.z = 3;

  scene.add(cube);

  const sphereGeometry = new SphereGeometry(4, 20, 20);
  const sphereMaterial = new MeshBasicMaterial({
    color: "#81D6E3",
    wireframe: true,
  });
  const sphere = new Mesh(sphereGeometry, sphereMaterial);

  sphere.position.x = 20;
  sphere.position.y = -1;
  sphere.position.z = 5;

  scene.add(sphere);

  // 建立渲染器
  const renderer = new WebGLRenderer();
  renderer.setClearColor(new Color(0xeeeeee));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 建立相機
  const camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  app.appendChild(renderer.domElement);

  renderer.render(scene, camera);
}

init();
