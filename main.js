import * as THREE from './libs/three.module.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 200, 300);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(100, 200, 100);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Chessboard tiles setup
const board = new THREE.Group();
const tileSize = 25;
const offset = (tileSize * 8) / 2 - tileSize / 2;

for (let x = 0; x < 8; x++) {
  for (let y = 0; y < 8; y++) {
    const color = (x + y) % 2 === 0 ? 0xffffff : 0x444444;
    const geometry = new THREE.BoxGeometry(tileSize, 2, tileSize);
    const material = new THREE.MeshStandardMaterial({ color });
    const tile = new THREE.Mesh(geometry, material);
    tile.position.set(x * tileSize - offset, 0, y * tileSize - offset);
    tile.receiveShadow = true;
    board.add(tile);
  }
}
scene.add(board);

// Simple chess piece - Cylinder as Pawn example
const pieceGeometry = new THREE.CylinderGeometry(6, 6, 20, 32);
const pieceMaterialWhite = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.6,
  roughness: 0.4,
});
const pieceMaterialBlack = new THREE.MeshStandardMaterial({
  color: 0x111111,
  metalness: 0.6,
  roughness: 0.4,
});

const whitePawn = new THREE.Mesh(pieceGeometry, pieceMaterialWhite);
whitePawn.position.set(-offset, 11, 3 * tileSize - offset); // Example position e2
whitePawn.castShadow = true;
scene.add(whitePawn);

const blackPawn = new THREE.Mesh(pieceGeometry, pieceMaterialBlack);
blackPawn.position.set(offset - tileSize, 11, 6 * tileSize - offset); // Example position d7
blackPawn.castShadow = true;
scene.add(blackPawn);

// Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

