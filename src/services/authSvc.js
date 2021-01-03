import Realm from "realm";
const app = getRealmApp();
export function getRealmApp() {
    const appId = 'atmakos-poiod'; // Set Realm app ID here.
    const appConfig = {
      id: appId,
      timeout: 10000,
    };
   return new Realm.App(appConfig);
 }
 export async function registerUser({email, password, ...custom}){
    await app.emailPasswordAuth.registerUser(email, password);
    const user = await loginEmailPassword(email, password);
    const {name, lastname, group} = custom;
    await user.mongoClient("mongodb-atlas").db("atmakos").collection("users").insertOne({
      userid:user.id,
      name,
      lastname,
      group
    })
    return user;
 }
export async function loginEmailPassword(email, password) {
    const credentials = Realm.Credentials.emailPassword(email, password);
    if(app.currentUser)
        return app.currentUser;
    const user = await app.logIn(credentials);
    return user
  }

 export async function anonymousLogin() {
    let user;
    try {
      const credentials = Realm.Credentials.anonymous(); // create an anonymous credential
      user = await app.logIn(credentials);
      return user;
    } catch (error) {
        throw `Error logging in anonymously: ${JSON.stringify(error,null,2)}`;
    }
  }