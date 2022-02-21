app
    .component('answers', {
        templateUrl: "/component/content/menu/Answers.html",
        controller: Answers
    });

function Answers($rootScope) {
    $rootScope.setTitle("Hỏi đáp");    
};