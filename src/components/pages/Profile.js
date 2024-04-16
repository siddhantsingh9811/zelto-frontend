const Profile = () => {
  return (
    <div>
      <img
        className="block mx-auto my-auto w-20 h-20 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 object-cover"
        src="key.png"
        alt="Bordered avatar"
      />

      <div className="px-1 py-5 sm:px-6 text-center">
        <h3 className="text-xl leading-6 font-bold text-gray-900">
          User Profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          This is some information about the user.
        </p>
      </div>
      <div className="border-t border-gray-200 py-5 sm:p-0 ml-10">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              johndoe@example.com
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              (123) 456-7890
            </dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              123 Main St
              <br />
              Anytown, USA 12345
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex justify-evenly">
    <form action="#" className="relative h-32 w-20 mb-10 bg-gray-100 rounded-lg shadow-inner flex ">
        <input type="file" id="file-upload1" className="hidden" />
        <label htmlFor="file-upload" className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer">
            <p className="z-10 text-xs font-light text-center text-gray-500">Drag & Drop your files here</p>
            <svg className="z-10 w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
            </svg>
        </label>
    </form>

    <form action="#" className="relative h-32 w-20 mb-10 bg-gray-100 rounded-lg shadow-inner flex justify-evenly">
        <input type="file" id="file-upload2" className="hidden" />
        <label htmlFor="file-upload2" className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer">
            <p className="z-10 text-xs font-light text-center text-gray-500">Drag & Drop your files here</p>
            <svg className="z-10 w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
            </svg>
        </label>
    </form>

    <form action="#" className="relative h-32 w-20 mb-10 bg-gray-100 rounded-lg shadow-inner flex justify-evenly">
        <input type="file" id="file-upload3" className="hidden" />
        <label htmlFor="file-upload3" className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer">
            <p className="z-10 text-xs font-light text-center text-gray-500">Drag & Drop your files here</p>
            <svg className="z-10 w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
            </svg>
        </label>
    </form>
</div>

    </div>
  );
};

export default Profile;
