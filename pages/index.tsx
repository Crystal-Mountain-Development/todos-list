import React, { useCallback, useState } from "react";
import Head from "next/head";
import { Box, Container, TextField, Typography, Icon } from "@material-ui/core";
import LogInLogo from "../components/LogInLogo";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const SEND_AUTH_TOKEN = gql`
  mutation SendAuthToken($email: String!) {
    sendAuthToken(email: $email) {
      message
      token
    }
  }
`;

const IndexPage = () => {
  const router = useRouter();
  const [userEmail, setMail] = useState("");
  const [verifyUser] = useMutation(SEND_AUTH_TOKEN);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!userEmail) return;

      (async function () {
        try {
          await verifyUser({ variables: { email: userEmail } });
          router.push("/auth");
        } catch {
          router.push("/signin");
        }
      })();
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
