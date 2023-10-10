import bcrypt from 'bcrypt'

// export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(15, 10))
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(15))

export const validatePassword = (passwordSend, passwordBDD) => bcrypt.compareSync(passwordSend, passwordBDD)