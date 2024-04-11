import React from 'react';
import adminLogo from "../../../assets/admin.jpeg";

const FamousUsers = () => {
  return (
    <div className="overflow-x-auto h-full w-full text-white bg-gray-800 rounded-lg">

      <div className=' text-3xl text-bold text-center mb-5'> Famous Users</div>
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            
            <th className="py-2">Name</th>
            <th className="py-2">Job</th>
            <th className="py-2">Favorite Color</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr className="my-4"> {/* Increased margin between rows */}
            
            <td className="py-2">
              <div className="flex items-center">
                <div className="w-12 h-12 overflow-hidden rounded-full">
                  <img src={adminLogo} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="ml-3">
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td className="py-2">
              <div>
                Zemlak, Daniel and Leannon
                <br />
                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
              </div>
            </td>
            <td className="py-2">Purple</td>
            <td className="py-2">
              <button className="btn btn-ghost btn-xs">details</button>
            </td>
          </tr>
          {/* row 2 */}
          <tr className="my-4">
            
            <td className="py-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 overflow-hidden rounded-full">
                  <img src={adminLogo} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold">Brice Swyre</div>
                  <div className="text-sm opacity-50">China</div>
                </div>
              </div>
            </td>
            <td className="py-2">
              <div>
                Carroll Group
                <br />
                <span className="badge badge-ghost badge-sm">Tax Accountant</span>
              </div>
            </td>
            <td className="py-2">Red</td>
            <td className="py-2">
              <button className="btn btn-ghost btn-xs">details</button>
            </td>
          </tr>
          {/* row 3 */}
          <tr className="my-4">
           
            <td className="py-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 overflow-hidden rounded-full">
                  <img src={adminLogo} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold">Marjy Ferencz</div>
                  <div className="text-sm opacity-50">Russia</div>
                </div>
              </div>
            </td>
            <td className="py-2">
              <div>
                Rowe-Schoen
                <br />
                <span className="badge badge-ghost badge-sm">Office Assistant I</span>
              </div>
            </td>
            <td className="py-2">Crimson</td>
            <td className="py-2">
              <button className="btn btn-ghost btn-xs">details</button>
            </td>
          </tr>
          {/* row 4 */}
          <tr className="my-4">
            
            <td className="py-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 overflow-hidden rounded-full">
                  <img src={adminLogo} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold">Yancy Tear</div>
                  <div className="text-sm opacity-50">Brazil</div>
                </div>
              </div>
            </td>
            <td className="py-2">
              <div>
                Wyman-Ledner
                <br />
                <span className="badge badge-ghost badge-sm">Community Outreach Specialist</span>
              </div>
            </td>
            <td className="py-2">Indigo</td>
            <td className="py-2">
              <button className="btn btn-ghost btn-xs">details</button>
            </td>
          </tr>
        </tbody>
        {/* foot */}
       
      </table>
    </div>
  );
};

export default FamousUsers;
