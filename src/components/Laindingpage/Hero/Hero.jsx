import React from "react";
import yellowCar from "../../../assets/website/team.png";
import { Modal } from "@mui/material";

const Hero = ({ onLogin }) => {
  return (
    <div
      className="dark:bg-slate-900 bg-neutral-200
     dark:text-white duration-300 sm:py-2 min-full"
    >
      <div className="container min-h-[620px] flex mt-10 sm:mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
          {/* Image section */}
          <div
            data-aos="zoom-in"
            className="order-1 sm:order-2 relative 
            bg-gradient-to-t from-primary-100
             via-neutral-200 to-neutral-200
              dark:from-primary-100
               dark:via-slate-900 dark:to-slate-900 rounded-2xl p-0"
          >
            <img
              src={yellowCar}
              alt=""
              className="w-full sm:max-w-[180px] md:max-w-[430px] rounded-lg object-cover"
            />
          </div>

          {/* Text section */}
          <div className="space-y-5 order-2 sm:order-1 xl:pr-40 ">
            <h1
              data-aos="fade-up"
              className="text-4xl sm:text-5xl font-semibold"
              style={{ lineHeight: 1.2 }}
            >
              Organiza tu inventario, potencia tu marca con{" "}
              <span className="text-primary">InventarioPRO</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="300">
              InventarioPRO es tu solución definitiva para gestionar inventarios
              de manera eficiente. Organiza, controla y optimiza tus productos
              con facilidad, asegurando una administración ágil y precisa para
              tu negocio.
            </p>
            <button
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-offset="0"
              className="primary-btn  "
              onClick={() => onLogin(true)}
            >
              Empezar ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
