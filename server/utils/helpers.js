function generateUserData() {
    return {
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`,
        cart: []
    };
}

module.exports = {
    generateUserData
};
