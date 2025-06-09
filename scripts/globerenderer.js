// ——— Basics —————————————————————————————————————————————————————
// const image = "//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg";
const image = "/images/specials/earth.jpg";
const globediv = document.getElementById('globe');

console.log('[Init] globe container:', globediv);


let width = 40;// vw & vh
let height = 80;

let globewidht;
let globeheight;
if (window.innerWidth < 1100) {
  width = 100;// vw & vh
  height = 50;
}

globewidht = window.innerWidth * width / 100;
globeheight = window.innerHeight * height / 100;
globediv.style.width = `${width}vw`;
globediv.style.height = `${height}vh`;

const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

const gData = [
  { name: "Home", label: "Amsterdam, NL", project_id: "monkeyswing", lat: 52.3676, lng: 4.9041, size: 0.15, color: 'red' },
  { name: "Shanghai", label: "China", lat: 31.2304, lng: 121.4737, size: 0.15, color: 'blue' },
  { name: "SanFranc", label: "California, USA", lat: 37.7749, lng: -122.4194, size: 0.15, color: 'green' }
];

//for pontsofview => start view
const AMSTERDAM = { lat: 35, lng: 4.9041, altitude: 2 };

const world = new Globe(globediv)
  .globeImageUrl(image)
  .backgroundColor("#fff")
  .showAtmosphere(false)
  .width(globewidht)
  .height(globeheight)
  .pointOfView(AMSTERDAM, 0)

  // 1) your data
  .pointsData(gData)
  .pointLat(d => (d.lat - 12))
  .pointLng(d => (d.lng - 2))
  .pointAltitude(d => d.size + 0.01)
  .pointRadius(() => 2)
  .pointColor(d => d.color)

  // 2) supply the hover-tooltip content
  //    this string (or HTML) will be shown for you
  .pointLabel(d =>
    `<div class="lead" style="margin: 0;">${d.name}</div>
     <div class="caption">${d.label}</div>`
  )

  // 3) disable merging so hover/click events work
  .pointsMerge(false)
  .pointsTransitionDuration(0);  // snap new points into place

// pixelation
world.renderer().setPixelRatio(0.15);

// optional: if you’d still like custom positioning instead
// of the built-in label, you can tap these hooks:
world.onPointClick(d => {
  if (!d || !d.project_id) return;
  const target = document.getElementById(d.project_id);
  if (!target) return;
  scrolltotarget(target);
  console.info('clicked point:', d)
});

// auto-rotate, hint, etc…
// const controls = world.controls();
// controls.autoRotate = true;
// controls.autoRotateSpeed = 2;

// load your texture
const earthTexture = new THREE.TextureLoader().load('/images/specials/earth.jpg');
earthTexture.minFilter = THREE.NearestFilter;
earthTexture.magFilter = THREE.NearestFilter;
earthTexture.generateMipmaps = false;
// create a purely emissive material
const unlitMat = new THREE.MeshBasicMaterial({ map: earthTexture });

// tell Globe.GL to use it instead of its default (MeshPhong) material
world.globeMaterial(unlitMat);


const hint = document.createElement('div');
hint.innerText = '⬢ Drag to explore';
hint.id = 'hintidpleaseremovethisdotcom';
Object.assign(hint.style, {
  position: 'absolute',
  top: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '6px 12px',
  background: 'rgba(0,0,0,0.6)',
  color: '#fff',
  borderRadius: '4px',
  fontFamily: 'sans-serif',
  fontSize: '1.9rem',
  pointerEvents: 'none',
  opacity: '1',
  transition: 'opacity 1s ease-out'
});
globediv.parentElement.appendChild(hint);


function scrolltotarget(target) {
  // smoothly scroll so the target ends up centered vertically
  target.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest'
  });

  // highlight it (optional)
  target.classList.add('targetSelected');
}




// 1) create canvas & load image
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.crossOrigin = '';        // if needed
img.src = '/images/specials/earth.jpg';

img.onload = () => {
  // 2) size canvas to image
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  // 3) get its pixel data & threshold
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    // since the image is already grayscale, r=g=b
    const v = d[i] < 128 ? 0 : 255;
    d[i] = v;  // R
    d[i + 1] = v;  // G
    d[i + 2] = v;  // B
    // alpha (d[i+3]) stays at 255
  }
  ctx.putImageData(imgData, 0, 0);

  // 4) make a Three.js texture from the canvas
  const bwTexture = new THREE.CanvasTexture(canvas);
  bwTexture.minFilter = THREE.NearestFilter;
  bwTexture.magFilter = THREE.NearestFilter;
  bwTexture.generateMipmaps = false;

  // 5) swap in your unlit material
  const bwMat = new THREE.MeshBasicMaterial({ map: bwTexture });
  world.globeMaterial(bwMat);
};