const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import getConfig from 'next/config';

import { apiHandler, usersRepo } from 'helpers/api';

const { serverRuntimeConfig } = getConfig();

export default apiHandler({
    post: authenticate
});

function authenticate(req, res) {
    const { ra, password } = req.body;
    const user = usersRepo.find(u => u.ra === ra);

    // validate
    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'RA ou a senha está incorreto';
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });
    user.token = token
    // return basic user details and token
    return res.status(200).json(user);
}
