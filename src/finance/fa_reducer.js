import { CHANGE_FA_BKPF, CLEAR_FA_BKPF, FETCH_CASHBANKHKONTS_BY_BRANCH , CLEAR_CASHBANKHKONTS_BY_BRANCH,
    FETCH_DYNOBJ_FI, CHANGE_DYNOBJ_FI, CLEAR_DYNOBJ_FI
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
                                additionalDynamicObject:{}   
    
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
            case FETCH_DYNOBJ_FI:
                    return {...state, dynamicObject: {...action.data}};  
            case CHANGE_DYNOBJ_FI:            
                    return {...state, dynamicObject: {...action.data}};  
            case CLEAR_DYNOBJ_FI:            
                    return {...state, dynamicObject: {}};



            default:
                return state;
        }
    }