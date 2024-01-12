import express, { request, response } from "express";
import routes from "./routes/index.mjs"
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./utils/constants.mjs";
import passport from "passport";
import "./strategies/local-strategy.mjs"
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

const app =express();

mongoose
	.connect("mongodb://localhost/express_tutorial")
	.then(() => console.log("Connected to Database"))
	.catch((err) => console.log(`Error: ${err}`));

app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret:"the developer ",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:60000*60,
    },
    store:MongoStore.create({
       client: mongoose.connection.getClient()
    })
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(routes)


const PORT=process.env.PORT || 3000;

app.get('/',(request,response)=>{
    response.cookie("hello","world",{maxAge:60000})
    response.status(201).send({msg:"Hello"});
})


app.post("/api/auth",passport.authenticate("local"),(request,response)=>{
    send
    
})


// app.post('/api/auth',(request,response)=>{
//     const {body:{username,password}}=request
//     const findUser=mockUsers.find((user)=>user.username===username)
//     if(!findUser)
//       return response.status(401).send({msg:"Bad credentials"})

//     if(findUser.password !==password)
//       return response.status(401).send({msg:"Bad credentials"})

//     request.session.user=findUser;
//     return  response.status(200).send(findUser)
// })


// app.get('/api/auth/status',(request,response)=>{
//     return request.session.user ?  response.status(401).send(request.session.user):
//     response.status(401).send({msg:"Not authenticated "})

// })



// app.post("/api/cart",(request,response)=>{
//     if(!request.session.user) return response.sendStatus(401);
//     const {body:item}=request
//     const {cart}=request.session;

//     if(cart){
//         cart.push(item)
//     }else{
//         request.session.cart=[item]
//     }
//     return response.status(201).send(item)
// })

// app.get("/api/cart",(request,response)=>{
//     if(!request.session.user) return response.sendStatus(401);

// })

app.listen(PORT,()=>{
    console.log("Running on Port ${PORT}");
});



// localhost:300

// localhost:3000/users

//localhost:3000/products 

//localhost:3000/products?key=vslue&key2=value2

//put
//patch
//delete
