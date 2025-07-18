import React from 'react'

const loading = () => {
  return (
    <div className="main-max-width mx-auto padding-x py-9">
         {/* Título */}
      <div className="w-40 h-6 bg-gray-300 rounded-lg mx-auto mb-4 animate-pulse"></div>

      {/* Fila de botones */}
      <div className="flex-center flex-wrap my-6 gap-4">
        <div className="w-[200px] h-[40px] bg-gray-300 rounded-lg animate-pulse"></div>
        <div className="w-[200px] h-[40px] bg-gray-300 rounded-lg animate-pulse"></div>
        <div className="w-[200px] h-[40px] bg-gray-300 rounded-lg animate-pulse"></div>
        <div className="w-[200px] h-[40px] bg-gray-300 rounded-lg animate-pulse"></div>
        <div className="w-[200px] h-[40px] bg-gray-300 rounded-lg animate-pulse"></div>
      </div>

      {/* Filtro central */}

      {/* Cards de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="h-[300px] bg-gray-300 rounded-lg animate-pulse"></div>
        <div className="h-[300px] bg-gray-300 rounded-lg animate-pulse"></div>
        <div className="h-[300px] bg-gray-300 rounded-lg animate-pulse"></div>
        <div className="h-[300px] bg-gray-300 rounded-lg animate-pulse"></div>
      </div>
    </div>
  )
}

export default loading