// The URL of your local server, frontend and backend domain is written in allowedCors
const allowedCors = [
	'http://localhost:3000',
	'http://localhost:3001',
	'http://pindie-backend-orbit.nomoredomainswork.ru',
	'https://pindie-backend-orbit.nomoredomainswork.ru',
	'http://pindie-frontend-orbit.nomoredomainswork.ru',
	'https://pindie-frontend-orbit.nomoredomainswork.ru'
];

function cors(req, res, next) {
	const { origin } = req.headers;

	if (allowedCors.includes(origin)) {
		res.header('Access-Control-Allow-Origin', origin);
	}
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
	res.header(
		'Access-Control-Allow-Headers',
		'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
	);
	next();
}

module.exports = cors;