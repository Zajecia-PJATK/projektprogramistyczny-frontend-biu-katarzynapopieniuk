export default function getUserByEmail(email, accounts) {
    if(email === "") {
        return null;
    }
    var existingAccount = accounts.filter(account => account.email === email);
    if(existingAccount.length > 0) {
        return existingAccount[0];
    }

    return null;
}