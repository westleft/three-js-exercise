import { MeshMatcapMaterial, AxesHelper, BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, TextureLoader, WebGLRenderer, TorusGeometry } from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
// import { helvetiker } from 'three//examples/fonts'
const canvas = document.querySelector('.webgl')


const scene = new Scene();

const axes = new AxesHelper()
scene.add(axes)

// https://github.com/nidorx/matcaps
const textuerLoader = new TextureLoader()
const matcapTexture1 = textuerLoader.load('../../assets/images/matcaps/1.jpg')
const matcapTexture2 = textuerLoader.load('../../assets/images/matcaps/2.jpg')
const matcapTexture3 = textuerLoader.load('../../assets/images/matcaps/3.jpg')
const matcapTexture4 = textuerLoader.load('../../assets/images/matcaps/4.jpg')
const matcapTexture5 = textuerLoader.load('../../assets/images/matcaps/5.jpg')
const matcapTexture6 = textuerLoader.load('../../assets/images/matcaps/6.jpg')
const matCatArr = [
  matcapTexture1, matcapTexture2, matcapTexture3, matcapTexture4, matcapTexture5, matcapTexture6
]

const fontLoader = new FontLoader()

fontLoader.load(
  '../../node_modules/three/examples/fonts/gentilis_regular.typeface.json', 
  (font) => {
    const textGeometry = new TextGeometry('Hello Peter' ,{
      font: font,
      size: 0.5,
      height: 0.2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4
    })

    // 文字置中
    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //   -(textGeometry.boundingBox.max.x -0.02) *0.5,
    //   -(textGeometry.boundingBox.max.y -0.02) *0.5,
    //   -(textGeometry.boundingBox.max.z -0.03) *0.5
    // )
    // console.log(textGeometry.boundingBox)
    textGeometry.center()

    const material = new MeshMatcapMaterial({ matcap: matcapTexture1 })
    const text = new Mesh(textGeometry, material)
    scene.add(text)

    const dountGeomtry = new TorusGeometry(0.3, 0.2, 20, 45)
    

    for(let i = 0; i < 100; i++){
      const num = Math.floor(Math.random()*6)
      const dountMaterial = new MeshMatcapMaterial({ matcap: matCatArr[num] })
      const dount = new Mesh(dountGeomtry, dountMaterial)

      dount.position.x = (Math.random() - 0.5) * 10
      dount.position.y = (Math.random() - 0.5) * 10
      dount.position.z = (Math.random() - 0.5) * 10

      dount.rotation.x = Math.random() * Math.PI
      dount.rotation.y = Math.random() * Math.PI

      const scale = Math.random()
      dount.scale.set(scale, scale, scale)

      scene.add(dount)
    }
  }
)

const mesh = new Mesh(
  new BoxGeometry(1, 1, 1, 5, 5, 5),
  new MeshBasicMaterial({ color: 0xff0000 })
);

// scene.add(mesh)

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
camera.position.z = 6
// camera.lookAt(mesh.position)
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