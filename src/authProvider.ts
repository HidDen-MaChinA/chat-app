import { getAuth, createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import {GlobalStore} from './store';

const config = {
    apiKey:"",
    projectId:""
}

const app=initializeApp(config,"franco-firebase-app-10")
const auth = getAuth(app)
export async function createUser(email:string,password:string):Promise<UserCredential|void>{
    return createUserWithEmailAndPassword(auth,email,password).catch((e)=>{console.log(e)})
}
export async function identifieCredential(email:string,password:string){
    console.log(email + password)
    return signInWithEmailAndPassword(auth,email,password).catch((e)=>{console.log(e)})
}