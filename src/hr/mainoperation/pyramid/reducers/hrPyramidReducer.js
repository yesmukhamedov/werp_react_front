import {
        HR_PYRAMID_FETCH_BUKRS_TREE,
    HR_PYRAMID_TREE_CHANGED,
    HR_PYRAMID_TREE_DELETED,
    HR_PYRAMID_BLANK_ITEM,
    HR_PYRAMID_FORM_MODAL_TOGGLE
} from '../actions/hrPyramidAction';
import {removeNodeAtPath} from 'react-sortable-tree'

const INITIAL_STATE={
                    treeData:[],
                    formModalOpened: false,
                    item:{}

};

export default function (state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case HR_PYRAMID_FETCH_BUKRS_TREE:
        case HR_PYRAMID_TREE_CHANGED:
            return {...state,treeData:action.payload};

        case HR_PYRAMID_BLANK_ITEM:
            return {...state,item:action.payload}

        case HR_PYRAMID_FORM_MODAL_TOGGLE:
            return {...state,formModalOpened:action.payload};

        default:
            return state;
    }
}

