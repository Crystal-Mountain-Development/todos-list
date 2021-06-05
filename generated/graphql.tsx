import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type List = {
  __typename?: 'List';
  id: Scalars['Int'];
  title: Scalars['String'];
  isComplete: Scalars['Boolean'];
  userId: Scalars['String'];
  todos: Array<Todo>;
};

export type ListInsertInput = {
  title: Scalars['String'];
};

export type ListUpdateInput = {
  title?: Maybe<Scalars['String']>;
  isComplete?: Maybe<Scalars['Boolean']>;
};

export type LoginMessage = {
  __typename?: 'LoginMessage';
  message: Scalars['String'];
  token?: Maybe<Scalars['String']>;
};

export type LoginToken = {
  __typename?: 'LoginToken';
  authorization?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  empty?: Maybe<Scalars['String']>;
  addTodo: Todo;
  updateTodo: Todo;
  deleteTodo: Todo;
  addList: List;
  updateList: List;
  deleteList: List;
  updateUser: User;
  sendAuthToken?: Maybe<LoginMessage>;
  login?: Maybe<LoginToken>;
  signin?: Maybe<SigninMessage>;
  googleEmailValidation?: Maybe<SigninToken>;
  emailValidation?: Maybe<SigninToken>;
  resendEmailValidation?: Maybe<SigninMessage>;
};


export type MutationAddTodoArgs = {
  insert: TodoInsertInput;
};


export type MutationUpdateTodoArgs = {
  id: Scalars['String'];
  update?: Maybe<TodoUpdateInput>;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['String'];
};


export type MutationAddListArgs = {
  insert: ListInsertInput;
};


export type MutationUpdateListArgs = {
  id: Scalars['Int'];
  update?: Maybe<ListUpdateInput>;
};


export type MutationDeleteListArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  update?: Maybe<UserUpdateInput>;
};


export type MutationSendAuthTokenArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSigninArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
};


export type MutationGoogleEmailValidationArgs = {
  token: Scalars['String'];
};


export type MutationEmailValidationArgs = {
  email: Scalars['String'];
  token: Scalars['String'];
};


export type MutationResendEmailValidationArgs = {
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  empty?: Maybe<Scalars['String']>;
  todos: Array<Todo>;
  todo: Todo;
  lists: Array<List>;
  list: List;
  user: User;
};


export type QueryTodoArgs = {
  id: Scalars['String'];
};


export type QueryListArgs = {
  id: Scalars['Int'];
};

export type SigninMessage = {
  __typename?: 'SigninMessage';
  message: Scalars['String'];
  token?: Maybe<Scalars['String']>;
};

export type SigninToken = {
  __typename?: 'SigninToken';
  authorization?: Maybe<Scalars['String']>;
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['String'];
  summary: Scalars['String'];
  isComplete?: Maybe<Scalars['Boolean']>;
  listId: Scalars['Int'];
};

export type TodoInsertInput = {
  summary: Scalars['String'];
  listId: Scalars['Int'];
};

export type TodoUpdateInput = {
  summary?: Maybe<Scalars['String']>;
  isComplete?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  lists: Array<List>;
};

export type UserInsertInput = {
  username: Scalars['String'];
  email: Scalars['String'];
};

export type UserUpdateInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type AddListMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type AddListMutation = (
  { __typename?: 'Mutation' }
  & { addList: (
    { __typename?: 'List' }
    & Pick<List, 'title' | 'isComplete'>
  ) }
);

export type EmailValidationMutationVariables = Exact<{
  email: Scalars['String'];
  token: Scalars['String'];
}>;


export type EmailValidationMutation = (
  { __typename?: 'Mutation' }
  & { emailValidation?: Maybe<(
    { __typename?: 'SigninToken' }
    & Pick<SigninToken, 'authorization'>
  )> }
);

export type GoogleEmailValidationMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type GoogleEmailValidationMutation = (
  { __typename?: 'Mutation' }
  & { googleEmailValidation?: Maybe<(
    { __typename?: 'SigninToken' }
    & Pick<SigninToken, 'authorization'>
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  token: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'LoginToken' }
    & Pick<LoginToken, 'authorization'>
  )> }
);

export type MyListQueryVariables = Exact<{ [key: string]: never; }>;


export type MyListQuery = (
  { __typename?: 'Query' }
  & { lists: Array<(
    { __typename?: 'List' }
    & Pick<List, 'id' | 'isComplete' | 'title'>
  )> }
);

export type ResendEmailValidationMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResendEmailValidationMutation = (
  { __typename?: 'Mutation' }
  & { resendEmailValidation?: Maybe<(
    { __typename?: 'SigninMessage' }
    & Pick<SigninMessage, 'message' | 'token'>
  )> }
);

export type SendAuthTokenMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendAuthTokenMutation = (
  { __typename?: 'Mutation' }
  & { sendAuthToken?: Maybe<(
    { __typename?: 'LoginMessage' }
    & Pick<LoginMessage, 'message' | 'token'>
  )> }
);

export type SigninMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
}>;


export type SigninMutation = (
  { __typename?: 'Mutation' }
  & { signin?: Maybe<(
    { __typename?: 'SigninMessage' }
    & Pick<SigninMessage, 'message' | 'token'>
  )> }
);


export const AddListDocument = gql`
    mutation addList($title: String!) {
  addList(insert: {title: $title}) {
    title
    isComplete
  }
}
    `;
export type AddListMutationFn = Apollo.MutationFunction<AddListMutation, AddListMutationVariables>;

/**
 * __useAddListMutation__
 *
 * To run a mutation, you first call `useAddListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addListMutation, { data, loading, error }] = useAddListMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useAddListMutation(baseOptions?: Apollo.MutationHookOptions<AddListMutation, AddListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddListMutation, AddListMutationVariables>(AddListDocument, options);
      }
export type AddListMutationHookResult = ReturnType<typeof useAddListMutation>;
export type AddListMutationResult = Apollo.MutationResult<AddListMutation>;
export type AddListMutationOptions = Apollo.BaseMutationOptions<AddListMutation, AddListMutationVariables>;
export const EmailValidationDocument = gql`
    mutation emailValidation($email: String!, $token: String!) {
  emailValidation(email: $email, token: $token) {
    authorization
  }
}
    `;
export type EmailValidationMutationFn = Apollo.MutationFunction<EmailValidationMutation, EmailValidationMutationVariables>;

/**
 * __useEmailValidationMutation__
 *
 * To run a mutation, you first call `useEmailValidationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEmailValidationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [emailValidationMutation, { data, loading, error }] = useEmailValidationMutation({
 *   variables: {
 *      email: // value for 'email'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useEmailValidationMutation(baseOptions?: Apollo.MutationHookOptions<EmailValidationMutation, EmailValidationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EmailValidationMutation, EmailValidationMutationVariables>(EmailValidationDocument, options);
      }
export type EmailValidationMutationHookResult = ReturnType<typeof useEmailValidationMutation>;
export type EmailValidationMutationResult = Apollo.MutationResult<EmailValidationMutation>;
export type EmailValidationMutationOptions = Apollo.BaseMutationOptions<EmailValidationMutation, EmailValidationMutationVariables>;
export const GoogleEmailValidationDocument = gql`
    mutation googleEmailValidation($token: String!) {
  googleEmailValidation(token: $token) {
    authorization
  }
}
    `;
export type GoogleEmailValidationMutationFn = Apollo.MutationFunction<GoogleEmailValidationMutation, GoogleEmailValidationMutationVariables>;

/**
 * __useGoogleEmailValidationMutation__
 *
 * To run a mutation, you first call `useGoogleEmailValidationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogleEmailValidationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleEmailValidationMutation, { data, loading, error }] = useGoogleEmailValidationMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGoogleEmailValidationMutation(baseOptions?: Apollo.MutationHookOptions<GoogleEmailValidationMutation, GoogleEmailValidationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GoogleEmailValidationMutation, GoogleEmailValidationMutationVariables>(GoogleEmailValidationDocument, options);
      }
export type GoogleEmailValidationMutationHookResult = ReturnType<typeof useGoogleEmailValidationMutation>;
export type GoogleEmailValidationMutationResult = Apollo.MutationResult<GoogleEmailValidationMutation>;
export type GoogleEmailValidationMutationOptions = Apollo.BaseMutationOptions<GoogleEmailValidationMutation, GoogleEmailValidationMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $token: String!) {
  login(email: $email, token: $token) {
    authorization
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MyListDocument = gql`
    query myList {
  lists {
    id
    isComplete
    title
  }
}
    `;

/**
 * __useMyListQuery__
 *
 * To run a query within a React component, call `useMyListQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyListQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyListQuery(baseOptions?: Apollo.QueryHookOptions<MyListQuery, MyListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyListQuery, MyListQueryVariables>(MyListDocument, options);
      }
export function useMyListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyListQuery, MyListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyListQuery, MyListQueryVariables>(MyListDocument, options);
        }
export type MyListQueryHookResult = ReturnType<typeof useMyListQuery>;
export type MyListLazyQueryHookResult = ReturnType<typeof useMyListLazyQuery>;
export type MyListQueryResult = Apollo.QueryResult<MyListQuery, MyListQueryVariables>;
export const ResendEmailValidationDocument = gql`
    mutation resendEmailValidation($email: String!) {
  resendEmailValidation(email: $email) {
    message
    token
  }
}
    `;
export type ResendEmailValidationMutationFn = Apollo.MutationFunction<ResendEmailValidationMutation, ResendEmailValidationMutationVariables>;

/**
 * __useResendEmailValidationMutation__
 *
 * To run a mutation, you first call `useResendEmailValidationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendEmailValidationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendEmailValidationMutation, { data, loading, error }] = useResendEmailValidationMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResendEmailValidationMutation(baseOptions?: Apollo.MutationHookOptions<ResendEmailValidationMutation, ResendEmailValidationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendEmailValidationMutation, ResendEmailValidationMutationVariables>(ResendEmailValidationDocument, options);
      }
export type ResendEmailValidationMutationHookResult = ReturnType<typeof useResendEmailValidationMutation>;
export type ResendEmailValidationMutationResult = Apollo.MutationResult<ResendEmailValidationMutation>;
export type ResendEmailValidationMutationOptions = Apollo.BaseMutationOptions<ResendEmailValidationMutation, ResendEmailValidationMutationVariables>;
export const SendAuthTokenDocument = gql`
    mutation sendAuthToken($email: String!) {
  sendAuthToken(email: $email) {
    message
    token
  }
}
    `;
export type SendAuthTokenMutationFn = Apollo.MutationFunction<SendAuthTokenMutation, SendAuthTokenMutationVariables>;

/**
 * __useSendAuthTokenMutation__
 *
 * To run a mutation, you first call `useSendAuthTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendAuthTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendAuthTokenMutation, { data, loading, error }] = useSendAuthTokenMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendAuthTokenMutation(baseOptions?: Apollo.MutationHookOptions<SendAuthTokenMutation, SendAuthTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendAuthTokenMutation, SendAuthTokenMutationVariables>(SendAuthTokenDocument, options);
      }
export type SendAuthTokenMutationHookResult = ReturnType<typeof useSendAuthTokenMutation>;
export type SendAuthTokenMutationResult = Apollo.MutationResult<SendAuthTokenMutation>;
export type SendAuthTokenMutationOptions = Apollo.BaseMutationOptions<SendAuthTokenMutation, SendAuthTokenMutationVariables>;
export const SigninDocument = gql`
    mutation signin($email: String!, $username: String!) {
  signin(email: $email, username: $username) {
    message
    token
  }
}
    `;
export type SigninMutationFn = Apollo.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: Apollo.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, options);
      }
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<SigninMutation, SigninMutationVariables>;