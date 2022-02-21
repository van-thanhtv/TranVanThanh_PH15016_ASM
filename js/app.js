var app = angular
  .module("mApp", ["ngRoute"])

  .service("Util", function Util() {
    this.getRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max + 1 - min) + min);
    };

    this.getRandomElementInArray = (args, numberElement) => {
      var resultArgs = [];
      var tempArgs = [...args];

      for (i = numberElement; i > 0;) {
        let index = this.getRandomNumber(0, tempArgs.length);
        if (tempArgs[index]) {
          resultArgs.push(tempArgs[index]);
          tempArgs.splice(index, 1);
          i--;
        }
      }

      return resultArgs;
    };
  })

  .service("SessionService", function sessionService() {
    this.create = key => {
      this.key = key;
      return this;
    };

    this.save = data => {
      sessionStorage.setItem(this.key, JSON.stringify(data));
    };

    this.remove = () => {
      sessionStorage.setItem(this.key, null);
    };

    this.isPresent = () => {
      var data = this.get();
      return data != null && data != "null" && data != undefined;
    };

    this.get = () => {
      return JSON.parse(sessionStorage.getItem(this.key));
    };
  })

  .service("SubjectService", [
    "$http",
    function SubjectService($http) {
      const http = "db/Subjects.js";

      this.subjects = [];

      this.getSubjects = () => {
        return $http.get(http);
      };

      $http.get(http).then(response => {
        this.subjects = response.data;
      });

      this.findSubjectsBySubjectId = subjectId => { //Lấy đối tượng khóa học theo ID
        let subjectResult = {};
        for (let i = 0; i < this.subjects.length; i++) {
          if (this.subjects[i].Id == subjectId) {
            subjectResult = this.subjects[i];
            break;
          }
        }
        return subjectResult;
      };
    },
  ])

  .service("QuizService", [ // lấy tài nguyên qz theo mã id
    "$http",
    function QuizService($http) {
      this.getQuizsBy = subjectId => {
        const http = `db/Quizs/${subjectId}.js`;
        return $http.get(http);
      };

      this.getInfoTest = function (myAnswers, allQuestions) {
        var testInfo = {};
        testInfo.detail = [];
        testInfo.totalScores = 0;
        testInfo.correctAnswer = 0;
        testInfo.incorrectAnswer = 0;

        for (let i = 0; i < allQuestions.length; i++) {
          let isCorrect =
            myAnswers[i] && myAnswers[i] == allQuestions[i].AnswerId;
          let scores = 0;

          if (isCorrect) {
            testInfo.correctAnswer++;
            scores = allQuestions[i].Marks;
          } else {
            testInfo.incorrectAnswer++;
          }

          testInfo.totalScores += scores;
          testInfo.detail.push({
            questionText: allQuestions[i].Text,
            correct: isCorrect,
            scores: scores,
          });
        }
        return testInfo;
      };
    },
  ])

  .service("StudentService", [
    "$http",
    function StudentService($http) {
      const http = "http://localhost:3000/Students";
      // const http = "/db/Students";      
      const myStorage =  new MyLocalStorage("useStudents");//Tạo LocalStorage
      console.log(localStorage);
      // localStorage.clear();

      this.getAllStudent = () => {
        return myStorage.get();
      };

      if (this.getAllStudent() == null) {
        $http.get(http).then(response => {
          myStorage.save(response.data);
        });
      }

      this.saveAll = students => {
        myStorage.save(students);
      };

      this.findStudentsById = username => {// Lấy đối tượng sinh viên theo ID
        var students = this.getAllStudent();
        for (let i = 0; i < students.length; i++) {
          if (username === students[i].username) {
            return students[i];
          }
        }
        return null;
      };

      this.existByUsername = username => {// Check trùng username
        return this.findStudentsById(username) != null;
      };

      this.appendStudent = student => {//Thêm sinh viên
        if (!this.existByUsername(student.username)) {//Kiểm tra trùng username
          var students = myStorage.get();
          var index = students.push(student) - 1;//Thêm vào LocalStorage
          this.saveAll(students);//Lưu vào localStorage
          return index;
        }
        return -1;
      };

      this.indexOf = student => {//Trả về vị trí đối tượng trong mảng
        var students = this.getAllStudent();
        for (let i = 0; i < students.length; i++) {
          if (student.username == students[i].username) {
            return i;
          }
        }
        return -1; // Không có thì trả về -1
      };

      this.updateStudent = newStudent => {//Cập nhập tài khoản
        var students = this.getAllStudent();
        var oldStudent = this.findStudentsById(newStudent.username);
        if (oldStudent == null) {
          return null;
        }
        var index = this.indexOf(oldStudent);
        students[index] = newStudent;
        this.saveAll(students);
        return newStudent;
      };
    },
  ]);