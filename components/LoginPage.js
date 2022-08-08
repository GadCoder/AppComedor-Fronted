import {
  Container,
  Stack,
  TextField,
  Button,
  Alert,
  Collapse,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Head from "next/head";
import styles from "/components/login.module.css";
import { useState } from "react";
import { loginInPage } from "../api/login";
import { StyledEngineProvider } from "@mui/material/styles";

export default function LoginPage() {
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email.length === 0 || password.length === 0) {
      setShowLoginAlert(true);
      setLoginErrorMessage("Por favor ingrese su correo y contraseña");
      return;
    }

    loginInPage(email, password).then((response) => {
      if (!response.ok) {
        console.log("error");
        setLoginErrorMessage("Por favor ingrese un correo y contraseña válido");
        setShowLoginAlert(true);
      } else {
        console.log("Ganamos");
      }
    });
  };

  return (
    <StyledEngineProvider injectFirst>
      <div className={styles.mainContainer}>
        <Head>
          <title>ComedorUNMSM</title>
        </Head>
        <Container fixed className={styles.loginContainer}>
          <Stack spacing={4}>
            <Stack spacing={0.1}>
              <h1 className={styles.centerText}>Comedor UNMSM</h1>
              <h2 className={styles.centerText}>Administración</h2>
            </Stack>
            <Stack spacing={3} className={styles.fieldsContainer}>
              <h3>Inicio de sesión</h3>
              <Stack spacing={1}>
                <Collapse
                  styles={!showLoginAlert ? { visiblity: "hidden" } : null}
                  in={showLoginAlert}
                >
                  <Alert
                    severity="error"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setShowLoginAlert(!showLoginAlert);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    {loginErrorMessage}
                  </Alert>
                </Collapse>
                <Stack>
                  <p>Correo</p>
                  <TextField
                    id="email"
                    label="admin@unmsm.edu.pe"
                    size="Normal"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </Stack>
                <Stack>
                  <p>Contraseña</p>
                  <TextField
                    id="password"
                    label="Ingrese su contraseña"
                    type="password"
                    autoComplete="current-password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </Stack>

                <a>
                  <h5 className={styles.rightText}>¿Olvidó su contraseña?</h5>
                </a>
                <Button
                  variant="contained"
                  className="button"
                  onClick={handleLogin}
                >
                  Iniciar sesión
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </div>
    </StyledEngineProvider>
  );
}
