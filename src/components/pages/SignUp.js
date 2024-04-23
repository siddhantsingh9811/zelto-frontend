import React, {useState} from 'react'


function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    
    return (
        
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            
              <h2 className="mt-10 text-center text-2xl leading-9 tracking-tight  text-gray-900">
                Create Zelto Account
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email 
                  </label>
                  <div className="mt-2 flex">
                  <img src="frame.png" alt="key" className="h-5 w-5 mr-2 mt-2" />
                    <input
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="mt-2 flex">
                  <img src="key.png" alt="key" className="h-5 w-5 mr-2 mt-2" />
                    <input
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
                    Phone Number 
                  </label>
                  <div className="mt-2 flex">
                  <img src="frame.png" alt="key" className="h-5 w-5 mr-2 mt-2" />
                    <input
                      id="number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      name="number"
                      type="number"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                
                    
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-3xl bg-[#755CEC] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Create Account
                  </button>
                </div>
                
                
              </form>
    
              <p className="mt-10 text-center text-sm text-gray-500">
                Already a member?{' '}
                <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Sign In
                </a>
              </p>
            </div>
          </div>

          
      );}
export default SignUp