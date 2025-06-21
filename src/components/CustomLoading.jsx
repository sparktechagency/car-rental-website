
const CustomLoading = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 m-auto border-4 border-transparent border-r-blue-400 rounded-full animate-spin animate-reverse"></div>
      </div>
    </div>
  );
};

export default CustomLoading;