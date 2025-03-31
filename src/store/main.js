import { create } from 'zustand';
import { socket } from "../socket";

const useStore = create((set) => ({
    socket,
    onlineUser: [],
    allUsers: [],
    activeUsers: [],
    allPosts: [],
    favoritesId: [],
    favoritePosts: [],
    Messages: "",

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

}));

export default useStore;