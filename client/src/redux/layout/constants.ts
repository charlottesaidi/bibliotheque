// constants
import {
    LayoutWidth,
    SideBarTypes
} from '../../constants/layout';

enum LayoutActionTypes {
    CHANGE_LAYOUT_WIDTH = '@@layout/CHANGE_LAYOUT_WIDTH',
    CHANGE_SIDEBAR_TYPE = '@@layout/CHANGE_SIDEBAR_TYPE',
}

export interface LayoutStateTypes {
    layoutWidth: LayoutWidth.LAYOUT_WIDTH_FLUID | LayoutWidth.LAYOUT_WIDTH_BOXED;
    leftSideBarType:
        | SideBarTypes.LEFT_SIDEBAR_TYPE_DEFAULT
        | SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED
        | SideBarTypes.LEFT_SIDEBAR_TYPE_COMPACT;
}

export { LayoutActionTypes };