app.component("profileContent", {
  templateUrl: "/component/content/profile/profileTemplate.html",
  controller: profileController,
});

function profileController($rootScope, SessionService, StudentService) {
  const userStorage = SessionService.create("user");

  var getTotalScores = subjects => {
    var totalScores = (sumScores = 0);
    if (subjects && subjects.length > 0) {
      subjects.forEach(subject => (sumScores += subject.testInfo.totalScores));
      totalScores = sumScores / subjects.length;
    }
    return totalScores;
  };

  this.student = $rootScope.account;
  this.student.marks = getTotalScores(this.student.subjects);
  StudentService.updateStudent(this.student);
  userStorage.save(this.student);

  $rootScope.setTitle(this.student.fullname);
}
