export const isValidName = (name) => {
    return name.trim().length > 1 && name.trim().length <= 50 && /^[a-zA-Z ]+$/.test(name);
};

export const isValidEmail = (email) => {
    const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailFormat.test(email);
};

export const isValidPhoneNumber = (phoneNumber) => {
    return phoneNumber.trim().length === 10 && !['0', '1'].includes(phoneNumber[9]);
};