export default class HttpUtil {
  static async _makeRequest(url, options = { method: "GET" }) {
    const response = await fetch(url, options);
    return response.json();
  }

  static async get(url) {
    return HttpUtil._makeRequest(url);
  }

  static async postData(url, data = {}) {
    return HttpUtil._makeRequest(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
          "Content-Type": "application/json",
          // "Authorization" : "SOME TOKEN" < add auth maybe?
          // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(data),
    });
  }
}