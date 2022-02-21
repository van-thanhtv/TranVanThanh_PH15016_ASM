app
    .component('startQuiz', {
        templateUrl: "/component/content/quizs/start-quiz/startsQuizTemplate.html",
        controller: function StartQuizController($routeParams, SubjectService, $rootScope, $location) {

            this.subject = SubjectService.findSubjectsBySubjectId($routeParams.id);
            this.isLogin = $rootScope.isLogin();
            $rootScope.setTitle(this.subject.Name);
        }
    })