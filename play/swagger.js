const backend = require('../backend/swagger');

const language = 'java';
const framework = 'play';
const repoName = 'play-swagger';
const domain = 'https://swagger.playframework.com';
const swaggerUrl = '/swagger-ui/index.html';

const verify = async (repoType) => {
    return await backend.verify(repoType, domain, language, framework, repoName, swaggerUrl);
}

exports.verify = verify;