import React from 'react';

const Loader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center px-4 py-12">
      {/* <h2 className="text-2xl font-semibold text-gray-700 mb-8 animate-pulse">Loading Movies...</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="w-full h-[400px] bg-white rounded-2xl shadow-md animate-pulse flex flex-col"
          >
            <div className="h-64 bg-gray-300 rounded-t-2xl" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
