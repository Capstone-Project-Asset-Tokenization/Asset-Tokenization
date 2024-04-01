import mongoose from "mongoose";

export const ConnectionDB=async ()=>{
    
    await mongoose.connect(process.env.DATABASE_URL).then(()=>console.log("Database successfully connected..")).catch(err=>console.log(err))}
