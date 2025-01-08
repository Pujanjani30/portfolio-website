import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <div className="text-center">
        <span className="text-lg text-gray-800">
          It may take some time to load as the server is hosted on Render Free Tier.
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="text-xl text-gray-600">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
