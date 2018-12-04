import { CHANGE_FA_BKPF, CLEAR_FA_BKPF, FETCH_CASHBANKHKONTS_BY_BRANCH , CLEAR_CASHBANKHKONTS_BY_BRANCH,
    FETCH_DYNOBJ_FI, CHANGE_DYNOBJ_FI, CLEAR_DYNOBJ_FI, FETCH_EXPENSEHKONTS_BY_BUKRS, CLEAR_EXPENSEHKONTS_BY_BUKRS
    } from './fa_action';
    
    const INITIAL_STATE=    { 
                                faForm:
                                {  
                                    bkpf:
                                        {
                                            bukrs:'',
                                            brnch:'',
                                            business_area_id:'',
                                            dep:'',
                                            blart:'',
                                            waers:'',
                                            kursf:0,
                                            bktxt:'',
                                            official:false,
                                            bldat:'',
                                            budat:'',
                                            zreg:''
                                        },
                                    hkontOptions:[],
                                    hkontOptions2:[],
                                    initialBkpf:{
                                        bukrs:'',
                                        brnch:'',
                                        business_area_id:'',
                                        dep:'',
                                        blart:'',
                                        waers:'',
                                        kursf:0,
                                        bktxt:'',
                                        official:false,
                                        bldat:'',
                                        budat:'',
                                        zreg:''
                                    }
                                },
                                dynamicObject:{} ,
    
                            };
    
    export default function (state=INITIAL_STATE, action)
    {
        switch(action.type)
        {
            case CHANGE_FA_BKPF:
                return {...state, faForm:{...state.faForm,bkpf:action.bkpf}};    
            case CLEAR_FA_BKPF:            
                return {...state, faForm:{...state.faForm,bkpf:{...state.faForm.initialBkpf}}};  
            case FETCH_CASHBANKHKONTS_BY_BRANCH:
                return {...state, faForm:{...state.faForm,hkontOptions:action.hkontOptions}};   
            case CLEAR_CASHBANKHKONTS_BY_BRANCH:            
                return {...state, faForm:{...state.faForm,hkontOptions:[]}};  
            case FETCH_EXPENSEHKONTS_BY_BUKRS:
                return {...state, faForm:{...state.faForm,hkontOptions2:action.hkontOptions}};   
            case CLEAR_EXPENSEHKONTS_BY_BUKRS:            
                return {...state, faForm:{...state.faForm,hkontOptions2:[]}};
            case FETCH_DYNOBJ_FI:
                return {...state, dynamicObject: {...state.dynamicObject,...action.data}};  
            case CHANGE_DYNOBJ_FI:
                return {...state, dynamicObject: {...state.dynamicObject,...action.data}};  
            case CLEAR_DYNOBJ_FI:            
                return {...state, dynamicObject: {}};



            default:
                return state;
        }
    }