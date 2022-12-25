import { AmbientLight, BoxGeometry, Clock, Color, CubeTextureLoader, DirectionalLight, DirectionalLightHelper, DoubleSide, HemisphereLight, HemisphereLightHelper, Mesh, MeshBasicMaterial, MeshDepthMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshStandardMaterial, MeshToonMaterial, NearestFilter, PerspectiveCamera, PlaneGeometry, PointLight, PointLightHelper, RectAreaLight, RepeatWrapping, Scene, SphereGeometry, SpotLight, SpotLightHelper, TextureLoader, TorusGeometry, WebGLRenderer } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from "dat.gui"

const canvas = document.querySelector('.webgl')
const scene = new Scene();

const material = new MeshStandardMaterial()
material.metalness = 0.45
material.roughness = 0.45

const sphere = new Mesh(
  new SphereGeometry(0.5, 16, 16),
  material
)

const cube = new Mesh(
  new BoxGeometry(0.5, 0.5, 0.5),
  material
)

cube.position.x = 2

const torus = new Mesh(
  new TorusGeometry(0.3, 0.2, 16, 32),
  material
)
torus.position.x = -2

const plane = new Mesh(
  new PlaneGeometry(7, 7),
  material
)
plane.position.y = -1
plane.rotation.x = -(Math.PI *0.5)


scene.add(sphere, cube, plane, torus)

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


// =============================================
// 燈光
const ambientLight = new AmbientLight(0xFFFFFF, 0.5)
scene.add(ambientLight)

const directionalLight = new DirectionalLight(0x00fffc, 0.3)
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)

const hemisphereLight = new HemisphereLight('red', 'blue', 0.3)
scene.add(hemisphereLight)

const rectAreaLight = new RectAreaLight('red', 2, 1, 1)
scene.add(rectAreaLight)

const spotLight = new SpotLight(0x78ff00, 0.7, 6, Math.PI * 0.1, 0.5, 1)
scene.add(spotLight)
spotLight.target.position.x = -0.5
scene.add(spotLight.target)

const pointLight = new PointLight(0xFFFFFF, 0.5)
pointLight.position.x = 2 
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


// =============================================
// helper
const hemisphereLightHelper = new HemisphereLightHelper(hemisphereLight, 0.25)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new DirectionalLightHelper(directionalLight, 0.25)
scene.add(directionalLightHelper)

const pointLightHelper = new PointLightHelper(pointLight, 0.25)
scene.add(pointLightHelper)

const spotLightHelper =  new SpotLightHelper(spotLight, 0.25)
scene.add(spotLightHelper)

// https://ithelp.ithome.com.tw/articles/10192109
// 相機的視野, 視野外觀比例, 接近相機的平片, 遠相機的平面
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 4
camera.position.y = 2
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

  cube.rotation.x = elapsedTime * 0.2
  cube.rotation.y = elapsedTime * 0.2

  sphere.rotation.x = elapsedTime * 0.2
  sphere.rotation.y = elapsedTime * 0.2

  torus.rotation.x = elapsedTime * 0.2
  torus.rotation.y = elapsedTime * 0.2


  controls.update()

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()