interface User {
    id: number;
    name: string;
    password: string;
}

export default function userView(user: User) {
    const viewedUser = {
        name: user.name,
     }

     return viewedUser;
}