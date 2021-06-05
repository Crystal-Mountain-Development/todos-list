import React, { useCallback, useRef, useState } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Typography,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Drawer,
  List,
  ListItem,
  Divider,
  AppBar,
  Portal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useRouter } from "next/router";

import ListsLogo from "../../components/ListsLogo";
import SeachIcon from "../../components/SeachIcon";
import MenuIcon from "../../components/MenuIcon";
import AddIcon from "../../components/AddIcon";
import ListIcon from "../../components/ListIcon";
import { GetServerSideProps } from "next";
import { useMyListQuery } from "../../generated/graphql";
import { getServerPageMyList } from "../../generated/nextSSR";
import { initializeApollo } from "../../apollo/client";
import { useAddListMutation } from "../../generated/graphql";

const IndexPage = () => {
  const { data } = useMyListQuery();
  const router = useRouter();
  const appBarPortalContainer = useRef(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addList] = useAddListMutation();
  const [listName, setListName] = useState("new list");
  const [dialogText, setDialogText] = useState("");

  const onAddList = useCallback(() => {
    (async function () {
      try {
        await addList({
          variables: { title: listName },
        });
        router.reload();
      } catch (e) {
        setDialogText(
          e.message === "Failed to fetch"
            ? "We have problems with the connection, please try again in 5 minutes"
            : e.message
        );
      }
    })();
    onClickDialogClose();
  }, [listName]);

  const onChangeListName = useCallback((e) => {
    setListName(e.target.value);
  }, []);

  const onClickMenuOpen = useCallback(() => {
    setDrawerOpen(true);
  }, []);
  const onClickMenuClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const onClickDialogOpen = useCallback(() => {
    setDialogOpen(true);
  }, []);
  const onClickDialogClose = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const onCloseDialog = useCallback(() => {
    setDialogText("");
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
          pt={3}
        >
          <Box>
            <Button onClick={() => router.push("/")}>{"< Back"}</Button>
          </Box>

          <Box display="flex" flexDirection="column" flex="1 1 auto" pb="75px">
            {!data?.lists.length && (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gridRowGap="25px"
                m="auto"
              >
                <ListsLogo />
                <Typography variant="h5" component="h5" align="center">
                  No list found
                </Typography>
              </Box>
            )}
            {data?.lists.map(({ title, isComplete, id }) => (
              <Box key={id}>
                <Box height="75px" display="flex">
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    flex="1 1 auto"
                  >
                    <Typography variant="subtitle1">{title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {isComplete ? "Complete" : "Incomplete"}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <ListIcon />
                  </Box>
                </Box>
                <Divider />
              </Box>
            ))}
          </Box>
          <Portal container={appBarPortalContainer.current}>
            <AppBar
              component="div"
              position="fixed"
              style={{ top: "auto", bottom: 0 }}
            >
              <BottomNavigation>
                <BottomNavigationAction
                  label="seach"
                  value="Seach"
                  icon={<SeachIcon />}
                  onClick={onClickMenuOpen}
                />
                <Fab color="primary" onClick={onClickDialogOpen}>
                  <AddIcon />
                </Fab>
                <BottomNavigationAction
                  label="menu"
                  value="Menu"
                  icon={<MenuIcon />}
                />
              </BottomNavigation>
            </AppBar>
          </Portal>

          <Dialog
            open={dialogOpen}
            onClose={onClickDialogClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">New list</DialogTitle>
            <DialogContent>
              <DialogContentText>Name of the new list</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="List name"
                type="text"
                fullWidth
                value={listName}
                onChange={onChangeListName}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClickDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={onAddList} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>

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

          <Drawer
            open={drawerOpen}
            onClose={onClickMenuClose}
            anchor={"bottom"}
          >
            <Typography variant="h6" component="h6">
              exampleUser
            </Typography>
            <Typography variant="subtitle1">User</Typography>
            <List>
              <ListItem>Close session</ListItem>
              <ListItem>Close application</ListItem>
            </List>
          </Drawer>
        </Box>
      </Container>
      <div id="app-bar" ref={appBarPortalContainer} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo({
    headers: context.req.headers as Record<string, string>,
  });

  return getServerPageMyList({}, apolloClient);
};

export default IndexPage;
