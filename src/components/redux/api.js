import axios from "axios";
import {
    isFetchingAction,
    setFollowAction,
    setPostId, setSavePostsAction, setSelectedUserPostsAction,
    setSubscriptionsPosts,
    setUserAction,
    setUserPosts,
    setUsersAction
} from "./reducers";
import {store} from "./state";



const base = 'https://cryxxxen.pythonanywhere.com/';
export const accessToken = localStorage.getItem('accessToken');

export const API = {
    register: (data) => {
        axios.post(`${base}users/`, data)
            .then(res => {
               store.dispatch(setUserAction(res.data));
            }).catch(error => {
                console.log(error);
        })
    },
    getToken: (data)=> {
        axios.post(`${base}token/`, data).then(res => {
            localStorage.setItem('accessToken', res.data.access);
            localStorage.setItem('refreshToken', res.data.refresh);
            store.dispatch(isFetchingAction(false));
        }).catch(error => {
            console.log(error)
        })
    },
    verifyUser: (data) => {
        axios.get(`${base}users/current_user/`, {
            headers: {
                'Authorization': `Bearer ${data}`
            }
        }).then(res => {
            store.dispatch(setUserAction(res.data));
            axios.get(`${base}users/${res.data.id}/posts/`)
                .then(res => {
                    store.dispatch(setUserPosts(res.data));
                }).catch(error => {
                    console.log(error)
            });
            axios.get(`${base}users/${res.data.id}/saves/`,{
                headers: {
                    'Authorization': `Bearer ${data}`
                }
            }).then(res =>{
                store.dispatch(setSavePostsAction(res.data));
            }).catch(error =>{
                console.log(error)});

            axios.get(`${base}users/${res.data.id}/subscriptions/`).then(res => {
                store.dispatch(setFollowAction(res.data));
                res.data.map( p => {
                    axios.get(`${base}users/${p.to_user}/posts/`).then(res => {
                        store.dispatch(setSubscriptionsPosts(res.data));
                        store.dispatch(isFetchingAction(false));
                    }).catch(error => {
                        console.log(error);
                    })
                })
            }).catch(error => {
                console.log(error)
            });

        }).catch(error => {
            console.log(error)
        })
    },
    getUserPosts: (data) => {
        axios.get(`${base}users/${data}/posts/`).then(res => {
            store.dispatch(setUserPosts(res.data));
            store.dispatch(isFetchingAction(false));
        }).catch(error => {
            console.log(error)
        })
    },
    getSelectedUserPosts: (data) => {
        axios.get(`${base}users/${data}/posts/`).then(res => {
            store.dispatch(setSelectedUserPostsAction(res.data));
            store.dispatch(isFetchingAction(false));
        }).catch(error => {
            console.log(error)
        })
    },
    postPost: (data, accessToken) => {
        axios.post(`${base}posts/`,data, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => {
            store.dispatch(setPostId(res.data));
        }).catch(error => {
            console.log(error);
        })
    },
    postImage: (data,user, accessToken) => {
        axios.post(`${base}images/`,data,{
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => {
            if (res) {
                axios.get(`${base}users/${user}/posts/`).then(res => {
                    store.dispatch(setUserPosts(res.data));
                }).catch(error => {
                    console.log(error)
                });
                store.dispatch(isFetchingAction(false));
            }
        })
    },
    getUsers: () => {
        axios.get(`${base}users/`).then(res => {
            store.dispatch(setUsersAction(res.data));
            store.dispatch(isFetchingAction(false));
        }).catch(error => {
            console.log(error);
        })
    },
    follow: (data, accessToken) => {
        axios.post(`${base}follow/`, {
            to_user: data
        } ,{
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => {
            axios.get(`${base}users/${res.data.from_user}/subscriptions/`).then(res => {
                store.dispatch(setFollowAction(res.data));
                store.dispatch(isFetchingAction(true));
                res.data.map( p => {
                    axios.get(`${base}users/${p.to_user}/posts/`).then(res => {
                        store.dispatch(setSubscriptionsPosts(res.data));
                    }).catch(error => {
                        console.log(error);
                    })
                })
                store.dispatch(isFetchingAction(false));

            }).catch(error => {
                console.log(error)
            })
        })

    },
    deleteFollow: (data, userId) => {
        axios.delete(`${base}follow/${data}/`).then(res => {
            if (res){
                axios.get(`${base}users/${userId}/subscriptions/`).then(res => {
                    store.dispatch(setFollowAction(res.data));
                }).catch(error => {
                    console.log(error)
                })
            }
        }).catch(error => {
            console.log(error)
        })
    },
    postLike: (accessToken, p, usersFiltered) => {
        axios.post(`${base}likes/`,{
            post:p
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => {
            if (res){
                usersFiltered?.map(u => {
                    axios.get(`${base}users/${u.id}/posts/`).then(res => {
                        store.dispatch(setSubscriptionsPosts(res.data));
                        console.log(res.data)
                    }).catch(error => {
                        console.log(error);
                    })
                })
            }
        }).catch(error => {
            console.log(error);
        })
    },
    postSave: (post, accessToken) => {
        axios.post(`${base}saves/`,{
            post: post
        },{
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => {
            axios.get(`${base}users/${res.data.user}/saves/`,{
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res =>{
                store.dispatch(setSavePostsAction(res.data));
            }).catch(error =>{
                console.log(error)})
        }).catch(error =>{
            console.log(error);
        })
    },
    logOut: (tokenRefresh, accessToken )=> {
        axios.post(`${base}token/refresh/`,{
            refresh: tokenRefresh
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).catch(error => {
            console.log(error)
        })
    },
    profileEdit: (user, formData, accessToken)=>{
        axios.put(`${base}users/${user}/`, formData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => {
            store.dispatch(setUserAction(res.data));
            store.dispatch(isFetchingAction(false));
        }).catch(error => {
            console.log(error)
        })
    }
}