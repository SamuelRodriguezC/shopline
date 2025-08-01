import React from 'react'

const loading = () => {
  return (
    <div className="bg-gray-50 padding-x py-10 flex items-start flex-wrap gap-12 main-max-width mx-auto animate-pulse">

        <div className="w-[350px] h-[400px] relative overflow-hidden rounded-lg shadow-sm border border-gray-200 bg-gray-300 "></div>

        <div className="flex flex-1 flex-col max-w-[500px] max-md:w-full gap-6">
            <div className="flex flex-col gap-3">
                <div className="h-8 w-3/4 bg-gray-200 rounded-md"></div>
                <div className="h-8 w-1/4 bg-gray-200 rounded-md "></div>
            </div>

            <div className="">
                <div className="h-5 w-1/5 bg-gray-200 rounded mb-3"></div>
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-[90%] bg-gray-200 rounded"></div>
                        <div className="h-4 w-[85%] bg-gray-200 rounded"></div>
                        <div className="h-4 w-[95%] bg-gray-200 rounded"></div>
                </div>
            </div>

            <div className="flex py-3 items-center gap-4 flex-wrap">
                <div className="w-[200px] max-md:w-full h-[42px] bg-gray-200 rounded-md"></div>
                <div className="w-[200px] max-md:w-full h-[42px] bg-gray-200 rounded-md"></div>
            </div>

        </div>

    </div>
  )
}

export default loading