const isPalindrome = (str) => { 
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const reversed = cleanedStr.split('').reverse().join('')

    return cleanedStr === reversed;

    console.log("")
}

// console.log(isPalindrome("Socorram-me, subi no ônibus em Marrocos")); 