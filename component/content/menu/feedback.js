app
    .component('feedback', {
        templateUrl: "/component/content/menu/feedback.html",
        controller: Feedback
    });

function Feedback($rootScope) {
    $rootScope.setTitle("Giới Thiệu");    
};