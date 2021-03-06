import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  KeyboardEvent,
  useEffect,
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
  const { email, isRegister: isRegisterQuery } = router.query;
  const isRegister = isRegisterQuery !== "false";

  const inputTokenRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(6).fill(null)
  );

  const [isButtonEnable, setIsButtonEnable] = useState(true);
  const [inputToken, setInputToken] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [clipboard, setClipboard] = useState("");

  const [login, { loading: loginLoading }] = useMutation(LOGIN);
  const [verifyEmail, { loading: verifyEmailLoading }] = useMutation(SIGNIN);
  const [sendSignToken, { loading: sendSignTokenLoading }] = useMutation(
    SEND_SIGNIN_TOKEN
  );
  const [sendLoginToken, { loading: sendLoginTokenLoading }] = useMutation(
    SEND_LOGIN_TOKEN
  );
  const fetching =
    loginLoading ||
    verifyEmailLoading ||
    sendSignTokenLoading ||
    sendLoginTokenLoading;

  const isTokenCorrect = useMemo(() => {
    return inputToken.length === 6;
  }, [inputToken]);

  const loginHandler = useCallback(() => {
    (async function () {
      try {
        await login({
          variables: { email, token: inputToken },
        });
        router.push("/lists");
      } catch (e) {
        setDialogText(e.message);
        cleanToken();
      }
    })();
  }, [inputToken, email]);

  const verifyEmailHandler = useCallback(() => {
    (async function () {
      try {
        await verifyEmail({
          variables: { email, token: inputToken },
        });
        router.push("/lists");
      } catch (e) {
        setDialogText(e.message);
        cleanToken();
      }
    })();
  }, [inputToken, email]);

  const onVerification = useCallback(() => {
    if (isRegister) loginHandler();
    else verifyEmailHandler();
  }, [loginHandler, verifyEmailHandler]);

  const sendLoginTokenHandler = useCallback(() => {
    (async function () {
      try {
        await sendLoginToken({ variables: { email } });
        setDialogText("Token has be resented again");
        cooldownButton();
      } catch {
        setDialogText("Fail to re-send the token, please try again");
      }
    })();
  }, [isRegister, email]);

  const sendSignTokenHandler = useCallback(() => {
    (async function () {
      try {
        await sendSignToken({ variables: { email } });
        setDialogText("The token has be resented again");
        cooldownButton();
      } catch {
        setDialogText("Fail to re-send the token, please try again");
      }
    })();
  }, [clipboard, isRegister, email]);

  const onResentToken = useCallback(() => {
    if (isRegister) sendLoginTokenHandler();
    else sendSignTokenHandler();
  }, [sendLoginTokenHandler, sendSignTokenHandler]);

  const getInputTokenIndex = useCallback(
    (ref: HTMLInputElement) =>
      inputTokenRefs.current.findIndex((x) => x === ref),
    [inputTokenRefs]
  );

  const onKeyDownNext = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    if (e.key === "Backspace") {
      target.value = "";
      const index = getInputTokenIndex(target);
      inputTokenRefs.current[index - 1]?.focus();
    }

    if (/\d/.test(e.key)) {
      const index = getInputTokenIndex(target);
      target.value = key;
      inputTokenRefs.current[index + 1]?.focus();
    }

    onInputTokens();
    e.preventDefault();
  }, []);

  const cleanToken = useCallback(() => {
    inputTokenRefs.current.forEach((x) => {
      if (!x) return;
      x.value = "";
    });
    onInputTokens();
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

  const cooldownButton = useCallback(() => {
    setIsButtonEnable(false);
    setTimeout(function () {
      setIsButtonEnable(true);
    }, 1000 * 25);
  }, []);

  const onCloseDialog = useCallback(() => {
    setDialogText("");
  }, []);

  useEffect(() => {
    async function updateClipboard() {
      setClipboard(await navigator.clipboard.readText());
    }
    window.addEventListener("focus", updateClipboard);

    return () => window.removeEventListener("focus", updateClipboard);
  }, []);

  useEffect(() => {
    if (clipboard.length != 6) return;
    const clipboardChars = clipboard.split("");
    inputTokenRefs.current.forEach((currentInputToken, i) => {
      if (!currentInputToken) return;
      currentInputToken.value = clipboardChars[i];
    });
    onInputTokens();
  }, [clipboard]);

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
              {inputTokenRefs.current.map((_, i) => {
                return (
                  <TextField
                    key={i}
                    onInput={onInputTokens}
                    onKeyDown={onKeyDownNext}
                    inputRef={(ref) => (inputTokenRefs.current[i] = ref)}
                    id={`token-${i}`}
                    variant="filled"
                    margin="dense"
                    inputProps={{ maxLength: 1 }}
                    style={{
                      width: 43,
                      marginLeft: 14,
                    }}
                  />
                );
              })}
            </Box>
            <Button
              disabled={!isButtonEnable || fetching}
              onClick={onResentToken}
              type="submit"
              variant="text"
              color="primary"
              size="large"
              fullWidth
            >
              RESEND THE TOKEN
            </Button>
            <Dialog open={Boolean(dialogText)} onClose={onCloseDialog}>
              <DialogTitle>{dialogText}</DialogTitle>
              <DialogActions>
                <Button
                  onClick={onCloseDialog}
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
              disabled={!isTokenCorrect || fetching}
              onClick={onVerification}
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
