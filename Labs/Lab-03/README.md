# Lab 03 - JavaScript password strength

Write a function called `isStrongPassword()` in script.js that has a single password parameter. The function should return true only if all the following conditions are true:

- The password is at least 8 characters long.
- The password does not contain the string "password".
  - Hint: Use `indexOf()` to search for "password".
- The password contains at least one uppercase character.
  - Hint: Call the string method `charCodeAt(index)` to get the Unicode value of each character in the password. If a character code is between 65 and 90 (the Unicode values for A and Z), then an uppercase character is found.

If any of the above conditions are false, `isStrongPassword()` should return false.

Below are example calls to `isStrongPassword()`:

    isStrongPassword("Qwerty");         // false - Too short
    isStrongPassword("passwordQwerty")  // false - Contains "password"
    isStrongPassword("qwerty123")       // false - No uppercase characters
    isStrongPassword("Qwerty123")       // true
