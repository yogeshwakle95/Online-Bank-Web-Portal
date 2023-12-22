const newSchema11 = require("../Model/userAccountModel");
var ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');

const userAccount_all = async (req, res) => {
  try {
    const requests = await newSchema11.find();
    res.json(requests);
  } catch {
    res.json({ message: error });
  }
};

const userAccount_get_one = async (req, res) => {
  try {
    const requests = await newSchema11.findById(req.params.id);
    res.json(requests);
  } catch {
    res.json({ message: error });
  }
}
const search_userAccount_all = async (req, res) => {
  try {
    let userId;
    // Check if the key is a valid ObjectId string
    if (mongoose.isValidObjectId(req.params.key)) {
      userId = mongoose.Types.ObjectId(req.params.key);
    } else {
      userId = req.params.key;
    }
    const requests = await newSchema11.find({
      $or: [
        { userId: userId },
      ],
    });
    res.send(requests);
  } catch (error) {
    res.json({ message: error });
  }
};


const join_data = async (req, res) => {
  const searchTerm = req.params.searchTerm;
  //var oUserId=new ObjectId(searchTerm);
  try {
     
    
    const results = await newSchema11.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $match: {
          $or: [
            { "userData.first_name": { $regex: searchTerm, $options: "i" } },
            { "userData.last_name": { $regex: searchTerm, $options: "i" } },
            { accountnumber: { $regex: searchTerm, $options: "i" } },
            { userId: ObjectId.isValid(searchTerm) ? ObjectId(searchTerm) : null }
           
            //{ userId: {$regex:oUserId,$options:"i"} },

          ],
        },
      },
    ]);

    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const adminUserDataAll = async (req, res) => {
  try {
     
    
    const results = await newSchema11.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userData",
        },
      },
     
    ]);

    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const userAccount_post = async (req, res) => {
  const { accounttype, userId, accountnumber } = req.body;

  const account = await newSchema11.create({
    userId,
    accounttype,
    accountnumber,
  });

  res.status(201).json({
    success: true,
    account,
  });
};

const updateUserAccount = async (req, res) => {
  const objectId = (req.params.id).split("-");

  try {
    const requests = await newSchema11.findById(objectId[0]);

    if (req.body.amount) {
      if (objectId[1] == "T") {

        if (requests.amount < req.body.amount) {
          throw new Error("Not enough funds");
        } else {
          requests.amount -= req.body.amount;
        }

      }
      
      else if (objectId[1] == "W") {


        if (requests.amount < req.body.amount) {
          throw new Error("Not enough Funds");
        } else {
          requests.amount -= req.body.amount;
        }



      } else if (objectId[1] == "D") {
        requests.amount += req.body.amount;
      }
    }

    const update = await requests.save();
    res.json(update);
  } catch (error) {
    res.json({ message: error.message });
  }
};


module.exports = {
  userAccount_all,
  userAccount_get_one,
  search_userAccount_all,
  userAccount_post,
  join_data,
  updateUserAccount,
  adminUserDataAll
};
