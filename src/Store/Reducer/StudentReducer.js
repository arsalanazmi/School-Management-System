import StudentAction from './../Action/StudentAction'

const INITIAL_STATE = {
  isProcessing: false,
  isError: false,
  StudentList:[],
  errorMessage:{},
  EditData:[]
}

function StudentReducer(state=INITIAL_STATE,action){
    switch(action.type){

    //  Student Record   
    case StudentAction.STUDENT_RECORD:
        return {...state, isProcessing: true, isError : false};
    case StudentAction.REGISTER_STUDENT_SUCCESSFULL:
        return {...state, isProcessing: false ,isError : false, errorMessage: {}};            
    case StudentAction.GET_STUDENT_LIST:
        return {...state, isProcessing: true, isError : false,StudentList:[]};
    case StudentAction.ADD_STUDENT_TO_LIST:
        var newStudentList = [...state.StudentList];
        newStudentList.push(action.payload);
        return {...state, isProcessing: false, isError : false, StudentList:newStudentList};
    case StudentAction.STUDENT_DELETE_SUCCESSFULL:
        return {...state}
    case StudentAction.STUDENT_UPDATE_SUCCESSFULLY:
        return {...state}
    
    default:
        return state
    }
}

export default StudentReducer;