const SET_USER = 'SET_USER';
const SET_USERS = 'SET_USERS';
const SET_USER_POSTS = 'SET_USER_POSTS';
const SET_POST = 'SET_POST';
const IS_FETCHING = 'IS_FETCHING';
const SET_POST_ID = 'SET_POST_ID';
const ADD_POST = 'ADD_POST';
const SELECTED_POST = 'SELECTED_POST';
const SET_SELECTED_USER_POSTS = 'SET_SELECTED_USER_POSTS';
const SELECTED_USER = 'SELECTED_USER';
const FOLLOW = 'FOLLOW';
const FIND_USERS = 'FIND_USERS';
const SET_SUB_POSTS = 'SET_SUB_POSTS';
const SET_SAVE_POSTS = 'SET_SAVE_POSTS';
const RESET = 'RESET';

const initialState = {
    user: [],
    userPosts:[],
    userPostImageId: [],
    usersPosts: [],
    foundUsers: [],
    selectedPost:[],
    selectedUser:[],
    selectedUserPosts:[],
    users: [],
    likes: [],
    comments: [],
    saves: [],
    images: [],
    tags: [],
    stories: [],
    follows: [],
    subPosts:[],
    isFetching: false,

}

export const reducer = (state = initialState, action)=> {
    switch (action.type){
        case SET_USER:
            return{
                ...state,
                user: action.payload
            }
        case SET_USER_POSTS:
            return {
                ...state,
                userPosts: action.payload
            }
        case SET_SELECTED_USER_POSTS:
            return {
                ...state,
                selectedUserPosts: action.payload
            }
        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case SET_POST_ID:
            return {
                ...state,
                userPostImageId: action.payload
            }
        case SELECTED_POST:
            return {
                ...state,
                selectedPost: action.payload
            }
        case SELECTED_USER:
            return {
                ...state,
                selectedUser: action.payload
            }
        case SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case FOLLOW:
            return {
                ...state,
                follows: action.payload
            }
        case FIND_USERS:
            return {
                ...state,
                foundUsers: action.payload
            }
        case SET_SUB_POSTS:
            return {
                ...state,
                subPosts: [...state.subPosts, action.payload]
            }
        case SET_SAVE_POSTS:
            return {
                ...state,
                saves: action.payload
            }
        case RESET:
            return initialState;

        default:
            return state
    }

}

export const setUserAction = (userData) => ({type: SET_USER, payload: userData});
export const isFetchingAction = (data) => ({type: IS_FETCHING, payload: data });
export const setUserPosts = (data) => ({type: SET_USER_POSTS, payload: data});
export const setPost = (data) => ({type: SET_POST, payload:data});
export const setPostId = (data) => ({type: SET_POST_ID, payload: data});
export const selectedPost = (data) => ({type: SELECTED_POST, payload: data});
export const setUsersAction = (data) => ({type: SET_USERS, payload: data});
export const setFollowAction = (data) => ({type: FOLLOW, payload:data});
export const findUsersAction = (data) => ({type: FIND_USERS, payload:data});
export const setSubscriptionsPosts =(data) => ({type: SET_SUB_POSTS, payload: data});
export const selectedUserAction = (data) => ({type: SELECTED_USER, payload: data});
export const setSelectedUserPostsAction = (data) => ({type: SET_SELECTED_USER_POSTS, payload: data});
export const setSavePostsAction = (data) => ({type: SET_SAVE_POSTS, payload: data});
export const setResetAction =  {type: RESET};