const bcrypt = require('bcryptjs');

import { apiHandler, usersRepo } from 'helpers/api';

export default apiHandler({
    post: register
});

function register(req, res) {
    // split out password from user details 
    const { password, ...user } = req.body;

    // validate
    if (usersRepo.find(x => x.ra === user.ra))
        throw `Um usuário já está utilizando o RA "${user.RA}", contacte seu representante de sala para recupera-lo`;

    // hash password
    user.hash = bcrypt.hashSync(password, 10);    

    usersRepo.create(user);
    return res.status(200).json({});
}
