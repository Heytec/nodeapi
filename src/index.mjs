import express, { request, response } from "express";
import routes from "./routes/index.mjs"
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./utils/constants.mjs";

const app =express();

app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret:"the developer ",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:60000*60,
    }
}))
app.use(routes)


const PORT=process.env.PORT || 3000;

app.get('/',(request,response)=>{
    response.cookie("hello","world",{maxAge:60000})
    response.status(201).send({msg:"Hello"});
})


app.post('/api/auth',(request,response)=>{
    const {body:{username,password}}=request
    const findUser=mockUsers.find((user)=>user.username===username)
    if(!findUser)
      return response.status(401).send({msg:"Bad credentials"})

    if(findUser.password !==password)
      return response.status(401).send({msg:"Bad credentials"})

    request.session.user=findUser;
    return  response.status(200).send(findUser)
})


app.get('/api/auth/status',(request,response)=>{
    return request.session.user ?  response.status(401).send(request.session.user):
    response.status(401).send({msg:"Not authenticated "})

})

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
