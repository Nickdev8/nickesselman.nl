// ——— Basics —————————————————————————————————————————————————————
// const image = "//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg";
const image = "/images/specials/earth.jpg";
const globediv = document.getElementById('globe');
const tooltip = document.getElementById('tooltip');
const tooltip_name = tooltip.querySelector('.lead');
const tooltip_label = tooltip.querySelector('.caption');

console.log('[Init] globe container:', globediv);

const width = 40;  // 40vw
const height = 80;  // 80vh
globediv.style.width = `${width}vw`;
globediv.style.height = `${height}vh`;


const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

const gData = [
  { name: "Home", lat: 52.3676, lng: 4.9041, size: 40, color: 'red' },  // Amsterdam
  { lat: 31.2304, lng: 121.4737, size: 40, color: 'blue' },  // Shanghai
  { lat: 37.7749, lng: -122.4194, size: 40, color: 'green' }   // San Francisco
];

//for pontsofview => start view
const AMSTERDAM = { lat: 35, lng: 4.9041, altitude: 2 };


const world = new Globe(globediv)
  .globeImageUrl(image)
  .width(window.innerWidth * (width / 100))
  .height(window.innerHeight * (height / 100))
  .pointOfView(AMSTERDAM, 0)
  .htmlElementsData(gData)
  .htmlElement(d => {
    const el = document.createElement('div');
    el.innerHTML = markerSvg;
    el.style.color = d.color;
    el.style.width = `${d.size}px`;
    el.style.transition = 'opacity 250ms';
    el.style.pointerEvents = 'auto';
    el.style.cursor = 'pointer';

    el.onmouseenter = () => {
      tooltip_name.innerHTML = d.name || '…';
      tooltip_label.innerHTML = d.label || '';
      tooltip.style.display = 'block';
    };

    el.onmousemove = ev => {
      tooltip.style.left = (ev.pageX + 10) + 'px';
      tooltip.style.top = (ev.pageY + 10) + 'px';
    };

    el.onmouseleave = () => {
      tooltip.style.display = 'none';
    };

    el.onclick = () => console.info(d);
    return el;
  })
  .htmlElementVisibilityModifier((el, isVisible) => {
    el.style.opacity = isVisible ? 1 : 0;
  });


// choose your “pixel size” factor:
//    1.0 = full-res (no pixelation)
//    0.5 = half-res (mild pixelation)
//    0.2 = 20% res (strong pixelation)
const renderer = world.renderer();
const pixelFactor = 0.2;
renderer.setPixelRatio( pixelFactor );

const controls = world.controls();
controls.autoRotate = true;                  // turn on auto-spin
controls.autoRotateSpeed = 2;              // slow and steady

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