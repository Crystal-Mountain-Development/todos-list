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
  CheckboxProps,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState, ChangeEvent } from "react";
import { initializeApollo } from "../../apollo/client";
import TodoIcon from "../../components/TodoIcon";
import {
  useAddTodoMutation,
  useTodosQuery,
  useUpdateTodoMutation,
} from "../../generated/graphql";
import { getServerPageTodos } from "../../generated/nextSSR";
import SeachIcon from "../../components/SeachIcon";
import MenuIcon from "../../components/MenuIcon";
import AddIcon from "../../components/AddIcon";
import AccordionIcon from "../../components/AccordionIcon";
import ListIcon from "../../components/ListIcon";

const IndexPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const appBarPortalContainer = useRef(null);
  const { data, refetch: refetchMyTodo } = useTodosQuery({
    variables: { listId: Number(id) },
  });
  const [UpdateTodo] = useUpdateTodoMutation();

  const [addTodo] = useAddTodoMutation(); //put here mutation of insert todo

  const [dialogText, setDialogText] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [todoName, setTodoName] = useState("");

  const onUpdateTodo = useCallback(
    (id: string, summary: string, status: boolean) => {
      (async function () {
        try {
          await UpdateTodo({
            variables: { id: id, summary: summary, status: status },
          });
          refetchMyTodo();
        } catch (e) {
          setDialogText(
            e.message === "Failed to fetch"
              ? "We have problems with the connection, please try again in 5 minutes"
              : e.message
          );
        }
      })();
    },
    []
  );

  const onAddTodo = useCallback(() => {
    (async function () {
      if (!data) {
        setDialogText("No list found");
        return;
      }

      try {
        await addTodo({
          variables: { summary: todoName, listId: data.list.id },
        });
        refetchMyTodo();
      } catch (e) {
        setDialogText(
          e.message === "Failed to fetch"
            ? "We have problems with the connection, please try again in 5 minutes"
            : e.message
        );
      }
    })();
    onClickDialogClose();
  }, [todoName, data]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onUpdateTodo(e.target.id, e.target.name, e.target.checked);
  }, []);

  const onCloseDialog = useCallback(() => {
    setDialogText("");
  }, []);

  const onClickDialogClose = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const onChangeTodoName = useCallback((e) => {
    setTodoName(e.target.value);
  }, []);
  const onClickDialogOpen = useCallback(() => {
    setDialogOpen(true);
  }, []);

  return (
    <Container maxWidth="xs">
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        height="100vh"
        pt={3}
      >
        <Box>
          <Button onClick={() => router.push("/lists")}>{"< Back"}</Button>
          <Typography variant="h4">{data?.list.title}</Typography>
        </Box>

        {!data?.list.todos.length && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gridRowGap="25px"
            m="auto"
          >
            <TodoIcon />
            <Typography variant="h5" component="h5" align="center">
              Nothing To Do
            </Typography>
          </Box>
        )}
        <Accordion style={{ height: "auto", width: "auto" }}>
          <AccordionSummary expandIcon={<AccordionIcon />}>
            <Typography>Completed</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: "block" }}>
            {data?.list.todos.map(({ id, summary, isComplete }) =>
              isComplete ? (
                <Box key={id}>
                  <Box height="75px" display="flex">
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      flex="1 1 auto"
                    >
                      <Typography variant="subtitle1">{summary}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Checkbox
                        id={id}
                        name={summary}
                        checked={Boolean(isComplete)}
                        onChange={handleChange}
                      />
                    </Box>
                  </Box>
                  <Divider />
                </Box>
              ) : null
            )}
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ height: "auto", width: "auto" }}>
          <AccordionSummary expandIcon={<AccordionIcon />}>
            <Typography>Incomplete</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: "block" }}>
            {data?.list.todos.map(({ id, summary, isComplete }) =>
              !isComplete ? (
                <Box key={id}>
                  <Box height="75px" display="flex">
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      flex="1 1 auto"
                    >
                      <Typography
                        variant="subtitle1"
                        style={{ textDecoration: "line-through" }}
                      >
                        {summary}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Checkbox
                        id={id}
                        name={summary}
                        checked={Boolean(isComplete)}
                        onChange={handleChange}
                      />
                    </Box>
                  </Box>
                  <Divider />
                </Box>
              ) : null
            )}
          </AccordionDetails>
        </Accordion>

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
              value={todoName}
              onChange={onChangeTodoName}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClickDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={onAddTodo} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={Boolean(dialogText)} onClose={onCloseDialog}>
          <DialogTitle>{dialogText}</DialogTitle>
          <DialogActions>
            <Button onClick={onCloseDialog} color="primary" variant="contained">
              Got it
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};

  if (!id || Number.isNaN(Number(id))) throw new Error("Invalid List Id");

  const apolloClient = initializeApollo({
    headers: context.req.headers as Record<string, string>,
  });

  return getServerPageTodos(
    { variables: { listId: Number(id) } },
    apolloClient
  );
};

export default IndexPage;
