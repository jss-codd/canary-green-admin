// helper encryption library https://www.npmjs.com/package/crypto-js
import CryptoJS from "crypto-js";

// encryption secret key, ideally should be an environment variable
const secret = "!-09-canary-admin-!<#1~";

// encrypt data
const encrypt = (data: string | number) => {
	if (data != null) {
		return CryptoJS.AES.encrypt(
			JSON.stringify(data),
			secret
		).toString();
	}
	return "";
};

// decrypt encrypted data
const decrypt = (ciphertext: string | null) => {
	try {
		if (
			ciphertext != null &&
			ciphertext !== "null"
		) {
			let bytes = CryptoJS.AES.decrypt(ciphertext.toString(), secret);
			let decrypted = bytes.toString(CryptoJS.enc.Utf8);
			return JSON.parse(decrypted);
		}
		return null;
	} catch (e) {
		return null;
	}
};

// store in localStorage
const store = (key: string, value: string) => {
	return localStorage.setItem(key, value);
};

// read from localstorage
const read = (key: string) => {
	return localStorage.getItem(key);
};

// get new expiry
const getExpiry = (expiryDuration: number) => {
	return (new Date().getTime() + Number(expiryDuration));
};

// check if expired
const isExpired = (expiry: string) => {
	return (new Date().getTime() > parseInt(expiry, 10));
};

// Encrypt and store with time expiry functionality
const storeExpiry = (key: string, value: any, expiryDuration: number, expiry = false) => {
	const encryptedData = encrypt(value);
	if (expiry === true) {
		const encryptedExpiry = encrypt(getExpiry(expiryDuration));
		store(`${key}.e`,encryptedExpiry);
	}
	return store(key, encryptedData);
};

// decrypt and read with time expiry functionality
const readExpiry = (key: string) => {
	const expiryData = decrypt(read(`${key}.e`));
	const data = decrypt(read(key));
	
	if (data != null) {
		if (data && isExpired(expiryData)) {
			return { response: data, expired: true };
		}
		if (data && !isExpired(expiryData)) {
			return { response: data, expired: false };
		}
	}
	return {response: null, expired: true};
};

// reset localstorage
const clear = () => {
	localStorage.clear();
	return null;
};

export { encrypt, decrypt, clear, storeExpiry, readExpiry, read, store };