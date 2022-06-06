import crypto from 'crypto';

 const hash = (string:string) => crypto.createHash('sha256').update(string).digest('base64');

 const hash_compare = (first_item:undefined, second_item:undefined) => Object.is(first_item, second_item);


 export default { hash , hash_compare}