App.factory('PaymentSrv', function ($http) {
     return {
          setUser: function(value) {
            this.user = value;
            // this.ccExpiryDate = value.ccExpiryDate;
            // this.ccName = value.ccName;
            // this.email = value.email;
            // this.creditCardNumber = value.ccNumber;
            // this.creditCardNumber = value.ccNumber;
            // this.creditCardNumber = value.ccNumber;
            // this.creditCardNumber = value.ccNumber;
            // this.creditCardNumber = value.ccNumber;
            // this.creditCardNumber = value.ccNumber;
          },
        //  setCreditCardNumber: function(value) {
        //     this.creditCardNumber = value;
        //  },
        //  setCreditCardExpiryDate: function(value) {
        //    this.creditCardExpiryDate = value;
        //  },
        //  setSelectedCreditCardName: function(value) {
        //    this.creditCardName;
        //  },
        //  setEmail: function(value) {
        //    this.email = value;
        //  },
        //  setCountry: function(value) {
        //    this.country = value;
        //  },
        //  setAddress1: function(value) {
        //    this.address1 = value;
        //  },
        //  setAddress2: function(value) {
        //    this.address2 = value;
        //  },
        //  setState: function(value) {
        //    this.state = value;
        //  },
        //  setCountry: function(value) {
        //    this.country = value;
        //  },
        //  setContactNumber: function(value) {
        //    this.contactNumber = value;
        //  },



         getUser: function() {
           return this.user;
         }
     };
 });
