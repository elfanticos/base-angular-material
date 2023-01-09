export interface IUserToken {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    utente: IUser;
}

export class UserToken implements IUserToken {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    utente: IUser;
    constructor(data: any) {
        this.access_token = data?.access_token;
        this.expires_in = data?.expires_in;
        this.token_type = data?.token_type;
        this.scope = data?.scope;
        this.utente = new User(data?.utente);
    }
}

export interface IUser {
    username: string;
    nome: string;
    cognome: string;
    mail: string;
    ente: string;
    matricolaAgente: string;
}

export class User implements IUser {
    username: string;
    nome: string;
    cognome: string;
    mail: string;
    ente: string;
    matricolaAgente: string;
    constructor(data: any) {
        this.username = data?.username;
        this.nome = data?.nome;
        this.cognome = data?.cognome;
        this.mail = data?.mail;
        this.ente = data?.ente;
        this.matricolaAgente = data?.matricolaAgente;
    }

}