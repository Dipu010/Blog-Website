import React from 'react'

const TableItem = () => {
  return (
    <div className="my-4  rounded-lg"> {/* Increased margin between rows */}
            
            <div className="py-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 overflow-hidden rounded-full">
                  <img src={adminLogo} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="ml-0">
                  <div className="font-bold">Hart Hagerty</div>
                  
                </div>
              </div>
            </div>
            <div className="py-2">
              <div>
                <span className="badge badge-ghost badge-sm">Username</span>
              </div>
            </div>
            <div className="py-2">Purple</div>
            <div className="py-2">
              <button className="btn btn-ghost btn-xs">details</button>
            </div>
          </div>
  )
}

export default table-item