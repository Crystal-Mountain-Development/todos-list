import React, { useCallback, useState } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  TextField,
  Typography,
  Icon,
  Button,
} from "@material-ui/core";
import LogInLogo from "../components/LogInLogo";
import { useRouter } from "next/router";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import {
  useGoogleEmailValidationMutation,
  useSendAuthTokenMutation,
} from "../generated/graphql";

const IndexPage = () => {
  const router = useRouter();
  const [userEmail, setMail] = useState("");
  const [verifyUser] = useSendAuthTokenMutation();
  const [googleEmailValidation] = useGoogleEmailValidationMutation();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!userEmail) return;

      (async function () {
        try {
          await verifyUser({ variables: { email: userEmail } });
          router.push({
            pathname: "/auth",
            query: { email: encodeURI(userEmail), isRegister: true },
          });
        } catch {
          router.push("/signin");
        }
      })();
    },
    [userEmail]
  );

  const onGoogleAuthSuccess = (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    (async function () {
      const onlineRes = res as GoogleLoginResponse;
      const offlineRes = res as GoogleLoginResponseOffline;

      if (!onlineRes.profileObj) {
        console.error(offlineRes.code);
        return;
      }

      try {
        await googleEmailValidation({
          variables: {
            token: onlineRes.tokenObj.id_token,
          },
        });
        router.push({ pathname: "/lists" });
      } catch (e) {
        console.error(e);
      }
    })();
  };

  const onGoogleAuthFailure = () => {
    // TODO: Add Error
  };

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
            <GoogleLogin
              clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_PUBLIC || ""}
              onSuccess={onGoogleAuthSuccess}
              onFailure={onGoogleAuthFailure}
              cookiePolicy={"single_host_origin"}
              render={(props) => (
                <Button
                  {...props}
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Sign up with Google
                </Button>
              )}
            />
            <Box pt={"10px"}>
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
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default IndexPage;
