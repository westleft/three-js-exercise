import { BoxGeometry, Clock, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvas = document.querySelector('.webgl')

const scene = new Scene();

const mesh = new Mesh(
  new BoxGeometry(1, 1, 1, 5, 5, 5),
  new MeshBasicMaterial({ color: 0xff0000 })
);

scene.add(mesh)

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

// 全螢幕模式
window.addEventListener('dblclick', () => {
  if(!document.fullscreenElement){
    canvas.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})

// https://ithelp.ithome.com.tw/articles/10192109
// 相機的視野, 視野外觀比例, 接近相機的平片, 遠相機的平面
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 6
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