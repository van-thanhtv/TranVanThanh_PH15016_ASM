app.component('quizsContent', {
    controller: function quizsContentController(StudentService, $interval, $rootScope, SubjectService, QuizService, $routeParams, SessionService, $location, Util) {

        let ctrl = this;
        const myLocalStorage = new MyLocalStorage("testInfo");
        const mySessionStorage = SessionService.create('user');
        ctrl.timer = {};


        (function init() {
            var testInfo;
            ctrl.index = 0;
            ctrl.myAnswers = [];
            ctrl.timer.value = 5 * 60;
            if (!myLocalStorage.isPresent()) {
                loadQuestions();
            } else {
                testInfo = myLocalStorage.get();
                ctrl.questions = [...testInfo.questions];
                ctrl.index = testInfo.index;
                ctrl.myAnswers = [...testInfo.myAnswers];
                ctrl.timer.value = testInfo.time;
                myLocalStorage.clear();
            }
        })();

        for (let i = 0; i < $rootScope.account.subjects.length; i++) {
            let subject = $rootScope.account.subjects[i];
            if (subject.Id == $routeParams.id) {
                $location.path(`/end/${$routeParams.id}`);
                return;
            }
        }

        // lấy môn học từ url param
        ctrl.subject = SubjectService.findSubjectsBySubjectId($routeParams.id);

        var intervalCountdown;

        var countdown = () => {
            let minuteAndSecond = getMinutesAndSeconds(ctrl.timer.value);
            ctrl.timer.minutes = minuteAndSecond.minutes;
            ctrl.timer.seconds = minuteAndSecond.seconds;
            if (--ctrl.timer.value < 0) {
                ctrl.timer.value = 0;
                $location.path(`/end/${$routeParams.id}`);
            }
        }
        (function () {
            countdown();
            intervalCountdown = $interval(() => {
                countdown();
            }, 1000);
        })();

        function stopCountDown() {
            $interval.cancel(intervalCountdown);
        };

        let quizNumber = 10;
        ctrl.step = 1;
        ctrl.maxIndex = quizNumber - ctrl.step;
        // Lấy quizs theo môn học
        function loadQuestions() {
            QuizService.getQuizsBy($routeParams.id).then((response) => {
                ctrl.questions = Util.getRandomElementInArray(response.data, 10);
                ctrl.questions.forEach(question => {
                    let newAnswers = Util.getRandomElementInArray(question.Answers, question.Answers.length);
                    question.Answers = newAnswers;
                });
                $rootScope.setTitle(ctrl.questions[ctrl.index].Text);
            });
        }

        // Phân trang
        ctrl.hasNext = () => {
            return ctrl.index < ctrl.maxIndex;
        };

        ctrl.hasPrev = () => {
            return ctrl.index > 0;
        }

        ctrl.next = () => {
            if (ctrl.hasNext()) {
                ctrl.index += ctrl.step;
                $rootScope.setTitle(ctrl.questions[ctrl.index].Text);
            }
        };

        ctrl.prev = () => {
            if (ctrl.hasPrev()) {
                ctrl.index -= ctrl.step;
                $rootScope.setTitle(ctrl.questions[ctrl.index].Text);
            }
        }

        // finish test
        ctrl.finish = function () {
            ctrl.subject.testInfo = QuizService.getInfoTest(ctrl.myAnswers, ctrl.questions);
            ctrl.subject.testInfo.endTime = new Date();
            $rootScope.account.subjects.push(ctrl.subject);
            mySessionStorage.save($rootScope.account);
            StudentService.updateStudent(angular.copy($rootScope.account));
        };

        ctrl.$onDestroy = function destroy() {
            console.log("destroy");
            var testInfo = {};
            testInfo.time = ctrl.timer.value;
            testInfo.questions = [...ctrl.questions];
            testInfo.myAnswers = [...ctrl.myAnswers];
            testInfo.index = ctrl.index;
            myLocalStorage.save(testInfo);

            if (ctrl.timer.value > 0 && !confirm("Bạn đang làm bài kiểm tra, nếu rời khỏi hệ thống sẽ tính điểm !\nBạn có muốn thoát hay không ? ")) {
                $location.path(`/test/${ctrl.subject.Id}`);
            } else {
                stopCountDown();
                myLocalStorage.clear();
                ctrl.finish();  
            }
        };
    },
    controllerAs: "ctrl",
    templateUrl: "/component/content/quizs/quizTemplate.html"
});

function formatTime(param) {
    return param < 10 ? "0" + param : param;
}

function getMinutesAndSeconds(duration) {
    let minutes = parseInt(duration / 60, 10);
    let seconds = parseInt(duration % 60, 10);

    minutes = formatTime(minutes);
    seconds = formatTime(seconds);

    return {
        minutes: minutes,
        seconds: seconds
    };
}