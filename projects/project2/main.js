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
  PointLight,
  MeshLambertMaterial,
  SpotLight,
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
  const planeMaterial = new MeshLambertMaterial({ color: 0xcccccc });
  const plane = new Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;

  scene.add(plane);

  const cubeGeometry = new BoxGeometry(6, 6, 6);
  const cubeMaterial = new MeshLambertMaterial({
    color: "#4CB5AE",
  });
  const cube = new Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow =true

  cube.position.x = 3;
  cube.position.y = 3;
  cube.position.z = 3;

  scene.add(cube);

  const sphereGeometry = new SphereGeometry(4, 20, 20);
  const sphereMaterial = new MeshLambertMaterial({
    color: "#81D6E3",
  });
  const sphere = new Mesh(sphereGeometry, sphereMaterial);
  sphere.castShadow = true

  sphere.position.x = 20;
  sphere.position.y = 4;
  sphere.position.z = 5;

  scene.add(sphere);

  const spotLight = new SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // 建立渲染器
  const renderer = new WebGLRenderer();
  renderer.setClearColor(new Color(0xeeeeee));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

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
