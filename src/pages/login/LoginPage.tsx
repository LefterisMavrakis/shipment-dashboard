import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Flex from "../../components/shared/styledFlex";
import { useAuth } from "../../context/auth/hooks/useAuth/useAuth";

import "./style.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth() || {};

  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (!!login && login(username, password)) {
      navigate("/");
      return;
    }

    setError("Invalid username or password");
  };

  return (
    <Flex
      flexDirection="column"
      spacingSize="16px"
      className="login-wrapper"
      justifyContent="center"
    >
      <Typography variant="h4">Login</Typography>
      <Typography color="textDisabled">
        Type your credentials to access dashbord
      </Typography>

      <TextField
        onChange={handleUsernameChange}
        id="outlined-basic"
        label="Username"
        variant="outlined"
        error={!!error}
      />

      <TextField
        onChange={handlePasswordChange}
        id="outlined-basic"
        label="Password"
        variant="outlined"
        error={!!error}
      />

      {!!error && <Typography color="error">{error}</Typography>}

      <Button
        size="large"
        onClick={handleSubmit}
        variant="contained"
        disableElevation
      >
        submit
      </Button>
    </Flex>
  );
};

export default LoginPage;
