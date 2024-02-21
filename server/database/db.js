
import mongoose from "mongoose";

const Connection =()=>{
    const DB_URL =`mongodb://kuterushikesh2002:Rushi777@ac-ui6d3t2-shard-00-00.h58v9hp.mongodb.net:27017,ac-ui6d3t2-shard-00-01.h58v9hp.mongodb.net:27017,ac-ui6d3t2-shard-00-02.h58v9hp.mongodb.net:27017/?ssl=true&replicaSet=atlas-sst062-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
      mongoose.connect(DB_URL,{ useNewUrlParser:true});
      console.log('Database connected sucessfully');
    }catch(error){
        console.log('Error while connecting with the database',error.message);
    }
}

export default Connection;