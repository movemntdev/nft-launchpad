import axios, { AxiosHeaders } from 'axios';
import { getCollectionAddress, noDecimalToAptosDecimal } from '../utils/web3';

// export const DEFAULT_API_URL = "http://localhost:8080/v1"
export const DEFAULT_API_URL = "https://jack-service.tech/v1"
// export const DEFAULT_API_URL = "http://168.119.39.199:8080/v1"

export const DEFAULT_BASE_IPFS_GATEWAY = "https://ipfs.io/ipfs/"

export async function createCollectionApi(
  creator_email: string,
  creator_name: string,
  creator_image: string,
  collection_name: string,
  description: string,
  _mint_price: string,
  total_supply: string,
  images_cid: string,
  jsons_cid: string,
  logo_cid: string | null,
) {
  try {
    const jwt = localStorage.getItem("creator-jwt");
    let mint_price = noDecimalToAptosDecimal(_mint_price);
    let collection_address = getCollectionAddress(collection_name);
    let logo_uri = logo_cid ? (DEFAULT_BASE_IPFS_GATEWAY + logo_cid) : (DEFAULT_BASE_IPFS_GATEWAY + images_cid + "/1.png");
    const data = await axios.post(`${process.env.LAUNCHPAD_API_URL ?? DEFAULT_API_URL}/collection/`, {
      creator_email,
      creator_name,
      creator_image,
      collection_name,
      collection_address,
      description,
      mint_price,
      total_supply,
      images_uri: DEFAULT_BASE_IPFS_GATEWAY + images_cid,
      jsons_uri: DEFAULT_BASE_IPFS_GATEWAY + jsons_cid,
      logo_uri
    }, {
      headers: new AxiosHeaders()
        .setContentType('application/x-www-form-urlencoded')
        .setAuthorization('Bearer ' + jwt)
    });
    if (data.status !== 200) {
      console.log("api failed status =", data.status);
      return null;
    }
    console.log("api success data =", data);
    return data.data;
  } catch {
    console.log("axios failed");
    return null;
  }

}


export async function getNftNameAndUriApi(
  collection_name: string,
) {
  try {
    const data = await axios.post(`${process.env.LAUNCHPAD_API_URL ?? DEFAULT_API_URL}/collection/nft/name`, {
      collection_name
    }, {
      headers: new AxiosHeaders().setContentType('application/x-www-form-urlencoded')
    });
    if (data.status !== 200) {
      console.log("api failed status =", data.status);
      return null;
    }
    console.log("api success data =", data);
    return data.data;
  } catch {
    console.log("axios failed");
    return null;
  }

}

export async function getCollectionsApi(
  creator_email?: string,
) {
  try {
    const data = await axios.get(`${process.env.LAUNCHPAD_API_URL ?? DEFAULT_API_URL}/collection/all`,
    {
      params: {
        creator_email
      }
    });
    if (data.status !== 200) {
      console.log("api failed status =", data.status);
      return null;
    }
    console.log("api success data =", data);
    return data.data;
  } catch {
    console.log("axios failed");
    return null;
  }
}

export type CollectionData = {
  id: number,
  creator_email: string,
  creator_name: string,
  creator_image: string,
  name: string,
  desc: string,
  total_supply: number,
  mint_price: string,
  images_uri: string,
  jsons_uri: string,
  logo_uri: string,
  tx_hash: string
}