"use server";
import Razorpay from "razorpay";
import Payment from "@/app/models/Payment";
import connectDB from "@/app/db/connectDB";
import User from "@/app/models/User";


export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();
  let user = await User.findOne({username: to_username})
  const secret = user.razorpaysecret
  var instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: secret,
  });

  instance.orders.create({
    amount: amount,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  }

  let x = await instance.orders.create(options)
cd 
  await Payment.create({
    oid: x.id,
    amount: amount/100,
    to_user: to_username,
    paymentform: paymentform,
    name: paymentform.name,
    message: paymentform.message,
  })
  return x; 
}

export const fetchUser = async (username) => {
  await connectDB()
  let u = await User.findOne({username: username}).lean()
  // let user = u.toObject({flattenObjectIds: true})
  return u
}

export const fetchPayments = async (username) => {
  await connectDB()
  //find all payment sorted by decreasing order of amount
  let p = await Payment.find({to_user: username , done:true}).sort({amount: -1}).limit(10).lean()
  return p 
}

export const updateProfile = async (data , oldusername) => {
    await connectDB()
    let ndata = Object.fromEntries(data)
    // if username is being updated check if user is available 
    if(oldusername !== ndata.username) { 
      let u = await User.findOne({username: ndata.username})
      if(u) {
        return { error: "username already exists"}
      }
      await User.updateOne({email: ndata.email}, ndata)
      await Payment.updateMany({to_user: oldusername} , {to_user: ndata.username})

    }
    else{
      await User.updateOne({email: ndata.email}, ndata)
    }
}