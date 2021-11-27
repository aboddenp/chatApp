import React from "react"
import { useAuth } from "../utils/authentication";
import Button from "@mui/material/Button"
import { useNavigate } from "react-router";

const Home = () => {
    let auth = useAuth();
    let navigate = useNavigate();
    return <div>
        <h1>Welcome to the Home page {auth.user}</h1>
        <Button
            onClick={() => {
                auth.signout(() => navigate("/"));
            }}
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              logout 
            </Button>
    </div>
}

export default Home;