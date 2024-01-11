const isValidISBN = (isbn) => {
    const cleanedISBN = isbn.replace(/-/g, '');

    // Checking if the ISBN is either 10 or 13 digits
    if (cleanedISBN.length !== 10 && cleanedISBN.length !== 13) {
        return false;
    }

    // Checking sum calculation for ISBN-10
    if (cleanedISBN.length === 10) {
        let checksum = 0;

        for (let i = 0; i < 9; i++) {
            checksum += (i + 1) * parseInt(cleanedISBN.charAt(i), 10);
        }

        const lastDigit = cleanedISBN.charAt(9);
        checksum = checksum % 11 === 10 ? 'X' : checksum % 11;

        return lastDigit === checksum.toString();
    }

    // Checking sum calculation for ISBN-13
    if (cleanedISBN.length === 13) {
        let checksum = 0;

        for (let i = 0; i < 12; i++) {
            checksum += (i % 2 === 0 ? 1 : 3) * parseInt(cleanedISBN.charAt(i), 10);
        }

        const lastDigit = cleanedISBN.charAt(12);

        return (10 - (checksum % 10)) % 10 === parseInt(lastDigit, 10);
    }

    return false;
}


module.exports = isValidISBN