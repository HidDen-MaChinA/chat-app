import { create } from 'zustand';

export type loggedUserType = {
    bio:string,
    createdAt:string,
    deletedAt:string | null,
    email:string,
    googleId:string | null,
    id:number,
    name:string,
    status:number,
    updatedAt:string,
    [arsgs:string]:any
}

export type storeType = {
    authorization: "authorized" | "unauthorized";
    authorize: () => void;
    unauthorize: ()=> void;
    registryUser:(args:loggedUserType)=>void;
    loggedUser:loggedUserType | null
}

export const store = create<storeType>((set) => ({
    authorization: "unauthorized",
    authorize: () => {
        set((state) => (
                { ...state, authorization: 'authorized' }
            )
        )
    },
    unauthorize: () => {
        set((state)=>(
            {...state,authorization:'unauthorized',loggedUser:null}
        ))
    },
    registryUser:(args) => {
        set((state)=>(
            {...state, loggedUser:{
                bio:args.bio,
                createdAt:args.createdAt,
                deletedAt:args.deletedAt,
                email:args.email,
                googleId:args.googleId,
                id:args.id,
                name:args.name,
                status:args.status,
                updatedAt:args.updatedAt
            }}
        ))
    },
    loggedUser:null
})
)