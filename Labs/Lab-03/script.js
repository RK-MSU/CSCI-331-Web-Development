// Your solution goes here 
let isStrongPassword = function(pass) {

    if(typeof pass !== "string") {
        //console.log("Password is not of type string.");
        return false;
    }

    let pass_len = pass.length;

    // check password length
    if(pass_len < 8) {
        //console.log("Password is less than 8 characters.");
        return false;
    }

    // check if "password" is a substring
    if(pass.indexOf("password") >= 0) {
        //console.log(`Cannot contain "password" as substring.`);
        return false;
    }

    // check for uppercase character
    let has_upper = false;

    for(var i = 0; i < pass_len; i++) { 
        // character code is between 65 and 90
        char = pass.charCodeAt(i);
        if(char >= 65 && char <= 90) {
            has_upper = true;
            break;
        }
    }

    if(has_upper == false) {
        //console.log(`Does not have an upper case character`);
        return false;
    }


    //console.log("Good Password: ", pass);
    return true;
};