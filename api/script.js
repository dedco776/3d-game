let balance = 1000;
let assetsCount = 0;

// Three.js Asosiy Saxna setupi
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 7);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Yorug'lik
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// 3D Obyekt: Markaziy oltin tanga
const coinGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.3, 32);
const coinMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, metalness: 0.8, roughness: 0.2 });
const coin = new THREE.Mesh(coinGeo, coinMat);
coin.rotation.x = Math.PI / 4;
scene.add(coin);

// Bino modellarini saqlash guruh
const buildingsGroup = new THREE.Group();
scene.add(buildingsGroup);

// Animatsiya sikli
function animate() {
    requestAnimationFrame(animate);
    coin.rotation.z += 0.01; // Tanga aylanishi
    renderer.render(scene, camera);
}
animate();

// Moliya logikasi
function work() {
    balance += 100;
    updateUI();
    // Tangani qisqa vaqt kattalashtirish effekti
    coin.scale.set(1.2, 1.2, 1.2);
    setTimeout(() => coin.scale.set(1, 1, 1), 150);
}

function buyAsset() {
    if (balance >= 500) {
        balance -= 500;
        assetsCount++;
        updateUI();
        addBuildingVisual();
    } else {
        alert("Mablag' yetarli emas!");
    }
}

function updateUI() {
    document.getElementById('balance').innerText = balance;
    document.getElementById('assets').innerText = assetsCount;
}

// Har safar bino sotib olinganda 3D makonda yangi bino paydo bo'ladi
function addBuildingVisual() {
    const height = Math.random() * 2 + 1;
    const buildingGeo = new THREE.BoxGeometry(0.8, height, 0.8);
    const buildingMat = new THREE.MeshStandardMaterial({ color: 0x3498db });
    const building = new THREE.Mesh(buildingGeo, buildingMat);
    
    // Tanga atrofida aylanama joylashtirish
    const angle = assetsCount * 0.8;
    const radius = 3.5;
    building.position.x = Math.cos(angle) * radius;
    building.position.z = Math.sin(angle) * radius;
    building.position.y = height / 2 - 1;
    
    buildingsGroup.add(building);
}

// Ekran hajmi o'zgarganda moslashtirish
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
