interface User {
    id: number;
    name: string;
    password: string;
}

export default function userView(user: User) {
    const viewedUser = { 
        id: user.id,
        name: user.name,
     }

     return viewedUser;
}