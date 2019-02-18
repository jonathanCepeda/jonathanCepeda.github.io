$.ajax({
    url: "data/mexicanStates.json",
    type: "GET",
    dataType: "json",
    success: function(data){
        let new_html="";

        for(let i=0; i < data.length; i++){
            new_html += `
            <option value="${data[i].identifier}"> 
                ${data[i].state} 
            </option>
            `;
        }
        $("#mexicanStates").append(new_html);
        loadCapitalJSON();

    },
    error: function(error_msg){
        console.log(error_msg);
    }
});

function loadCapitalJSON(){
    $.ajax({
        url: "data/mexicanStatesCapitals.json",
        type: "GET",
        dataType: "json",
        success : function(data){
            $("#mexicanStates").on('change', function(){
                let id = $(this).val();
                
                for(let i=0; i < data.length; i++){
                    if(id == data[i].id){
                        $("#stateCapital").val(data[i].capital);
                    }
                }
            });
        },
        error : function(error_msg){
            console.log(error_msg);
        }
    });
}