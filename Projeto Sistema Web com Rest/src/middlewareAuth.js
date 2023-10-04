const jwtService = require('jsonwebtoken');

const noSecurityRoutes = [
  { route: '/api/users', method: 'POST' },
  { route: '/login', method: 'POST' }
];

module.exports = async (req, res, next) => {
  const route = req.path;
  const method = req.method;

  const isSecureRoute = noSecurityRoutes.some((noSecRoute) => {
    return noSecRoute.route === route && noSecRoute.method === method;
  });

  if (isSecureRoute) {
    return next();
  }

  let token = req.body.authorization;
  if (!token) {
    res.status(401).json({ message: 'Você não tem autorização para acessar esse recurso' });
    return;
  }
  
  token = token.split(' ')[1];
  const secret = process.env.SECRET;
  
  try {
    const user = await jwtService.verify(token, secret);
    return next();
  } catch (err) {
    res.status(403).json({ message: 'Usuário não autorizado' });
    return;
  }
};
