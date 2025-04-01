import { create } from 'zustand';
import { socket } from "../socket";
import {useState} from "react";

const useStore = create((set) => ({
    socket,
    onlineUser: [],
    allUsers: [],
    activeUsers: [],
    allPosts: [],
    favoritesId: [],
    favoritePosts: [],
    Messages: "",
    deletedItem: [],

    setOnlineUser: (info) => set({onlineUser: info }),

    getActiveUsers: (info) => set({
        activeUsers: info
    }),

    getAllUsers: (info) => set({
        allUsers: info
    }),

    setAllPosts: (posts) => set({
        allPosts: posts
    }),

    setFavoritesId: (id) => set({
        favoritesId: id
    }),

    setFavoritePosts: (posts) => set({
        favoritePosts: posts
    }),

    getAllMessages: (info) => set({
        Messages: info
    }),

    setDeletedItem: (post) => set({
        deletedItem: post
    })

}));

export default useStore;