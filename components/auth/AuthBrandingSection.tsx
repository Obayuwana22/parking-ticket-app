import { Illustrations } from "@/constants";

export const AuthBrandingSection = () => {
  return (
    <div className="lg:w-1/2 bg-black text-white p-12 hidden lg:flex flex-col justify-between items-center lg:items-start text-center lg:text-left ">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#FACC15] border-2 border-white rounded-xl flex items-center justify-center">
          <span className="text-black font-black text-2xl">P</span>
        </div>
        <h2 className="text-2xl font-black tracking-tighter">PARKDASH</h2>
      </div>

      <div className="py-20">
        <div className="animate-float mb-12 flex justify-center lg:justify-start">
          <Illustrations.ParkingCar />
        </div>
        <h1 className="text-7xl xl:text-8xl font-black tracking-tighter leading-none mb-8">
          SMART
          <br />
          ENFORCE
          <br />
          <span className="text-[#FACC15]">MENT.</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-md font-medium">
          The modern standard for municipal parking logistics and automated
          officer dispatch.
        </p>
      </div>

      <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-zinc-500">
        <span>v2.4.0 Stable</span>
        <span>© 2024 PD Municipal</span>
      </div>
    </div>
  );
};
