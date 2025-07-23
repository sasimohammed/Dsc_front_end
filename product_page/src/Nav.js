import React from 'react'

function Nav() {

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 p-4 border-b border-gray-100">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

                <div
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent cursor-pointer transition-all hover:scale-105">
                    Brocelle
                </div>


                <div className="w-full md:w-1/2 relative">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full border border-gray-200 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm"
                    />
                    <svg
                        className="absolute right-3 top-3 h-6 w-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>


                <div className="flex items-center space-x-4">
                    <button
                        className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all hover:bg-gray-50">
                        <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                        </svg>
                    </button>
                    <button
                        className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all hover:bg-gray-50">
                        <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                    </button>
                    <button
                        className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all hover:bg-gray-50">
                        <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )

}

export default Nav
