import React, { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const SEND_SIGN_TOKEN = gql`
  mutation signin($email: String!, $username: String!) {
    signin(email: $email, username: $username) {
      message
      token
    }
  }
`;

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      height: "100%",
    },
  })
);

const IS_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const IndexPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [messageErrorMail, setMessageErrorMail] = useState("");
  const [messageErrorName, setMessageErrorName] = useState("");

  const ableToSignIn = useMemo(() => {
    return userEmail && userName && IS_EMAIL_REGEX.test(userEmail);
  }, [userEmail, userName]);

  const [addUser] = useMutation(SEND_SIGN_TOKEN);

  const onSignIn = useCallback(() => {
    (async function () {
      try {
        await addUser({
          variables: { email: userEmail, username: userName },
        });
        router.push({
          pathname: "/auth",
          query: { email: encodeURI(userEmail),isRegister: false },
        });
      } catch (e) {
        if (e.message == "Already have a account") {
          setMessageErrorName("");
          setMessageErrorMail(e.message);
        } else {
          setMessageErrorMail("");
          setMessageErrorName(e.message);
        }
      }
    })();
  }, [userEmail, userName]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!ableToSignIn) return;
      onSignIn();
    },
    [ableToSignIn, onSignIn]
  );

  const onChangeEmail = useCallback((e) => {
    setUserEmail(e.target.value);
  }, []);

  const onChangeName = useCallback((e) => {
    setUserName(e.target.value);
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
          <Box>
            <Button onClick={() => router.push("/")}>{"< Back"}</Button>
            <Typography variant="h4" component="h4">
              Creating an account
            </Typography>
          </Box>
          <form className={classes.form} onSubmit={onSubmit}>
            <Box
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box>
                <TextField
                  helperText={messageErrorMail}
                  error={Boolean(messageErrorMail)}
                  value={userEmail}
                  onChange={onChangeEmail}
                  id="user-email"
                  name="user-email"
                  label="Email"
                  placeholder="example@email.com"
                  type="email"
                  variant="filled"
                  fullWidth
                  margin="normal"
                />

                <TextField
                  helperText={messageErrorName}
                  error={Boolean(messageErrorName)}
                  value={userName}
                  onChange={onChangeName}
                  id="user-name"
                  name="user-name"
                  label="User name"
                  placeholder="Your Name"
                  type="text"
                  variant="filled"
                  margin="normal"
                  fullWidth
                />
              </Box>
              <Button
                disabled={!ableToSignIn}
                onSubmit={onSubmit}
                onClick={onSignIn}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                SIGN IN
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default IndexPage;
