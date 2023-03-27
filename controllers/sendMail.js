import nodemailer from "nodemailer";
let authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiVTJGc2RHVmtYMS8rQWRlTkdzb3pqTHVIeFNXNjRPdlJITktTRGhZcE9scmpjRURBTFIzNlhINHdFdk91QWlnSCIsImlhdCI6MTY3ODg4NDc3MywiZXhwIjoxNjc4ODg1NjczfQ._Hg7u51TMPZDLOm3et-3yiw5YoZbUFSCEA90T6jxMUw";

export const sendMail = async (email, token) => {
  let tranpsorter = nodemailer.createTransport({
    // connect with the smtp

    host: "smtp.ethereal.email",
    port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: "vilma23@ethereal.email",
      pass: "JQWxMZJ2GG5f7MGUKu",
    },
  });

  const info = await tranpsorter.sendMail({
    from: "vilma23@ethereal.email", // sender address
    to: ["adeel.aftab@live.com", "theharisshafi@gmail.com"], // list of receivers
    subject: "For Reset Password", // Subject line
    text: "Hello haris,Here is your reset Password link. ", // plain text body
    html: `<a href=http://localhost:3000/forget-password?token=${token}>  reset your password</a>'`, // html body
  });
  // console.log(
  //   "<p> Hii  " +
  //     "Haris" +
  //     ', Please copy the link and  <a href="http://localhost:3000/forget-password?token=' +
  //     "123456" +
  //     ' ">  reset your password</a>',
  //   info.response
  // );
  // res.json(info);
};
// console.log(mailOption);

// export const forgotPassword = async (req, res) => {
//   try {
//     console.log("reseting password : ", req.body);
//     let query = `select top 1 * from Users where Email='${req.body.email}'`;

//     const data = await Db.getRecord(query);
//     log("data is : ", data);
//     if (data.length > 0) {
//       const token = randomstring.generate();
//       query = `update Users set token = '${token}' where Email='${req.body.email}'`;
//       await Db.insertUpdateDelete(query);
//       // log('token generated : ', token);
//       sendResetPasswordMail(token);
//       res.json({ success: true, payload: token });
//     } else {
//       res.json({
//         success: false,
//         message: "Email Does not exist...",
//       });
//     }
//   } catch (err) {
//     res.json({ success: false, message: "error while reseting password..." });
//   }
// };

// exports.resetPassword = async (req, res) => {
//   try {
//     console.log("updating password password : ", req.params.token);

//     let query = `update Users set password='newdd' where token='${req.params.token}'`;

//     const data = Db.insertUpdateDelete(query);
//     if (data > 0) {
//       res.json({ success: true, payload: "password changed successfully..." });
//     }
//     // console.log('data against token : ', token, 'data is : ', data);
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error });
//   }
// };
