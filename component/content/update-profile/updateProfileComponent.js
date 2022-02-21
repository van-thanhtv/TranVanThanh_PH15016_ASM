app
    .component('updateProfile', {
        templateUrl: "/component/content/update-profile/updateTemplate.html",
        controller: updateProfileController
    });

function updateProfileController($rootScope, SessionService, StudentService) {

    this.account = angular.copy($rootScope.account);
    const session = SessionService.create("user");

    this.save = () => {
        $rootScope.account = angular.copy(this.account);
        StudentService.updateStudent(this.account);
        session.save(this.account);
        this.success = true;
    };
};