$(document).ready(function(){

    let date = new Date( $('#datetime').data('datetime') );

    if($('#datetime')) {

        let time = date.getHours() + ':' + date.getMinutes();
        let d = date.getHours() + ':' + date.getMinutes();

        $('.timepicker').val(time);
        $('.datepicker').val(d);

    }

    $('.sidenav').sidenav();
    $('.tooltipped').tooltip();
    $('.modal').modal();
    $('select').formSelect();
    $('.timepicker').timepicker({
        twelveHour: false,
        defaultTime: $('.timepicker').val()
    });
    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
        setDefaultDate: true,
        defaultDate: date
    });
    $('a.delete-btn').click(function(e){
        e.preventDefault();
        $('#delete-modal').modal('open');
        let url = $(this).data('url');
        let id = $(this).data('id');
        let csrf = $('input[name="_csrf"]').val();
        $('#delete-modal-yes').click(function(e){
            $.ajax({
                type: 'delete',
                url: url,
                data: {
                    id: id,
                    _csrf: csrf
                },
                error: function(err) {
                    console.log(err)
                },
                success: function (res) {
                    if(res == 1) {
                        M.toast({
                            html: 'Запись удалена!',
                            displayLength: 2500,
                            completeCallback: function () {
                                window.location.reload();
                            }
                        });
                    }
                }
            })
        });
    });

    // let usersData = {};
    // usersArray.forEach(function (element) {
    //     usersData['' + element.username + ''] = element.id
    // });
    // usersData = JSON.stringify(usersData);
    // $('input.autocomplete').autocomplete({
    //     data: JSON.parse(usersData),
    // });

});