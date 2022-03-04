import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import TabPanel from "../TabPanel/TabPanel";

function Auth({ setIsLogged }: any) {
  const [value, setValue] = React.useState(0);
  const [loginFormData, setLoginFormData] = useState<any>({});
  const [registerFormData, setRegisterFormData] = useState<any>({});

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleLoginFieldChange = (event: any) => {
    console.log(event);
    const name = event.target.name;
    const value = event.target.value;
    setLoginFormData((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleRegisterFieldChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setRegisterFormData((prev: any) => ({ ...prev, [name]: value }));
    console.log(registerFormData);
  };
  const handleRegister = () => {
    axios
      .post("http://localhost:80/auth/register", registerFormData)
      .then((response) => {
        document.cookie = `token=${response.data.token}`;
        setIsLogged(true);
      });
  };
  const handleLogin = () => {
    console.log(loginFormData);
    axios
      .post("http://localhost:80/auth/login", loginFormData)
      .then((response) => {
        document.cookie = `token=${response.data.token}`;
        setIsLogged(true);
      });
  };
  return (
    <div className="App">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TextField
          name="username"
          onChange={handleLoginFieldChange}
          id="outlined-basic"
          label="Username"
          variant="outlined"
        />
        <br />
        <TextField
          name="password"
          onChange={handleLoginFieldChange}
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
        />
        <br />
        <Button onClick={handleLogin} variant="contained">
          Login
        </Button>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TextField
          name="username"
          onChange={handleRegisterFieldChange}
          id="outlined-basic"
          label="Username"
          variant="outlined"
        />
        <br />
        <TextField
          name="password"
          onChange={handleRegisterFieldChange}
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
        />
        <br />
        <TextField
          name="passwordConfirm"
          onChange={handleRegisterFieldChange}
          id="outlined-basic"
          label="Password-Confirm"
          type="password"
          variant="outlined"
        />
        <br />
        <Button variant="contained" onClick={handleRegister}>
          Register
        </Button>
      </TabPanel>
    </div>
  );
}

export default Auth;
