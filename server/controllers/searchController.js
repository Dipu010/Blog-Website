import { User } from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";

export const SearchName = asyncHandler(async (req, res) => {
  const { nameToSearch } = req.body;
  var flag = 0;
  for (let i = 0; i < nameToSearch.length; i++) {
    if (nameToSearch[i] === " ") {
      flag = 1;
    }
  }
  var parts;
  if (flag) {
    parts = nameToSearch.split(" ");
  }
  var data1;
  if (!flag) {
    data1 = await User.aggregate([
      {
        $match: {
          firstName: {
            $regex: new RegExp("^" + nameToSearch, "i"),
          },
        },
      },
    ]);
  } else {
    data1 = await User.aggregate([
      {
        $match: {
          firstName: {
            $regex: new RegExp("^" + parts[0], "i"),
          },
        },
      },
      {
        $match: {
          lastName: {
            $regex: new RegExp("^" + parts[1], "i"),
          },
        },
      },
    ]);
  }

  const data2 = await User.aggregate([
    {
      $match: {
        userName: {
          $regex: new RegExp("^" + nameToSearch, "i"),
        },
      },
    },
  ]);

  let map = new Map();
  for (let x of data1) {
    if (!map.has(x._id)) {
      map[x._id] = x;
    }
  }
  for (let x of data2) {
    if (!map.has(x._id)) {
      map[x._id] = x;
    }
  }

  var response = [];
  for (let i in map) {
    response.push(map[i]);
  }

  return res
    .status(200)
    .json(new apiResponse(200, { response }, "users found"));
})
