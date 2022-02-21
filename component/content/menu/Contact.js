app
    .component('contact', {
        templateUrl: "/component/content/menu/Contact.html",
        controller: Contact
    });

function Contact($rootScope) {
    $rootScope.setTitle("Liên hệ");    
};