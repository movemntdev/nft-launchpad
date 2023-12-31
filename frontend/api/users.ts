
import axios, { AxiosHeaders } from 'axios';
import { DEFAULT_API_URL } from './collections';


export async function getNonce(walletAddress: string) {
  console.log("getNonce walletAddress =", walletAddress);
  try {
    const data = await axios.get(`${process.env.LAUNCHPAD_API_URL ?? DEFAULT_API_URL}/user/nonce`,
    {
      params: {
        walletAddress
      }
    });
    if (data.status !== 200) {
      console.log("getNonce failed status =", data.status);
      return null;
    }
    console.log("getNonce api success data =", data);
    return data.data.nonce;
  } catch {
    console.log("axios failed");
    return null;
  }
}

export async function verifyAdmin(
  fullMessage: string,
  signature: string,
  walletAddress: string,
  publicKey: string
) {
  try {
    const data = await axios.post(`${process.env.LAUNCHPAD_API_URL ?? DEFAULT_API_URL}/user/admin/verify`, {
      fullMessage,
      signature,
      walletAddress,
      publicKey
    }, {
      headers: new AxiosHeaders().setContentType('application/x-www-form-urlencoded')
    });
    if (data.status !== 200) {
      console.log("verifyAdmin api failed status =", data.status);
      return null;
    }
    console.log("verifyAdmin success data =", data);
    return data.data.jwtToken;
  } catch {
    console.log("axios failed");
    return null;
  }
}

// todo: verify session email
export async function verifyCreator(
  emailAddress: string,
) {
  try {
    const data = await axios.post(`${process.env.LAUNCHPAD_API_URL ?? DEFAULT_API_URL}/user/creator/verify`, {
      emailAddress
    }, {
      headers: new AxiosHeaders().setContentType('application/x-www-form-urlencoded')
    });
    if (data.status !== 200) {
      console.log("verifyCreator api failed status =", data.status);
      return null;
    }
    console.log("verifyCreator success data =", data);
    return data.data.jwtToken;
  } catch {
    console.log("axios failed");
    return null;
  }
}


export async function addUserApi(
  name: string,
  email: string,
  wallet: string,
  role: number,
) {
  try {
    const jwt = localStorage.getItem("admin-jwt");
    console.log("addUser jwt=", jwt);
    const data = await axios.post(`${process.env.LAUNCHPAD_API_URL ?? DEFAULT_API_URL}/user/`, {
      name,
      email,
      wallet,
      role
    }, {
      headers: new AxiosHeaders()
        .setContentType('application/x-www-form-urlencoded')
        .setAuthorization('Bearer ' + jwt)
    });
    if (data.status !== 200) {
      console.log("api failed status =", data.status);
      return null;
    }
    console.log("add success data =", data);
    return data.data;
  } catch {
    console.log("axios failed");
    return null;
  }
}

export async function updateUserApi(
  id: number,
  name: string,
  email: string,
  wallet: string,
  role: number,
) {
  try {
    const jwt = localStorage.getItem("admin-jwt");
    const data = await axios.post(`${process.env.LAUNCHPAD_API_URL ?? DEFAULT_API_URL}/user/edit`, {
      id,
      name,
      email,
      wallet,
      role
    }, {
      headers: new AxiosHeaders()
        .setContentType('application/x-www-form-urlencoded')
        .setAuthorization('Bearer ' + jwt)
    });
    if (data.status !== 200) {
      console.log("api failed status =", data.status);
      return null;
    }
    console.log("update success data =", data);
    return data.data;
  } catch {
    console.log("axios failed");
    return null;
  }
}

export async function removeUserApi(
  id: number,
) {
  try {
    const jwt = localStorage.getItem("admin-jwt");
    console.log("removeUserApi jwt=", jwt);
    const data = await axios.post(`${process.env.LAUNCHPAD_API_URL ?? DEFAULT_API_URL}/user/remove`, {
      id,
    }, {
      headers: new AxiosHeaders()
        .setContentType('application/x-www-form-urlencoded')
        .setAuthorization('Bearer ' + jwt)
    });
    if (data.status !== 200) {
      console.log("api failed status =", data.status);
      return null;
    }
    console.log("remove success data =", data);
    return true;
  } catch {
    console.log("axios failed");
    return null;
  }
}

export async function getAllUsersApi(
  email?: string,
) {
  try {
    const data = await axios.get(`${process.env.LAUNCHPAD_API_URL ?? DEFAULT_API_URL}/user/all`,
    {
      params: {
        email
      }
    });
    if (data.status !== 200) {
      console.log("api failed status =", data.status);
      return null;
    }
    console.log("getall api success data =", data);
    return data.data;
  } catch {
    console.log("axios failed");
    return null;
  }
}
