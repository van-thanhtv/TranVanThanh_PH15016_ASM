app
    .component('introduce', {
        templateUrl: "/component/content/menu/introduce.html",
        controller: introduce
    });

function introduce($rootScope) {
    $rootScope.setTitle("Giới thiệu");    
};