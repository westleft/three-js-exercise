import { BoxGeometry, BoxBufferGeometry, Clock, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer, BufferAttribute } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvas = document.querySelector('.webgl')

const scene = new Scene();

const geometry = new BoxBufferGeometry()

const count = 50
const positionArray = new Float32Array(count * 3 * 3)

for(let i = 0; i < count *3 *3; i++){
  positionArray[i] = (Math.random() - 0.5) * 4
}

const positionAttribute = new BufferAttribute(positionArray, 3)
geometry.setAttribute('position', positionAttribute)

const mesh = new Mesh(
  geometry,
  new MeshBasicMaterial({ 
    color: 0xff0000,
    wireframe: true
  })
);

scene.add(mesh)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


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
  controls.update()

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()