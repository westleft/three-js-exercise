import { AmbientLight, BoxGeometry, CameraHelper, Clock, Color, CubeTextureLoader, DirectionalLight, DirectionalLightHelper, DoubleSide, HemisphereLight, HemisphereLightHelper, Mesh, MeshBasicMaterial, MeshDepthMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshStandardMaterial, MeshToonMaterial, NearestFilter, PCFShadowMap, PerspectiveCamera, PlaneGeometry, PointLight, PointLightHelper, RectAreaLight, RepeatWrapping, Scene, SphereGeometry, SpotLight, SpotLightHelper, TextureLoader, TorusGeometry, WebGLRenderer } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from "dat.gui"

const canvas = document.querySelector('.webgl')
const scene = new Scene();

const material = new MeshStandardMaterial({
  side: DoubleSide,
})
// material.metalness = 0.45
// material.roughness = 0.45

const sphere = new Mesh(
  new SphereGeometry(0.5, 16, 16),
  material
)
sphere.castShadow = true

const plane = new Mesh(
  new PlaneGeometry(7, 7),
  material
)
plane.position.y = -0.5
plane.rotation.x = -(Math.PI *0.5)

plane.receiveShadow = true

scene.add(sphere,  plane,)

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
const ambientLight = new AmbientLight(0xffffff, 0.4)
scene.add(ambientLight)

const directionalLight = new DirectionalLight(0xffffff, 0.4)
directionalLight.castShadow = true

directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

directionalLight.position.set(2, 2, -1)
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 8
scene.add(directionalLight)

const cameraHelper = new CameraHelper(directionalLight.shadow.camera)
cameraHelper.visible = false
scene.add(cameraHelper)


const spotLight = new SpotLight(0xffffff, 0.4, 10, Math.PI * 0.3)
spotLight.castShadow = true
spotLight.position.set(0, 2, 2)

spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
spotLight.shadow.camera.fov = 30
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 6
scene.add(spotLight)
scene.add(spotLight.target)

const pointLight = new PointLight(0xFFFFFF, 0.3)
pointLight.castShadow = true
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 3
pointLight.position.set(-1, 1, 0)
scene.add(pointLight)

const pointLightHelper = new CameraHelper(pointLight.shadow.camera)
pointLightHelper.visible = false
scene.add(pointLightHelper)


// https://ithelp.ithome.com.tw/articles/10192109
// 相機的視野, 視野外觀比例, 接近相機的平片, 遠相機的平面
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 5
camera.position.y = 6
// camera.lookAt(mesh.position)
scene.add(camera)

const renderer = new WebGLRenderer({
  canvas: canvas,
})

renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFShadowMap

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true // 平滑視野
const clock = new Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  sphere.position.x = Math.cos(elapsedTime) * 1.5
  sphere.position.z = Math.sin(elapsedTime) * 1.5
  sphere.position.y = Math.abs(Math.sin(elapsedTime) * 1)

  // sphere.rotation.x = elapsedTime * 0.2
  // sphere.rotation.y = elapsedTime * 0.2


  controls.update()

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()