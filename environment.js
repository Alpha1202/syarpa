import active from './active.env';

const envs = {
  dev: {
    loqateKey: 'HD99-ZT77-FE57-DK32',
  },
  stage: {
    loqateKey: 'HD99-ZT77-FE57-DK32',
  },
  prod: {
    loqateKey: 'HD99-ZT77-FE57-DK32',
  },
};

const env = envs[active];

export default env;

