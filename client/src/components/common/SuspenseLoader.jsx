import { Box, CircularProgress ,Typography} from "@mui/material";
import { Suspense } from "react"



const SuspenseLoader = () =>{
    return(
       <Box>
             <CircularProgress />
             <Typography>Loading...</Typography>
       </Box>
    )
}
export default SuspenseLoader;