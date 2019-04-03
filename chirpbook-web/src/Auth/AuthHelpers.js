import decode from 'jwt-decode';


export default class AuthHelpers
{
    constructor(domain)
    {
        this.domain = domain || process.env.API_HOST || `http://localhost/api/v1`;
        this.fetch = this.fetch.bind(this);
        this.login = this.login.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
        this.getToken = this.getToken.bind(this);

    }

    login(token)
    {
        this.saveToken(token);
        this.saveUserid(decode(token).userid);
    }

    isTokenExpired(token)
    {
        try
        {
            const decoded = decode(token);
            if(decoded.exp < Date.now() / 1000)
            {
                return true;
            }
            else
                return false;
        }
        catch(err)
        {
            return true;
        }
    }


    isLoggedIn()
    {
        const token = this.getToken()
        return token != null && !this.isTokenExpired(token)
    }

    saveUserid(userid)
    {
        localStorage.setItem('userid', userid)
    }

    saveToken(idToken)
    {
        localStorage.setItem('id_token', idToken);
    }

    getToken()
    {
        return localStorage.getItem('id_token');
    }

    getUser()
    {
        return localStorage.getItem('userid')
    }

    logout()
    {
        localStorage.removeItem('id_token');
        localStorage.removeItem('userid')
    }

    fetch(url, options)
    {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if(this.isLoggedIn())
        {
            headers['Authorization'] = 'Bearer ' + this.getToken();
            let path = this.domain + url
            return fetch(path, {headers, ...options}).then(this._checkStatus).then(response => response.json());
        }
    }

    _checkStatus(response)
    {
        if(response.status >= 200 && response.status < 300)
        {
            return response;
        } else
        {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
}