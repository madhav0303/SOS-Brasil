import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";

import SimpleBackdrop from "../../components/SimpleBackdrop";
import NotifSnackbar from "../../components/NotifSnackbar";

import { LoginContainer } from "./components/LoginContainer";
import { LoginInput } from "./components/LoginInput";
import { LoginButton } from "./components/LoginButton";
import { LoginAvatar } from "./components/LoginAvatar";

import * as Session from "../../controllers/SessionController";

import {
  Box,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      email: "",
      pswd: "",
      rememberMe: false,
      isLoading: false,
      toast: {
        isOpen: false,
        message: "",
        severity: "success",
      },
    };
  }

  handleChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleRememberMe = (ev) => {
    this.setState({ [ev.target.name]: ev.target.checked });
  };

  handleSubmit = async (ev) => {
    try {
      ev.preventDefault();

      this.setState({ isLoading: true });

      const payload = {
        email: this.state.email,
        password: this.state.pswd,
      };

      const token = await Session.login(payload).catch((error) => {
        this.setState({
          isLoading: false,
          toast: { isOpen: true, message: error, severity: "warning" },
        });
      });

      if (token) {
        this.setState({ isLoading: false });
        console.log(token);
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        toast: { isOpen: true, message: error, severity: "warning" },
      });
    }
  };

  handleSnackClose = () => {
    this.setState({
      toast: {
        isOpen: false,
        message: "",
        severity: "success",
      },
    });
  };

  render() {
    return (
      <div className="login">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              color="white"
              m="20px"
            >
              <LoginAvatar />
              <Typography variant="h4" component="h1">
                SOS Brasil
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <LoginContainer maxWidth="sm">
              <form onSubmit={this.handleSubmit}>
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ fontWeight: "bolder", marginBottom: 20 }}
                >
                  Área do Operador
                </Typography>

                <LoginInput
                  placeholder="Email"
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                />
                <LoginInput
                  placeholder="Senha"
                  name="pswd"
                  type="password"
                  onChange={this.handleChange}
                />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<RadioButtonUncheckedRoundedIcon />}
                        checkedIcon={<CheckCircleOutlineRoundedIcon />}
                        onChange={this.handleRememberMe}
                        name="rememberMe"
                        color="default"
                      />
                    }
                    label="Lembre-se de mim"
                  />
                  <NavLink
                    to="/about"
                    style={{
                      color: "black",
                      textDecoration: "none",
                      fontSize: 16,
                    }}
                  >
                    Esqueceu a senha?
                  </NavLink>
                </Box>

                <LoginButton>Entrar</LoginButton>
              </form>
            </LoginContainer>
          </Grid>
        </Grid>

        <SimpleBackdrop open={this.state.isLoading} />

        <NotifSnackbar
          open={this.state.toast.isOpen}
          onClose={this.handleSnackClose}
          message={this.state.toast.message}
          severity={this.state.toast.severity}
        />
      </div>
    );
  }
}
