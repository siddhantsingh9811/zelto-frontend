import React from 'react';

const ProfileCard = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full bg-purple-200 flex items-center justify-center mr-4">
            <span className="text-purple-700 font-semibold">JD</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">John Doe</h3>
            <p className="text-gray-600">johndoe@gmail.com</p>
            <p className="text-gray-500 text-sm">123 45 67 89</p>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-gray-700 font-semibold mb-2">Personal Details</h4>
          <div className="flex items-center mb-2">
            <span className="text-gray-600 mr-2">Engaging Contact:</span>
            <span className="text-gray-800">+1 123 456 789</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="text-gray-600 mr-2">Date of Birth:</span>
            <span className="text-gray-800">01/01/1990</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 mr-2">Address:</span>
            <span className="text-gray-800">Something, Somewhere...</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-gray-700 font-semibold mb-2">Documents</h4>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center mr-2">
              <span className="text-red-700">AC</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center mr-2">
              <span className="text-green-700">DL</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center mr-2">
              <span className="text-blue-700">ID</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-gray-700 font-semibold mb-2">Payment Details</h4>
          <button className="bg-gray-200 text-gray-700 rounded-full px-4 py-2">
            Add Payment
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return <ProfileCard />;
};

export default App;
