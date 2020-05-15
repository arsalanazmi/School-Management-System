export default class StudentAction{
    static STUDENT_RECORD = 'STUDENT_RECORD'
    static REGISTER_STUDENT_SUCCESSFULL = "REGISTER_STUDENT_SUCCESSFUL"
    static GET_STUDENT_LIST = 'GET_STUDENT_LIST'
    static ADD_STUDENT_TO_LIST = 'ADD_STUDENT_TO_LIST' 
    static STUDENT_DELETE_SUCCESSFULL = 'STUDENT_DELETE_SUCCESSFULL'   
    static STUDENT_UPDATE_SUCCESSFULLY = 'STUDENT_UPDATE_SUCCESSFULLY'

    static StudentRecord(){
        return {
            type:StudentAction.STUDENT_RECORD
        }
    }

    static registerStudentSuccessful(){
        return {
            type:StudentAction.REGISTER_STUDENT_SUCCESSFULL
        }
    }

    static getStudentList(){
        return {
            type:StudentAction.GET_STUDENT_LIST
        }
    }
    static addStudentToList(StudentList){
        return{
            type:StudentAction.ADD_STUDENT_TO_LIST,
            payload: StudentList
        }
    }
    static StudentDeleteSuccessfull(){
        return{
            type:StudentAction.STUDENT_DELETE_SUCCESSFULL
        }
    }
    static StudentUpdateSuccessfully(){
        return{
            type:StudentAction.STUDENT_UPDATE_SUCCESSFULLY
        }
    }
}
