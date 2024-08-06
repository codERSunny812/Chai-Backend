import {connectDB} from './db/Dbconnect'
import app from './app'

dotenv.config({
    path:"./env"
})

const PORT = process.env.PORT || 9800

connectDB();

//import the routes 

import userRoutes from './routes/userRoutes'


// route utilization 
app.use('/api/v1/users', userRoutes);

app.get('/',(req,res)=>{
    res.send("<h1>helllo</h1>")
})



app.listen(PORT,()=>{
    console.log("server is running")
});