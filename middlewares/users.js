const users = require('../models/user');
const bcrypt = require('bcryptjs');

const createUser = async (req, res, next) => {
	try {
		req.user = await users.create(req.body);
		next();
	} catch (error) {
		res.status(400).send('Ошибка при создании марципанчика');
	}
};

const hashPassword = async (req, res, next) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(req.body.password, salt);
		req.body.password = hash;
		next();
	} catch (error) {
		res.status(400).send({ message: 'Ошибка хеширования пароля' });
	}
};

const findAllUsers = async (req, res, next) => {
	console.log('GET /api/users');
	req.usersArray = await users.find({}, { password: 0 });
	next();
};

const findUserById = async (req, res, next) => {
	console.log('GET /api/users/:id');
	try {
		req.user = await users.findById(req.params.id, { password: 0 });
		next();
	} catch (error) {
		res.status(404).send('Марципанчик не найден');
	}
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
	if (!req.body.username || !req.body.email || !req.body.password) {
		res.setHeader('Content-Type', 'application/json');
		res.status(400).send(JSON.stringify({ message: 'Введите имя, email и пароль' }));
	} else {
		next();
	}
};

const checkEmptyNameAndEmail = async (req, res, next) => {
	if (!req.body.username || !req.body.email) {
		res.setHeader('Content-Type', 'application/json');
		res.status(400).send(JSON.stringify({ message: 'Введите имя и email' }));
	} else {
		next();
	}
};

const checkIsUserExists = async (req, res, next) => {
	const isInArray = req.usersArray.find((user) => {
		return req.body.email === user.email;
	});
	if (isInArray) {
		res.setHeader('Content-Type', 'application/json');
		res.status(400).send(JSON.stringify({ message: 'Пользователь с таким email уже существует' }));
	} else {
		next();
	}
};

const updateUser = async (req, res, next) => {
	try {
		req.user = await users.findByIdAndUpdate(req.params.id, req.body);
		next();
	} catch (error) {
		res.setHeader('Content-Type', 'application/json');
		res.status(400).send(JSON.stringify({ message: 'Ошибка обновления марципанчика' }));
	}
};

const deleteUser = async (req, res, next) => {
	try {
		req.user = await users.findByIdAndDelete(req.params.id);
		next();
	} catch (error) {
		res.setHeader('Content-Type', 'application/json');
		res.status(400).send(JSON.stringify({ message: 'Ошибка удаления марципанчика' }));
	}
};

module.exports = {
	findAllUsers,
	createUser,
	findUserById,
	updateUser,
	deleteUser,
	checkEmptyNameAndEmailAndPassword,
	checkEmptyNameAndEmail,
	checkIsUserExists,
	hashPassword
};