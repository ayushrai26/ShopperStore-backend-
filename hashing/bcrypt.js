const bcrypt = require('bcrypt')


// Hashing before password save
const hashedPassword = async (password)=>{
    const salt = await  bcrypt.genSalt(10)
     return await bcrypt.hash(password,salt)
}

const comparePassword = async (plainPassword, storedhashedPassword) => {
    return await bcrypt.compare(plainPassword, storedhashedPassword);
};

module.exports = {hashedPassword,comparePassword}