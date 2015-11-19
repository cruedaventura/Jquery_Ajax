$('#search').on('click', function() {
    var username = $('#search-field').val();

    search(username, function(data, requestBody, request){
        var linksParser = new LinksParser();
        var linkHeader = request.getResponseHeader('Link');
        linksParser.buildLinks(linkHeader);
        $('#search-users-list').html('');

        $.each(data.items, function (index, user) {
            formatUser(user);
        });
        var prevLink = linksParser.getLink('prev');
        var nextLink = linksParser.getLink('next');

        if(prevLink == null){
            $('#prev').hide();
        }else{
            $('#prev').show();
        }
        if(nextLink == null){
            $('#next').hide();
        }else{
            $('#next').show();
        }
        $('#next').attr('data-url', nextLink);
        $('#prev').attr('data-url', prevLink);  

    });
});

$('.paginate-link').on('click', function() {
    var url = $(this).attr('data-url')
    if (url ==  null){
        return false;
    }
    searchPaginated(url, function(data, requestBody, request){
        var linksParser = new LinksParser();
        var linkHeader = request.getResponseHeader('Link');
        linksParser.buildLinks(linkHeader);
        $('#search-users-list').html('');

        $.each(data.items, function (index, user) {
            formatUser(user);
        });
        var prevLink = linksParser.getLink('prev');
        var nextLink = linksParser.getLink('next');
        
        if(prevLink == null){
            $('#prev').hide();
        }else{
            $('#prev').show();
        }
        if(nextLink == null){
            $('#next').hide();
        }else{
            $('#next').show();
        }
        $('#next').attr('data-url', nextLink);
        $('#prev').attr('data-url', prevLink); 
    });
});


function formatUser(user) {
    
    var userHtml = '<li href="#" class="list-group-item text-left">';
    userHtml += '<img class="user-photo" src="' + user.avatar_url + '">';
    userHtml += '<label class="name" >' + user.login +'</label>';
    userHtml += '<label class="pull-right">';
    userHtml += '<a  class="btn btn-success btn-xs glyphicon glyphicon-ok follow" href="#" username="' + user.login + '" title="Follow"></a>';
    userHtml += '<a  class="btn btn-danger  btn-xs glyphicon glyphicon-trash unfollow" href="#"  username="' + user.login + '" title="Unfollow"></a>';
    userHtml += '<a  class="btn btn-info  btn-xs glyphicon glyphicon glyphicon-comment" href="'+user.html_url+'" title="Ver Perfil"></a></label>';
    userHtml += '<div class="break"></div> </li>';

    $('#search-users-list').append(userHtml);
}

$('#search-users-list').on('click', '.follow', function () {
    var username = $(this).attr('username');  
    follow(username);
    alert('Ahora sigues al usuario:'+ username);
});

$('#search-users-list').on('click', '.unfollow',function () {
    var username = $(this).attr('username');
    unfollow(username);
    alert('Ya no sigues al usuario:'+ username);
});

function LinksParser(){
    var links;
    this.buildLinks = function(header){
        if (header != null ) {
            this.links = weblinking.parseHeader(header);
        } else {
            this.links = weblinking.parseHeader('');
        }
    }

    this.getLink = function(rel){
       var links = this.links.getLinkValuesByRel(rel);
       if (typeof(links[0]) != "undefined"){
        return links[0].href;
       }

       return null;
    }

    /*this.toHTML = function(){
        var html = '';
        $.each(this.searchs, function(i, v) {
            var search = v;
            html = html.concat('<br><strong> Name: ' + search.name + '</strong><br>');
            
        });
        
        html = html.concat(' <br> ');

                var prev = this.getLink('prev');
        if (prev.length == 1) {
            html = html.concat(' <a onClick="getRepos(\'' + prev[0].href + '\');" style="cursor: pointer; cursor: hand;">[Prev]</a> ');
        }
                var next = this.getLink('next');
        if (next.length == 1) {
            html = html.concat(' <a onClick="getRepos(\'' + next[0].href + '\');" style="cursor: pointer; cursor: hand;">[Next]</a> ');
        }

        return html;    
    }*/

}

