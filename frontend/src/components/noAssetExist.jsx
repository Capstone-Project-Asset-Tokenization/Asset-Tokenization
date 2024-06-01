import React from "react";

function NoAssetExist() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 border border-gray-600 p-8 rounded-lg shadow-lg max-w-md text-center text-white">
        <p className="text-3xl font-bold mb-4">Oops!</p>
        <p className="text-lg mb-8">It seems there are no assets available.</p>
        <p className="text-sm text-gray-400">
          Don't worry, you can always add some!
        </p>
      </div>
    </div>
  );
}

export default NoAssetExist;
