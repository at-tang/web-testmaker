export class FetchResult {
    status: number;
    message: string;
    result: any;

    public constructor(status: number, message: string, result: any) {
        this.status = status;
        this.message = message;
        this.result = result;
    }

    public ok() {
        return this.status >= 200 && this.status <= 299;
    }
}

export async function authGetFetch(url: String, idToken?: String, method: String) {


    try {
        const response = await fetch (`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, 
            {
                method: method,

                headers: (idToken) ? {"Authorization": `Bearer ${idToken}`, "Content-Type": "application/json"} : {"Content-Type": "application/json"}
            }
        )

        if (!response.ok) throw new Error();

        const result = await response.json();
        return new FetchResult(response.status, response.statusText, result);


    } catch (error) {
        console.error(error);
        return new FetchResult(404, "", null);
    }
}