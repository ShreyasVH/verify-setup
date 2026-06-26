const backend = require('../backend/swagger');

const language = 'php';
const framework = 'phalcon';
const repoName = 'phalcon-swagger';
const domain = 'https://swagger.phalcon.com';
const swaggerUrl = '/swagger-ui/index.html';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName, swaggerUrl);
}

exports.verify = verify;