app.controller("mainCtrl", ($rootScope, $scope, SessionService, $window) => {

    $rootScope.title = "Online Training";
    $rootScope.key = {};

    var storageUser = SessionService.create("user");

    $rootScope.setTitle = (name) => {
        $rootScope.title = name;
    };

    if (storageUser.isPresent()) {
        $rootScope.account = storageUser.get();
        $rootScope.account.getFirstName = () => {
            let fullname = $rootScope.account.fullname.trim();
            // let firstName = fullname.substring(fullname.lastIndexOf(" "));
            return fullname;
        };
        if (!$rootScope.account.subjects) {
            $rootScope.account.subjects = [];
        }
        $rootScope.account.hasTested = (subjectId) => {
            let subjects = $rootScope.account.subjects;
            for (let i = 0; i < subjects.length; i++) {
                if (subjectId == subjects[i].Id) {
                    return true;
                }
            }
            return false;
        };
    };

    $rootScope.isLogin = () => {
        return storageUser.isPresent();
    };

    $scope.logOut = () => {
        storageUser.remove();
        $window.location.reload();
    };

});