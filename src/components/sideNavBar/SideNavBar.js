/* eslint-disable */
import { Drawer, Box, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import React, { useState } from "react";
import './SideNavBar.css';

const SideNavBar = () =>{
    const [openSideBar, setOpenSideBar] = useState(false);
    return (
        <>
        <SettingsIcon className="setting-icon" onClick={()=> setOpenSideBar(true)}></SettingsIcon>
        <Drawer anchor="right" open={openSideBar} onClose={()=> setOpenSideBar(false)} >
            <Box p={2} width='300px'>
                <Typography variant="h6" component='div'>
                    <img className="side-nav-profile" src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg"></img>
                </Typography>
                <Typography variant="h6" component='div'>
                    <h1 className="side-nav-name" >Amir Jackson</h1>
                </Typography>
                <Typography variant="h6" component='div'>
                    <p className="side-nav-address" >311 Brickyard sRoad Pikesville, MD 21208</p>
                </Typography>
            </Box>
        </Drawer>
        </>
    )
}
export default SideNavBar;