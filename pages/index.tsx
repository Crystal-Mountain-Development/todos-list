import React, { useCallback, useState } from "react";
import Head from "next/head";
import { Box, Container, TextField, Typography, Icon } from "@material-ui/core";
import LogInLogo from "../components/LogInLogo";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import Router from "next/router";

const SEND_AUTH_TOKEN = gql`
  mutation SendAuthToken($email: String!) {
    sendAuthToken(email: $email) {
      message
      token
    }
  }
`;

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const IndexPage = () => {
  const [userEmail, setMail] = useState("");

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!userEmail) return;

      client
        .mutate({
          mutation: SEND_AUTH_TOKEN,
          variables: { email: userEmail },
        })
        .then(() => Router.push("/auth"))
        .catch(() => Router.push("/signin"));
    },
    [userEmail]
  );

  const onChange = useCallback((e) => {
    setMail(e.target.value);
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
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            style={{
              width: "263px",
              height: "336px",
            }}
          >
            Your To Do List
          </Typography>

          <Icon
            style={{
              top: "273px",
              left: "178px",
              width: "285px",
              height: "253px",
              position: "absolute",
            }}
          >
            <LogInLogo style={{ position: "fixed" }} />
          </Icon>
          <form onSubmit={onSubmit}>
            <TextField
              value={userEmail}
              onChange={onChange}
              id="filled-basic"
              label="Email"
              placeholder="example@email.com"
              type="email"
              variant="filled"
              fullWidth
            />
          </form>
        </Box>
      </Container>
    </>
  );
};

export default IndexPage;
