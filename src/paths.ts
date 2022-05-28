import 'module-alias/register';
import { addAliases } from 'module-alias';

addAliases({
    '@src': `${__dirname}`,
    '@utils': `${__dirname}/utils`,
    '@types': `${__dirname}/types`,
    '@resolvers': `${__dirname}/resolvers`
})