import mongoose from "mongoose";

mongoose.connect("mongodb://Localhost/apijwt",{
   useNewUrlParser: true,
   useUnifiedTopology: true
  // useFindAndModify: true,
  // useCreateIndex: true

   

})
.then(db => console.log('Db esta conectado'))
.catch(error => console.log(error))