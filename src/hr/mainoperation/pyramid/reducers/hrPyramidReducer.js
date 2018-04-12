import {
        HR_PYRAMID_FETCH_BUKRS_TREE,
    HR_PYRAMID_TREE_CHANGED,
    HR_PYRAMID_TREE_DELETED
} from '../actions/hrPyramidAction';

const INITIAL_STATE={
                    treeData:[]

};

export default function (state=INITIAL_STATE, action)
{
    switch(action.type)
    {
        case HR_PYRAMID_FETCH_BUKRS_TREE:
        case HR_PYRAMID_TREE_CHANGED:
            return {...state,treeData:action.payload};


        default:
            return state;
    }
}

