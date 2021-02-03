import React, { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
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

const IndexPage = () => {
  const router = useRouter();
  const [userEmail, setMail] = useState("");
  const [userName, setName] = useState("");
  const [errorMail, isErrorMail] = useState(false);
  const [errorName, isErrorName] = useState(false);
  const [messageErrorMail, setMessageErrorMail]= useState("");
  const [messageErrorName, setMessageErrorName]= useState("");

  const ableToSignIn = useMemo(() => {
    return (
      userEmail &&
      userName &&
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        userEmail
      )
    );
  }, [userEmail, userName]);

  const [addUser] = useMutation(SEND_SIGN_TOKEN);

  const onClick = useCallback(() => {
    if (!userEmail || !userName) return;

    (async function () {
      try {
        await addUser({
          variables: { email: userEmail, username: userName },
        });
        router.push("/auth");
      } catch (e) {
        if (e.message == "Already have a account") {
          setMessageErrorName("")
          isErrorName(false);
          isErrorMail(true);
          setMessageErrorMail(e.message)
        } else {
          setMessageErrorMail("")
          isErrorMail(false);
          isErrorName(true);
          setMessageErrorName(e.message)
        }
      }
    })();
  }, [userEmail, userName]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (!userEmail || !userName) return;
  }, []);

  const onChangeEmail = useCallback((e) => {
    setMail(e.target.value);
  }, []);

  const onChangeName = useCallback((e) => {errorName
    setName(e.target.value);
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
          display="flex"
          position="relative"
          flexDirection="column"
          justifyContent="space-between"
          height="100vh"
          py={3}
        >
          <div
            style={{
              position: "absolute",
              left: "4.27%",
              right: "4.27%",
              top: "2.4%",
              bottom: "87.41%",
            }}
          >
            <Button
              onClick={() => router.push("/")}
              style={{
                position: "absolute",
                left: "7.29%",
                right: "82.22%",
                top: "0%",
                bottom: "64.71%",
                display: "flex",
                alignItems: "center",
                width: "21%",
              }}
            >
              {"< Back"}
            </Button>
            <Typography
              variant="h4"
              component="h4"
              style={{
                position: "absolute",
                left: "0%",
                right: "11.37%",
                top: "47.06%",
                bottom: "0%",
                width: "100%",
              }}
            >
              Creating an account
            </Typography>
          </div>
          <form onSubmit={onSubmit}>
            <TextField
             helperText={messageErrorMail}
              error={errorMail}
              value={userEmail}
              onChange={onChangeEmail}
              id="filled-basic"
              label="Email"
              placeholder="example@email.com"
              type="email"
              variant="filled"
            
              style={{
                width: 327,
                position: "absolute",
                left: "6.4%",
                right: "6.4%",
                top: "15.89%",
                bottom: "73.31%",
              }}
            />

            <TextField
            helperText={messageErrorName}
              error={errorName}
              value={userName}
              onChange={onChangeName}
              id="filled-basic"
              label="User name"
              placeholder="example69"
              type="text"
              variant="filled"
             
              style={{
                width: 327,
                position: "absolute",
                left: "6.4%",
                right: "6.4%",
                top: "30.13%",
                bottom: "59.07%",
              }}
            />
          </form>
          <Button
            disabled={!ableToSignIn}
            onSubmit={onSubmit}
            onClick={onClick}
            style={{
              position: "absolute",
              left: "6.67%",
              right: "6.4%",
              top: "87.56%",
              bottom: "4.65%",
              width: 326,
              height: 52,
              color: "black",
              backgroundColor: "#bb86fc",
            }}
          >
            SIGN IN
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default IndexPage;
