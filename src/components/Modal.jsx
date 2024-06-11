import React from "react"
import { IoClose } from "react-icons/io5";

function Modal( ) {




    return (
        <main className="py-14">
           <div>
             <button><IoClose /></button> 
           
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
                    
                    <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="space-y-5"
                        >
                            <div>
                                <label className="font-medium">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                           
                            <div>
                            <label className="font-medium">
                                    Recordings
                                </label>

                            <label for="small-file-input" class="sr-only ">
                                Choose file
                               </label>
                              <input
                                type="file"
                                 name="small-file-input"
                                   id="small-file-input"
                                  className="block w-full border  shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                                                file:bg-[#779393] file:border-0 file:me-4 file:py-2 file:px-4"
                                            />
                             </div> 
                            <div>
                            <label className="font-medium">
                                    Image
                                </label>

                            <label for="small-file-input" class="sr-only ">
                                Choose file
                               </label>
                              <input
                                type="file"
                                 name="small-file-input"
                                   id="small-file-input"
                                  className="block w-full border  shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                                                file:bg-[#779393] file:border-0 file:me-4 file:py-2 file:px-4"
                                            />
                             </div>
                            <div>
                                <label className="font-medium">
                                    Description
                                </label>
                                <textarea required className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"></textarea>
                            </div>
                            <button
                                className="w-full bg-[#779393] text-white px-6 py-2 rounded-full hover:bg-[#75b9b9] transition duration-300
                                "
                            >
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </main>
    )
}
export default Modal;