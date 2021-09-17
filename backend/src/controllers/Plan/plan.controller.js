const pool = require("../../config/database");
const stripe = require("stripe")("sk_test_51JMFq1DvKMV2PeDrWj4Do6RYiFFBxdUD26gAw1mOr61sreZTBres2Ns0QJST1I1AZvKudGIqDg4iCLyazRcFPsTu00zlaLLLfs");
const {v4:uuid} = require("uuid")
const nodemalier = require('../../middleware/nodemalier');

exports.addPayment = async (req, res) => {
    console.log("Product add"); 
    const {product,category,token} = req.body;
     console.log("Product add",product);
  //  console.log("Product add",token);
  const user = await pool.query("SELECT * from membership WHERE cid = $1",[product.cid])  

  if(user.rows.length !== 0){
//    let status = 1;
    var datetime = new Date()
    let catgory1 = ['technician','plant','0']
   const { rows } = await pool.query(
       "UPDATE membership SET title=$1,category=$2,mtime=$3 where cid=$4",[product.name,catgory1,datetime,product.cid]
   );
    
   res.status(201).send({
     message: "Post added successfully!",
   }); 
  }else{
   let status = 1;
   let datetime = new Date()
   let catgory1 = ['A','B']
  const { rows } = await pool.query(
    "INSERT INTO membership (cid,title, category, mtime, status) VALUES ($1, $2, $3, $4, $5)",
     [product.cid,product.name,catgory1,datetime,status]
  );
   
  res.status(201).send({
    message: "Post added successfully!",
  });
 }
 datetime.setDate(datetime.getDate() + 30);
 datetime.setHours(23);
 datetime.setMinutes(59);
 datetime.setSeconds(59);
 
 //console.log(data);


 nodemalier.Payment(
    datetime,
    token.email,
);
   const idempontencKey = uuid()

    return await stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(customer =>{
        stripe.charges.create({
            amount:product.price * 100 ,
            currency:'usd',
            customer:customer.id,
            receipt_email:token.email,
            description: `purchase of ${product.name}`,
            shipping:{
                name:token.card.name,
                address:{
                country:token.card.address_country
            }
            }

        },{idempontencKey}) 
        res.redirect('http://localhost:3000/client')
    }).then( 
       
         
    )
     // .catch(err => console.log(err)) 
  };