import React from "react";
import adminLogo from "../../../assets/admin.jpeg";

const FamousUsers = () => {
  const arr = [1, 2, 3, 4, , 5, 6, 7, 8];
  return (
    <div className="overflow-x-auto h-full w-full text-gray-300 bg-[#1b232d] rounded-lg p-2">
      <div className=" text-3xl font-bold text-center mb-5 text-gray-300">
        {" "}
        Famous Users
      </div>
      <table className="table w-full mx-auto">
        {/* head */}
        <thead>
          <tr>
            <th className="py-2 text-left">Name</th>
            <th className="py-2 text-left">Username</th>
            <th className="py-2 text-left">Followers</th>
            <th className="py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr className="my-4  rounded-lg">
            {" "}
            {/* Increased margin between rows */}
            <td className="py-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 overflow-hidden rounded-full">
                  <img
                    src={adminLogo}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-0">
                  <div className="font-bold">Hart Hagerty</div>
                </div>
              </div>
            </td>
            <td className="py-2">
              <div>
                <span className="badge badge-ghost badge-sm">Username</span>
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
                  <img
                    src={adminLogo}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold">Brice Swyre</div>
                  <div className="text-sm opacity-50">China</div>
                </div>
              </div>
            </td>
            <td className="py-2">
              <div>
                <span className="badge badge-ghost badge-sm">Username</span>
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
                  <img
                    src={adminLogo}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold">Marjy Ferencz</div>
                  <div className="text-sm opacity-50">Russia</div>
                </div>
              </div>
            </td>
            <td className="py-2">
              <div>
                <span className="badge badge-ghost badge-sm">Username</span>
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
                  <img
                    src={adminLogo}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold">Yancy Tear</div>
                  <div className="text-sm opacity-50">Brazil</div>
                </div>
              </div>
            </td>
            <td className="py-2">
              <div>
                <span className="badge badge-ghost badge-sm">Username</span>
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
