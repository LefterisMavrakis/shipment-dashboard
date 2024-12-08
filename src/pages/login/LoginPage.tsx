import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Flex from "../../components/shared/styledFlex";
import { useAuth } from "../../context/auth/hooks/useAuth/useAuth";
import { NavButton } from "../../components/shared/styledCommon";

import "./style.scss";

const BootstrapTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "50px",
  },
}));

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth() || {};

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!!login && login(username, password)) {
      navigate("/");
      return;
    }

    setError("Invalid username or password");
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <Flex
      $flexDirection="column"
      $justifyContent="center"
      className="login-wrapper"
    >
      <form onSubmit={handleSubmit}>
        <Flex $flexDirection="column" $spacingSize="32px">
          <Flex $flexDirection="column" $spacingSize="4px">
            <Typography variant="h5">Login</Typography>
            <Typography color="textDisabled">
              Type your credentials to access dashbord
            </Typography>
          </Flex>

          <Flex $flexDirection="column" $spacingSize="16px">
            <BootstrapTextField
              data-testid="username"
              onChange={handleUsernameChange}
              id="username"
              label="Username"
              variant="outlined"
              error={!!error}
            />

            <BootstrapTextField
              onChange={handlePasswordChange}
              data-testid="password"
              id="pass"
              label="Password"
              variant="outlined"
              type="password"
              error={!!error}
            />

            {!!error && <Typography color="error">{error}</Typography>}
          </Flex>

          <NavButton size="large" type="submit" data-testid="submit">
            <Typography variant="body1" color="inherit">
              Submit
            </Typography>
          </NavButton>
        </Flex>
      </form>
    </Flex>
  );
};

export default LoginPage;
