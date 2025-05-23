import express from "express";
import { routes } from "./routes";
import { errorHandler } from "./middlewares/error-handler";

const port = 3333
const app = express()
app.use(express.json())
app.use(routes)


app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})