import { CircularProgress } from "@mui/material"
import classes from "./Loader.module.css"

const Loader = () => {
    return <div className={classes.container}>
        <CircularProgress size={"2rem"} color="inherit" style={{color: "#fff"}}/>
    </div>
}
export default Loader