const validateEmail = (email) => {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  const validateName = (name) => {
    var regex = /^[A-Za-z\s]+$/;
    return regex.test(name); 
  }

  const validateAmount = (n) => {
    return !isNaN(parseFloat(n)) && !(n>0);
  }
  
  const validators = {
    validateEmail,
    validateName,
    validateAmount,
  }

  export {validators}