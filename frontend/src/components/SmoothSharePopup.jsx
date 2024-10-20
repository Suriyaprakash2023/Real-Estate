import React, { useState } from 'react';
import { Share2, X, Facebook, Twitter, Linkedin } from 'lucide-react';

const SmoothSharePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={togglePopup}
        className="text-white hover:text-blue-500 transition-colors duration-300"
      >
        <Share2 size={24} />
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-80 transform transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Share</h3>
              <button onClick={togglePopup} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
                <Facebook className="mr-3 text-blue-600" size={24} />
                <span>Share on Facebook</span>
              </a>
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
                <Twitter className="mr-3 text-blue-400" size={24} />
                <span>Share on Twitter</span>
              </a>
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-200">
                <Linkedin className="mr-3 text-blue-700" size={24} />
                <span>Share on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmoothSharePopup;