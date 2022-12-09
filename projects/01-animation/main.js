import { AxesHelper, BoxGeometry, Clock, Group, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three"
import gsap from "gsap"

const canvas = document.querySelector('.webgl')

const scene = new Scene();

// const axes = new AxesHelper(20);
// scene.add(axes)

const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshBasicMaterial({ color: 0xff0000 })
const mesh = new Mesh(geometry, material);
mesh.position.set(0.7, -0.6, 1)
// mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI * 0.2
// mesh.rotation.y = Math.PI * 0.2

scene.add(mesh)



const sizes = {
  width: 800,
  height: 500
}

// https://ithelp.ithome.com.tw/articles/10192109
// 相機的視野, 視野外觀比例, 接近相機的平片, 遠相機的平面
const camera = new PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.z = 6
camera.lookAt(mesh.position)
scene.add(camera)

const renderer = new WebGLRenderer({
  canvas: canvas,
})

renderer.setSize(sizes.width, sizes.height)

gsap.to(mesh.position, { duration: 10, delay: 0.5,x: 2 })


// const clock = new Clock();

const tick = () => {
  // const elapsedTime = clock.getElapsedTime()
  // // console.log('tick')
  // mesh.position.x = Math.sin(elapsedTime)
  // // console.log(elapsedTime)
  

  renderer.render(scene, camera)
  // // camera.lookAt(mesh.position)
  window.requestAnimationFrame(tick)
  
}
// renderer.render(scene, camera)
tick()