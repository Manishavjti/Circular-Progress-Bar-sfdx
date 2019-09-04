({
    doInitHelper : function(component, event, helper) {
        var objectName = component.get("v.sObjectName");
        console.log('objectName---->',objectName);
        var recordId = component.get("v.recordId");
        console.log('recordId---->',recordId);
        var fieldSetName= component.get("v.FSApiName");
        console.log('fieldSetName---->',fieldSetName);
        var action = component.get("c.getFieldSetDetail");
        action.setParams({ 
            sObjectName: objectName ,
            RecordId: recordId ,
            FieldSetName: fieldSetName 
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('State---->',state);
            if (state === "SUCCESS") 
            {
                let res = response.getReturnValue();
                console.log('res---->',res);
               
                let percentVal = parseInt(res.fieldsetNotNullField)/parseInt(res.fldSetTotalFields);
                var prctotnullVal = parseInt((percentVal * 100 ));
                var progressVal = parseInt( (percentVal) * 360 ) ;
                component.set("v.cirDeg" ,progressVal); 
                console.log('v.cirDeg---->',component.get("v.cirDeg"));
                component.set("v.perText" , parseInt(prctotnullVal) +'%' );
                console.log('perText---->',component.get("v.perText"));
            } 
        });
        $A.enqueueAction(action);
    },
    
})
