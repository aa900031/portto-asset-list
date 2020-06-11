import { ref } from 'vue';
import { fromFetch } from 'rxjs/fetch'
import { switchMap } from 'rxjs/operators'

export interface AssetDetail {
  imageUrl: string
  name: string
  desc: string
  collectionName: string
  tokenId: string
  address: string
  permaLink: string
}

export const useAssetDetail = (address: string, tokenId: string) => {
  const currentData = ref<AssetDetail>(null)
  const isFetching = ref<boolean>(false)

  const fetchData = async () => {
    if (isFetching.value) return

    isFetching.value = true

    const data = await _fetchData(address, tokenId).toPromise()
    const detail = _tranDataToAssetDetail(data)

    currentData.value = detail
    isFetching.value = false
  }

  return {
    isFetching,
    currentData,
    fetchData,
  }
}

const _fetchData = (
  address: string,
  tokenId: string,
) => {
  return fromFetch(`https://api.opensea.io/api/v1/asset/${address}/${tokenId}`).pipe(
    switchMap(res => res.ok && res.json())
  )
}

const _tranDataToAssetDetail = (data: any): AssetDetail => {
  return {
    imageUrl: data.image_url,
    name: data.name,
    desc: data.description,
    collectionName: data.collection.name,
    tokenId: data.token_id,
    address: data.asset_contract.address,
    permaLink: data.permalink,
  }
}
