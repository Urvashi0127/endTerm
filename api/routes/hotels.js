
import express from "express"
import Hotel from "../models/Hotels.js"
import createError from "../utils/error.js"
import {createHotel,updateHotel,getHotel,deleteHotel,getAllHotel,countByCity,countByType} from "../controllers/hotel.js"
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

// CREATE
router.post("/",verifyAdmin,createHotel)


// UPDATE 

router.put("/:id",verifyAdmin,updateHotel)

// DELETE 

router.delete("/:id",verifyAdmin,deleteHotel
   );

// GET 

router.get("/find/:id",getHotel)
// router.get("/:id",getHotel)

// GET ALL

router.get("/",getAllHotel)

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
// router.get("/room/:id", getHotelRooms);

export default router;
