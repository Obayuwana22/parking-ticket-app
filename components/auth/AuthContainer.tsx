interface AuthContainerProps {
  children: React.ReactNode;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  return (
    <div className="lg:w-1/2 p-6 md:p-12 flex items-center justify-center h-screen">
      <div className="max-w-md w-full">
        <div className="bg-white border-4 border-black p-8 md:p-12 neo-shadow-lg rounded-[2.5rem] relative transition-all duration-300">
          {children}

          <div className="mt-10 p-4 bg-zinc-50 rounded-xl border-2 border-dashed border-zinc-200">
            <p className="text-[10px] font-black text-zinc-400 uppercase leading-loose text-center">
              Secure login session provided by PD Municipal Network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
