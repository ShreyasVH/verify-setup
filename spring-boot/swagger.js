const backend = require('../backend/swagger');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-swagger';
const domain = 'https://swagger.springboot.com';
const swaggerUrl = '/swagger-ui/index.html';

const start = async () => {
    await backend.start(language, framework, repoName, domain);
};

const stop = async () => {
    await backend.stop(language, framework, repoName);
};

const verify = async () => {
    return await backend.verify(domain, language, framework, repoName, swaggerUrl);
}

exports.verify = verify;
exports.start = start;
exports.stop = stop;