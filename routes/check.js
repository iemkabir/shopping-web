const router = require("express").Router();

router.post("/login", (req, res)=>{
    res.send("hello");
    console.log("hello");
})

module.exports = router;

// {
//     email: req.body.email,
//     ProductName:req.body.ProductName,
//     Description:req.body.Description,
//     price:req.body.price,
//     Quantity: req.body.Quantity,
//     BillingAddres: [
//         {

//             FullName: req.body.FullName,
//             Locality: req.body.Locality,
//             Address: req.body.Address,
//             Pincode: req.body.Pincode,
//             PhoneNumber: req.body.PhoneNumber,
//             City: req.body.City,
//             State: req.body.State
//     }
//     ]
// }