import React from 'react';

const CustomBanner = ({routeName}) => {
    return (
        <div className="bg-cover bg-center h-64 flex justify-center items-center sm:w-11/12 w-full mx-auto rounded-xl my-3" style={{ backgroundImage: 'url(/images/hero.png)' }}>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          {routeName}
        </h1>
      </div>
    </div>
    );
};

export default CustomBanner;