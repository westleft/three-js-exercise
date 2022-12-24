import { BoxGeometry, Clock, Mesh, MeshBasicMaterial, NearestFilter, PerspectiveCamera, RepeatWrapping, Scene, TextureLoader, WebGLRenderer } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from "gsap"
import * as dat from "dat.gui"


const textureLoader = new TextureLoader()
const texture = textureLoader.load("../../assets/images/Metal046B_1K_Roughness.png")

// texture.repeat.x = 2
// texture.repeat.y = 3
// texture.wrapS = RepeatWrapping
// texture.wrapT = RepeatWrapping

// texture.rotation = Math.PI / 4
// texture.center.x = 0.5
// texture.center.y = 0.5

texture.magFilter = NearestFilter

const gui = new dat.GUI()
const canvas = document.querySelector('.webgl')
const scene = new Scene();

const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 5 })
  }
}

const material = new MeshBasicMaterial({ map: texture })

const mesh = new Mesh(
  new BoxGeometry(1, 1, 1, 2, 2, 2),
  material
);

mesh.rotation.x = 2
mesh.rotation.z = 2

scene.add(mesh)
gui.add(mesh.position, 'y', -3, 3, 1).name('red cube y')
gui.add(mesh, 'visible')
gui.add(mesh.material, 'wireframe')


gui
  .addColor(parameters, 'color')
  .onChange(() => {
    material.color.set(parameters.color)
  })

gui.add(parameters, 'spin')

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

// https://ithelp.ithome.com.tw/articles/10192109
// 相機的視野, 視野外觀比例, 接近相機的平片, 遠相機的平面
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

const renderer = new WebGLRenderer({
  canvas: canvas,
})

renderer.setSize(sizes.width, sizes.height)


const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
const tick = () => {
  // 控制視角
  // camera.position.x = Math.sin(cursor.x * Math.PI) * 3
  // camera.position.z = Math.cos(cursor.x * Math.PI) * 3
  // camera.position.y = cursor.y * 10
  // camera.lookAt(mesh.position)

  controls.update()

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()