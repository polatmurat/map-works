// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
// import { Link } from "react-router-dom";
// import "swiper/css";
// import "swiper/css/pagination";
// import { SliderData } from "./SliderData";
// import { GiKnifeFork } from "react-icons/gi";
// import { PiCoffeeLight } from "react-icons/pi";
// import { motion } from "framer-motion";

// const Slider = () => {
//   return (
//     <Swiper
//       pagination={{
//         dynamicBullets: true,
//       }}
//       modules={[Pagination]}
//       className="swiper cursor-pointer"
//     >
//       {SliderData.map((photo, index) => (
//         <SwiperSlide className="swiper-slide" key={index}>
//           <div className={`absolute inset-0 bg-no-repeat bg-cover `}>
//             {" "}
//             <img
//               src={`${photo.url}`}
//               alt="Slider Pictures"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="absolute inset-0 w-full h-full bg-black/50">
//             <div className="container h-[100vh] flex flex-col items-center justify-end">
//               <motion.div
//                 initial={{ opacity: 0, x: "-100vw" }}
//                 animate={{ opacity: 1, x: 0 }}
//               >
//                 <div className="flex items-end justify-end mb-24">
//                   <div className="flex space-x-32 text-white">
//                     <div className="slider-circles">
//                       <GiKnifeFork size={26} />
//                       <span className="mt-2 text-sm">Restaurants</span>
//                     </div>
//                     <div className="slider-circles">
//                       <PiCoffeeLight size={34} />
//                       <span className="mt-2 text-sm">Coffees</span>{" "}
//                     </div>
//                     <div className="slider-circles">
//                       <GiKnifeFork size={26} />
//                       <span className="mt-2 text-sm">Restaurants</span>{" "}
//                     </div>
//                     <div className="slider-circles">
//                       <GiKnifeFork size={26} />
//                       <span className="mt-2 text-sm">Restaurants</span>{" "}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default Slider;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Mousewheel, Scrollbar } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import "swiper/css/scrollbar";
import { SliderData } from "./SliderData";
import { GiKnifeFork } from "react-icons/gi";
import { PiCoffeeLight } from "react-icons/pi";
import { motion } from "framer-motion";

const Slider = () => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination, Autoplay, Mousewheel, Scrollbar]}
      mousewheel
      className="swiper cursor-pointer"
      scrollbar={{ draggable: true }}
      autoplay={{
        delay: 3000, // Otomatik geçiş süresi (4 saniye)
        disableOnInteraction: false, // Kullanıcı etkileşime girdiğinde otomatik geçişi devre dışı bırakma
      }}
    >
      {SliderData.map((photo, index) => (
        <SwiperSlide className="swiper-slide" key={index}>
          <div className={`absolute inset-0 bg-no-repeat bg-cover `}>
            {" "}
            <img
              src={`${photo.url}`}
              alt="Slider Pictures"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 w-full h-full bg-black/50">
            <div className="container h-[100vh] flex flex-col items-center justify-end">
              <motion.div
                initial={{ opacity: 0, x: "-100vw" }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-end justify-end mb-24">
                  <div className="flex space-x-32 text-white">
                    <div className="slider-circles">
                      <GiKnifeFork size={26} />
                      <span className="mt-2 text-sm">Restaurants</span>
                    </div>
                    <div className="slider-circles">
                      <PiCoffeeLight size={34} />
                      <span className="mt-2 text-sm">Coffees</span>{" "}
                    </div>
                    <div className="slider-circles">
                      <GiKnifeFork size={26} />
                      <span className="mt-2 text-sm">Restaurants</span>{" "}
                    </div>
                    <div className="slider-circles">
                      <GiKnifeFork size={26} />
                      <span className="mt-2 text-sm">Restaurants</span>{" "}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
