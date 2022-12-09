import { AxesHelper, BoxGeometry, Group, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three"

const canvas = document.querySelector('.webgl')

const scene = new Scene();

const axes = new AxesHelper(20);
scene.add(axes)

// const geometry = new BoxGeometry(1, 1, 1)
// const material = new MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new Mesh(geometry, material);
// mesh.position.set(0.7, -0.6, 1)
// mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI * 0.2
// mesh.rotation.y = Math.PI * 0.2

// scene.add(mesh)


const group = new Group
group.position.y = 1
group.scale.x = 1.2
scene.add(group)

const cube1 = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 'red'})
)

group.add(cube1)

const cube2 = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 'blue'})
)
cube2.position.x = -2
group.add(cube2)

const cube3 = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 'green'})
)
cube3.position.x = 2
group.add(cube3)

const sizes = {
  width: 800,
  height: 500
}

// https://ithelp.ithome.com.tw/articles/10192109
// 相機的視野, 視野外觀比例, 接近相機的平片, 遠相機的平面
const camera = new PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.z = 6
// camera.lookAt(mesh.position)
scene.add(camera)

const renderer = new WebGLRenderer({
  canvas: canvas,
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)