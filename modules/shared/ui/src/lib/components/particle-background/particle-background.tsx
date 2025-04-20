// // components/ParticleBackground.tsx
// import Particles, { initParticlesEngine } from '@tsparticles/react';
// import { useState, useEffect } from 'react';
// import { loadFull } from 'tsparticles';

// export default function ParticleBackground() {

//   const [ init, setInit ] = useState(false);

//   useEffect(() => {
    
//     initParticlesEngine(async (engine) => {
//         // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
//         // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
//         // starting from v2 you can add only the features you need reducing the bundle size
//         //await loadAll(engine);
//         //await loadFull(engine);
//         await loadFull(engine);
//         //await loadBasic(engine);
//     }).then(() => {
//         setInit(true);
//     });
// }, []);

//   return (
//     <Particles
//       id="tsparticles"
//       options={{
//         fullScreen: { enable: true, zIndex: -1 },
//         particles: {
//           number: { value: 50 },
//           color: { value: "#ff69b4" }, // pinkish accent
//           opacity: { value: 0.1 },
//           size: { value: 3 },
//           move: {
//             enable: true,
//             speed: 0.5,
//             direction: "none",
//             random: true,
//             straight: false,
//           },
//         },
//       }}
//     />
//   );
// }
