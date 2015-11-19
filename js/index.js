function showFollowers() {
    getFollowers(function (followers) {
       $('#followers-list').html('');
        $.each(followers, function (index, follower) {
            formatFollower(follower);
        });
    });
}


$('#followers-list').on('click', '.follow', function () {
    var username = $(this).attr('username');  
    follow(username);
    alert('Ahora sigues al usuario:'+ username);
});

$('#followers-list').on('click', '.unfollow',function () {
    var username = $(this).attr('username');
    unfollow(username);
    alert('Ya no sigues al usuario:'+ username);
});



function formatFollower(follower) {

    var followerHtml = '<li href="#" class="list-group-item text-left">';
    followerHtml += '<img class="follower-photo" src="' + follower.avatar_url + '">';
    followerHtml += '<label class="name" >' + follower.login +'</label>';
    followerHtml += '<label class="pull-right">';
    followerHtml += '<a  class="btn btn-success btn-xs glyphicon glyphicon-ok follow" href="#" username="' + follower.login + '" title="Follow"></a>';
    followerHtml += '<a  class="btn btn-danger  btn-xs glyphicon glyphicon-trash unfollow" href="#"  username="' + follower.login + '" title="Unfollow"></a>';
    followerHtml += '<a  class="btn btn-info  btn-xs glyphicon glyphicon glyphicon-comment" href="'+follower.html_url+'" title="Ver Perfil"></a></label>';
    followerHtml += '<div class="break"></div> </li>';

    $('#followers-list').append(followerHtml);
}






$(document).ready(function(){
    /*$.get("https://api.github.com/user/following/rgomezcasas", function(data, responseBody, response){
        if (response.status == 204) {

        }
        else
        7    e.preventDefault();
    });*/
    showFollowers();
})
