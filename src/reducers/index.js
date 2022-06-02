import { combineReducers } from "redux";
import display from './display.js';
import shop from './shop.js';
import rank from './rank.js';

import adminLogin from './admin/adminLogin.js'

import admin from './admin/admin.js';
import adminEditStore from "./admin/editStore.js";
import adminDeleteStore from "./admin/deleteStore.js";
import adminBlack from './admin/adminBlack.js';
import adminBlackReview from "./admin/adminBlackReview.js";
import adminReview from './admin/adminReview.js';
import adminConfirm from './admin/adminStoreConfirm.js';
import adminDelRegi from './admin/adminStConDel.js';
import confirmSet from './admin/confirmSet';
import confirmStore from './admin/confirmStore';
import adminStoreSet from './admin/adminStoreSet';

import register from "./register.js";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import user from './user.js'
import review from './review.js'
import createReview from "./writeReview.js";
import station from "./station.js";

import route_map from "./routemap.js";
import theme from './theme.js'

const persist = {
    key:'user',
    storage, 
    whitelist:['user', 'adminLogin']
};

const rootReducer = combineReducers({
    rank,
    shop,
    review,
    display,
    admin,
    adminLogin,
    adminEditStore,
    adminDeleteStore,
    adminBlack,
    adminBlackReview,
    adminReview,
    adminConfirm,
    confirmStore,
    adminDelRegi,
    confirmSet,
    register,
    route_map,
    user,
    review,
    createReview,
    station,
    theme,
    adminStoreSet
});

export default persistReducer(persist, rootReducer);