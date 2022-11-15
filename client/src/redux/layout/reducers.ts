// action constants
import { LayoutActionTypes, LayoutStateTypes } from './constants';

// app constants
import {
    LayoutWidth,
    SideBarTypes
} from '@constants/layout';

// actions
import { LayoutActionType } from './actions';

// utils
import { getLayoutConfigs } from '@utils/layout';

const INIT_STATE = {
    layoutWidth: LayoutWidth.LAYOUT_WIDTH_FLUID,
    leftSideBarType: SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT,
    showTwoToneIcons: false,
    showSidebarUserInfo: false,
    isOpenRightSideBar: false,
};

const Layout = (state: LayoutStateTypes = INIT_STATE, action: LayoutActionType<string | boolean | null>) => {
    switch (action.type) {
        case LayoutActionTypes.CHANGE_LAYOUT_WIDTH:
            const layoutConfig = getLayoutConfigs(action.payload! && action.payload);
            return {
                ...state,
                layoutWidth: action.payload,
                ...layoutConfig,
            };
        case LayoutActionTypes.CHANGE_SIDEBAR_TYPE:
            return {
                ...state,
                leftSideBarType: action.payload,
            };
        default:
            return state;
    }
};

export default Layout;
