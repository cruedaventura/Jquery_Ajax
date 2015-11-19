$("#button_to_create").click(function(e) {
    e.preventDefault();

    var newRepo = new Object();
    newRepo.name = $("#repository_name_to_create").val();
    newRepo.description = $("#description_to_create").val();
    newRepo.homepage = "https://github.com";
    newRepo.private = false;
    newRepo.has_issues = true;
    newRepo.has_wiki = true;
    newRepo.has_downloads = true;

    createRepo(newRepo);
});
