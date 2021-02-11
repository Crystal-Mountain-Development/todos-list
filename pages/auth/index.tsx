import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  KeyboardEvent,
} from "react";
import Head from "next/head";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import AuthLogo from "../../components/AuthLogo";

const SIGNIN = gql`
  mutation emailValidation($email: String!, $token: String!) {
    emailValidation(email: $email, token: $token) {
      authorization
    }
  }
`;

const SEND_SIGNIN_TOKEN = gql`
  mutation resendEmailValidation($email: String!) {
    resendEmailValidation(email: $email) {
      message
      token
    }
  }
`;

const SEND_LOGIN_TOKEN = gql`
  mutation sendAuthToken($email: String!) {
    sendAuthToken(email: $email) {
      message
      token
    }
  }
`;

const LOGIN = gql`
  mutation login($email: String!, $token: String!) {
    login(email: $email, token: $token) {
      authorization
    }
  }
`;

const IndexPage = () => {
  const router = useRouter();

  const inputTokenRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(6).fill(null)
  );

  const [isButtonEnable, setIsButtonEnable] = useState(false);
  const [inputToken, setInputToken] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogText, setDialogText] = useState("");

  const [login] = useMutation(LOGIN);
  const [verifyEmail] = useMutation(SIGNIN);
  const [sendSignToken] = useMutation(SEND_SIGNIN_TOKEN);
  const [sendLoginToken] = useMutation(SEND_LOGIN_TOKEN);

  const isTokenCorrect = useMemo(() => {
    return inputToken.length === 6;
  }, [inputToken]);

  const verification = useCallback(() => {
    //if is new user
    if (router.query.isRegister==="true") {
      verificationLogIn();
      return;
    }

    try {
      const userEmail = router.query.email;
      (async function () {
        try {
          await verifyEmail({
            variables: { email: userEmail, token: inputToken },
          });
          router.push("/lists");
        } catch (e) {
          dialogMessage(e.message);
          handleClickOpen();
          clean();
        }
      })();
    } catch {
      dialogMessage("Fail to verify token, please try in 5 minutes");
      handleClickOpen();
    }
  }, [inputToken]);

  const verificationLogIn = useCallback(() => {
    //if is old user
    try {
      const userEmail = router.query.email;
      (async function () {
        try {
          await login({
            variables: { email: userEmail, token: inputToken },
          });
          router.push("/lists");
        } catch (e) {
          dialogMessage(e.message);
          handleClickOpen();
          clean();
        }
      })();
    } catch {
      dialogMessage("Fail to verify token, please try in 5 minutes");
      handleClickOpen();
    }
  }, [inputToken]);

  const ReSendToken = useCallback(() => {
    if (router.query.isRegister==="true") {
      SendLogToken();
      return;
    }

    const userEmail = router.query.email;
    (async function () {
      try {
        await sendSignToken({
          variables: { email: userEmail },
        });
        dialogMessage("The token has be resented again");
        handleClickOpen();
        timeout();
      } catch {
        dialogMessage("Fail to re-send the token, please try again");
        handleClickOpen();
      }
    })();
  }, []);

  const SendLogToken = useCallback(() => {
    const userEmail = router.query.email;
    (async function () {
      try {
        await sendLoginToken({
          variables: { email: userEmail },
        });
        dialogMessage("The token has be resented again");
        handleClickOpen();
        timeout();
      } catch {
        dialogMessage("Fail to re-send the token, please try again");
        handleClickOpen();
      }
    })();
  }, []);

  const onKeyDownNext = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    if (e.key === "Backspace") {
      target.value = "";
      const IndexOfKey = inputTokenRefs.current.findIndex(
        (x) => x === e.target
      );
      inputTokenRefs.current[IndexOfKey - 1]?.focus();
    }

    if (/\d/.test(e.key)) {
      const IndexOfKey = inputTokenRefs.current.findIndex(
        (x) => x === e.target
      );
      target.value = key;
      inputTokenRefs.current[IndexOfKey + 1]?.focus();
    }
    onInputTokens();
    e.preventDefault();
  }, []);

  const clean = useCallback(() => {
    inputTokenRefs.current.forEach((x) => {
      if (!x) return;
      x.value = "";
    });
  }, []);

  const onInputTokens = useCallback(() => {
    setInputToken(
      inputTokenRefs.current
        .map((x) => {
          if (x) return x.value;
        })
        .join("")
    );
  }, []);

  const timeout = useCallback(() => {
    setIsButtonEnable(true);
    setTimeout(function () {
      setIsButtonEnable(false);
    }, 1000 * 25);
  }, []);

  const handleClickOpen = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleClickClose = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const dialogMessage = useCallback((t) => {
    setDialogText(t);
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Container maxWidth="xs">
        <Box
          position="relative"
          display="flex"
          flexDirection="column"
          height="100vh"
          py={3}
        >
          <Box height="40%">
            <Button onClick={() => router.push("/")}>{"< Back"}</Button>
            <Typography variant="h4" component="h4">
              We have sent you an email
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" component="h5" align="center">
              Enter the token
            </Typography>

            <AuthLogo
              style={{
                left: "38%",
                top: 227,
                opacity: 0.6,
                position: "absolute",
              }}
            ></AuthLogo>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box
              position="relative"
              display="flex"
              flexDirection="row"
              justifyContent="center"
            >
              <TextField
                onInput={onInputTokens}
                onKeyDown={onKeyDownNext}
                inputRef={(ref) => (inputTokenRefs.current[0] = ref)}
                id="token-one"
                name="user-email"
                variant="filled"
                margin="dense"
                inputProps={{ maxLength: 1 }}
                style={{
                  width: 43,
                  marginLeft: 14,
                }}
              />

              <TextField
                onInput={onInputTokens}
                inputRef={(ref) => (inputTokenRefs.current[1] = ref)}
                onKeyDown={onKeyDownNext}
                id="token-two"
                name="user-name"
                variant="filled"
                margin="dense"
                inputProps={{ maxLength: 1 }}
                style={{
                  width: 43,
                  marginLeft: 14,
                }}
              />

              <TextField
                onInput={onInputTokens}
                onKeyDown={onKeyDownNext}
                inputRef={(ref) => (inputTokenRefs.current[2] = ref)}
                id="token-three"
                name="user-email"
                variant="filled"
                margin="dense"
                inputProps={{ maxLength: 1 }}
                style={{
                  width: 43,
                  marginLeft: 14,
                }}
              />

              <TextField
                onInput={onInputTokens}
                onKeyDown={onKeyDownNext}
                inputRef={(ref) => (inputTokenRefs.current[3] = ref)}
                id="token-four"
                name="user-name"
                variant="filled"
                margin="dense"
                inputProps={{ maxLength: 1 }}
                style={{
                  width: 43,
                  marginLeft: 14,
                }}
              />

              <TextField
                onInput={onInputTokens}
                onKeyDown={onKeyDownNext}
                inputRef={(ref) => (inputTokenRefs.current[4] = ref)}
                id="token-five"
                name="user-email"
                variant="filled"
                margin="dense"
                inputProps={{ maxLength: 1 }}
                style={{
                  width: 43,
                  marginLeft: 14,
                }}
              />

              <TextField
                onInput={onInputTokens}
                onKeyDown={onKeyDownNext}
                inputRef={(ref) => (inputTokenRefs.current[5] = ref)}
                id="token-six"
                name="user-name"
                variant="filled"
                margin="dense"
                inputProps={{ maxLength: 1 }}
                style={{
                  width: 43,
                  marginLeft: 14,
                }}
              />
            </Box>
            <Button
              disabled={isButtonEnable}
              onClick={ReSendToken}
              type="submit"
              variant="text"
              color="primary"
              size="large"
              fullWidth
            >
              RESEND THE TOKEN
            </Button>
            <Dialog open={dialogOpen} onClose={handleClickClose}>
              <DialogTitle>{dialogText}</DialogTitle>
              <DialogActions>
                <Button
                  onClick={handleClickClose}
                  color="primary"
                  variant="contained"
                >
                  Got it
                </Button>
              </DialogActions>
            </Dialog>
          </Box>

          <Box mt={25}>
            <Button
              disabled={!isTokenCorrect}
              onClick={verification}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              VERIFY
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default IndexPage;
