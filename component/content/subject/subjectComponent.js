app.component('subjectsContent', {
    templateUrl: "/component/content/subject/subjectTemplate.html",
    controller: function subjectsContentController(SubjectService, $rootScope) {
        $rootScope.setTitle("Online Training");
        this.key = $rootScope.key;
        if ($rootScope.account) {
            this.hasTested = $rootScope.account.hasTested;
        }
        SubjectService.getSubjects().then(response => {
            this.subjects = [...response.data];

            this.pageSize = 4;
            this.index = this.minIndex = 0;

            this.maxIndex = (this.subjects.length) - this.pageSize;

            this.hasNext = () => {
                return this.index < this.maxIndex;
            };

            this.hasPrev = () => {
                return this.index > (this.minIndex + this.pageSize - 1);
            };

            this.first = () => {
                this.index = this.minIndex;
            };

            this.last = () => {
                this.index = this.maxIndex;
            };

            this.next = () => {
                if (this.hasNext()) {
                    this.index += this.pageSize;
                }
            };

            this.prev = () => {
                if (this.hasPrev()) {
                    this.index -= this.pageSize;
                }
            };

        });
    }
});