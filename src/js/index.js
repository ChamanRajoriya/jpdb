var jpdbBaseURL="http://api.login2explore.com:5577";
var jpdbIRL="/api/irl";
var jpdbIML = "/api/iml";
var stuDEName = "STUDENT-TABLE";
 var stuRelationName = "SCHOOL-DB";
var connToken = "90932450|-31949270578795314|90955352";
$("#Rollno").focus();
 function validateData() {
     var stuRollVar = $("#Rollno").val();
       if (stuRollVar === "") {
          alert("Student roll is Required Value");
              $("#Rollno").focus();
                return "";
                }
      var stuNameVar = $("#FullName").val();
       if (stuNameVar === "") {
        alert("Student Name is Required Value");
           $("#empName").focus();
            return "";
             }
      var ClassVar = $("#Class").val();
       if (ClassVar === "") {
         alert("Class is Required ");
           $("#Class").focus();
               return "";
          }
         var erollVar = $("#enrolldate").val();
         var addressVar=$("#Address").val();
         var dateVar = $("date").val();
         var jsonStrObj = {
   Rollno: stuRollVar,
   FullName: stuNameVar,
   Class: ClassVar,
   date:dateVar,
   Address:addressVar,
   enrolldate:erollVar
   };
    return JSON.stringify(jsonStrObj);
}
   function getstu(){
   var RollnoJsonObj = getstuRollnoAsJsonObj();
   var getRequest = createGET_BY_KEYRequest(connToken,stuDEName,stuRelationName,RollnoJsonObj);
    jQuery.ajaxSetup({async:false});
   var resJsonObj =executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async:true});
   if(resJsonObj.status===400){
                $("#Save").prop('disabled',false);
                $("#reset").prop('disabled',false);
                $("#FullName").focus();
   }else if(resJsonObj.status===200){
             $("#Rollno").prop("disabled",true);
             fillData(resJsonObj);
            $("#change").prop("disabled",false);
            $("#reset").prop("disabled",false);
             $("#FullName").focus();
   }
   }
   function saveRecNo2LS(jsonObj){
   var lvData=JSON.parse(jsonObj.data);
   localStrage.setItem("recno",lvData.rec_no);
   }
   function getstuRollnoAsJsonObj(){
   var Rollno=$("#Rollno").val("");
   var jsonStr={
   Rollno:Rollno
   };
   return JSON.stringify(jsonStr);
   }
   function fillData(jsonObj){
   saveRecNo2LS(jsonObj);
   var record =JSON.parse(jsonObj.data).record;
   $("#FullName").val(record.name);
   $("#Address").val(record.Address);
   $("#date").val(record.date);
   $("#enrolldata").val(record.enrolldate);
   $("#Rollno").val(record. Rollno);
   }
   function resetForm() {
         $("#Rollno").val("");
         $("#FullName").val("");
         $("#Class").val("");
         $("#enrolldate").val("");
         $("#Address").val("");
         $("#date").val("");
         $("#Rollno").prop("disabled",false);
         /*$("#Save").prop("disabled",true);
         $("#change").prop("disabled",true);
          $("#reset").prop("disabled",true);*/
         $("#Rollno").focus();
}
   function changeData(){
        $("change").prop("disabled",true);
         jsonChg = validateData();
         var updateRequest =createUPDATERecordRequest(connToken,jsonChg,stuDEName,stuRelationName,localStrage.getItem(""));
         jQuery.ajaxSetup({async:false});
         var resJsonObj=executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
   }
  function saveData() {
       var jsonStrObj = validateData();
         if (jsonStrObj === "") {
             return "";
              }
       var putRequest = createPUTRequest(connToken,jsonStrObj, stuDEName, stuRelationName);
         jQuery.ajaxSetup({async: false});
       var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
          jQuery.ajaxSetup({async: true});
/*var resultObj = executeCommand(putReqStr,
"http://api.login2explore.com:5577", "/api/iml");
alert(JSON.stringify(resultObj));
jQuery.ajaxSetup({async: true});*/
resetForm();
$("#Rollno").focus();
}