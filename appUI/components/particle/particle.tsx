import { useCallback } from "react";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";

export const Particle = (prop: { children: React.ReactNode }) => {

   const particlesInit = useCallback(async (engine: Engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      await loadFull(engine);
   }, []);


   return (
      <>
         <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
               fpsLimit: 60,
               interactivity: {
                  events: {
                     onClick: {
                        enable: true,
                        mode: "push",
                     },
                     onHover: {
                        enable: true,
                        mode: "repulse",
                     },
                     resize: true,
                  },
                  modes: {
                     push: {
                        quantity: 4,

                     },
                     repulse: {
                        distance: 100,
                        duration: 0.4,
                     },
                  },
               },
               particles: {
                  color: {
                     value: "#434343",
                  },
                  links: {
                     color: "#434343",
                     distance: 150,
                     enable: true,
                     opacity: 0.2,
                     width: 0.2,
                  },
                  collisions: {
                     enable: true,
                  },
                  move: {
                     direction: "none",
                     enable: true,
                     outModes: {
                        default: "bounce",
                     },
                     bounce: true,
                     random: true,
                     speed: 1,
                     straight: false,
                     attract: {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                     }
                  },
                  number: {
                     density: {
                        enable: true,
                        area: 800,
                     },
                     value: 100,
                  },
                  opacity: {
                     value: 0.8,
                     random: false,
                     anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                     }
                  },
                  shape: {
                     type: "circle",
                     polygon: { nb_sides: 1 }
                  },
                  size: {
                     value: { min: 1, max: 5 },
                     random: true,
                     anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                     }
                  },
               },
               detectRetina: true,
               background: {
                  opacity: 0.1,
                  position: "50% 50%",
                  color: '#f9f9f9',
                  size: "cover",
                  repeat: "none"
               }
            }}
         />
         {prop.children}
      </>
   );
};