app.component('endQuiz', {
    templateUrl: '/component/content/quizs/end-quiz/endQuizTemplate.html',
    controller: function EndQuizController($routeParams, $rootScope, $location) {
        this.subject = $rootScope.account.subjects.find(
            subject => subject.Id == $routeParams.idSubject
        )
        $rootScope.setTitle(this.subject.Name)
    }
})