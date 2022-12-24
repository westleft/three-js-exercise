import { AmbientLight, BoxGeometry, Clock, Color, CubeTextureLoader, DoubleSide, Mesh, MeshBasicMaterial, MeshDepthMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshStandardMaterial, MeshToonMaterial, NearestFilter, PerspectiveCamera, PlaneGeometry, PointLight, RepeatWrapping, Scene, SphereGeometry, TextureLoader, TorusGeometry, WebGLRenderer } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from "dat.gui"

const textureLoader = new TextureLoader()
const texture = textureLoader.load('../../assets/images/Metal046B_1K_Color.png')

const cubeTextureLoader = new CubeTextureLoader()

// 轉換網址 : https://matheowis.github.io/HDRI-to-CubeMap/
const envTextLoader = cubeTextureLoader.load([
  '../../assets/images/env/px.png',
  '../../assets/images/env/nx.png',
  '../../assets/images/env/py.png',
  '../../assets/images/env/ny.png',
  '../../assets/images/env/pz.png',
  '../../assets/images/env/nz.png',
])

const canvas = document.querySelector('.webgl')
const scene = new Scene();


const gui = new dat.GUI()

// const material = new MeshBasicMaterial({ 
//   color: 'green', 
//   map:  texture,
//   wireframe: true,
//   opacity: 0.5,
//   transparent: true,
//   side: DoubleSide
// })

// const material = new MeshNormalMaterial({
//   flatShading: true
// })

// const material = new MeshMatcapMaterial({
//   matcap: texture
// })

// const material = new MeshDepthMaterial()

// const material = new MeshLambertMaterial()

// const material = new MeshPhongMaterial()
// material.shininess = 100
// material.specular = new Color("red")

// const material = new MeshToonMaterial()

const material = new MeshStandardMaterial()
material.metalness = 0.45
material.roughness = 0.45
material.envMap = envTextLoader
// material.map = texture

// const mesh = new Mesh(
//   new BoxGeometry(1, 1, 1, 2, 2, 2),
//   material
// );

gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

const sphere = new Mesh(
  new SphereGeometry(0.5, 16, 16),
  material
)

const plane = new Mesh(
  new PlaneGeometry(1, 1),
  material
)
plane.position.x = 2

const torus = new Mesh(
  new TorusGeometry(0.3, 0.2, 16, 32),
  material
)
torus.position.x = -2

scene.add(sphere, plane, torus)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const ambientLight = new AmbientLight(0xFFFFFF, 0.5)
scene.add(ambientLight)

const pointLight = new PointLight(0xFFFFFF, 0.5)
pointLight.position.x = 2 
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// https://ithelp.ithome.com.tw/articles/10192109
// 相機的視野, 視野外觀比例, 接近相機的平片, 遠相機的平面
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 3
// camera.lookAt(mesh.position)
scene.add(camera)

const renderer = new WebGLRenderer({
  canvas: canvas,
})

renderer.setSize(sizes.width, sizes.height)


const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true // 平滑視野
const clock = new Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  plane.rotation.x = elapsedTime * 0.2
  plane.rotation.y = elapsedTime * 0.2

  sphere.rotation.x = elapsedTime * 0.2
  sphere.rotation.y = elapsedTime * 0.2

  torus.rotation.x = elapsedTime * 0.2
  torus.rotation.y = elapsedTime * 0.2


  controls.update()

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()