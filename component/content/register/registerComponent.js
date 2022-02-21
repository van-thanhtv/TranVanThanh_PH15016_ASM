app
    .component('register', {
        templateUrl: "/component/content/register/registerTemplate.html",
        controller: registerController
    });

function registerController($rootScope, $window, StudentService) {
    $rootScope.setTitle("Đăng ký tài khoản")

    this.student = {};
    this.student.gender = true;
    this.birthday = new Date();

    this.validation = () => {
        if (StudentService.existByUsername(this.student.username)) {
            this.error_mesage = "Tên đăng nhập đã tồn tại ! Vui lòng nhập lại !";
            return false;
        }
        return true;
    }

    this.register = function () {
        this.student.birthday = dateToString(this.birthday);

        if (this.validation()) {
            StudentService.appendStudent(this.student);
            $window.location.href = "/templates/login.html";
        }
    };
};

function dateToString(date) {
    var year = date.getYear() + 1900;
    var month = date.getMonth() + 1;
    var date = date.getDate();

    return `${year}-${month}-${date}`;
};