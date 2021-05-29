const apiPath = 'http://localhost:3009/api/heart/'

export const ValidateHeartServer = (): Promise<any> => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'pragma': 'no-cache',
            'cache-control': 'no-cache'
        },
    };
    return (fetch(`${apiPath}`, requestOptions)).then((response) => {
        return response.json();
    })
}