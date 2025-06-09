
    // core three.js
    import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js';
    // orbit controls
    import { OrbitControls } from 'https://unpkg.com/three@0.154.0/examples/jsm/controls/OrbitControls.js';
    // postprocessing
    import { EffectComposer } from 'https://unpkg.com/three@0.154.0/examples/jsm/postprocessing/EffectComposer.js';
    import { RenderPass }     from 'https://unpkg.com/three@0.154.0/examples/jsm/postprocessing/RenderPass.js';
    import { ShaderPass }     from 'https://unpkg.com/three@0.154.0/examples/jsm/postprocessing/ShaderPass.js';
    import { PixelShader }    from 'https://unpkg.com/three@0.154.0/examples/jsm/shaders/PixelShader.js';

    // grab your container
    const container = document.getElementById('globe');

    // SCENE + CAMERA + RENDERER
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 2.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // handle resize
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      composer.setSize(container.clientWidth, container.clientHeight);
    });

    // LIGHTS
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pointA = new THREE.PointLight(0xffffff, 1);
    pointA.position.set(10, 10, 10);
    scene.add(pointA);
    const pointB = new THREE.PointLight(0xffffff, 0.5);
    pointB.position.set(-10, -10, -10);
    scene.add(pointB);

    // TRICOLOR SHADER
    const tricolorShader = {
      uniforms: {
        uTexture: { value: new THREE.TextureLoader().load('/images/specials/earth.jpg') }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(uTexture, vUv);
          if (color.r > 0.7 && color.g < 0.3 && color.b < 0.3) {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            return;
          }
          float lum = dot(color.rgb, vec3(0.299, 0.587, 0.114));
          float bw  = step(0.5, lum);
          gl_FragColor = vec4(vec3(bw), 1.0);
        }
      `
    };

    // GLOBE MESH
    const globeGeo = new THREE.SphereGeometry(1, 64, 64);
    const globeMat = new THREE.ShaderMaterial(tricolorShader);
    const globe    = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);

    // OUTLINE
    const outlineGeo = new THREE.SphereGeometry(1.008, 64, 64);
    const outlineMat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
    const outline    = new THREE.Mesh(outlineGeo, outlineMat);
    scene.add(outline);

    // ORBIT CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.minDistance = 1.5;
    controls.maxDistance = 5;

    // POST-PROCESSING (PIXELATION)
    const composer   = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const pixelPass = new ShaderPass(PixelShader);
    pixelPass.uniforms['granularity'].value = 6;
    composer.addPass(pixelPass);

    // ANIMATION LOOP
    function animate() {
      requestAnimationFrame(animate);
      composer.render();
    }
    animate();