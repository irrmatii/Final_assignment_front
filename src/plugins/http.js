module.exports = {
    get: (url) => {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    },
    post: (url, data) => {
        return new Promise((resolve, reject) => {
            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            };
            fetch(url, options)
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    },
    getToken: (url, token) => {
        return new Promise((resolve, reject) => {
            const options = {
                method: "GET",
                headers: {
                    authorization: token,
                    "content-type": "application/json"
                }
            };
            fetch(url, options)
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    },
    postToken: (url, data, token) => {
        return new Promise((resolve, reject) => {
            console.log(data);
            const options = {
                method: "POST",
                headers: {
                    authorization: token,
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            };
            fetch(url, options)
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }
};