import { Router } from "express";


const router =Router();


router.get('/api/products',(request,response)=>{
    console.log(request.headers.cookie)
    console.log(request.cookies)
   
    response.status(201).send(
        {id:1,name:"chcickenbreast",price:499},
        {id:2,name:"chcickenbreast",price:499},
        {id:3,name:"chcickenbreast",price:499}
        
        )

})



export default router 

