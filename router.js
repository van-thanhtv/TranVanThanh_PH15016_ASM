app
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                template: "<subjects-content></subjects-content>" // Gọi đến thành phần được tạo ở các file js
            })
            .when("/start/:id", {
                template: "<start-quiz></start-quiz>"
            })
            .when("/test/:id", {
                template: "<quizs-content></quizs-content>"
            })
            .when("/authenticate", {
                templateUrl: "/templates/authenticate.html"
            })
            .when("/end/:idSubject", {
                template: "<end-quiz></end-quiz>"
            })
            .when("/profile", {
                template: "<profile-content></profile-content>"
            })
            .when("/pass", {
                template: "<update-pass></update-pass>"
            })
            .when("/register", {
                template: "<register></register>"
            })
            .when("/contact", {
                template: "<contact></contact>"
            })
            .when("/feedback", {
                template: "<feedback></feedback>"
            })
            .when("/answers", {
                template: "<answers></answers>"
            })
            .when("/introduce", {
                template: "<introduce></introduce>"
            })
            .when("/edit/profile", {
                template : "<update-profile></update-profile>"
            })
            .otherwise({
                redirectTo: "/"
            });
    })

    .run(($rootScope, $location) => {
        $rootScope.$on('$locationChangeStart', (event, next, current) => {
            var urls = ["/", "/authenticate", "", "/register","/feedback","/contact","/introduce","/answers"];//Ngoài những trang này những trang khác phải đăng nhập mới vào được
            if (urls.indexOf($location.path()) < 0 && !$rootScope.isLogin()) {
                $location.path("/authenticate");
            }
        });
    })