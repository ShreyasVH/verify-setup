const backend = require('../backend/swagger');

const language = 'java';
const framework = 'springboot';
const repoName = 'spring-boot-swagger';
const domain = 'https://swagger.springboot.com';
const swaggerUrl = '/swagger-ui/index.html';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName, swaggerUrl);
};

exports.verify = verify;